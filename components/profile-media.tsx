import Image from "next/image";
import type { Locale } from "@/lib/i18n/config";
import { getDisplayName } from "@/lib/i18n/display-name";
import { localeSerifClass } from "@/lib/i18n/locale-styles";
import { profileImages } from "@/lib/profile";
import { cvPdfPath } from "@/lib/site-nav";

type HomeHeroProps = {
  locale: Locale;
};

function HeroSilhouette({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 883 872"
      preserveAspectRatio="xMinYMax meet"
      aria-hidden
    >
      <defs>
        <filter
          id="heroSilhouetteKnockout"
          x="0"
          y="0"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feColorMatrix
            in="SourceGraphic"
            type="matrix"
            values="
              0 0 0 0 0
              0 0 0 0 0
              0 0 0 0 0
              -1 -1 -1 2 0"
            result="silhouetteAlpha"
          />
          <feColorMatrix
            in="silhouetteAlpha"
            type="matrix"
            values="
              0 0 0 0 1
              0 0 0 0 1
              0 0 0 0 1
              0 0 0 1 0"
          />
        </filter>
      </defs>
      <image
        href={profileImages.heroSilhouette}
        xlinkHref={profileImages.heroSilhouette}
        width={883}
        height={1024}
        filter="url(#heroSilhouetteKnockout)"
        opacity={0.34}
      />
    </svg>
  );
}

export function HomeHero({ locale }: HomeHeroProps) {
  const serif = localeSerifClass(locale);

  return (
    <section
      className="relative shrink-0 overflow-hidden bg-[#0c2340] text-white"
      aria-labelledby="hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.07)_0%,transparent_42%,rgba(0,0,0,0.2)_100%)]"
        aria-hidden
      />

      <div className="relative mx-auto min-h-[420px] max-w-6xl px-4 sm:min-h-[580px] sm:px-8 lg:min-h-[640px] lg:px-10">
        <div
          className="pointer-events-none absolute bottom-0 left-4 z-[1] h-[min(52vh,420px)] w-[min(70vw,360px)] max-w-[560px] sm:left-8 sm:h-[min(72vh,680px)] sm:w-[min(78vw,440px)] lg:left-10 lg:h-[min(78vh,760px)] lg:w-[min(48vw,560px)]"
          aria-hidden
        >
          <HeroSilhouette className="h-full w-full" />
        </div>

        <div className="relative z-[2] flex min-h-[420px] items-center justify-center px-2 sm:min-h-[580px] sm:justify-end sm:pr-10 lg:min-h-[640px] lg:pr-14 xl:pr-20">
          <h1
            id="hero-heading"
            className={`${serif} max-w-xl text-center text-4xl font-semibold leading-tight tracking-tight sm:text-right sm:text-5xl lg:text-6xl`}
          >
            {getDisplayName(locale)}
          </h1>
        </div>
      </div>
    </section>
  );
}

export function ProfilePhotoCard({
  variant = "headshot",
  locale = "en",
}: {
  variant?: "headshot" | "formal";
  locale?: Locale;
}) {
  const src =
    variant === "formal"
      ? profileImages.heroPortrait
      : profileImages.headshot;

  return (
    <div className="relative aspect-[3/4] w-full max-w-sm overflow-hidden border border-neutral-200 bg-neutral-100">
      <Image
        src={src}
        alt={getDisplayName(locale)}
        fill
        className="object-cover object-top"
        sizes="(max-width: 640px) 100vw, 384px"
      />
    </div>
  );
}

export function CvDownloadButton({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <a
      href={cvPdfPath}
      download
      className={`inline-flex h-12 items-center justify-center rounded-sm bg-[#0c2340] px-8 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#0a1c33] ${className}`}
    >
      {label}
    </a>
  );
}
