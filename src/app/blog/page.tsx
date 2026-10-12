import type { Metadata } from "next";
import { ConstructionPage } from "@/components/sites/era/ConstructionPage";

export const metadata: Metadata = { title: "Blog | Punn Digital" };

export default function Page() {
  return <ConstructionPage kind="blog" />;
}
