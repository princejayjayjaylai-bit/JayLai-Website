import Link from "next/link";
import { serifClass, siteName, siteNavLinks } from "@/lib/site-nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200/80 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-5 sm:px-8 lg:px-10">
        <Link
          href="/"
          className={`${serifClass} text-lg font-semibold tracking-wide text-[#0c2340] sm:text-xl`}
        >
          {siteName}
        </Link>
        <nav
          className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2 text-xs font-medium tracking-wide text-neutral-700 sm:gap-x-5 sm:text-sm"
          aria-label="Primary"
        >
          {siteNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-[#0c2340]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
