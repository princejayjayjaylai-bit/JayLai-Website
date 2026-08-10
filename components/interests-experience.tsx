"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type TouchEvent as ReactTouchEvent,
  type WheelEvent as ReactWheelEvent,
} from "react";
import type { InterestThemeId } from "@/lib/interests-data";

export type InterestThemeView = {
  id: InterestThemeId;
  title: string;
  description: string;
  photos: string[];
  wheelIcon: string;
};

type InterestsExperienceProps = {
  themes: InterestThemeView[];
  wheelHint: string;
  themePrevLabel: string;
  themeNextLabel: string;
};

const DRAG_THRESHOLD_PX = 72;
const WHEEL_ACCUM_THRESHOLD = 140;
const THEME_SWITCH_COOLDOWN_MS = 480;
const THEME_NAV_BTN_PX = 48;
const THEME_WHEEL_ICON_PX = 60;
const THEME_NAV_GAP_PX = 14;

function themeNavOffsets() {
  const halfBtn = THEME_NAV_BTN_PX / 2;
  const halfIcon = THEME_WHEEL_ICON_PX / 2;
  const upY = -(halfIcon + THEME_NAV_GAP_PX + halfBtn);
  const downY = halfIcon + THEME_NAV_GAP_PX + halfBtn;
  return { upY, downY };
}
const PANEL_HEIGHT_FALLBACK = 520;
/** Inner radius as a fraction of outer — lower = smaller hole, thicker ring */
const INNER_RADIUS_RATIO = 0.34;

function themeAngleDeg(index: number, count: number) {
  return (index * 360) / count;
}

function fullRingPath(cx: number, cy: number, outerR: number, innerR: number) {
  return [
    `M ${cx} ${cy - outerR}`,
    `A ${outerR} ${outerR} 0 1 1 ${cx - 0.001} ${cy - outerR}`,
    `M ${cx} ${cy - innerR}`,
    `A ${innerR} ${innerR} 0 1 0 ${cx + 0.001} ${cy - innerR}`,
    `Z`,
  ].join(" ");
}

function wheelMetrics(height: number) {
  const size = Math.max(height, 280);
  const outerR = size / 2 - 6;
  const innerR = outerR * INNER_RADIUS_RATIO;
  const labelRadius = (outerR + innerR) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const visibleWidth = size / 2;
  return { size, visibleWidth, outerR, innerR, labelRadius, cx, cy };
}

function ThemeNavChevron({
  direction,
  size = 22,
}: {
  direction: "up" | "down";
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {direction === "up" ? (
        <path d="M18 15l-6-6-6 6" />
      ) : (
        <path d="M6 9l6 6 6-6" />
      )}
    </svg>
  );
}

function PlaceholderSlide({
  themeTitle,
  index,
}: {
  themeTitle: string;
  index: number;
}) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-[linear-gradient(145deg,#e8eef5_0%,#d4dce8_100%)] px-3 text-center">
      <p className="text-[10px] font-medium uppercase tracking-widest text-[#0c2340]/50">
        {themeTitle}
      </p>
      <p className="mt-2 text-sm font-semibold text-[#0c2340]/70">{index + 1}/5</p>
    </div>
  );
}

function PhotoSlide({
  src,
  themeTitle,
  index,
}: {
  src: string;
  themeTitle: string;
  index: number;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <PlaceholderSlide themeTitle={themeTitle} index={index} />;
  }

  return (
    <Image
      src={src}
      alt=""
      fill
      className="object-cover"
      sizes="160px"
      onError={() => setFailed(true)}
    />
  );
}

