import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Noto_Sans_SC,
  Noto_Sans_TC,
  Noto_Serif_SC,
  Noto_Serif_TC,
} from "next/font/google";
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

const notoSansSc = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans-sc",
});

const notoSerifSc = Noto_Serif_SC({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-serif-sc",
});

const notoSansTc = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans-tc",
});

const notoSerifTc = Noto_Serif_TC({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-serif-tc",
});

export const metadata: Metadata = {
  title: {
    default: "Jay Lai | 黎杰",
    template: "%s | Jay Lai | 黎杰",
  },
  description:
    "Personal profile of Jay Lai, law student at East China University of Political Science and Law, with experience in Hong Kong IPO transactions and capital markets practice.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const,
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const locale = await getLocale();

  return (
    <html
      lang={htmlLang[locale]}
      className={`${geistSans.variable} ${geistMono.variable} ${notoSansSc.variable} ${notoSerifSc.variable} ${notoSansTc.variable} ${notoSerifTc.variable} ${localeBodyClass(locale)} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
