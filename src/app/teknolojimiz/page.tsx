import type { Metadata } from "next";
import { ConstructionPage } from "@/components/sites/era/ConstructionPage";

export const metadata: Metadata = { title: "Technology | Punn Digital" };

export default function Page() {
  return <ConstructionPage kind="tech" />;
}
