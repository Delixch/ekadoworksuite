import { appFont } from "@/styles/fonts";
import { LocaleSync } from "@/components/sites/era/LocaleSync";
import { BackToTop } from "@/components/sites/era/BackToTop";
import "./globals.css";

// Sayfa çizilmeden önce kayıtlı ya da sistem temasını uygular (yanıp sönmeyi önler)
const themeInit = `try{var t=localStorage.getItem("theme");if(!t)t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={appFont.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className="era">
        <LocaleSync />
        {children}
        <BackToTop />
      </body>
    </html>
  );
}
