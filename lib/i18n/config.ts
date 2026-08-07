export type Locale = "en" | "zh-Hans" | "zh-Hant";

export const LOCALE_COOKIE = "site-locale";

export const defaultLocale: Locale = "en";

export const localeOptions: {
  value: Locale;
  label: string;
}[] = [
  { value: "en", label: "English" },
  { value: "zh-Hans", label: "中文（简体）" },
  { value: "zh-Hant", label: "中文（繁體）" },
];

export const htmlLang: Record<Locale, string> = {
  en: "en",
  "zh-Hans": "zh-CN",
  "zh-Hant": "zh-HK",
};
