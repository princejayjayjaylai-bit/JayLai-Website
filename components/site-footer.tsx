import type { Messages } from "@/lib/i18n/messages";
import type { Locale } from "@/lib/i18n/config";
import { getDisplayName } from "@/lib/i18n/display-name";

type SiteFooterProps = {
  locale: Locale;
  messages: Messages;
};

export function SiteFooter({ locale, messages }: SiteFooterProps) {
  const name = getDisplayName(locale);

  return (
    <footer className="mt-auto border-t border-neutral-200 bg-white">
      <div className="mx-auto px-6 py-8 text-sm text-neutral-500 sm:px-8 lg:px-10">
        <p>
          © {new Date().getFullYear()} {name}. {messages.ui.rights}
        </p>
      </div>
    </footer>
  );
}
