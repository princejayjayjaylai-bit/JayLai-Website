import { HistoryNav } from "@/components/history-nav";
import { LanguageSwitcher } from "@/components/language-switcher";
import { SiteMobileMenu } from "@/components/site-mobile-menu";
import { SitePrimaryNav } from "@/components/site-primary-nav";
import type { Messages } from "@/lib/i18n/messages";

type SiteHeaderProps = {
  messages: Messages;
};

export function SiteHeader({ messages }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 overflow-visible border-b border-neutral-200/80 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-3 sm:gap-3 sm:px-8 sm:py-5 lg:px-10">
        <HistoryNav
          backLabel={messages.nav.back}
          forwardLabel={messages.nav.forward}
        />
        <div className="flex shrink-0 items-center justify-end gap-2 sm:gap-3">
          <SitePrimaryNav messages={messages} className="hidden md:flex" />
          <SiteMobileMenu messages={messages} />
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
