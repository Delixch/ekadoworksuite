import type { Metadata } from "next";
import { appFont } from "@/styles/fonts";
import "./globals.css";

// Sayfa çizilmeden önce kayıtlı ya da sistem temasını uygular (yanıp sönmeyi önler)
const themeInit = `try{var t=localStorage.getItem("theme");if(!t)t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.dataset.theme=t}catch(e){}`;

export const metadata: Metadata = {
  title: "I’m Era – Voice AI Agent",
  description:
    "Intelligent Voice AI Agents that talk naturally, think intelligently, and act instantly so businesses can communicate better at scale.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={appFont.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className="era">{children}</body>
    </html>
  );
}
