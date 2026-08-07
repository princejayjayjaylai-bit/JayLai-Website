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
    detailEn: "HK listing diligence, TPDD, printer sessions, and research.",
    detailZh: "港股尽调、TPDD、Printer Session 及研究项目。",
  },
  {
    href: "/achievements",
    title: "Achievements",
    titleZh: "获奖经历",
    detailEn: "Thesis, translation, and English competition honours.",
    detailZh: "论文、翻译与英语竞赛获奖。",
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
