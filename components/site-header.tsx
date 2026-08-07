import Link from "next/link";
import { HistoryNav } from "@/components/history-nav";
import { LanguageSwitcher } from "@/components/language-switcher";
import {
  exploreSectionHrefs,
  exploreSectionKeys,
  type ExploreSectionKey,
} from "@/lib/explore-sections";
import type { Locale } from "@/lib/i18n/config";
import type { Messages } from "@/lib/i18n/messages";

const navKeys = exploreSectionKeys satisfies readonly ExploreSectionKey[];

type SiteHeaderProps = {
  locale: Locale;
  messages: Messages;
};

export function SiteHeader({ locale, messages }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200/80 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-6 py-5 sm:px-8 lg:px-10">
        <HistoryNav
          backLabel={messages.nav.back}
          forwardLabel={messages.nav.forward}
          homeLabel={messages.nav.home}
        />
        <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
          <nav
            className="flex flex-wrap items-center justify-end gap-x-3 gap-y-2 text-xs font-medium tracking-wide text-neutral-700 sm:gap-x-4 sm:text-sm"
            aria-label="Primary"
          >
            {navKeys.map((key) => (
              <Link
                key={key}
                href={exploreSectionHrefs[key]}
                className="transition-colors hover:text-[#0c2340]"
              >
                {messages.nav[key]}
              </Link>
            ))}
          </nav>
          <LanguageSwitcher currentLocale={locale} />
        </div>
      </div>
    </header>
  );
}
