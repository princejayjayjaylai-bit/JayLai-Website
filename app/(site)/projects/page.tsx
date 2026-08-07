import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { getLocale } from "@/lib/i18n/get-locale";
import { localeSerifClass } from "@/lib/i18n/locale-styles";
import { getMessages } from "@/lib/i18n/messages";

export const metadata: Metadata = {
  title: "Projects",
};

export default async function ProjectsPage() {
  const locale = await getLocale();
  const m = getMessages(locale);
  const p = m.projects;
  const serif = localeSerifClass(locale);

  return (
    <>
      <PageHero
        eyebrow={p.heroEyebrow}
        title={p.heroTitle}
        description={p.heroDesc}
        serifClassName={serif}
      />

      <section className="bg-neutral-50/50">
        <div className="mx-auto max-w-6xl space-y-20 px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
          {p.groups.map((group) => (
            <div key={group.heading}>
              <h2
                className={`${serif} text-2xl font-semibold text-[#0c2340] sm:text-3xl`}
              >
                {group.heading}
              </h2>
              <ul className="mt-8 divide-y divide-neutral-200 border border-neutral-200 bg-white">
                {group.items.map((project) => (
                  <li key={project.title} className="p-8 sm:p-10">
                    <h3 className="text-lg font-semibold text-neutral-950 sm:text-xl">
                      {project.title}
                    </h3>
                    <p className="mt-4 max-w-3xl text-base leading-relaxed text-neutral-700">
                      {project.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
