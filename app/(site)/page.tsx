import Link from "next/link";
import { ExploreRibbon } from "@/components/explore-ribbon";
import { HomeHero, ProfilePhotoCard } from "@/components/profile-media";
import { getExploreRibbonItems } from "@/lib/explore-sections";
import { getLocale } from "@/lib/i18n/get-locale";
import { localeSerifClass } from "@/lib/i18n/locale-styles";
import { getMessages } from "@/lib/i18n/messages";

export default async function Home() {
  const locale = await getLocale();
  const m = getMessages(locale);
  const serif = localeSerifClass(locale);

  return (
    <>
      <HomeHero locale={locale} />

      <section className="border-b border-neutral-200 bg-neutral-50/50">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,220px)_1fr] lg:gap-14 xl:grid-cols-[minmax(0,260px)_1fr] xl:gap-16">
            <div className="mx-auto w-full max-w-[260px] lg:mx-0 lg:max-w-none">
              <ProfilePhotoCard variant="headshot" locale={locale} />
            </div>

            <div>
              <h2
                className={`${serif} text-2xl font-semibold text-[#0c2340] sm:text-3xl`}
              >
                {m.home.introduction}
              </h2>
              <p className="mt-8 text-base leading-relaxed text-neutral-700 sm:text-lg sm:leading-8">
                {m.home.intro}
              </p>
              {m.home.introFollowUpBefore ? (
                <p className="mt-6 text-base leading-relaxed text-neutral-700 sm:text-lg sm:leading-8">
                  {m.home.introFollowUpBefore}
                  <Link
                    href="/contact"
                    className="font-medium text-[#0c2340] underline decoration-[#0c2340]/30 underline-offset-4 hover:decoration-[#0c2340]"
                  >
                    {m.nav.contact}
                  </Link>
                  {m.home.introFollowUpAfter}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <ExploreRibbon
        sectionTitle={m.home.explore}
        scrollNextLabel={m.home.exploreScrollNext}
        scrollPrevLabel={m.home.exploreScrollPrev}
        titleClassName={serif}
        items={getExploreRibbonItems(m)}
      />
    </>
  );
}
