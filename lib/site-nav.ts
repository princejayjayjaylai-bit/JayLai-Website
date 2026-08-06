import { profile } from "@/lib/profile";

export const siteNavLinks = [
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
  { label: "Achievements", href: "/achievements" },
  { label: "CV", href: "/cv" },
  { label: "Contact", href: "/contact" },
] as const;

export const siteName = "Jay Lai";
export const siteNameZh = "黎杰";
export const navy = "#0c2340";

export { profile };

export const contactEmail = profile.contact.email;
export const contactPhone = profile.contact.phoneDisplay;
export const contactPhoneHref = profile.contact.phoneHref;

export const cvPdfPath = "/cv.pdf";

export const serifClass = "font-[family-name:var(--font-noto-serif-sc)]";
