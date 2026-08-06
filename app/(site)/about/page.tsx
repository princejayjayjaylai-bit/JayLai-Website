import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { ProfilePhotoCard } from "@/components/profile-media";
import { profile } from "@/lib/profile";
import { serifClass } from "@/lib/site-nav";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Jay Lai (黎杰) — ECUPL law student, GPA 89/100, Hong Kong IPO focus.",
};

export default function AboutPage() {
  const { education, languages, selfEvaluationEn, selfEvaluationZh } = profile;

  const credentials = [
    {
      label: "Education",
      labelZh: "教育",
      value: `${education.schoolEn} · ${education.degreeEn} (${education.period}) · GPA ${education.gpa}`,
      valueZh: `${education.schoolZh}｜${education.degreeZh}｜${education.period}`,
    },
    {
      label: "Courses",
      labelZh: "主修课程",
      value: education.coursesEn.join(", "),
      valueZh: education.coursesZh,
    },
    {
      label: "Languages",
      labelZh: "语言",
      value: languages.summaryEn,
      valueZh: languages.summaryZh,
    },
    {
      label: "Target role",
      labelZh: "求职方向",
      value: profile.targetRole,
      valueZh: profile.targetRoleZh,
    },
  ] as const;

  return (
    <>
      <PageHero
        eyebrow="About · 关于"
        title="个人介绍"
        description={`${profile.nameEn} (${profile.nameZh}) · ${education.schoolEn} · ${profile.taglineEn}`}
      />

      <section className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,280px)_1fr] lg:gap-16">
            <ProfilePhotoCard variant="headshot" />
            <div>
              <h2
                className={`${serifClass} text-2xl font-semibold text-[#0c2340] sm:text-3xl`}
              >
                Biography
              </h2>
              <p className={`${serifClass} mt-2 text-neutral-600`}>
                个人简介
              </p>
              <div className="mt-8 space-y-6 text-base leading-relaxed text-neutral-700 sm:text-lg sm:leading-8">
                <p>
                  I am {profile.nameEn} ({profile.nameZh}), an LL.B. candidate
                  at {education.schoolEn} with a GPA of {education.gpa}. My
                  practical training is concentrated in Hong Kong IPO
                  transactions—due diligence, disclosure, governance
                  documentation, and advisor coordination on live listings.
                </p>
                <p className={`${serifClass} text-neutral-600`}>
                  我就读于{education.schoolZh}，专业成绩 {education.gpa.replace(" / ", "/")}
                  ，在竞天公诚及大成（南宁）的实习中系统参与港股与 A
                  股资本市场业务及诉讼文书工作，希望长期深耕证券与香港上市领域。
                </p>
                <ul className="space-y-3 text-base text-neutral-600">
                  {selfEvaluationEn.map((line) => (
                    <li key={line} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-[#0c2340]" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
                <p className={`${serifClass} text-neutral-600`}>
                  {selfEvaluationZh}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-neutral-50/50">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
          <h2
            className={`${serifClass} text-2xl font-semibold text-[#0c2340] sm:text-3xl`}
          >
            At a glance
          </h2>
          <dl className="mt-10 divide-y divide-neutral-200 border border-neutral-200 bg-white">
            {credentials.map((item) => (
              <div
                key={item.label}
                className="grid gap-2 px-6 py-6 sm:grid-cols-[10rem_1fr] sm:gap-8 sm:px-8"
              >
                <dt>
                  <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                    {item.label}
                  </span>
                  <span
                    className={`${serifClass} mt-1 block text-sm text-neutral-400`}
                  >
                    {item.labelZh}
                  </span>
                </dt>
                <dd className="text-sm leading-relaxed text-neutral-700 sm:text-base">
                  <p>{item.value}</p>
                  {"valueZh" in item && item.valueZh ? (
                    <p className={`${serifClass} mt-2 text-neutral-600`}>
                      {item.valueZh}
                    </p>
                  ) : null}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-neutral-50/30">
        <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-10 lg:py-14">
          <Link
            href="/achievements"
            className="group inline-flex flex-col sm:flex-row sm:items-center sm:gap-4"
          >
            <span
              className={`${serifClass} text-lg font-semibold text-[#0c2340] group-hover:underline`}
            >
              Achievements · 获奖经历
            </span>
            <span className="text-sm text-neutral-600">
              View honours and competitions →
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
