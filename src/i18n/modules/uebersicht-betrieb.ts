import { betrieb } from "../betrieb";
import type { Locale } from "../useLocale";
import type { ModuleText, QaItem } from "./common";

/**
 * "Genel Bakış ve İşletme" modül sayfası. Soru-cevap metinleri betrieb.ts içinde (5 tasarımlı taslak da onları kullanıyor),
 * burada sadece sayfa başlığı ve video sırası. "Yeni çalışan" videosu Personel sayfasına taşındı.
 */
const anpassen: Record<Locale, QaItem> = {
  tr: {
    key: "anpassen",
    menu: "Ayarlar · Modül seçimi",
    question: "Kullanmadığım bölümleri kapatabilir miyim?",
    answer: "Evet. Ayarlar sayfasındaki modül seçiminde her bölüm açılıp kapanır; kapatılan bölüm menüden ve ana sayfadaki kartlardan kalkar. Özeti düzenle sayfasında da ana sayfanın kartlarını seçip boyutlandırırsınız: herkes kendi işine uygun ekranı kurar.",
    features: ["Her bölüm ayrı açılıp kapanır", "Kapanan bölüm menüden ve kartlardan kalkar", "Ana sayfa kartlarını seçme ve boyutlandırma", "Koyu tema ve 5 dil"],
  },
  de: {
    key: "anpassen",
    menu: "Einstellungen · Modulauswahl",
    question: "Kann ich Bereiche ausschalten, die ich nicht brauche?",
    answer: "Ja. In der Modulauswahl unter Einstellungen wird jeder Bereich ein- und ausgeschaltet; ein ausgeschalteter Bereich verschwindet aus dem Menü und von den Karten der Startseite. Unter Übersicht anpassen wählen Sie die Karten und ihre Grösse: so baut sich jeder seine Startseite.",
    features: ["Jeder Bereich einzeln ein- und ausschaltbar", "Ausgeschaltet: weg aus Menü und Karten", "Karten der Startseite wählen und vergrössern", "Dunkles Design und 5 Sprachen"],
  },
  en: {
    key: "anpassen",
    menu: "Settings · Module selection",
    question: "Can I switch off areas I do not need?",
    answer: "Yes. In the module selection under Settings each area is switched on or off; a switched-off area disappears from the menu and from the start page cards. Under Customise overview you pick the cards and their size: everyone builds the start page that suits their work.",
    features: ["Each area switched on or off separately", "Switched off: gone from menu and cards", "Pick and resize the start page cards", "Dark theme and 5 languages"],
  },
};

const head: Record<Locale, { title: string; heading: string; lead: string }> = {
  tr: {
    title: "Genel Bakış ve İşletme",
    heading: "Genel Bakış ve İşletme",
    lead: "Sabah açılıştan akşam kapanışa günün işleri: genel bakış, vardiya planı, giriş-çıkış, hijyen ve görevler, duyurular, vitrin, sadakat kartı, web sitesi ve saha işleri. İşletme sahiplerinin soruları ve programdan cevapları; yanında kısa videolar.",
  },
  de: {
    title: "Übersicht & Betrieb",
    heading: "Übersicht & Betrieb",
    lead: "Die Arbeit des Tages von der Öffnung bis zum Feierabend: Übersicht, Schichtplan, Stempeluhr, Aufgaben und Hygiene, Schwarzes Brett, Vitrine, Treuekarte, Webseite und Einsätze. Fragen von Inhabern und die Antwort aus dem Programm, dazu kurze Videos.",
  },
  en: {
    title: "Overview & Operations",
    heading: "Overview & Operations",
    lead: "The work of the day from opening to closing: overview, shift plan, time clock, tasks and hygiene, notice board, display case, loyalty card, website and field jobs. Questions from owners answered from the program, with short videos.",
  },
};

/** betrieb.ts qa.films sırası: 0 Genel Bakış, 1 Yeni çalışan (Personel'e taşındı), 2 Vardiya, 3 İş günü, 4 Günlük işler, 5 Diğer, 6 Saha işleri */
const filmIndex = [0, 2, 3, 4, 5, 6];

const build = (l: Locale): ModuleText => ({
  ...head[l],
  films: filmIndex.map((i) => betrieb[l].qa.films[i]),
  items: [...betrieb[l].items, anpassen[l]],
});

export const uebersichtBetrieb: Record<Locale, ModuleText> = { tr: build("tr"), de: build("de"), en: build("en") };
