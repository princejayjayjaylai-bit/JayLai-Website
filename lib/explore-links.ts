import { profile } from "@/lib/profile";

export const exploreLinks = [
  {
    href: "/about",
    title: "About",
    titleZh: "个人介绍",
    detailEn: `Background, education (GPA ${profile.education.gpa}), and orientation.`,
    detailZh: "背景、教育（含 GPA）与职业方向。",
  },
  {
    href: "/experience",
    title: "Experience",
    titleZh: "实习经历",
    detailEn: "Jingtian & Gongcheng (30+ HK IPOs) · Dentons Nanning.",
    detailZh: "竞天公诚（30 余个港股 IPO）· 大成（南宁）。",
  },
  {
    href: "/projects",
    title: "Projects",
    titleZh: "项目与研究",
    detailEn: "IPO, PE/VC, academic work, and other projects.",
    detailZh: "IPO、PE/VC、学术及其他项目。",
  },
  {
    href: "/cv",
    title: "CV",
    titleZh: "简历",
    detailEn: "Full résumé PDF.",
    detailZh: "完整简历 PDF（中文）。",
  },
  {
    href: "/contact",
    title: "Contact",
    titleZh: "联系方式",
    detailEn: `${profile.contact.email} · ${profile.contact.phoneDisplay}`,
    detailZh: `${profile.contact.email} · ${profile.contact.phoneDisplay}`,
  },
] as const;
