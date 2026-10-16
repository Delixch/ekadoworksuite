import type { ModKey } from "./landing";
import type { Locale } from "./useLocale";

/**
 * FİYAT SAYFASI TASLAKLARI (A: paketler, B: kendin hesapla). Sayfalar: /taslak/preise-a, /taslak/preise-b (noindex).
 *
 * !!! BÜTÜN FİYATLAR ÖRNEKTİR, henüz belirlenmedi (Adnan 2026-10-15: "fiyat belirlenince uyduruk fiyatlar değiştirilir").
 * Gerçek fiyat gelince SADECE bu dosyanın başındaki PRICE nesnesi değişir; sayfalardaki "örnek fiyat" uyarısı da o zaman kaldırılır (sample: false).
 */
export const PRICE = {
  sample: true,
  /** yıllık ödemede kaç ay bedava */
  yearlyFreeMonths: 2,
  /** A: paket fiyatları, CHF / ay (aylık ödeme) */
  tiers: { start: 29, betrieb: 79, komplett: 129 },
  /** A: paket başına çalışan sınırı */
  tierStaff: { start: 5, betrieb: 15, komplett: 30 },
  /** B: temel paket (Genel bakış, çalışanlar ve dosyalar, giriş-çıkış ve vardiya, görevler) CHF / ay, içinde kaç çalışan */
  base: 19,
  baseStaff: 5,
  /** B: her ek çalışan CHF / ay */
  perStaff: 2,
  /** B: bölüm başına CHF / ay (temel paketteki bölümler 0) */
  mod: {
    zentrale: 0,
    personal: 0,
    stempeluhr: 0,
    aufgaben: 0,
    haccp: 9,
    bestellung: 9,
    kreditoren: 9,
    finanzen: 12,
    lohn: 12,
    fibu: 15,
    treuekarte: 5,
    vitrine: 5,
    webseite: 5,
    einsaetze: 9,
  } satisfies Record<ModKey, number>,
  /** B: hesaplayıcıda seçilemeyen, sadece "teklif üzerine" (Einsätze: müşteri isteyince yapılacak ek modül, 13.10.2026) */
  onRequest: ["einsaetze"] as ModKey[],
};

/**
 * Programdaki bağımlılıklar (Gastro apps supi: api/_lib/modules.ts → requires). Hesaplayıcı bir bölümü seçince ortaklarını da seçer,
 * ortağı kaldırınca ona bağlı olanları da kaldırır; lisans da aynı kuralla düzenlenir.
 */
export const modRequires: Partial<Record<ModKey, ModKey[]>> = {
  stempeluhr: ["personal"],
  lohn: ["personal"],
  bestellung: ["kreditoren"],
  fibu: ["kreditoren", "finanzen"],
  einsaetze: ["stempeluhr"],
};

/** B: ek bölümlerin grupları (hesaplayıcıda başlık altında) */
export type ModGroup = "personal" | "finance" | "operations" | "guests";
export const modGroups: { key: ModGroup; mods: ModKey[] }[] = [
  { key: "personal", mods: ["lohn"] },
  { key: "finance", mods: ["kreditoren", "finanzen", "fibu"] },
  { key: "operations", mods: ["haccp", "bestellung", "vitrine"] },
  { key: "guests", mods: ["treuekarte", "webseite"] },
];

export type TierKey = "start" | "betrieb" | "komplett" | "individuell";
export const tierOrder: TierKey[] = ["start", "betrieb", "komplett", "individuell"];
/** A: hangi pakette hangi bölüm var */
export const tierMods: Record<TierKey, ModKey[]> = {
  start: ["zentrale", "stempeluhr", "aufgaben", "personal"],
  betrieb: ["zentrale", "stempeluhr", "aufgaben", "personal", "lohn", "haccp", "bestellung", "kreditoren", "finanzen", "fibu", "treuekarte", "webseite"],
  komplett: ["zentrale", "stempeluhr", "aufgaben", "personal", "lohn", "haccp", "bestellung", "kreditoren", "finanzen", "fibu", "treuekarte", "webseite", "vitrine"],
  individuell: ["zentrale", "stempeluhr", "aufgaben", "personal", "lohn", "haccp", "bestellung", "kreditoren", "finanzen", "fibu", "treuekarte", "webseite", "vitrine", "einsaetze"],
};

export type PricingText = {
  title: string;
  eyebrow: string;
  heading: string;
  lead: string;
  sampleNote: string;
  monthly: string;
  yearly: string;
  yearlyGift: string;
  perMonth: string;
  billedYearly: string;
  upTo: string;
  staff: string;
  recommended: string;
  onRequest: string;
  ctaTry: string;
  ctaTalk: string;
  tiers: Record<TierKey, { name: string; text: string }>;
  allFrom: string;
  included: string;
  extrasTitle: string;
  extras: string[];
  individualExtras: string[];
  compareTitle: string;
  compareModules: string;
  /** B */
  calcTitle: string;
  calcLead: string;
  baseLabel: string;
  baseText: string;
  staffLabel: string;
  modsLabel: string;
  groups: Record<ModGroup, string>;
  /** {mods} = gerekli bölümler */
  needs: string;
  onRequestNote: string;
  included0: string;
  totalLabel: string;
  totalNote: string;
  faqTitle: string;
  faq: [string, string][];
};

