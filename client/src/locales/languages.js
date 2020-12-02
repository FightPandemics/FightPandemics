import resources from "./index";

export const localization = {
  ar: "ar",
  de: "de",
  en: "en-US",
  "en-US": "en-US",
  "en-GB": "en-GB",
  "es-ES": "es-ES",
  fr: "fr",
  he: "he",
  id: "id",
  it: "it",
  "kn-IN": "kn-IN",
  "ms-MY": "ms-MY",
  "mk-MK": "mk-MK",
  "pt-PT": "pt-PT",
  nl: "nl",
  pl: "pl",
  pt: "pt",
  ru: "ru",
  "te-IN": "te-IN",
  th: "th",
  tr: "tr",
  uk: "uk",
  vi: "vi",
  "zh-CN": "zh-CN",
  "zh-TW": "zh-TW",
};

export const MENU_MAP = {
  ar: { value: "العربية", text: "Arabic (العربية)" },
  de: { value: "Deutsch", text: "German (Deutsch)" },
  "en-US": { value: "American English", text: "English (American English)" },
  "en-GB": { value: "British English", text: "English (British English)" },
  "es-ES": { value: "Español", text: "Spanish (Español de España)" },
  fr: { value: "Français", text: "French (Français)" },
  he: { value: "עברית", text: "Hebrew (עברית)" },
  id: { value: "Bahasa Indonesia", text: "Indonesian (Bahasa Indonesia)" },
  it: { value: "Italiano", text: "Italian (Italiano)" },
  nl: { value: "Nederlands", text: "Dutch (Nederlands)" },
  pl: { value: "Polski", text: "Polish (Polski)" },
  "pt-PT": { value: "Português", text: "Portuguese (Português)" },
  ru: { value: "русский", text: "Russian (русский)" },
  th: { value: "ไทย", text: "Thai (ไทย)" },
  tr: { value: "Türkçe", text: "Turkish (Türkçe)" },
  uk: { value: "Українська", text: "Ukrainian (Українська)" },
  "zh-TW": { value: "繁體中文", text: "Chinese Traditional (繁體中文)" },
  "zh-CN": { value: "简体中文", text: "Chinese Simplified (简体中文)" },
  "kn-IN": { value: "ಕನ್ನಡ", text: "Kannada (ಕನ್ನಡ)" },
  "ms-MY": { value: "Bahasa Melayu", text: "Malay (Bahasa Melayu)" },
  "te-IN": { value: "తెలుగు", text: "Telugu (తెలుగు)" },
  tl: { value: "Tagalog", text: "Tagalog (Tagalog)" },
  vi: { value: "Tiếng Việt", text: "Vietnamese (Tiếng Việt)" },
  "mk-MK": { value: "македонски", text: "Macedonian (македонски)" },
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
