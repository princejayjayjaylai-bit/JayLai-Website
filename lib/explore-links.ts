import { profile } from "@/lib/profile";

export const exploreLinks = [
  {
    href: "/about",
    title: "About",
    titleZh: "个人介绍",
    detail: `ECUPL · GPA ${profile.education.gpa} · ${profile.languages.summaryEn.split(";")[0]}`,
  },
  {
    href: "/experience",
    title: "Experience",
    titleZh: "实习经历",
    detail: "Jingtian & Gongcheng (30+ HK IPOs) · Dentons Nanning.",
  },
  {
    href: "/projects",
    title: "Projects",
    titleZh: "项目与研究",
    detail: "HK listing diligence, TPDD, printer sessions, and thesis research.",
  },
  {
    href: "/achievements",
    title: "Achievements",
    titleZh: "获奖经历",
    detail: "Thesis, translation, and English competition honours.",
  },
  {
    href: "/cv",
    title: "CV",
    titleZh: "简历",
    detail: "Full résumé PDF (中文简历).",
  },
  {
    href: "/contact",
    title: "Contact",
    titleZh: "联系方式",
    detail: `${profile.contact.email} · ${profile.contact.phoneDisplay}`,
  },
] as const;
