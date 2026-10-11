import type { Metadata } from "next";
import { appFont } from "@/styles/fonts";
import "./globals.css";

// Sayfa çizilmeden önce kayıtlı ya da sistem temasını uygular (yanıp sönmeyi önler)
const themeInit = `try{var t=localStorage.getItem("theme");if(!t)t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.dataset.theme=t}catch(e){}`;

export const metadata: Metadata = {
  title: "Punn Digital | Dijital Resepsiyon",
  description:
    "Otelinizin mesaj ve aramalarını 7/24, 30’dan fazla dilde cevaplayan Dijital Resepsiyonist.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={appFont.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className="era">{children}</body>
    </html>
  );
}
