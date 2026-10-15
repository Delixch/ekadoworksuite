import type { Metadata } from "next";
import { tr } from "@/i18n/tr";
import { siteUrl } from "@/lib/site";
import { appFont } from "@/styles/fonts";
import { LocaleSync } from "@/components/sites/era/LocaleSync";
import { BackToTop } from "@/components/sites/era/BackToTop";
import { Robot } from "@/components/sites/era/Robot";
import { CookieNotice } from "@/components/sites/era/CookieNotice";
import { ContactModal } from "@/components/sites/era/ContactModal";
import { VideoModal } from "@/components/sites/era/VideoModal";
import "./globals.css";

/** Link önizlemesi (WhatsApp, LinkedIn, Facebook...). Başlık/açıklama LocaleSync'ten gelir; burada yalnızca paylaşım etiketleri. */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    siteName: "Ekado WorkSuite",
    title: tr.meta.title,
    description: tr.meta.description,
    locale: "tr_TR",
  },
  twitter: { card: "summary_large_image", title: tr.meta.title, description: tr.meta.description },
};

// Sayfa çizilmeden önce kayıtlı ya da sistem temasını uygular (yanıp sönmeyi önler)
// Varsayılan her zaman gündüz teması (Adnan 2026-10-15); ziyaretçi ay düğmesiyle geceyi seçerse o seçim hatırlanır
const themeInit = `try{var t=localStorage.getItem("theme");if(t!=="dark")t="light";document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme="light"}`;

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
        <VideoModal />
      </body>
    </html>
  );
}
