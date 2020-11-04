import resources from "./index";

export const localization = {
  ar: "ar",
  de: "de",
  en: "en-US",
  "en-US": "en-US",
  "en-GB": "en-GB",
  es: "es-ES",
  "es-ES": "es-ES",
  fr: "fr",
  he: "he",
  id: "id",
  it: "it",
  nl: "nl",
  pl: "pl",
  pt: "pt",
  ru: "ru",
  th: "th",
  tr: "tr",
  uk: "uk",
  "zh-TW": "zh-TW",
};

export const MENU_MAP = {
  ar: { value: "العربية", text: "Arabic" },
  de: { value: "Deutsch", text: "German" },
  "en-US": { value: "American English", text: "English" },
  "en-GB": { value: "British English", text: "English" },
  "es-ES": { value: "Español de España", text: "Peninsular Spanish" },
  fr: { value: "Français", text: "French" },
  he: { value: "עברית", text: "Hebrew" },
  id: { value: "Bahasa Indonesia", text: "Indonesian" },
  it: { value: "Italiano", text: "Italian" },
  nl: { value: "Nederlands", text: "Dutch" },
  pl: { value: "Polski", text: "Polish" },
  pt: { value: "Português", text: "Portuguese" },
  ru: { value: "русский", text: "Russian" },
  th: { value: "ไทย", text: "Thai" },
  tr: { value: "Türkçe", text: "Turkish" },
  uk: { value: "Українська", text: "Ukrainian" },
  "zh-TW": { value: "繁體中文", text: "Chinese TraditionalÎ" },
};

export const languages = Object.keys(resources).reduce(
  (result, languageKey) => {
    if (MENU_MAP[languageKey] === undefined) return result;

    return {
      ...result,
      [languageKey]: MENU_MAP[languageKey],
    };
  },
  {},
);
