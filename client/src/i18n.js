import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import languageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import resources from "./locales/resources";
import { localization } from "./constants/languages";

export function getLang() {
  const systemLang = navigator.language;
  const primaryLang = Object.keys(localization).includes(systemLang)
    ? localization[systemLang]
    : "en-US";
  let res = "en-US";

  const language = window.localStorage.getItem("locale") || primaryLang;
  if (resources[language]) res = language;
  window.localStorage.setItem("locale", res);
  return res;
}

i18n
  .use(Backend)
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: getLang(),
    fallbackLng: "en-US",
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;