import type { Messages } from "@/lib/i18n/messages";

export const exploreSectionKeys = [
  "about",
  "cv",
  "experience",
  "projects",
  "achievements",
  "interests",
  "contact",
] as const;

export type ExploreSectionKey = (typeof exploreSectionKeys)[number];

export const exploreSectionHrefs: Record<ExploreSectionKey, string> = {
  about: "/about",
  experience: "/experience",
  projects: "/projects",
  achievements: "/achievements",
  interests: "/interests",
  cv: "/cv",
  contact: "/contact",
};

export function getExploreRibbonItems(messages: Messages) {
  return exploreSectionKeys.map((key) => ({
    href: exploreSectionHrefs[key],
    title: messages.explore[key].title,
  }));
}
