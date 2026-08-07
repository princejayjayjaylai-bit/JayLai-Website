import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { ProfilePhotoCard } from "@/components/profile-media";
import { getLocale } from "@/lib/i18n/get-locale";
import { localeSerifClass } from "@/lib/i18n/locale-styles";
import { getMessages } from "@/lib/i18n/messages";

export const metadata: Metadata = {
  title: "About",
};

export default async function AboutPage() {
  const locale = await getLocale();
  const m = getMessages(locale);
  const a = m.about;
  const serif = localeSerifClass(locale);

  const credentials = [
    { label: a.credEducation, value: a.credEducationVal },
    { label: a.credCourses, value: a.credCoursesVal },
    { label: a.credLanguages, value: a.credLanguagesVal },
    { label: a.credTarget, value: a.credTargetVal },
  ];

  return (
    <>
      <PageHero
        eyebrow={a.heroEyebrow}
        title={a.heroTitle}
        description={a.heroDesc}
        serifClassName={serif}
      />

      <section className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,280px)_1fr] lg:gap-16">
            <ProfilePhotoCard variant="headshot" locale={locale} />
            <div>
              <h2
                className={`${serif} text-2xl font-semibold text-[#0c2340] sm:text-3xl`}
              >
                {a.biography}
              </h2>
              <div className="mt-8 space-y-6 text-base leading-relaxed text-neutral-700 sm:text-lg sm:leading-8">
                <p>{a.intro}</p>
                <p>{a.bio}</p>
                <ul className="space-y-3 text-base text-neutral-700">
                  {a.selfEval.map((line) => (
                    <li key={line} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-[#0c2340]" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-neutral-50/50">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
          <h2
            className={`${serif} text-2xl font-semibold text-[#0c2340] sm:text-3xl`}
          >
            {a.atAGlance}
          </h2>
          <dl className="mt-10 divide-y divide-neutral-200 border border-neutral-200 bg-white">
            {credentials.map((item) => (
              <div
                key={item.label}
                className="grid gap-2 px-6 py-6 sm:grid-cols-[10rem_1fr] sm:gap-8 sm:px-8"
              >
                <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                  {item.label}
                </dt>
                <dd className="text-sm leading-relaxed text-neutral-700 sm:text-base">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-neutral-50/30">
        <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-10 lg:py-14">
          <Link href="/achievements" className="group block max-w-xl">
            <p
              className={`${serif} text-lg font-semibold text-[#0c2340] group-hover:underline`}
            >
              {a.achievementsLink}
            </p>
            <p className="mt-2 text-sm text-neutral-600">
              {a.achievementsLinkDesc}
            </p>
          </Link>
        </div>
      </section>
    </>
  );
}
