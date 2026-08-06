import { serifClass } from "@/lib/site-nav";

type PageHeroProps = {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  large?: boolean;
};

export function PageHero({
  eyebrow,
  title,
  description,
  large = false,
}: PageHeroProps) {
  return (
    <section
      className="relative overflow-hidden bg-[#0c2340] text-white"
      aria-labelledby="page-hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.06)_0%,transparent_45%,rgba(0,0,0,0.15)_100%)]"
        aria-hidden
      />
      <div className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
      <div
        className={`mx-auto max-w-6xl px-6 sm:px-8 lg:px-10 ${
          large ? "py-24 sm:py-32 lg:py-40" : "py-16 sm:py-20 lg:py-24"
        }`}
      >
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-white/70 sm:text-sm">
          {eyebrow}
        </p>
        <h1
          id="page-hero-heading"
          className={`${serifClass} ${
            large
              ? "text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl"
              : "text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl"
          }`}
        >
          {title}
        </h1>
        {description ? (
          <>
            <div className="mt-6 h-px w-16 bg-white/40" aria-hidden />
            <p className="mt-6 max-w-2xl text-base font-light leading-relaxed text-white/90 sm:text-lg">
              {description}
            </p>
          </>
        ) : null}
      </div>
    </section>
  );
}
