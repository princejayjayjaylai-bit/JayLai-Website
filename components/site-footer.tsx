import { serifClass, siteName, siteNameZh } from "@/lib/site-nav";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 text-sm text-neutral-500 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
        <p>© {new Date().getFullYear()} {siteName}. All rights reserved.</p>
        <p className={`${serifClass} text-neutral-700`}>
          {siteName} · {siteNameZh}
        </p>
      </div>
    </footer>
  );
}
