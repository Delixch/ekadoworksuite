import type { Metadata } from "next";
import { ModulePage } from "@/components/sites/era/modul/ModulePage";

export const metadata: Metadata = { title: "Finanzen & Buchhaltung | Ekado WorkSuite" };

export default function Page() {
  return <ModulePage id="finanzen" />;
}
