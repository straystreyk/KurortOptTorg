import path from "path";
import dotenv from "dotenv";
import express from "express";
import { prepareTemplate } from "./prepareTemplate";
import { prepareSsr } from "./prepareSsr";
import i18nextMiddleware from "i18next-http-middleware";
import Backend from "i18next-fs-backend";
import cookieParser from "cookie-parser";
import i18n, { options } from "../src/i18n";
import { prepareLanguage } from "./prepareLanguage";

dotenv.config();
const app = express();

i18n.use(Backend).init(options);

app
  .disable("x-powered-by")
  .use(cookieParser())
  .use(i18nextMiddleware.handle(i18n))
  .use(express.static(path.resolve(__dirname, "../client")));

app.use("*", async (req: express.Request, res: express.Response) => {
  const { language, metaUrl } = await prepareLanguage(req, res);
  console.log(metaUrl);
  const preloadedState = await prepareSsr(req.originalUrl);
  const indexHTML = await prepareTemplate(preloadedState, req);

  res.contentType("text/html");
  res.status(200);

  return res.send(indexHTML);
});

// run express server
app.listen(process.env.APP_PORT, () => {
  console.log(
    `Express server started at http://localhost:${process.env.APP_PORT}`
  );
});
