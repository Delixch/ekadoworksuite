import type { Metadata } from "next";
import { tr } from "@/i18n/tr";
import { siteUrl } from "@/lib/site";
import { appFont } from "@/styles/fonts";
import { LocaleSync } from "@/components/sites/era/LocaleSync";
import { BackToTop } from "@/components/sites/era/BackToTop";
import { Robot } from "@/components/sites/era/Robot";
import { CookieNotice } from "@/components/sites/era/CookieNotice";
import { ContactModal } from "@/components/sites/era/ContactModal";
import "./globals.css";

/** Link önizlemesi (WhatsApp, LinkedIn, Facebook...). Başlık/açıklama LocaleSync'ten gelir; burada yalnızca paylaşım etiketleri. */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    siteName: "Punn Digital",
    title: tr.meta.title,
    description: tr.meta.description,
    locale: "tr_TR",
  },
  twitter: { card: "summary_large_image", title: tr.meta.title, description: tr.meta.description },
};

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
        <Robot />
        <CookieNotice />
        <ContactModal />
      </body>
    </html>
  );
}
