import type { Metadata } from "next";
import { LandingA } from "@/components/sites/era/landing/LandingA";

/** TASLAK yeni ana sayfa A. Menüde yok, arama motorlarına kapalı. Seçilince src/app/page.tsx buna geçer. */
export const metadata: Metadata = { title: "Taslak A · Ekado WorkSuite", robots: { index: false, follow: false } };

export default function Page() {
  return <LandingA />;
}
