"use client";

import Link from "next/link";
import { useSiteLocale } from "@/components/locale-provider";
import { PageHero } from "@/components/page-hero";
import { ProfilePhotoCard } from "@/components/profile-media";
import { localeSerifClass } from "@/lib/i18n/locale-styles";

export default function AboutPage() {
  const { locale, messages: m } = useSiteLocale();
  const a = m.about;
  const serif = localeSerifClass(locale);

  const credentials = [
    { label: a.credEducation, value: a.credEducationVal },
    { label: a.credCourses, value: a.credCoursesVal },
    { label: a.credLanguages, value: a.credLanguagesVal },
    { label: a.credTarget, value: a.credTargetVal },
    { label: a.credInterests, value: a.credInterestsVal },
  ];

  return (
    <>
      <PageHero title={a.heroTitle} serifClassName={serif} />

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
                <p>
                  {a.personalBefore}
                  <Link
                    href="/interests"
                    className="font-medium text-[#0c2340] underline decoration-[#0c2340]/30 underline-offset-4 hover:decoration-[#0c2340]"
                  >
                    {m.nav.interests}
                  </Link>
                  {a.personalAfter}
                </p>
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
                className="flex flex-col gap-2 px-6 py-6 sm:flex-row sm:items-center sm:gap-8 sm:px-8"
              >
                <dt className="w-[8.75rem] shrink-0 text-sm font-bold text-[#0c2340] sm:text-base">
                  {item.label}
                </dt>
                <dd className="min-w-0 flex-1 text-sm leading-relaxed text-neutral-700 sm:text-base">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-neutral-50/30">
        <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-10 lg:py-14">
          <Link href="/cv" className="group block max-w-xl">
            <p
              className={`${serif} text-lg font-semibold text-[#0c2340] group-hover:underline`}
            >
              {a.cvLink}
            </p>
            <p className="mt-2 text-sm text-neutral-600">{a.cvLinkDesc}</p>
          </Link>
        </div>
      </section>
    </>
  );
}
