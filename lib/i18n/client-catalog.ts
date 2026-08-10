import type { Locale } from "./config";
import { enMessages } from "./messages/en";
import { zhHansMessages } from "./messages/zh-Hans";
import { zhHantMessages } from "./messages/zh-Hant";
import type { Messages } from "./messages";

export const messagesByLocale: Record<Locale, Messages> = {
  en: enMessages,
  "zh-Hans": zhHansMessages,
  "zh-Hant": zhHantMessages,
};
