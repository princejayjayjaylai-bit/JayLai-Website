import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { projectGroups } from "@/lib/profile";
import { serifClass } from "@/lib/site-nav";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "HK IPO projects and legal research by Jay Lai — diligence, TPDD, and academic work.",
};

function ProjectGroup({
  headingEn,
  headingZh,
  items,
}: {
  headingEn: string;
  headingZh: string;
  items: readonly {
    titleEn: string;
    titleZh: string;
    descriptionEn: string;
    descriptionZh: string;
  }[];
}) {
  return (
    <div>
      <h2
        className={`${serifClass} text-2xl font-semibold text-[#0c2340] sm:text-3xl`}
      >
        {headingEn}
      </h2>
      <p className={`${serifClass} mt-2 text-neutral-600`}>{headingZh}</p>
      <ul className="mt-8 divide-y divide-neutral-200 border border-neutral-200 bg-white">
        {items.map((project) => (
          <li key={project.titleEn} className="p-8 sm:p-10">
            <h3
              className={`${serifClass} text-lg font-semibold text-neutral-950 sm:text-xl`}
            >
              {project.titleEn}
            </h3>
            <p className={`${serifClass} mt-1 text-sm text-neutral-500`}>
              {project.titleZh}
            </p>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-neutral-700">
              {project.descriptionEn}
            </p>
            <p
              className={`${serifClass} mt-3 max-w-3xl text-sm leading-relaxed text-neutral-600`}
            >
              {project.descriptionZh}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Projects · 项目"
        title="Selected work"
        description="HK IPO projects and legal research drawn from internships and academic work."
      />

      <section className="bg-neutral-50/50">
        <div className="mx-auto max-w-6xl space-y-20 px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
          {projectGroups.map((group) => (
            <ProjectGroup
              key={group.headingEn}
              headingEn={group.headingEn}
              headingZh={group.headingZh}
              items={group.items}
            />
          ))}
        </div>
      </section>
    </>
  );
}
