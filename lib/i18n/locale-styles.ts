import type { Locale } from "./config";

export function localeBodyClass(locale: Locale): string {
  switch (locale) {
    case "zh-Hans":
      return "locale-zh-hans";
    case "zh-Hant":
      return "locale-zh-hant";
    default:
      return "locale-en";
  }
}

/** Default text on the site shell (Chinese body = 思源宋体; English = Geist). */
export function localeFontVariables(locale: Locale): string {
  switch (locale) {
    case "zh-Hans":
      return "font-[family-name:var(--font-noto-serif-sc)]";
    case "zh-Hant":
      return "font-[family-name:var(--font-noto-serif-tc)]";
    default:
      return "font-[family-name:var(--font-geist-sans)]";
  }
}

/** Page heroes, section titles (Chinese = 思源黑体; English = Arial Black). */
export function localeSerifClass(locale: Locale): string {
  switch (locale) {
    case "zh-Hans":
      return "font-[family-name:var(--font-noto-sans-sc)] font-bold";
    case "zh-Hant":
      return "font-[family-name:var(--font-noto-sans-tc)] font-bold";
    default:
      return "font-display-en font-black";
  }
}

export const localeNavClass = localeSerifClass;
