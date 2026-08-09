import { HistoryNav } from "@/components/history-nav";
import { LanguageSwitcher } from "@/components/language-switcher";
import { SitePrimaryNav } from "@/components/site-primary-nav";
import type { Locale } from "@/lib/i18n/config";
import type { Messages } from "@/lib/i18n/messages";

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
          <SitePrimaryNav messages={messages} />
          <LanguageSwitcher currentLocale={locale} />
        </div>
      </div>
    </header>
  );
}
