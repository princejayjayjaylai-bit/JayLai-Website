import type { Locale } from "../config";
import { enMessages } from "./en";
import { zhHansMessages } from "./zh-Hans";
import { zhHantMessages } from "./zh-Hant";

const catalog = {
  en: enMessages,
  "zh-Hans": zhHansMessages,
  "zh-Hant": zhHantMessages,
};

export type Messages = (typeof catalog)[Locale];

export function getMessages(locale: Locale): Messages {
  return catalog[locale];
}

export { enMessages };
