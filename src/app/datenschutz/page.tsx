import type { Metadata } from "next";
import { LegalPage } from "@/components/sites/era/LegalPage";

export const metadata: Metadata = { title: "Datenschutz | Punn Digital" };

export default function DatenschutzPage() {
  return <LegalPage kind="privacy" />;
}
