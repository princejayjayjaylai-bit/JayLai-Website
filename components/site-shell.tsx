import { LocaleProvider } from "@/components/locale-provider";
import { SiteShellInner } from "@/components/site-shell-inner";
import { getLocale } from "@/lib/i18n/get-locale";

export async function SiteShell({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();

  return (
    <LocaleProvider initialLocale={locale}>
      <SiteShellInner>{children}</SiteShellInner>
    </LocaleProvider>
  );
}
