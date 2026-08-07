import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { getLocale } from "@/lib/i18n/get-locale";
import { localeSerifClass } from "@/lib/i18n/locale-styles";
import { getMessages } from "@/lib/i18n/messages";

export const metadata: Metadata = {
  title: "Experience",
};

export default async function ExperiencePage() {
  const locale = await getLocale();
  const m = getMessages(locale);
  const e = m.experience;
  const serif = localeSerifClass(locale);

  return (
    <>
      <PageHero
        eyebrow={e.heroEyebrow}
        title={e.heroTitle}
        description={e.heroDesc}
        serifClassName={serif}
      />

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
          <ol className="relative border-l border-neutral-200 pl-8 sm:pl-10">
            {e.items.map((item) => (
              <li key={item.firm} className="relative pb-16 last:pb-0">
                <span
                  className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-[#0c2340]"
                  aria-hidden
                />
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                  {item.period}
                </p>
                <h2 className={`${serif} mt-3 text-xl font-semibold text-neutral-950 sm:text-2xl`}>
                  {item.firm}
                </h2>
                <p className="mt-2 text-sm text-neutral-600">{item.role}</p>
                <ul className="mt-6 list-disc space-y-2 pl-5 text-sm leading-relaxed text-neutral-700">
                  {item.bullets.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
