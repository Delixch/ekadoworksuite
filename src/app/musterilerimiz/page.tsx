import type { Metadata } from "next";
import { ConstructionPage } from "@/components/sites/era/ConstructionPage";

export const metadata: Metadata = { title: "Customers | Ekado WorkSuite" };

export default function Page() {
  return <ConstructionPage kind="clients" />;
}
