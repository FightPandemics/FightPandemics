import translationEN_GB from "./en-GB/translation.json";
import translationEN_US from "./en-US/translation.json";
import translationDE from "./de/translation.json";
import translationES_ES from "./es-ES/translation.json";
import translationIT from "./it/translation.json";
import translationRU from "./ru/translation.json";
import translationTH from "./th/translation.json";

export const resources = {
  en: {
    translation: translationEN_US,
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
  es: {
    translation: translationES_ES,
  },
  "es-ES": {
    translation: translationES_ES,
  },
  it: {
    translation: translationIT,
  },
  ru: {
    translation: translationRU,
  },
  th: {
    translation: translationTH,
  },
};

export default resources;
