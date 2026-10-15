import type { Metadata } from "next";
import { BetriebPage } from "@/components/sites/era/betrieb/BetriebPage";

/** TASLAK (5 tasarım). Menüde yok, arama motorlarına kapalı; asıl sayfa /modul/uebersicht-betrieb. Adnan "kalsın" dedi. */
export const metadata: Metadata = { title: "Taslak · Übersicht & Betrieb | Ekado WorkSuite", robots: { index: false, follow: false } };

export default function Page() {
  return <BetriebPage />;
}
