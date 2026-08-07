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

/** Serif display headings — English uses Noto SC for 黎杰 consistency. */
export function localeSerifClass(locale: Locale): string {
  switch (locale) {
    case "zh-Hant":
      return "font-[family-name:var(--font-noto-serif-tc)]";
    default:
      return "font-[family-name:var(--font-noto-serif-sc)]";
  }
}
