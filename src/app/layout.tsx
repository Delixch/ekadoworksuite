import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { de } from "@/i18n/de";
import { siteUrl } from "@/lib/site";
import { appFont } from "@/styles/fonts";
import { DEFAULT_PALETTE, PALETTES } from "@/styles/palettes";
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
    title: de.meta.title,
    description: de.meta.description,
    locale: "de_CH",
    // sabit JPEG (public/og.jpg, 1200x630, ~100 KB): WhatsApp büyük önizleme göstersin diye; tasarım kaynağı public/_vorschau/og/og.html (yerel)
    images: [{ url: "/og.jpg", width: 1200, height: 630, type: "image/jpeg", alt: "Ekado WorkSuite: Personal, Betrieb und Buchhaltung in einer Software" }],
  },
  twitter: { card: "summary_large_image", title: de.meta.title, description: de.meta.description, images: ["/og.jpg"] },
};

// Sayfa çizilmeden önce kayıtlı ya da sistem temasını uygular (yanıp sönmeyi önler)
// Varsayılan her zaman gündüz teması (Adnan 2026-10-15); ziyaretçi ay düğmesiyle geceyi seçerse o seçim hatırlanır
const themeInit = `try{var t=localStorage.getItem("theme");if(t!=="dark")t="light";document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme="light"}`;
// Renk paleti: ziyaretçinin kutucuklarla seçtiği palet; yoksa html'deki varsayılan (DEFAULT_PALETTE) kalır
const paletteInit = `try{var p=localStorage.getItem("palette");if(${JSON.stringify(PALETTES)}.indexOf(p)>=0)document.documentElement.dataset.palette=p}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={appFont.variable} data-palette={DEFAULT_PALETTE} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit + paletteInit }} />
      </head>
      <body className="era">
        <LocaleSync />
        {children}
        <BackToTop />
        <Robot />
        <CookieNotice />
        <ContactModal />
        <VideoModal />
        {/* Vercel Web Analytics: çerezsiz ziyaret sayımı (çerez şeridindeki "takip çerezi yok" hâlâ doğru) */}
        <Analytics />
      </body>
    </html>
  );
}
