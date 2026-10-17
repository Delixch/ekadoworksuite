import type { Metadata } from "next";
import { SchnellDemoPage } from "@/components/sites/era/schnelldemo/SchnellDemoPage";

export const metadata: Metadata = { title: "Schnell-Demo | Ekado WorkSuite" };

export default function Page() {
  return <SchnellDemoPage />;
}
