"use client";

import { useSiteLocale } from "@/components/locale-provider";
import { PageHero } from "@/components/page-hero";
import { localeSerifClass } from "@/lib/i18n/locale-styles";
import {
  contactEmail,
  contactPhone,
  contactPhoneHref,
} from "@/lib/site-nav";

export default function ContactPage() {
  const { locale, messages: m } = useSiteLocale();
  const c = m.contact;
  const serif = localeSerifClass(locale);

  return (
    <>
      <PageHero title={c.heroTitle} serifClassName={serif} />

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="border border-neutral-200 bg-neutral-50/50 p-8 sm:p-10">
              <h2
                className={`${serif} text-lg font-semibold text-neutral-950 sm:text-xl`}
              >
                {c.detailsTitle}
              </h2>
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
              </dl>
            </div>

            <div className="flex items-center">
              <p className="text-base leading-relaxed text-neutral-700 sm:text-lg sm:leading-8">
                {c.asideBody}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
