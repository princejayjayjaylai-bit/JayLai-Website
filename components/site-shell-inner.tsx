"use client";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { useSiteLocale } from "@/components/locale-provider";
import { localeFontVariables } from "@/lib/i18n/locale-styles";

export function SiteShellInner({ children }: { children: React.ReactNode }) {
  const { locale, messages } = useSiteLocale();

  return (
    <div
      className={`flex min-h-full flex-col bg-white text-neutral-950 antialiased overflow-x-clip ${localeFontVariables(locale)}`}
    >
      <SiteHeader messages={messages} />
      <main className="min-w-0 flex-1">{children}</main>
      <SiteFooter locale={locale} messages={messages} />
    </div>
  );
}
