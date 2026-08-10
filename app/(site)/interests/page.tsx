"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useSiteLocale } from "@/components/locale-provider";
import { InterestsExperience } from "@/components/interests-experience";
import { PageHero } from "@/components/page-hero";
import {
  interestPhotoPaths,
  interestThemeIds,
  interestWheelIconPath,
} from "@/lib/interests-data";
import { localeSerifClass } from "@/lib/i18n/locale-styles";

export default function InterestsPage() {
  const { locale, messages: m } = useSiteLocale();
  const i = m.interests;
  const serif = localeSerifClass(locale);

  const themes = useMemo(
    () =>
      interestThemeIds.map((id) => ({
        id,
        title: i.themes[id].title,
        description: i.themes[id].description,
        photos: interestPhotoPaths(id),
        wheelIcon: interestWheelIconPath(id),
      })),
    [i.themes],
  );

  return (
    <>
      <PageHero title={i.heroTitle} serifClassName={serif} />

      <section className="bg-white">
        <InterestsExperience
          themes={themes}
          wheelHint={i.wheelHint}
          themePrevLabel={i.themePrev}
          themeNextLabel={i.themeNext}
        />
      </section>

      <section className="border-t border-neutral-200 bg-neutral-50/30">
        <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-10 lg:py-14">
          <Link href="/contact" className="group block max-w-xl">
            <p
              className={`${serif} text-lg font-semibold text-[#0c2340] group-hover:underline`}
            >
              {i.contactLink}
            </p>
            <p className="mt-2 text-sm text-neutral-600">{i.contactLinkDesc}</p>
          </Link>
        </div>
      </section>
    </>
  );
}
