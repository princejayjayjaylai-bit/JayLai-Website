import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { getLocale } from "@/lib/i18n/get-locale";
import { localeSerifClass } from "@/lib/i18n/locale-styles";
import { getMessages } from "@/lib/i18n/messages";
import {
  contactEmail,
  contactPhone,
  contactPhoneHref,
  cvPdfPath,
} from "@/lib/site-nav";

export const metadata: Metadata = {
  title: "Contact",
};

export default async function ContactPage() {
  const locale = await getLocale();
  const m = getMessages(locale);
  const c = m.contact;
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
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2
                className={`${serif} text-2xl font-semibold text-[#0c2340] sm:text-3xl`}
              >
                {c.directTitle}
              </h2>
              <p className="mt-6 text-base leading-relaxed text-neutral-700 sm:text-lg">
                {c.directBody}
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href={`mailto:${contactEmail}`}
                  className="inline-flex h-12 items-center justify-center rounded-sm bg-[#0c2340] px-8 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#0a1c33]"
                >
                  {m.ui.email}
                </a>
                <a
                  href={contactPhoneHref}
                  className="inline-flex h-12 items-center justify-center rounded-sm border border-[#0c2340] px-8 text-sm font-semibold uppercase tracking-wider text-[#0c2340] transition-colors hover:bg-[#0c2340]/5"
                >
                  {m.ui.call}
                </a>
              </div>
            </div>

            <div className="border border-neutral-200 bg-neutral-50/50 p-8 sm:p-10">
              <h3
                className={`${serif} text-lg font-semibold text-neutral-950`}
              >
                {c.detailsTitle}
              </h3>
              <dl className="mt-6 space-y-6 text-sm">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                    {m.ui.email}
                  </dt>
                  <dd className="mt-2">
                    <a
                      href={`mailto:${contactEmail}`}
                      className="font-medium text-[#0c2340] underline decoration-[#0c2340]/30 underline-offset-4 hover:decoration-[#0c2340]"
                    >
                      {contactEmail}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                    {m.ui.call}
                  </dt>
                  <dd className="mt-2">
                    <a
                      href={contactPhoneHref}
                      className="font-medium text-[#0c2340] underline decoration-[#0c2340]/30 underline-offset-4 hover:decoration-[#0c2340]"
                    >
                      {contactPhone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                    {c.locationLabel}
                  </dt>
                  <dd className="mt-2 text-neutral-700">{c.location}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                    {c.cvLabel}
                  </dt>
                  <dd className="mt-2">
                    <Link
                      href={cvPdfPath}
                      className="font-medium text-[#0c2340] underline decoration-[#0c2340]/30 underline-offset-4 hover:decoration-[#0c2340]"
                    >
                      {m.ui.downloadPdf}
                    </Link>
                    <span className="mx-2 text-neutral-400">·</span>
                    <Link
                      href="/cv"
                      className="font-medium text-[#0c2340] underline decoration-[#0c2340]/30 underline-offset-4 hover:decoration-[#0c2340]"
                    >
                      {m.cv.cvPageLink}
                    </Link>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
