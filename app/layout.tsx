import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Serif_SC, Noto_Serif_TC } from "next/font/google";
import { htmlLang } from "@/lib/i18n/config";
import { getLocale } from "@/lib/i18n/get-locale";
import { localeBodyClass } from "@/lib/i18n/locale-styles";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSerifSc = Noto_Serif_SC({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-noto-serif-sc",
});

const notoSerifTc = Noto_Serif_TC({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-noto-serif-tc",
});

export const metadata: Metadata = {
  title: {
    default: "Jay Lai | 黎杰 — Law Student, Capital Markets",
    template: "%s | Jay Lai",
  },
  description:
    "Personal profile of Jay Lai, law student at East China University of Political Science and Law, with experience in Hong Kong IPO transactions and capital markets practice.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const locale = await getLocale();

  return (
    <html
      lang={htmlLang[locale]}
      className={`${geistSans.variable} ${geistMono.variable} ${notoSerifSc.variable} ${notoSerifTc.variable} ${localeBodyClass(locale)} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