export function InterestsExperience({
  themes,
  wheelHint,
  themePrevLabel,
  themeNextLabel,
}: InterestsExperienceProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [photoIndex, setPhotoIndex] = useState(0);
  const dragStartY = useRef<number | null>(null);
  const dragStartX = useRef<number | null>(null);
  const wheelAccumRef = useRef(0);
  const wheelResetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastThemeSwitchAtRef = useRef(0);
  const photoScrollerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [panelHeight, setPanelHeight] = useState(PANEL_HEIGHT_FALLBACK);
  const [narrowLayout, setNarrowLayout] = useState(false);

  const isPhotoStripTarget = (target: EventTarget | null) =>
    target instanceof Element && Boolean(target.closest("[data-interest-photos]"));

  const active = themes[activeIndex];
  const count = themes.length;

  const applyTheme = useCallback(
    (index: number) => {
      const next = ((index % count) + count) % count;
      setActiveIndex(next);
      setPhotoIndex(0);
      if (photoScrollerRef.current) {
        photoScrollerRef.current.scrollLeft = 0;
      }
    },
    [count],
  );

  const goThemeFromGesture = useCallback(
    (index: number) => {
      const now = Date.now();
      if (now - lastThemeSwitchAtRef.current < THEME_SWITCH_COOLDOWN_MS) {
        return;
      }
      lastThemeSwitchAtRef.current = now;
      applyTheme(index);
    },
    [applyTheme],
  );

  const tryThemeStep = useCallback(
    (direction: -1 | 1) => {
      goThemeFromGesture(activeIndex + direction);
    },
    [activeIndex, goThemeFromGesture],
  );

  useEffect(() => {
    setPhotoIndex(0);
    if (photoScrollerRef.current) {
      photoScrollerRef.current.scrollLeft = 0;
    }
  }, [activeIndex]);

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;

    const update = () => {
      setPanelHeight(el.getBoundingClientRect().height);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [activeIndex, active.description]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const sync = () => setNarrowLayout(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    return () => {
      if (wheelResetTimerRef.current) {
        clearTimeout(wheelResetTimerRef.current);
      }
    };
  }, []);

  const onThemeWheel = (event: ReactWheelEvent) => {
    if (isPhotoStripTarget(event.target)) return;
    event.preventDefault();

    wheelAccumRef.current += event.deltaY;
    if (wheelResetTimerRef.current) {
      clearTimeout(wheelResetTimerRef.current);
    }
    wheelResetTimerRef.current = setTimeout(() => {
      wheelAccumRef.current = 0;
    }, 180);

    if (Math.abs(wheelAccumRef.current) < WHEEL_ACCUM_THRESHOLD) return;

    const direction = wheelAccumRef.current > 0 ? 1 : -1;
    wheelAccumRef.current = 0;
    tryThemeStep(direction);
  };

  const onThemeTouchStart = (event: ReactTouchEvent) => {
    if (isPhotoStripTarget(event.target)) return;
    dragStartY.current = event.touches[0]?.clientY ?? null;
    dragStartX.current = event.touches[0]?.clientX ?? null;
  };

  const onThemeTouchEnd = (event: ReactTouchEvent) => {
    if (isPhotoStripTarget(event.target)) return;
    const startY = dragStartY.current;
    const startX = dragStartX.current;
    const endY = event.changedTouches[0]?.clientY;
    const endX = event.changedTouches[0]?.clientX;
    dragStartY.current = null;
    dragStartX.current = null;
    if (startY == null || startX == null || endY == null || endX == null) return;

    const deltaY = endY - startY;
    const deltaX = endX - startX;
    if (Math.abs(deltaY) < DRAG_THRESHOLD_PX) return;
    if (Math.abs(deltaY) < Math.abs(deltaX) * 1.25) return;

    if (deltaY > 0) tryThemeStep(-1);
    else tryThemeStep(1);
  };

  const renderThemeRing = (height: number) => {
    const { size, visibleWidth, outerR, innerR, labelRadius, cx, cy } =
      wheelMetrics(height);
    const ringPath = fullRingPath(cx, cy, outerR, innerR);
    const wheelRotation = -themeAngleDeg(activeIndex, count);
    const { upY, downY } = themeNavOffsets();

    return (
      <div
        className="relative touch-pan-y select-none"
        style={{ width: visibleWidth, height: size }}
      >
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden
        >
          <div
            className="absolute top-0 transition-transform duration-500 ease-out"
            style={{
              width: size,
              height: size,
              left: -cx,
              transform: `rotate(${wheelRotation}deg)`,
              transformOrigin: `${cx}px ${cy}px`,
            }}
          >
            <svg
              className="h-full w-full"
              viewBox={`0 0 ${size} ${size}`}
              preserveAspectRatio="xMidYMid meet"
            >
              <path
                d={ringPath}
                fill="#eef2f7"
                fillRule="evenodd"
                stroke="#0c2340"
                strokeOpacity={0.22}
                strokeWidth={1.5}
              />
            </svg>
          </div>

          <div
            className="absolute left-0 w-[2px] bg-[#0c2340]/20"
            style={{ top: cy - innerR, height: innerR * 2 }}
          />
        </div>

        <div
          className="pointer-events-none absolute left-0 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0c2340] ring-4 ring-[#0c2340]/15"
          aria-hidden
        />

        <button
          type="button"
          onClick={() => applyTheme(activeIndex - 1)}
          aria-label={themePrevLabel}
          className="absolute z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#0c2340] shadow-sm ring-1 ring-neutral-200 transition-colors hover:bg-neutral-50"
          style={{
            left: labelRadius,
            top: cy + upY,
            transform: "translate(-50%, -50%)",
          }}
        >
          <ThemeNavChevron direction="up" />
        </button>
        <span
          key={active.id}
          className="absolute z-10 flex items-center justify-center"
          style={{
            left: labelRadius,
            top: cy,
            width: THEME_WHEEL_ICON_PX,
            height: THEME_WHEEL_ICON_PX,
            transform: "translate(-50%, -50%)",
          }}
          aria-label={active.title}
        >
          <Image
            src={active.wheelIcon}
            alt=""
            width={THEME_WHEEL_ICON_PX}
            height={THEME_WHEEL_ICON_PX}
            className="h-[3.25rem] w-[3.25rem] object-contain sm:h-[3.75rem] sm:w-[3.75rem]"
            priority
          />
        </span>
        <button
          type="button"
          onClick={() => applyTheme(activeIndex + 1)}
          aria-label={themeNextLabel}
          className="absolute z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#0c2340] shadow-sm ring-1 ring-neutral-200 transition-colors hover:bg-neutral-50"
          style={{
            left: labelRadius,
            top: cy + downY,
            transform: "translate(-50%, -50%)",
          }}
        >
          <ThemeNavChevron direction="down" />
        </button>
      </div>
    );
  };

  const ringHeight = narrowLayout
    ? Math.min(panelHeight, 320)
    : panelHeight;

  return (
    <div className="relative w-full py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-8 lg:px-10">
        <div className="flex min-w-0 flex-col items-stretch gap-6 sm:flex-row sm:items-start sm:gap-6 lg:gap-8 xl:gap-10">
          <div
            className="relative z-20 mx-auto shrink-0 self-start sm:mx-0"
            role="group"
            aria-label={wheelHint}
            onWheel={onThemeWheel}
            onTouchStart={onThemeTouchStart}
            onTouchEnd={onThemeTouchEnd}
          >
            {renderThemeRing(ringHeight)}
          </div>

          <div className="relative z-0 min-w-0 flex-1">
            <div className="relative min-h-[min(480px,72vh)] lg:min-h-[min(540px,68vh)]">
              <div
                ref={panelRef}
                className="relative min-h-[inherit] border border-neutral-300 bg-white p-5 shadow-sm sm:p-10 lg:p-12"
              >
                <p className="text-lg font-semibold uppercase tracking-[0.12em] text-[#0c2340] sm:text-xl sm:tracking-[0.14em]">
                  {active.title}
                </p>
                <p
                  className={`mt-6 max-w-3xl text-base leading-relaxed text-neutral-700 sm:mt-8 sm:text-lg sm:leading-8 ${
                    narrowLayout ? "" : "pr-[calc(min(40vw,10.5rem)+1rem)]"
                  }`}
                >
                  {active.description}
                </p>

                <div
                  className={
                    narrowLayout
                      ? "relative mt-8 w-full max-w-[10.5rem] sm:max-w-none"
                      : "absolute bottom-6 right-6 w-[min(40vw,10.5rem)] sm:bottom-8 sm:right-8"
                  }
                  data-interest-photos
                >
                  <div
                    ref={photoScrollerRef}
                    className="aspect-square w-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain border border-neutral-300 bg-neutral-50 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    onScroll={(event) => {
                      const el = event.currentTarget;
                      const width = el.clientWidth || 1;
                      setPhotoIndex(Math.round(el.scrollLeft / width));
                    }}
                  >
                    <div className="flex h-full w-full">
                      {active.photos.map((src, index) => (
                        <div
                          key={`${active.id}-${index}`}
                          className="relative h-full w-full shrink-0 snap-center"
                        >
                          <PhotoSlide
                            src={src}
                            themeTitle={active.title}
                            index={index}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-2 flex justify-center gap-1.5">
                    {active.photos.map((_, index) => (
                      <span
                        key={index}
                        className={`h-1.5 w-1.5 rounded-full transition-colors ${
                          index === photoIndex ? "bg-[#0c2340]" : "bg-neutral-300"
                        }`}
                        aria-hidden
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
