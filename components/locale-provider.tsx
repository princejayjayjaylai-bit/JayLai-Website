"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { htmlLang, LOCALE_COOKIE, type Locale } from "@/lib/i18n/config";
import { messagesByLocale } from "@/lib/i18n/client-catalog";
import type { Messages } from "@/lib/i18n/messages";
import { localeBodyClass } from "@/lib/i18n/locale-styles";

type LocaleContextValue = {
  locale: Locale;
  messages: Messages;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

const localeBodyClasses = ["locale-en", "locale-zh-hans", "locale-zh-hant"] as const;

function syncDocumentLocale(locale: Locale) {
  const root = document.documentElement;
  root.lang = htmlLang[locale];
  for (const cls of localeBodyClasses) {
    root.classList.remove(cls);
  }
  root.classList.add(localeBodyClass(locale));
}

type LocaleProviderProps = {
  initialLocale: Locale;
  children: React.ReactNode;
};

export function LocaleProvider({ initialLocale, children }: LocaleProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  const setLocale = useCallback((next: Locale) => {
    document.cookie = `${LOCALE_COOKIE}=${next};path=/;max-age=31536000;SameSite=Lax`;
    setLocaleState(next);
  }, []);

  useEffect(() => {
    syncDocumentLocale(locale);
  }, [locale]);

  const messages = useMemo(() => messagesByLocale[locale], [locale]);

  const value = useMemo(
    () => ({ locale, messages, setLocale }),
    [locale, messages, setLocale],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useSiteLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useSiteLocale must be used within LocaleProvider");
  }
  return ctx;
}