const tr: PricingText = {
  title: "Fiyatlar",
  eyebrow: "Fiyatlar",
  heading: "Sadece kullandığınız kadar.",
  lead: "Her işletme farklı; program da öyle. Bölümleri ihtiyacınıza göre seçin, istediğiniz zaman değiştirin.",
  sampleNote: "Örnek fiyat ve koşullar: gerçek fiyatlar henüz belirlenmedi.",
  monthly: "Aylık",
  yearly: "Yıllık",
  yearlyGift: "2 ay hediye",
  perMonth: "/ ay",
  billedYearly: "yıllık ödemede",
  upTo: "en fazla",
  staff: "çalışan",
  recommended: "Önerilen",
  onRequest: "Teklif alın",
  ctaTry: "Hızlı Demo",
  ctaTalk: "Görüşelim",
  tiers: {
    start: { name: "Başlangıç", text: "Ekip, personel dosyaları, vardiya ve giriş-çıkış için." },
    betrieb: { name: "İşletme", text: "Restoran ve kafeler için her şey: hijyenden muhasebeye." },
    komplett: { name: "Tam", text: "Bütün bölümler, vitrin dahil." },
    individuell: { name: "Size özel", text: "Birden fazla işletme, çok çalışan ya da yeni bölümler." },
  },
  allFrom: "Bir önceki paketteki her şey, ayrıca:",
  included: "Pakette neler var",
  extrasTitle: "Her pakette",
  extras: ["Yerinde kurulum", "İlk 3 ay yerinde destek", "Veriler İsviçre’de", "5 dil", "Güncellemeler"],
  individualExtras: ["Birden fazla işletme", "Saha işleri (zanaat, servis)", "İstediğiniz yeni bölümler", "Size özel kurulum ve eğitim"],
  compareTitle: "Paketleri karşılaştırın",
  compareModules: "Bölümler",
  calcTitle: "Programınızı kendiniz hesaplayın",
  calcLead: "Temel paket her zaman var; üstüne işinize yarayan bölümleri ekleyin. Toplam anında hesaplanır.",
  baseLabel: "Temel paket",
  baseText: "Genel bakış, çalışanlar ve personel dosyaları, giriş-çıkış ve vardiya, görevler ve duyurular",
  staffLabel: "Çalışan sayısı",
  modsLabel: "Bölümler",
  groups: { personal: "Personel", finance: "Muhasebe ve finans", operations: "İşletme", guests: "Misafirler" },
  needs: "{mods} ile birlikte",
  onRequestNote: "Saha işleri (zanaat, servis): teklif üzerine.",
  included0: "dahil",
  totalLabel: "Programınız",
  totalNote: "Yerinde kurulum ve ilk 3 ay destek dahil.",
  faqTitle: "Fiyatlarla ilgili sorular",
  faq: [
    ["Bölümleri sonradan değiştirebilir miyim?", "Evet. Bir bölüm açıldığı ay ücrete eklenir, kapatıldığı ay düşer; veriler silinmez."],
    ["Kurulum ayrıca ücretli mi?", "Yerinde kurulum ve ilk üç ay destek pakete dahildir."],
    ["Sözleşme süresi var mı?", "Aylık ödemede her ay iptal edebilirsiniz; yıllık ödemede iki ay hediye."],
    ["Çalışan sayısı nasıl sayılır?", "Programa giriş yapan aktif çalışanlar sayılır; işten ayrılanlar sayılmaz."],
  ],
};

