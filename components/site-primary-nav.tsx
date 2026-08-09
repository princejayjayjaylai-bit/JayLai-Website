"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  exploreSectionHrefs,
  exploreSectionKeys,
  type ExploreSectionKey,
} from "@/lib/explore-sections";
import type { Messages } from "@/lib/i18n/messages";

const navKeys = exploreSectionKeys satisfies readonly ExploreSectionKey[];

type SitePrimaryNavProps = {
  messages: Messages;
};

function isNavActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SitePrimaryNav({ messages }: SitePrimaryNavProps) {
  const pathname = usePathname();

  return (
    <nav
      className="flex flex-wrap items-center justify-end gap-x-1 gap-y-2 sm:gap-x-1.5"
      aria-label="Primary"
    >
      {navKeys.map((key) => {
        const href = exploreSectionHrefs[key];
        const active = isNavActive(pathname, href);
        return (
          <Link
            key={key}
            href={href}
            className={`rounded-sm px-2 py-1 text-xs font-medium tracking-wide transition-colors sm:px-2.5 sm:py-1.5 sm:text-sm ${
              active
                ? "bg-[#0c2340] text-white"
                : "text-neutral-700 hover:bg-neutral-100 hover:text-[#0c2340]"
            }`}
            aria-current={active ? "page" : undefined}
          >
            {messages.nav[key]}
          </Link>
        );
      })}
    </nav>
  );
}
