import { defaultLanguage, supportedLngs } from "../i18n";

export const canUseDOM = () => {
  return !!(
    typeof window !== "undefined" &&
    window.document &&
    window.document.createElement
  );
};

export const convertFromLanguageUrl = (url: string) => {
  const currentLang = url.split("/")[1];
  return currentLang &&
    currentLang !== defaultLanguage &&
    supportedLngs.includes(url.split("/")[1])
    ? url.substring(currentLang.length + 1) || "/"
    : url;
};
