import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experience",
};

export default function ExperienceLayout({ children }: LayoutProps<"/experience">) {
  return children;
}
