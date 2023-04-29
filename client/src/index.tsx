import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { App } from "./app";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { withSSR } from "react-i18next";

import { initStore } from "./store/store";

import "./index.module.scss";
import "./i18n";
import { setupListeners } from "@reduxjs/toolkit/query";

const STORE = window._SSR_STORE_STATE_;
const I18N_STORE = window.initialI18nStore;
const I18N_INITIAL_LANGUAGE = window.initialLanguage;

delete window._SSR_STORE_STATE_;
delete window.initialI18nStore;
delete window.initialLanguage;

const store = initStore(STORE);
const LanguageApp = withSSR()(App);

setupListeners(store.dispatch);

const container = document.getElementById("app") as HTMLElement;
const root = ReactDOM.hydrateRoot(
  container,
  <BrowserRouter>
    <Provider store={store}>
      <LanguageApp
        initialI18nStore={I18N_STORE || {}}
        initialLanguage={I18N_INITIAL_LANGUAGE || ""}
      />
    </Provider>
  </BrowserRouter>
);
