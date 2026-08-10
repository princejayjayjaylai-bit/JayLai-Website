"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useSiteLocale } from "@/components/locale-provider";
import {
  exploreSectionHrefs,
  exploreSectionKeys,
} from "@/lib/explore-sections";
import { localeNavClass } from "@/lib/i18n/locale-styles";
import type { Messages } from "@/lib/i18n/messages";

type SiteMobileMenuProps = {
  messages: Messages;
};

function isNavActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteMobileMenu({ messages }: SiteMobileMenuProps) {
  const pathname = usePathname();
  const { locale } = useSiteLocale();
  const navFont = localeNavClass(locale);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onPointerDown(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", onPointerDown);
    }
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const links = [
    { href: "/", label: messages.nav.home },
    ...exploreSectionKeys.map((key) => ({
      href: exploreSectionHrefs[key],
      label: messages.nav[key],
    })),
  ];

  return (
    <div ref={rootRef} className="relative md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-sm border border-neutral-300 text-[#0c2340] transition-colors hover:border-[#0c2340] hover:bg-neutral-50"
        aria-expanded={open}
        aria-controls="site-mobile-nav"
        aria-label={open ? "Close menu" : "Open menu"}
      >
        <span
          className={`block h-0.5 w-5 bg-current transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
        />
        <span
          className={`block h-0.5 w-5 bg-current transition-opacity ${open ? "opacity-0" : ""}`}
        />
        <span
          className={`block h-0.5 w-5 bg-current transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
        />
      </button>

      {open ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/20 md:hidden"
            aria-label="Close menu backdrop"
            onClick={() => setOpen(false)}
          />
          <div
            id="site-mobile-nav"
            className="absolute right-0 top-full z-50 mt-2 w-[min(calc(100vw-2rem),20rem)] overflow-hidden rounded-sm border border-neutral-200 bg-white py-2 shadow-lg"
          >
            <nav
              className={`flex flex-col gap-0.5 px-2 ${navFont}`}
              aria-label="Primary mobile"
            >
            {links.map(({ href, label }) => {
              const active = isNavActive(pathname, href);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`rounded-sm px-3 py-3 text-base ${
                    active
                      ? "bg-[#0c2340] text-white"
                      : "text-neutral-800 hover:bg-neutral-100"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {label}
                </Link>
              );
            })}
            </nav>
          </div>
        </>
      ) : null}
    </div>
  );
}
