export const LANGUAGE_LIST = [
  "ko",
  "en",
  "ja",
  "zh",
  "hi",
  "fr",
  "es",
  "ar",
  "bn",
  "pt",
  "id",
  "it",
  "vi",
  "th",
  "ms",
  "ru",
  "de",
  "tr",
] as const;

export const ISO_LANGUAGE_JSON = {
  ko: "ko-KR",
  en: "en-US",
  ja: "ja-JP",
  zh: "zh-CN",
  hi: "hi-IN",
  fr: "fr-FR",
  es: "es-ES",
  ar: "ar-SA",
  bn: "bn-BD",
  pt: "pt-BR",
  id: "id-ID",
  it: "it-IT",
  vi: "vi-VN",
  th: "th-TH",
  ms: "ms-MY",
  ru: "ru-RU",
  de: "de-DE",
  tr: "tr-TR",
} as const;


export const i18nOption = {
  locales: LANGUAGE_LIST,
  defaultLocale: "en",
  localePrefix: "always",
};

export const GenerateStaticParamsI18n = () => {
  return i18nOption.locales.map((locale) => ({ locale }));
};

export default i18nOption;
