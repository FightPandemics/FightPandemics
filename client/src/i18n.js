import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import languageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import resources from "./locales/resources";

// export function getLang() {
//   const systemLang = navigator.language;
//   const primaryLang = Object.values(Languages).includes(systemLang)
//     ? systemLang
//     : Languages.en;
//   let res = Languages.en;

//   const language = primaryLang;
//   if (resources[language]) res = language;
//   // window.localStorage.setItem('locale', res);
//   return res;
// }

i18n
  .use(Backend)
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: navigator.language,
    fallbackLng: "en-US",
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
