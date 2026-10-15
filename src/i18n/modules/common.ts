import type { ModuleId } from "@/lib/module-videos";
import type { Locale } from "../useLocale";

/**
 * Modül sayfalarının (/modul/...) ortak metinleri ve tipleri.
 * Her modülün kendi metni bu klasörde ayrı dosyada (uebersicht-betrieb.ts, einkauf.ts, personal.ts, finanzen.ts).
 */

/** Bir soru ve programdan cevabı */
export type QaItem = { key: string; menu: string; question: string; answer: string; features: string[] };

export type ModuleText = {
  /** menüdeki ve sayfa altındaki kısa ad */
  title: string;
  heading: string;
  lead: string;
  /** moduleFilms sırasıyla aynı: her videonun başlığı ve kısa açıklaması */
  films: { title: string; text: string }[];
  items: QaItem[];
};

export type ModuleCommon = {
  module: string;
  ask: string;
  pictureTitle: string;
  pictureText: string;
  film: string;
  topics: string;
  watch: string;
  watchFrom: string;
  more: string;
  soon: string;
  noVideo: string;
  others: string;
  ctaHeading: string;
  ctaText: string;
  ctaButton: string;
};

export const moduleCommon: Record<Locale, ModuleCommon> = {
  tr: {
    module: "Modül",
    ask: "Sorun, gösterelim",
    pictureTitle: "Burada amaç gözünüzde bir resim oluşması",
    pictureText: "Aşağıda her bölümün ne iş yaptığını görüyorsunuz. Örneğin buzdolabı kontrolü bölümü var; işinize yaramıyorsa kaldırırız. Eksik olanı ekler, fazla olanı çıkarırız: program sizin işletmenize göre kurulur.",
    film: "Video",
    topics: "Bu videoda",
    watch: "Videoda izle",
    watchFrom: "Videoda izle · {t}",
    more: "Neler yapar",
    soon: "Video yakında",
    noVideo: "Bu konuların videosu hazırlanıyor; cevaplar programın bugünkü hâlini anlatıyor.",
    others: "Diğer modüller",
    ctaHeading: "Kendi işletmenizde görün",
    ctaText: "Kısa bir demoda bu bölümleri sizin işinize göre ayarlayıp gösterelim.",
    ctaButton: "İletişime Geç",
  },
  de: {
    module: "Modul",
    ask: "Fragen Sie, wir zeigen es",
    pictureTitle: "Hier soll ein Bild vor Ihren Augen entstehen",
    pictureText: "Unten sehen Sie, was jeder Bereich tut. Zum Beispiel gibt es die Kühlschrank-Kontrolle; brauchen Sie sie nicht, nehmen wir sie heraus. Was fehlt, kommt dazu, was zu viel ist, fällt weg: das Programm wird auf Ihren Betrieb eingerichtet.",
    film: "Video",
    topics: "In diesem Video",
    watch: "Im Video ansehen",
    watchFrom: "Im Video ansehen · {t}",
    more: "Was es kann",
    soon: "Video folgt",
    noVideo: "Das Video zu diesen Themen ist in Arbeit; die Antworten beschreiben das Programm, wie es heute ist.",
    others: "Weitere Module",
    ctaHeading: "Sehen Sie es in Ihrem Betrieb",
    ctaText: "In einer kurzen Demo richten wir diese Bereiche nach Ihrem Betrieb ein und zeigen sie Ihnen.",
    ctaButton: "Kontakt aufnehmen",
  },
  en: {
    module: "Module",
    ask: "Ask, we show you",
    pictureTitle: "The aim here is to give you a picture",
    pictureText: "Below you see what each area does. For example, there is a fridge check; if you do not need it, we take it out. What is missing gets added, what is too much gets removed: the program is set up for your business.",
    film: "Video",
    topics: "In this video",
    watch: "Watch in the video",
    watchFrom: "Watch in the video · {t}",
    more: "What it does",
    soon: "Video coming soon",
    noVideo: "The video for these topics is in the works; the answers describe the program as it is today.",
    others: "Other modules",
    ctaHeading: "See it in your business",
    ctaText: "In a short demo we set these areas up for your business and show them to you.",
    ctaButton: "Get in touch",
  },
};

/** Sayfa adresleri, menü sırasıyla */
export const moduleOrder: ModuleId[] = ["uebersicht-betrieb", "einkauf", "personal", "finanzen"];
export const moduleHref = (id: ModuleId) => `/modul/${id}`;
