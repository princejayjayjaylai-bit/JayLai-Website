import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { profile } from "@/lib/profile";
import { serifClass } from "@/lib/site-nav";

export const metadata: Metadata = {
  title: "Achievements",
  description:
    "Honours and competitions — Jay Lai (黎杰), ECUPL law student.",
};

export default function AchievementsPage() {
  return (
    <>
      <PageHero
        eyebrow="Achievements · 获奖"
        title="Honours & competitions"
        description="获奖经历 — academic and competition record."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
          <ul className="divide-y divide-neutral-200 border border-neutral-200">
            {profile.achievements.map((item) => (
              <li key={item.titleEn} className="p-8 sm:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                  {item.year}
                </p>
                <h2
                  className={`${serifClass} mt-3 text-xl font-semibold text-neutral-950 sm:text-2xl`}
                >
                  {item.titleEn}
                </h2>
                <p className={`${serifClass} mt-2 text-neutral-600`}>
                  {item.titleZh}
                </p>
                {item.detailEn ? (
                  <p className="mt-4 max-w-3xl text-base leading-relaxed text-neutral-700">
                    {item.detailEn}
                  </p>
                ) : null}
                {item.detailZh ? (
                  <p
                    className={`${serifClass} mt-2 max-w-3xl text-sm leading-relaxed text-neutral-600`}
                  >
                    {item.detailZh}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
