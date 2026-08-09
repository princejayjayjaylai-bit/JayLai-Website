import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getLocale } from "@/lib/i18n/get-locale";
import { getMessages } from "@/lib/i18n/messages";
import { localeFontVariables } from "@/lib/i18n/locale-styles";

export async function SiteShell({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const messages = getMessages(locale);

  return (
    <div
      className={`flex min-h-full flex-col bg-white text-neutral-950 antialiased ${localeFontVariables(locale)}`}
    >
      <SiteHeader locale={locale} messages={messages} />
      <main className="min-w-0 flex-1">{children}</main>
      <SiteFooter locale={locale} messages={messages} />
    </div>
  );
}
