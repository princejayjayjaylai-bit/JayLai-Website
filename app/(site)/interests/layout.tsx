import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interests",
};

export default function InterestsLayout({ children }: LayoutProps<"/interests">) {
  return children;
}
