"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

export type ExploreRibbonItem = {
  href: string;
  title: string;
};

type ExploreRibbonProps = {
  sectionTitle: string;
  scrollNextLabel: string;
  scrollPrevLabel: string;
  items: ExploreRibbonItem[];
  titleClassName?: string;
};

function RibbonPanel({ href, title }: ExploreRibbonItem) {
  return (
    <Link
      href={href}
      data-ribbon-panel
      className="group relative shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
    >
      <div className="relative w-[78vw] max-w-[420px] sm:w-[min(52vw,440px)] sm:max-w-[460px] lg:w-[480px] lg:max-w-[480px]">
        <div
          className="relative overflow-hidden px-10 py-16 transition-transform duration-300 ease-out group-hover:-translate-y-1 sm:px-12 sm:py-[4.5rem]"
          style={{
            background:
              "linear-gradient(145deg, #2a4a7a 0%, #0c2340 42%, #061a30 100%)",
            boxShadow:
              "0 18px 40px rgba(0, 0, 0, 0.5), 0 6px 12px rgba(0, 0, 0, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.38), inset 0 -1px 0 rgba(0, 0, 0, 0.35)",
          }}
        >
          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.42)_0%,rgba(255,255,255,0.1)_26%,transparent_52%)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-10 top-0 h-full w-28 rotate-12 bg-white/12 blur-md"
            aria-hidden
          />
          <p className="relative z-10 text-center text-xl font-semibold leading-snug tracking-wide text-white sm:text-2xl">
            {title}
          </p>
        </div>
        <div
          className="pointer-events-none relative mx-auto mt-3 h-12 w-[88%] overflow-hidden opacity-40"
          aria-hidden
        >
          <div
            className="absolute inset-x-0 top-0 h-full scale-y-[-1] px-10 py-4 text-center text-xl font-semibold text-white/90 blur-[0.5px] sm:text-2xl"
            style={{
              background:
                "linear-gradient(145deg, #2a4a7a 0%, #0c2340 42%, #061a30 100%)",
              maskImage: "linear-gradient(to bottom, black, transparent)",
              WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
            }}
          >
            {title}
          </div>
        </div>
      </div>
    </Link>
  );
}

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

function animateScrollLeft(
  el: HTMLElement,
  target: number,
  durationMs = 480,
) {
  const start = el.scrollLeft;
  const delta = target - start;
  if (Math.abs(delta) < 1) return;

  const startTime = performance.now();

  const tick = (now: number) => {
    const elapsed = now - startTime;
    const progress = Math.min(1, elapsed / durationMs);
    el.scrollLeft = start + delta * easeOutCubic(progress);
    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  };

  requestAnimationFrame(tick);
}

export function ExploreRibbon({
  sectionTitle,
  scrollNextLabel,
  scrollPrevLabel,
  items,
  titleClassName = "",
}: ExploreRibbonProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollBack, setCanScrollBack] = useState(false);
  const [canScrollForward, setCanScrollForward] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const maxScroll = Math.max(0, el.scrollWidth - el.clientWidth);
    setCanScrollBack(el.scrollLeft > 8);
    setCanScrollForward(maxScroll > 8 && el.scrollLeft < maxScroll - 8);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const runUpdate = () => {
      requestAnimationFrame(updateScrollState);
    };

    runUpdate();

    const onScroll = () => updateScrollState();
    el.addEventListener("scroll", onScroll, { passive: true });

    const ro = new ResizeObserver(runUpdate);
    ro.observe(el);
    for (const child of el.children) {
      ro.observe(child);
    }

    return () => {
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, [updateScrollState, items.length]);

  const scrollByOnePanel = (direction: "prev" | "next") => {
    const el = scrollerRef.current;
    if (!el) return;

    const panels = Array.from(
      el.querySelectorAll<HTMLElement>("[data-ribbon-panel]"),
    );
    if (panels.length === 0) return;

    const scrollLeft = el.scrollLeft;
    const anchor = scrollLeft + 12;

    let targetPanel: HTMLElement | undefined;
    if (direction === "next") {
      targetPanel = panels.find((panel) => panel.offsetLeft > anchor);
      if (!targetPanel) targetPanel = panels.at(-1);
    } else {
      targetPanel = [...panels]
        .reverse()
        .find((panel) => panel.offsetLeft < scrollLeft - 12);
      if (!targetPanel) targetPanel = panels[0];
    }

    if (!targetPanel) return;
    animateScrollLeft(el, targetPanel.offsetLeft);
  };

  return (
    <section className="relative w-full min-w-0 shrink-0 overflow-x-hidden bg-[#0a1c33] py-20 pb-16 sm:py-24 sm:pb-20">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_0%,rgba(255,255,255,0.1),transparent_50%),radial-gradient(ellipse_at_80%_100%,rgba(0,0,0,0.35),transparent_45%)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">
        <h2
          className={`text-2xl font-semibold text-white sm:text-3xl ${titleClassName}`}
        >
          {sectionTitle}
        </h2>
      </div>

      <div className="relative mt-12 min-h-[300px] w-full min-w-0 sm:min-h-[340px] lg:min-h-[360px]">
        <div
          className="pointer-events-none absolute inset-x-0 top-[18%] bottom-[28%] bg-[linear-gradient(180deg,#0c2340_0%,#061a30_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),inset_0_-24px_48px_rgba(0,0,0,0.35)]"
          aria-hidden
        />

        <div className="relative w-full min-w-0 overflow-hidden">
          <div
            ref={scrollerRef}
            className="flex w-full min-w-0 flex-nowrap touch-pan-x gap-10 overflow-x-auto overscroll-x-contain px-6 pb-10 pt-4 [-ms-overflow-style:none] [scrollbar-width:none] [scroll-behavior:auto] sm:gap-10 sm:px-8 lg:px-[max(1.5rem,calc((100vw-72rem)/2+2.5rem))] [&::-webkit-scrollbar]:hidden"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {items.map((item) => (
              <RibbonPanel key={item.href} {...item} />
            ))}
            <div className="w-4 shrink-0 sm:w-8" aria-hidden />
          </div>

          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-12 bg-gradient-to-r from-[#0a1c33] to-transparent sm:w-16"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-32 bg-gradient-to-l from-[#0a1c33] via-[#0a1c33]/85 to-transparent sm:w-40"
            aria-hidden
          />

          {canScrollBack ? (
            <button
              type="button"
              onClick={() => scrollByOnePanel("prev")}
              className="absolute left-3 top-[40%] z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-[#0a1c33]/85 text-2xl font-light text-white/90 shadow-[0_8px_24px_rgba(0,0,0,0.45)] backdrop-blur-sm transition-colors hover:border-white/45 hover:bg-[#0c2340]/95 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:left-6 sm:h-14 sm:w-14"
              aria-label={scrollPrevLabel}
            >
              ‹
            </button>
          ) : null}

          {canScrollForward ? (
            <button
              type="button"
              onClick={() => scrollByOnePanel("next")}
              className="absolute right-4 top-[40%] z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-[#0a1c33]/85 text-2xl font-light text-white/90 shadow-[0_8px_24px_rgba(0,0,0,0.45)] backdrop-blur-sm transition-colors hover:border-white/45 hover:bg-[#0c2340]/95 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:right-8 sm:h-14 sm:w-14"
              aria-label={scrollNextLabel}
            >
              ›
            </button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
