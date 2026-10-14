import type { Metadata } from "next";
import { LegalPage } from "@/components/sites/era/LegalPage";

export const metadata: Metadata = { title: "Impressum | Ekado WorkSuite" };

export default function ImpressumPage() {
  return <LegalPage kind="imprint" />;
}