const de: PricingText = {
  title: "Preise",
  eyebrow: "Preise",
  heading: "Nur so viel, wie Sie brauchen.",
  lead: "Jeder Betrieb ist anders, das Programm auch. Wählen Sie die Bereiche nach Bedarf und ändern Sie sie jederzeit.",
  sampleNote: "Beispielpreise und -bedingungen: die echten Preise stehen noch nicht fest.",
  monthly: "Monatlich",
  yearly: "Jährlich",
  yearlyGift: "2 Monate geschenkt",
  perMonth: "/ Monat",
  billedYearly: "bei jährlicher Zahlung",
  upTo: "bis",
  staff: "Mitarbeitende",
  recommended: "Empfohlen",
  onRequest: "Auf Anfrage",
  ctaTry: "Schnell-Demo",
  ctaTalk: "Gespräch vereinbaren",
  tiers: {
    start: { name: "Start", text: "Für Team, Personalakten, Schichtplan und Stempeluhr." },
    betrieb: { name: "Betrieb", text: "Alles für Restaurant und Café: von der Hygiene bis zur Buchhaltung." },
    komplett: { name: "Komplett", text: "Alle Bereiche, inklusive Vitrine." },
    individuell: { name: "Individuell", text: "Mehrere Betriebe, viele Mitarbeitende oder neue Bereiche." },
  },
  allFrom: "Alles aus dem Paket davor, dazu:",
  included: "Im Paket enthalten",
  extrasTitle: "In jedem Paket",
  extras: ["Einrichtung vor Ort", "3 Monate Support vor Ort", "Daten in der Schweiz", "5 Sprachen", "Updates"],
  individualExtras: ["Mehrere Betriebe", "Einsätze (Handwerk, Service vor Ort)", "Neue Bereiche nach Wunsch", "Eigene Einrichtung und Schulung"],
  compareTitle: "Pakete vergleichen",
  compareModules: "Bereiche",
  calcTitle: "Berechnen Sie Ihr Programm selbst",
  calcLead: "Das Grundpaket ist immer dabei; dazu wählen Sie die Bereiche, die Sie brauchen. Die Summe rechnet sich sofort.",
  baseLabel: "Grundpaket",
  baseText: "Übersicht, Mitarbeitende & Personalakten, Stempeluhr & Schichtplan, Aufgaben & Schwarzes Brett",
  staffLabel: "Anzahl Mitarbeitende",
  modsLabel: "Bereiche",
  groups: { personal: "Personal", finance: "Buchhaltung & Finanzen", operations: "Betrieb", guests: "Gäste" },
  needs: "mit {mods}",
  onRequestNote: "Einsätze (Handwerk, Service vor Ort): auf Anfrage.",
  included0: "inklusive",
  totalLabel: "Ihr Programm",
  totalNote: "Einrichtung vor Ort und 3 Monate Support inklusive.",
  faqTitle: "Fragen zu den Preisen",
  faq: [
    ["Kann ich Bereiche später ändern?", "Ja. Ein Bereich zählt ab dem Monat, in dem er eingeschaltet wird, und fällt weg, wenn er ausgeschaltet wird; die Daten bleiben."],
    ["Kostet die Einrichtung extra?", "Einrichtung vor Ort und drei Monate Support sind im Paket enthalten."],
    ["Gibt es eine Mindestlaufzeit?", "Bei monatlicher Zahlung jeden Monat kündbar; bei jährlicher Zahlung zwei Monate geschenkt."],
    ["Wie werden Mitarbeitende gezählt?", "Gezählt werden aktive Mitarbeitende mit Zugang; Ausgetretene zählen nicht."],
  ],
};

const en: PricingText = {
  title: "Pricing",
  eyebrow: "Pricing",
  heading: "Only as much as you need.",
  lead: "Every business is different, and so is the program. Pick the areas you need and change them any time.",
  sampleNote: "Sample prices and terms: the real prices are not set yet.",
  monthly: "Monthly",
  yearly: "Yearly",
  yearlyGift: "2 months free",
  perMonth: "/ month",
  billedYearly: "billed yearly",
  upTo: "up to",
  staff: "employees",
  recommended: "Recommended",
  onRequest: "On request",
  ctaTry: "Quick Demo",
  ctaTalk: "Book a call",
  tiers: {
    start: { name: "Start", text: "For team, personnel files, shift plan and time clock." },
    betrieb: { name: "Business", text: "Everything for restaurants and cafés: from hygiene to accounting." },
    komplett: { name: "Complete", text: "All areas, including the display case." },
    individuell: { name: "Custom", text: "Several businesses, many employees or new areas." },
  },
  allFrom: "Everything in the previous plan, plus:",
  included: "Included in the plan",
  extrasTitle: "In every plan",
  extras: ["On-site setup", "3 months on-site support", "Data in Switzerland", "5 languages", "Updates"],
  individualExtras: ["Several businesses", "Field jobs (trades, on-site service)", "New areas on request", "Own setup and training"],
  compareTitle: "Compare plans",
  compareModules: "Areas",
  calcTitle: "Work out your program yourself",
  calcLead: "The base plan is always included; add the areas you need. The total updates right away.",
  baseLabel: "Base plan",
  baseText: "Overview, employees & personnel files, time clock & shifts, tasks & notice board",
  staffLabel: "Number of employees",
  modsLabel: "Areas",
  groups: { personal: "Staff", finance: "Accounting & finance", operations: "Operations", guests: "Guests" },
  needs: "with {mods}",
  onRequestNote: "Field jobs (trades, on-site service): on request.",
  included0: "included",
  totalLabel: "Your program",
  totalNote: "On-site setup and 3 months of support included.",
  faqTitle: "Questions about pricing",
  faq: [
    ["Can I change areas later?", "Yes. An area counts from the month it is switched on and drops off when it is switched off; the data stays."],
    ["Is setup charged separately?", "On-site setup and three months of support are included in the plan."],
    ["Is there a minimum term?", "Monthly payment can be cancelled every month; yearly payment gets two months free."],
    ["How are employees counted?", "Active employees with access are counted; people who have left are not."],
  ],
};

export const pricing: Record<Locale, PricingText> = { tr, de, en };
