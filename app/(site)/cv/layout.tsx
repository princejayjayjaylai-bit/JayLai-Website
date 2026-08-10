import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CV",
};

export default function CvLayout({ children }: LayoutProps<"/cv">) {
  return children;
}
