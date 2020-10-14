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

/* Order in this index controls the order in language selector menu  */
export const index = {
  // ar: {
  //   translation: translationAR,
  // },
  // en: {
  //   translation: translationEN_US,
  // },
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

  // th: {
  //   translation: translationTH,
  // },
};

export default index;
