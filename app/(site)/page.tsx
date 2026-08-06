import Link from "next/link";
import { HomeHero, ProfilePhotoCard } from "@/components/profile-media";
import { exploreLinks } from "@/lib/explore-links";
import { profile } from "@/lib/profile";
import { serifClass } from "@/lib/site-nav";

export default function Home() {
  return (
    <>
      <HomeHero />

      <section className="border-b border-neutral-200 bg-neutral-50/50">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,220px)_1fr] lg:gap-14 xl:grid-cols-[minmax(0,260px)_1fr] xl:gap-16">
            <div className="mx-auto w-full max-w-[260px] lg:mx-0 lg:max-w-none">
              <ProfilePhotoCard variant="headshot" />
              <p
                className={`${serifClass} mt-4 text-center text-sm text-neutral-600 lg:text-left`}
              >
                {profile.nameEn} · {profile.nameZh}
              </p>
              <p className="mt-1 text-center text-xs uppercase tracking-[0.15em] text-neutral-500 lg:text-left">
                {profile.education.schoolEn}
              </p>
            </div>

            <div>
              <h2
                className={`${serifClass} text-2xl font-semibold text-[#0c2340] sm:text-3xl`}
              >
                Introduction
              </h2>
              <p className={`${serifClass} mt-2 text-lg text-neutral-600`}>
                个人介绍
              </p>
              <p className="mt-4 text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
                GPA {profile.education.gpa}
              </p>

              <div className="mt-8 space-y-6 text-base leading-relaxed text-neutral-700 sm:text-lg sm:leading-8">
                <p>
                  I am a law student at {profile.education.schoolEn} (GPA{" "}
                  {profile.education.gpa}) with hands-on experience on 30+ Hong
                  Kong IPO mandates at Jingtian & Gongcheng and capital markets /
                  litigation training at Dentons (Nanning).
                </p>
                <p className={`${serifClass} text-neutral-600`}>
                  华东政法大学法学本科在读（专业成绩{" "}
                  {profile.education.gpa.replace(" / ", "/")}
                  ），于竞天公诚上海分所证券业务部参与 30
                  余个港股 IPO 尽调与合规工作，并在大成（南宁）参与 A 股/港股
                  IPO 及诉讼业务。
                </p>
                <p className="text-base text-neutral-600">
                  {profile.languages.summaryEn}
                </p>
                <div className="flex flex-col gap-4 pt-2 sm:flex-row">
                  <Link
                    href="/cv"
                    className="inline-flex h-12 items-center justify-center rounded-sm bg-[#0c2340] px-8 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#0a1c33]"
                  >
                    View CV
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex h-12 items-center justify-center rounded-sm border border-[#0c2340] px-8 text-sm font-semibold uppercase tracking-wider text-[#0c2340] transition-colors hover:bg-[#0c2340]/5"
                  >
                    Contact
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 lg:px-10 lg:py-24">
          <h2
            className={`${serifClass} text-2xl font-semibold text-[#0c2340] sm:text-3xl`}
          >
            Explore
          </h2>
          <p className={`${serifClass} mt-2 text-neutral-600`}>浏览全站</p>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {exploreLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group block h-full border border-neutral-200 bg-white p-8 transition-shadow hover:shadow-sm"
                >
                  <h3
                    className={`${serifClass} text-lg font-semibold text-neutral-950 group-hover:text-[#0c2340]`}
                  >
                    {item.title}
                  </h3>
                  <p className={`${serifClass} mt-1 text-sm text-neutral-500`}>
                    {item.titleZh}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                    {item.detail}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
