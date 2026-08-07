import { cookies } from "next/headers";
import { defaultLocale, LOCALE_COOKIE, type Locale } from "./config";

export async function getLocale(): Promise<Locale> {
  const jar = await cookies();
  const value = jar.get(LOCALE_COOKIE)?.value;
  if (value === "en" || value === "zh-Hans" || value === "zh-Hant") {
    return value;
  }
  return defaultLocale;
}
