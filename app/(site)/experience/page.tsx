import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { internships } from "@/lib/profile";
import { serifClass } from "@/lib/site-nav";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Jay Lai — Jingtian & Gongcheng (30+ HK IPOs) and Dentons Nanning internships.",
};

export default function ExperiencePage() {
  return (
    <>
      <PageHero
        eyebrow="Experience · 经历"
        title="Internships"
        description="竞天公诚证券业务部 · 大成（南宁）资本市场组 — details from résumé, without client-confidential information."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
          <ol className="relative border-l border-neutral-200 pl-8 sm:pl-10">
            {internships.map((item) => (
              <li
                key={item.firmZh}
                className="relative pb-16 last:pb-0"
              >
                <span
                  className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-[#0c2340]"
                  aria-hidden
                />
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                  {item.period}
                  <span className={`${serifClass} ml-3 normal-case tracking-normal text-neutral-400`}>
                    {item.periodZh}
                  </span>
                </p>
                <h2
                  className={`${serifClass} mt-3 text-xl font-semibold text-neutral-950 sm:text-2xl`}
                >
                  {item.firmZh}
                </h2>
                <p className="mt-1 text-sm font-medium text-[#0c2340]">
                  {item.firmEn}
                </p>
                <p className="mt-2 text-sm text-neutral-600">
                  {item.roleZh} · {item.roleEn}
                </p>
                <ul className="mt-6 list-disc space-y-2 pl-5 text-sm leading-relaxed text-neutral-700">
                  {item.highlightsEn.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
                <ul
                  className={`${serifClass} mt-6 list-none space-y-2 border-t border-neutral-100 pt-6 text-sm leading-relaxed text-neutral-600`}
                >
                  {item.highlightsZh.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
