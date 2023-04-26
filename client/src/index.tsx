import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { App } from "./components/app";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { withSSR } from "react-i18next";

import { initStore } from "./store/store";
import { STORE } from "./helpers/constants";

import "./index.module.scss";
import "./i18n";

const container = document.getElementById("app") as HTMLElement;
const LanguageApp = withSSR()(App);

const root = ReactDOM.hydrateRoot(
  container,
  <BrowserRouter>
    <Provider store={initStore(STORE)}>
      <LanguageApp
        initialI18nStore={window.initialI18nStore}
        initialLanguage={window.initialLanguage}
      />
    </Provider>
  </BrowserRouter>
);
