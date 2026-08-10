"use client";

import Image from "next/image";
import Link from "next/link";
import { useSiteLocale } from "@/components/locale-provider";
import { PageHero } from "@/components/page-hero";
import {
  experienceLandmarkColumnClassName,
  experienceLandmarkLayout,
  experienceLandmarkPaths,
  experienceLandmarkSizes,
} from "@/lib/experience-landmarks";
import { localeSerifClass } from "@/lib/i18n/locale-styles";

export default function ExperiencePage() {
  const { locale, messages: m } = useSiteLocale();
  const e = m.experience;
  const serif = localeSerifClass(locale);
  const layout = experienceLandmarkLayout;

  return (
    <>
      <PageHero title={e.heroTitle} serifClassName={serif} />

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
          <ol className="space-y-16">
            {e.items.map((item, index) => {
              const isPearl = index === 0;
              const landmark = isPearl ? layout.pearl : layout.nanning;

              return (
                <li key={item.firm}>
                  <div className="flex flex-col gap-6 sm:flex-row sm:items-stretch sm:gap-10">
                    <div className="min-w-0 flex-1">
                      <h2
                        className={`${serif} text-xl font-semibold text-neutral-950 sm:text-2xl`}
                      >
                        {item.firm}
                      </h2>
                      <p className="mt-2 text-base text-neutral-600 sm:text-lg">
                        {item.role}
                      </p>
                      <p className="mt-2 text-sm text-neutral-500">
                        {item.period}
                      </p>
                    </div>
                    <div
                      className={`${experienceLandmarkColumnClassName} mx-auto sm:mx-0 ${landmark.columnClassName}`}
                    >
                      <div className={landmark.innerClassName}>
                        <Image
                          src={
                            experienceLandmarkPaths[index] ??
                            experienceLandmarkPaths[0]
                          }
                          alt=""
                          unoptimized
                          width={
                            (
                              experienceLandmarkSizes[index] ??
                              experienceLandmarkSizes[0]
                            ).width
                          }
                          height={
                            (
                              experienceLandmarkSizes[index] ??
                              experienceLandmarkSizes[0]
                            ).height
                          }
                          className={landmark.imageClassName}
                          style={
                            "imageStyle" in landmark
                              ? landmark.imageStyle
                              : { width: "auto" }
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <ul className="mt-6 space-y-3 text-sm leading-relaxed text-neutral-700 sm:text-base">
                    {item.bullets.map((highlight) => (
                      <li key={highlight} className="flex gap-3">
                        <span
                          className="mt-2 h-1.5 w-1.5 shrink-0 bg-[#0c2340]"
                          aria-hidden
                        />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ol>
          <p className="mt-12 max-w-3xl text-sm leading-relaxed text-neutral-950 sm:text-base">
            {e.hiddenInternshipsNoteBefore}
            <Link
              href="/contact"
              className="font-medium text-[#0c2340] underline decoration-[#0c2340]/30 underline-offset-4 hover:decoration-[#0c2340]"
            >
              {m.nav.contact}
            </Link>
            {e.hiddenInternshipsNoteAfter}
          </p>
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-neutral-50/30">
        <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-10 lg:py-14">
          <Link href="/projects" className="group block max-w-xl">
            <p
              className={`${serif} text-lg font-semibold text-[#0c2340] group-hover:underline`}
            >
              {e.projectsLink}
            </p>
            <p className="mt-2 text-sm text-neutral-600">{e.projectsLinkDesc}</p>
          </Link>
        </div>
      </section>
    </>
  );
}
