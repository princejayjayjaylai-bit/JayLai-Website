"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  exploreSectionHrefs,
  exploreSectionKeys,
  type ExploreSectionKey,
} from "@/lib/explore-sections";
import { localeNavClass } from "@/lib/i18n/locale-styles";
import type { Messages } from "@/lib/i18n/messages";
import { useSiteLocale } from "@/components/locale-provider";

const navKeys = exploreSectionKeys satisfies readonly ExploreSectionKey[];

type SitePrimaryNavProps = {
  messages: Messages;
  className?: string;
};

function isNavActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function navLinkClass(active: boolean, navFont: string) {
  return `${navFont} rounded-sm px-2 py-1 text-xs tracking-wide transition-colors sm:px-2.5 sm:py-1.5 sm:text-sm ${
    active
      ? "bg-[#0c2340] text-white"
      : "text-neutral-700 hover:bg-neutral-100 hover:text-[#0c2340]"
  }`;
}

export function SitePrimaryNav({ messages, className = "" }: SitePrimaryNavProps) {
  const pathname = usePathname();
  const { locale } = useSiteLocale();
  const navFont = localeNavClass(locale);
  const homeActive = isNavActive(pathname, "/");

  return (
    <nav
      className={`flex flex-wrap items-center justify-end gap-x-1 gap-y-2 sm:gap-x-1.5 ${className}`}
      aria-label="Primary"
    >
      <Link
        href="/"
        className={navLinkClass(homeActive, navFont)}
        aria-current={homeActive ? "page" : undefined}
      >
        {messages.nav.home}
      </Link>
      {navKeys.map((key) => {
        const href = exploreSectionHrefs[key];
        const active = isNavActive(pathname, href);
        return (
          <Link
            key={key}
            href={href}
            className={navLinkClass(active, navFont)}
            aria-current={active ? "page" : undefined}
          >
            {messages.nav[key]}
          </Link>
        );
      })}
    </nav>
  );
}
