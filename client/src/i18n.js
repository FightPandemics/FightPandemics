import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import moment from "moment";
import resources from "./locales";
import { localization } from "./locales/languages";

export function getLang() {
  const systemLang = navigator.languages
    ? navigator.languages[0]
    : navigator.userLanguage || navigator.language;
  const primaryLang = Object.keys(localization).includes(systemLang)
    ? localization[systemLang]
    : "en-US";
  let res = "en-US";

  const language = window.localStorage.getItem("locale") || primaryLang;
  if (resources[language]) res = language;
  window.localStorage.setItem("locale", res);
  return res;
}

function setGlobalMomentLocale() {
  const tranlatedDatesObject = i18n.t("dates", { returnObjects: true });
  moment.defineLocale(i18n.language, {
    parentLocale: "en",
    monthsShort: Object.values(tranlatedDatesObject.monthsShort),
    weekdaysShort: Object.values(tranlatedDatesObject.weekdaysShort),
  });
  moment.locale(i18n.language);
}

i18n.use(initReactI18next).init(
  {
    resources,
    lng: getLang(),
    fallbackLng: "en-US",
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  },
  () => {
    setGlobalMomentLocale();
  },
);

i18n.on("languageChanged", () => {
  setGlobalMomentLocale();
});

export default i18n;
