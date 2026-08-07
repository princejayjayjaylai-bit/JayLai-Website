import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { CvDownloadButton, ProfilePhotoCard } from "@/components/profile-media";
import { getLocale } from "@/lib/i18n/get-locale";
import { localeSerifClass } from "@/lib/i18n/locale-styles";
import { getMessages } from "@/lib/i18n/messages";
import { cvPdfPath } from "@/lib/site-nav";

export const metadata: Metadata = {
  title: "CV",
};

export default async function CvPage() {
  const locale = await getLocale();
  const m = getMessages(locale);
  const c = m.cv;
  const serif = localeSerifClass(locale);

  return (
    <>
      <PageHero
        eyebrow={c.heroEyebrow}
        title={c.heroTitle}
        description={c.heroDesc}
        serifClassName={serif}
      />

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,240px)_1fr] lg:gap-16">
            <ProfilePhotoCard variant="formal" locale={locale} />
            <div>
              <h2
                className={`${serif} text-2xl font-semibold text-[#0c2340] sm:text-3xl`}
              >
                {c.sectionTitle}
              </h2>
              <p className="mt-6 text-base leading-relaxed text-neutral-700 sm:text-lg">
                {c.sectionLead}
              </p>
              <ul className="mt-8 space-y-3 text-sm leading-relaxed text-neutral-700 sm:text-base">
                {c.highlights.map((line) => (
                  <li key={line} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-[#0c2340]" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <CvDownloadButton label={m.ui.downloadPdf} />
                <a
                  href={cvPdfPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center rounded-sm border border-[#0c2340] px-8 text-sm font-semibold uppercase tracking-wider text-[#0c2340] transition-colors hover:bg-[#0c2340]/5"
                >
                  {m.ui.openInBrowser}
                </a>
                <Link
                  href="/contact"
                  className="inline-flex h-12 items-center justify-center rounded-sm border border-neutral-300 px-8 text-sm font-semibold uppercase tracking-wider text-neutral-700 transition-colors hover:bg-neutral-50"
                >
                  {m.ui.contact}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
