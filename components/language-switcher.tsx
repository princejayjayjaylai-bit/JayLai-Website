"use client";

import { useEffect, useRef, useState } from "react";
import { localeOptions, type Locale } from "@/lib/i18n/config";
import { useSiteLocale } from "@/components/locale-provider";

export function LanguageSwitcher() {
  const { locale: currentLocale, setLocale } = useSiteLocale();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onPointerDown(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  function selectLocale(locale: Locale) {
    setOpen(false);
    if (locale !== currentLocale) {
      setLocale(locale);
    }
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="border border-neutral-300 px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-colors hover:border-[#0c2340] hover:text-[#0c2340]"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Language"
      >
        Language
      </button>
      {open ? (
        <ul
          className="absolute right-0 z-50 mt-1 min-w-[10.5rem] border border-neutral-200 bg-white py-1 shadow-sm"
          role="listbox"
        >
          {localeOptions.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                role="option"
                aria-selected={option.value === currentLocale}
                onClick={() => selectLocale(option.value)}
                className={`block w-full px-3 py-2 text-left text-xs hover:bg-neutral-50 ${
                  option.value === currentLocale
                    ? "font-medium text-[#0c2340]"
                    : "text-neutral-700"
                }`}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
