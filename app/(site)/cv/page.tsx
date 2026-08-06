import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { CvDownloadButton, ProfilePhotoCard } from "@/components/profile-media";
import { profile } from "@/lib/profile";
import { cvPdfPath, serifClass } from "@/lib/site-nav";

export const metadata: Metadata = {
  title: "CV",
  description: "Résumé (简历) of Jay Lai — PDF download.",
};

const cvHighlights = [
  `${profile.education.schoolEn} · GPA ${profile.education.gpa}`,
  "Jingtian & Gongcheng — 30+ HKEX IPO projects (securities department, Shanghai)",
  "Dentons (Nanning) — PRC & HK IPO, M&A contracts, litigation drafting",
  "IELTS 7.5 · Mandarin, Cantonese, English",
] as const;

export default function CvPage() {
  return (
    <>
      <PageHero
        eyebrow="CV · 简历"
        title="Résumé"
        description="Curriculum vitae (中文简历) — same document as provided PDF."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,240px)_1fr] lg:gap-16">
            <ProfilePhotoCard variant="formal" />
            <div>
              <h2
                className={`${serifClass} text-2xl font-semibold text-[#0c2340] sm:text-3xl`}
              >
                简历 PDF
              </h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-700 sm:text-lg">
                Download my full CV for education, internships, project
                experience, awards, and contact details.
              </p>
              <p className={`${serifClass} mt-4 text-neutral-600`}>
                以下为简历要点；完整版请下载 PDF（与站内文件一致）。
              </p>
              <ul className="mt-8 space-y-3 text-sm leading-relaxed text-neutral-700 sm:text-base">
                {cvHighlights.map((line) => (
                  <li key={line} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-[#0c2340]" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <CvDownloadButton />
                <a
                  href={cvPdfPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center rounded-sm border border-[#0c2340] px-8 text-sm font-semibold uppercase tracking-wider text-[#0c2340] transition-colors hover:bg-[#0c2340]/5"
                >
                  Open in browser
                </a>
                <Link
                  href="/contact"
                  className="inline-flex h-12 items-center justify-center rounded-sm border border-neutral-300 px-8 text-sm font-semibold uppercase tracking-wider text-neutral-700 transition-colors hover:bg-neutral-50"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
