import type { Locale } from "./useLocale";

/** "Yapım aşamasında" sayfalarının metinleri (Teknolojimiz, Müşterilerimiz, Blog). Başlıklar menüden gelir (t.nav.links). */
export type SoonKind = "tech" | "clients" | "blog";

export const soon: Record<Locale, { badge: string; back: string; demo: string; lines: Record<SoonKind, string> }> = {
  tr: {
    badge: "Yapım aşamasında",
    back: "Ana sayfa",
    demo: "Demo Talep Et",
    lines: {
      tech: "Çarklar dönüyor, bu sayfa çok yakında burada olacak.",
      clients: "Temel atıldı, katlar bir bir çıkıyor. Çok yakında burada.",
      blog: "İlk yazılar kaleme alınıyor. Çok yakında burada.",
    },
  },
  en: {
    badge: "Under construction",
    back: "Home",
    demo: "Request a Demo",
    lines: {
      tech: "The gears are turning, this page will be here very soon.",
      clients: "The foundation is laid and the floors are going up. Coming very soon.",
      blog: "The first articles are being written. Coming very soon.",
    },
  },
  de: {
    badge: "Im Aufbau",
    back: "Startseite",
    demo: "Demo anfragen",
    lines: {
      tech: "Die Zahnräder drehen sich, diese Seite ist bald da.",
      clients: "Das Fundament steht, die Stockwerke wachsen. Bald ist es so weit.",
      blog: "Die ersten Artikel werden geschrieben. Bald ist es so weit.",
    },
  },
};
