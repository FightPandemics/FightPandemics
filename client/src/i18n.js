import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-xhr-backend";
import LanguageDetector from "i18next-browser-languagedetector";
// not like to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init

i18n
  // load translation using xhr -> see /public/locales
  // learn more: https://github.com/i18next/i18next-xhr-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources: {
      en: {
        translation: {
          "home intro 1": "A place to give and get help",
          "home intro 2": "Pandemics will continue to happen.",
          "home intro 3": "We help communities prepare and respond.",
          "need help": "Need Help",
          "give help": "Give Help",
        },
      },
      it: {
        translation: {
          "home intro 1": "Un posto dove dare e chiedere aiuto",
          "home intro 2": "Le pandemie continueranno ad accadere.",
          "home intro 3": "Aiutiamo le comunità a prepararsi e rispondere.",
          "need help": "Ho bisogno di aiuto",
          "give help": "Dare aiuto",
          itailian: "italiana",
        },
      },
      jp: {
        translation: {
          "home intro 1": "助けを与え、得る場所",
          "home intro 2": "パンデミックは起こり続けます。",
          "home intro 3": "コミュニティの準備と対応を支援します。",
          "need help": "助けが必要",
          "give help": "助けを与える",
          japanese: "日本",
        },
      },
      zh_tw: {
        translation: {
          "home intro 1": "提供和獲得幫助的地方",
          "home intro 2": "大流行將繼續發生。",
          "home intro 3": "我們幫助社區做好準備並做出回應。",
          "need help": "需要幫助",
          "give help": "提供幫助",
          chinese: "中文",
        },
      },
      zh_cn: {
        translation: {
          "home intro 1": "提供和获得帮助的地方",
          "home intro 2": "大流行将继续发生。",
          "home intro 3": "我们帮助社区做好准备并做出回应。",
          "need help": "需要帮忙",
          "give help": "提供帮助",
          chinese: "中文",
        },
      },
    },
    lng: "en",
    fallbackLng: "en",
    debug: true,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    detection: {
      order: [
        "querystring",
        "cookie",
        "localStorage",
        "navigator",
        "htmlTag",
        "path",
        "subdomain",
      ],
      lookupQuerystring: "lng",
    },
  });

export default i18n;
