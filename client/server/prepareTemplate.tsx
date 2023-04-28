import fs from "fs";
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { Provider } from "react-redux";
import { initStore } from "../src/store/store";
import { App } from "../src/app";
import { Request } from "express";
import { Helmet } from "react-helmet";
import { I18nextProvider } from "react-i18next";
import { StoreStateType } from "../src/@types/redux";

export const prepareTemplate = async (
  preloadedState: StoreStateType,
  req: Request
) => {
  const helmet = Helmet.renderStatic();
  const title = helmet.title.toString();
  const meta = helmet.meta.toString();
  const initialLanguage = req.i18n.language;
  const initialI18nStore = req.i18n.options.resources;

  const indexHTML = fs.readFileSync(
    path.resolve(__dirname, "../client/start-page.html"),
    {
      encoding: "utf8",
    }
  );

  const appHTML = ReactDOMServer.renderToString(
    <StaticRouter location={req.originalUrl}>
      <I18nextProvider i18n={req.i18n}>
        <Provider store={initStore(preloadedState)}>
          <App />
        </Provider>
      </I18nextProvider>
    </StaticRouter>
  );

  return indexHTML
    .replace(
      '<div id="app"></div>',
      `
      <div id="app">${appHTML}</div> 
      <script type="text/javascript">
      window._SSR_STORE_STATE_ = 
      ${JSON.stringify(initStore(preloadedState).getState())};
      window.initialI18nStore = ${JSON.stringify(initialI18nStore)};
      window.initialLanguage = "${initialLanguage}";
      </script>
    `
    )
    .replace("<title>__META_TITLE__</title>", meta + "\n" + title);
};
