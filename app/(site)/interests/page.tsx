import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { getLocale } from "@/lib/i18n/get-locale";
import { localeSerifClass } from "@/lib/i18n/locale-styles";
import { getMessages } from "@/lib/i18n/messages";

export const metadata: Metadata = {
  title: "Interests",
};

export default async function InterestsPage() {
  const locale = await getLocale();
  const m = getMessages(locale);
  const i = m.interests;
  const serif = localeSerifClass(locale);

  return (
    <>
      <PageHero
        eyebrow={i.heroEyebrow}
        title={i.heroTitle}
        description={i.heroDesc}
        serifClassName={serif}
      />

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 lg:px-10 lg:py-28">
          <p className="text-center text-base leading-relaxed text-neutral-500 sm:text-lg">
            {i.placeholder}
          </p>
        </div>
      </section>
    </>
  );
}
