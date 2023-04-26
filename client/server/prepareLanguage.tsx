import { TAvailableLanguages } from "../src/@types/i18n";
import { defaultLanguage, supportedLngs } from "../src/i18n";
import express from "express";

export const prepareLanguage = async (
  req: express.Request,
  res: express.Response
) => {
  let lng: TAvailableLanguages = defaultLanguage;
  supportedLngs.forEach((language) => {
    if (
      req.originalUrl === `/${language}` ||
      req.originalUrl.includes(`/${language}/`)
    ) {
      req.i18n.changeLanguage(language);
      lng = language as TAvailableLanguages;
    }
  });

  res.cookie("language", lng);
  return {
    language: lng,
    metaUrl:
      lng !== defaultLanguage
        ? req.originalUrl.substring(lng.length + 1) || "/"
        : req.originalUrl,
  };
};
