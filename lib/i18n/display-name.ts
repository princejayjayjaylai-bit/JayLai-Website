import type { Locale } from "@/lib/i18n/config";
import { profile } from "@/lib/profile";

/** Single display name for the active locale (no bilingual stacking). */
export function getDisplayName(locale: Locale): string {
  switch (locale) {
    case "en":
      return profile.nameEn;
    case "zh-Hant":
      return profile.nameZhHant;
    default:
      return profile.nameZhHans;
  }
}
