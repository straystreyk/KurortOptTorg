import i18n, { type InitOptions } from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./languages/en.json";
import ru from "./languages/ru.json";
import { TAvailableLanguages } from "../@types/i18n";

const resources: { [p in TAvailableLanguages]: { [p: string]: any } } = {
  ru,
  en,
};

export const supportedLngs = Object.keys(resources);
export const defaultLanguage: TAvailableLanguages = "ru";

export const options: InitOptions = {
  load: "languageOnly",
  resources,
  fallbackLng: defaultLanguage,
  interpolation: {
    escapeValue: false,
  },
  supportedLngs,
};

i18n.use(initReactI18next).init(options);

export default i18n;
