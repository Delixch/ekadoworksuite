import type { Metadata } from "next";
import { PricingA } from "@/components/sites/era/pricing/PricingA";

/** TASLAK fiyat sayfası A (örnek fiyatlar). Menüde yok, arama motorlarına kapalı. */
export const metadata: Metadata = { title: "Taslak Preise A · Ekado WorkSuite", robots: { index: false, follow: false } };

export default function Page() {
  return <PricingA />;
}
