// import translationAR from "./translations/ar.json";
import translationEN_GB from "./translations/en_GB.json";
import translationEN_US from "./translations/en_US.json";
import translationDE from "./translations/de.json";
import translationES_ES from "./translations/es_ES.json";
// import translationIT from "./translations/it.json";
// import translationRU from "./translations/ru.json";
import translationPL from "./translations/pl.json";
// import translationTH from "./translations/th.json";
import translationZH_TW from "./translations/zh_TW.json";
import translationZH_CN from "./translations/zh_CN.json";
import translationFR from "./translations/fr.json";
import translationKN_IN from "./translations/kn_IN.json";
import translationMS_MY from "./translations/ms_MY.json";
import translationTE_IN from "./translations/te_IN.json";
import translationTR from "./translations/tr.json";
import translationVI from "./translations/vi.json";

/* Order in this index controls the order in language selector menu  */
export const index = {
  // ar: {
  //   translation: translationAR,
  // },
  // en: {
  //   translation: translationEN_US,
  // },
  "zh-CN": {
    translation: translationZH_CN,
  },
  "zh-TW": {
    translation: translationZH_TW,
  },
  "en-US": {
    translation: translationEN_US,
  },
  "en-GB": {
    translation: translationEN_GB,
  },
  de: {
    translation: translationDE,
  },
  fr: {
    translation: translationFR,
  },
  pl: {
    translation: translationPL,
  },
  // it: {
  //   translation: translationIT,
  // },
  // ru: {
  //   translation: translationRU,
  // },
  es: {
    translation: translationES_ES,
  },
  "es-ES": {
    translation: translationES_ES,
  },
  tr: {
    translation: translationTR,
  },
  "kn-IN": {
    translation: translationKN_IN,
  },
  "te-IN": {
    translation: translationTE_IN,
  },
  "ms-MY": {
    translation: translationMS_MY,
  },
  vi: {
    translation: translationVI,
  },
  // th: {
  //   translation: translationTH,
  // },
};

export default index;
