import type { Metadata } from "next";
import { PricingB } from "@/components/sites/era/pricing/PricingB";

/** TASLAK fiyat sayfası B (örnek fiyatlar). Menüde yok, arama motorlarına kapalı. */
export const metadata: Metadata = { title: "Taslak Preise B · Ekado WorkSuite", robots: { index: false, follow: false } };

export default function Page() {
  return <PricingB />;
}
