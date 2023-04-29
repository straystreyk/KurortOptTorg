import path from "path";
import express from "express";
import { prepareTemplate } from "./prepareTemplate";
import { prepareSsr } from "./prepareSsr";
import i18nextMiddleware from "i18next-http-middleware";
import Backend from "i18next-fs-backend";
import cookieParser from "cookie-parser";
import i18n, { options } from "../src/i18n";
import { prepareLanguage } from "./prepareLanguage";
import { ENV_APP_PORT } from "../src/env";

const app = express();

i18n.use(Backend).init(options);

app
  .disable("x-powered-by")
  .use(cookieParser())
  .use(i18nextMiddleware.handle(i18n))
  .use(express.static(path.resolve(__dirname, "../client")));

app.use("*", async (req: express.Request, res: express.Response) => {
  await prepareLanguage(req, res);
  const preloadedStore = await prepareSsr(req.originalUrl);
  const indexHTML = await prepareTemplate(preloadedStore, req);

  res.contentType("text/html");
  res.status(200);

  return res.send(indexHTML);
});

// run express server
app.listen(+ENV_APP_PORT, () => {
  console.log(`Express server started at http://localhost:${+ENV_APP_PORT}`);
});
