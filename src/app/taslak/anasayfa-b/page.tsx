import type { Metadata } from "next";
import { LandingB } from "@/components/sites/era/landing/LandingB";

/** TASLAK yeni ana sayfa B. Menüde yok, arama motorlarına kapalı. Seçilince src/app/page.tsx buna geçer. */
export const metadata: Metadata = { title: "Taslak B · Ekado WorkSuite", robots: { index: false, follow: false } };

export default function Page() {
  return <LandingB />;
}
