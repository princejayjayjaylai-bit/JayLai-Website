import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { getLocale } from "@/lib/i18n/get-locale";
import { localeSerifClass } from "@/lib/i18n/locale-styles";
import { getMessages } from "@/lib/i18n/messages";

export const metadata: Metadata = {
  title: "Achievements",
};

export default async function AchievementsPage() {
  const locale = await getLocale();
  const m = getMessages(locale);
  const a = m.achievements;
  const serif = localeSerifClass(locale);

  return (
    <>
      <PageHero
        eyebrow={a.heroEyebrow}
        title={a.heroTitle}
        description={a.heroDesc}
        serifClassName={serif}
      />

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
          <ul className="divide-y divide-neutral-200 border border-neutral-200">
            {a.items.map((item) => (
              <li key={item.title} className="p-8 sm:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                  {item.year}
                </p>
                <h2
                  className={`${serif} mt-3 text-xl font-semibold text-neutral-950 sm:text-2xl`}
                >
                  {item.title}
                </h2>
                {item.detail ? (
                  <p className="mt-4 max-w-3xl text-base leading-relaxed text-neutral-700">
                    {item.detail}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
