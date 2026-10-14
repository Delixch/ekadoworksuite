import type { Metadata } from "next";
import { SupportPage } from "@/components/sites/era/SupportPage";

export const metadata: Metadata = { title: "Support | Ekado WorkSuite" };

export default function Page() {
  return <SupportPage />;
}
