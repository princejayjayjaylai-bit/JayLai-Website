import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { getLocale } from "@/lib/i18n/get-locale";
import { localeSerifClass } from "@/lib/i18n/locale-styles";
import { getMessages } from "@/lib/i18n/messages";
import {
  projectShowcaseFullBleed,
  projectShowcaseImages,
  type ProjectShowcaseId,
} from "@/lib/project-showcases";

export const metadata: Metadata = {
  title: "Projects",
};

function isProjectShowcaseId(
  value: string | undefined,
): value is ProjectShowcaseId {
  return value === "ipo" || value === "others";
}

function ProjectShowcase({ id }: { id: ProjectShowcaseId }) {
  const images = projectShowcaseImages[id];

  return (
    <div className="aspect-square w-[min(40vw,10.5rem)] shrink-0 overflow-hidden border border-neutral-300 bg-neutral-50 lg:mx-0">
      {images.length === 0 ? null : images.length === 1 ? (
        <div className="relative h-full w-full">
          <Image
            src={images[0]}
            alt=""
            fill
            className="object-cover"
            sizes="168px"
            unoptimized
          />
        </div>
      ) : (
        <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-px bg-neutral-200">
          {images.map((src) => {
            const fullBleed = projectShowcaseFullBleed.has(src);
            return (
              <div
                key={src}
                className={`relative min-h-0 min-w-0 bg-white ${fullBleed ? "p-0" : "p-1.5"}`}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  className={
                    fullBleed ? "object-cover" : "object-contain p-1"
                  }
                  sizes="84px"
                  unoptimized
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function projectHasPapers(project: {
  papers?: readonly string[];
  paperLabel?: string;
  title: string;
  description: string;
}): project is {
  papers: readonly string[];
  paperLabel: string;
  title: string;
  description: string;
} {
  return Boolean(project.paperLabel && project.papers && project.papers.length > 0);
}

function LegalResearchBody({
  project,
  englishPapers,
  wide,
}: {
  project: {
    paperLabel: string;
    papers: readonly string[];
    description: string;
  };
  englishPapers: boolean;
  wide: boolean;
}) {
  return (
    <div className={wide ? "w-full max-w-3xl" : "w-full max-w-xl"}>
      <p
        className={`mt-4 text-sm font-semibold text-neutral-600 sm:text-base ${
          englishPapers ? "uppercase tracking-[0.12em]" : "tracking-wide"
        }`}
      >
        {project.paperLabel}
      </p>
      <ul className="mt-2 space-y-1.5 text-base leading-relaxed text-neutral-800">
        {project.papers.map((paper) => (
          <li key={paper} className={englishPapers ? "italic" : ""}>
            {paper}
          </li>
        ))}
      </ul>
      <p
        className={`mt-4 text-base leading-relaxed text-neutral-700 whitespace-pre-line ${
          wide ? "max-w-3xl" : "max-w-xl"
        }`}
      >
        {project.description}
      </p>
    </div>
  );
}

export default async function ProjectsPage() {
  const locale = await getLocale();
  const m = getMessages(locale);
  const p = m.projects;
  const serif = localeSerifClass(locale);

  return (
    <>
      <PageHero title={p.heroTitle} serifClassName={serif} />

      <section className="bg-neutral-50/50">
        <div className="mx-auto max-w-6xl space-y-20 px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
          {p.groups.map((group, groupIndex) => (
            <div key={group.heading}>
              <h2
                className={`${serif} text-2xl font-semibold text-[#0c2340] sm:text-3xl`}
              >
                {group.heading}
              </h2>
              <ul className="mt-8 divide-y divide-neutral-200 border border-neutral-200 bg-white">
                {group.items.map((project) => {
                  const rawShowcase =
                    "showcase" in project ? project.showcase : undefined;
                  const showcaseId = isProjectShowcaseId(rawShowcase)
                    ? rawShowcase
                    : undefined;
                  const uniformLegalRow = groupIndex === 0;

                  return (
                    <li
                      key={project.title}
                      className={`flex items-center p-8 sm:p-10 ${
                        uniformLegalRow ? "min-h-[15.5rem] sm:min-h-[16rem]" : ""
                      }`}
                    >
                      {showcaseId ? (
                        <div className="flex w-full items-center justify-between gap-4 sm:gap-6">
                          <div className="min-w-0 flex-1">
                            <h3 className="text-lg font-semibold text-neutral-950 sm:text-xl">
                              {project.title}
                            </h3>
                            <p className="mt-4 max-w-xl text-base leading-relaxed text-neutral-700">
                              {project.description}
                            </p>
                          </div>
                          <ProjectShowcase id={showcaseId} />
                        </div>
                      ) : projectHasPapers(project) ? (
                        <div className="w-full max-w-3xl">
                          <h3 className="text-lg font-semibold text-neutral-950 sm:text-xl">
                            {project.title}
                          </h3>
                          <LegalResearchBody
                            project={project}
                            englishPapers={locale === "en"}
                            wide
                          />
                        </div>
                      ) : (
                        <div className="w-full max-w-3xl">
                          <h3 className="text-lg font-semibold text-neutral-950 sm:text-xl">
                            {project.title}
                          </h3>
                          <p className="mt-4 max-w-3xl whitespace-pre-line text-base leading-relaxed text-neutral-700">
                            {project.description}
                          </p>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-neutral-50/30">
        <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-10 lg:py-14">
          <Link href="/interests" className="group block max-w-xl">
            <p
              className={`${serif} text-lg font-semibold text-[#0c2340] group-hover:underline`}
            >
              {p.interestsLink}
            </p>
            <p className="mt-2 text-sm text-neutral-600">{p.interestsLinkDesc}</p>
          </Link>
        </div>
      </section>
    </>
  );
}
