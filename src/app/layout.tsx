import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { site } from "@/content/site";
import "@/styles/globals.css";

// Self-hosted at build time by next/font (no layout shift, no request to Google at runtime).
const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-fraunces",
});

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: site.settings.seo.title,
  description: site.settings.seo.description,
};

export const viewport: Viewport = {
  themeColor: site.settings.themeColor,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${manrope.variable}`}>
      <body className="bg-porcelana font-sans text-cacau">{children}</body>
    </html>
  );
}
