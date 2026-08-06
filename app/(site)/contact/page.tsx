import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { profile } from "@/lib/profile";
import {
  contactEmail,
  contactPhone,
  contactPhoneHref,
  cvPdfPath,
  serifClass,
} from "@/lib/site-nav";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact Jay Lai — ${profile.contact.email}, ${profile.contact.phoneDisplay}.`,
};

export default function ContactPage() {
  const { contact, targetRole, targetRoleZh } = profile;

  return (
    <>
      <PageHero
        eyebrow="Contact · 联系"
        title="联系方式"
        description="International law firms, legal recruiters, and professional contacts."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2
                className={`${serifClass} text-2xl font-semibold text-[#0c2340] sm:text-3xl`}
              >
                Direct inquiry
              </h2>
              <p className={`${serifClass} mt-2 text-neutral-600`}>
                欢迎来信或致电
              </p>
              <p className="mt-4 text-base leading-relaxed text-neutral-700 sm:text-lg">
                Seeking {targetRole.toLowerCase()} opportunities. Email or
                phone is best; I aim to reply within a few business days.
              </p>
              <p className={`${serifClass} mt-3 text-neutral-600`}>
                求职方向：{targetRoleZh}
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href={`mailto:${contactEmail}`}
                  className="inline-flex h-12 items-center justify-center rounded-sm bg-[#0c2340] px-8 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#0a1c33]"
                >
                  Email
                </a>
                <a
                  href={contactPhoneHref}
                  className="inline-flex h-12 items-center justify-center rounded-sm border border-[#0c2340] px-8 text-sm font-semibold uppercase tracking-wider text-[#0c2340] transition-colors hover:bg-[#0c2340]/5"
                >
                  Call
                </a>
              </div>
            </div>

            <div className="border border-neutral-200 bg-neutral-50/50 p-8 sm:p-10">
              <h3
                className={`${serifClass} text-lg font-semibold text-neutral-950`}
              >
                Details · 联系信息
              </h3>
              <dl className="mt-6 space-y-6 text-sm">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                    Email · 邮箱
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
                    Phone · 电话
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
                    Location · 所在地
                  </dt>
                  <dd className="mt-2 text-neutral-700">
                    {contact.locationEn}
                  </dd>
                  <dd className={`${serifClass} mt-1 text-neutral-600`}>
                    {contact.locationZh}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                    CV · 简历
                  </dt>
                  <dd className="mt-2">
                    <Link
                      href={cvPdfPath}
                      className="font-medium text-[#0c2340] underline decoration-[#0c2340]/30 underline-offset-4 hover:decoration-[#0c2340]"
                    >
                      Download PDF
                    </Link>
                    <span className="mx-2 text-neutral-400">·</span>
                    <Link
                      href="/cv"
                      className="font-medium text-[#0c2340] underline decoration-[#0c2340]/30 underline-offset-4 hover:decoration-[#0c2340]"
                    >
                      CV page
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
