import { profile } from "@/lib/profile";

export const siteNavLinks = [
  { label: "About", labelZh: "关于", href: "/about" },
  { label: "Experience", labelZh: "经历", href: "/experience" },
  { label: "Projects", labelZh: "项目", href: "/projects" },
  { label: "Achievements", labelZh: "获奖", href: "/achievements" },
  { label: "CV", labelZh: "简历", href: "/cv" },
  { label: "Contact", labelZh: "联系", href: "/contact" },
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
