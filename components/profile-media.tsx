import Image from "next/image";
import Link from "next/link";
import { profile, profileImages } from "@/lib/profile";
import { cvPdfPath, serifClass } from "@/lib/site-nav";

export function HomeHero() {
  return (
    <section
      className="relative overflow-hidden bg-[#0c2340] text-white"
      aria-labelledby="hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.06)_0%,transparent_45%,rgba(0,0,0,0.15)_100%)]"
        aria-hidden
      />
      <div className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
      <div className="mx-auto max-w-6xl px-6 py-24 sm:px-8 sm:py-32 lg:px-10 lg:py-40">
        <p className="mb-6 text-xs font-medium uppercase tracking-[0.35em] text-white/70 sm:text-sm">
          Personal Profile · 个人主页
        </p>
        <h1
          id="hero-heading"
          className={`${serifClass} max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl`}
        >
          {profile.nameEn}
          <span className="mt-2 block text-3xl font-medium text-white/90 sm:text-4xl lg:text-5xl">
            {profile.nameZh}
          </span>
        </h1>
        <div className="mt-8 h-px w-16 bg-white/40" aria-hidden />
        <p className="mt-8 max-w-xl text-lg font-light leading-relaxed text-white/90 sm:text-xl">
          {profile.taglineEn}
          <span className="mx-3 text-white/50" aria-hidden>
            |
          </span>
          {profile.taglineZh}
        </p>
        <p className="mt-4 max-w-xl text-sm text-white/75 sm:text-base">
          {profile.targetRole} · {profile.targetRoleZh}
        </p>
        <div className="mt-12 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/cv"
            className="inline-flex h-12 items-center justify-center rounded-sm bg-white px-8 text-sm font-semibold uppercase tracking-wider text-[#0c2340] transition-colors hover:bg-neutral-100"
          >
            View CV
          </Link>
          <Link
            href="/contact"
            className="inline-flex h-12 items-center justify-center rounded-sm border border-white/40 px-8 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:border-white hover:bg-white/10"
          >
            Contact
          </Link>
        </div>
      </div>
    </section>
  );
}

export function ProfilePhotoCard({
  variant = "headshot",
}: {
  variant?: "headshot" | "formal";
}) {
  const src =
    variant === "formal"
      ? profileImages.heroPortrait
      : profileImages.headshot;

  return (
    <div className="relative aspect-[3/4] w-full max-w-sm overflow-hidden border border-neutral-200 bg-neutral-100">
      <Image
        src={src}
        alt={`${profile.nameEn} photograph`}
        fill
        className="object-cover object-top"
        sizes="(max-width: 640px) 100vw, 384px"
      />
    </div>
  );
}

export function CvDownloadButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={cvPdfPath}
      download
      className={`inline-flex h-12 items-center justify-center rounded-sm bg-[#0c2340] px-8 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#0a1c33] ${className}`}
    >
      Download PDF
    </a>
  );
}
