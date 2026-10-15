import type { Metadata } from "next";
import { ModulePage } from "@/components/sites/era/modul/ModulePage";

export const metadata: Metadata = { title: "Personal & Lohn | Ekado WorkSuite" };

export default function Page() {
  return <ModulePage id="personal" />;
}
