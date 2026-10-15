import type { Locale } from "./useLocale";

/**
 * İletişim penceresinin yanındaki "Hangi sektördensiniz?" paneli (3 dil). Seçilen sektör e-postaya "Sektör" satırı olarak eklenir.
 * Gruplar Ekado'nun hedef kitlesine göre (Odoo'nun sektör listesinden esinlenildi, 2026-10-15).
 */
export type BranchText = {
  title: string;
  lead: string;
  selected: string;
  clear: string;
  skip: string;
  groups: { name: string; items: string[] }[];
  /** 2. yüz: ilgilenilen modüller (birden fazla) */
  modTitle: string;
  modLead: string;
  modSelected: string;
  change: string;
  areas: { name: string; items: string[] }[];
  wishBtn: string;
  wishLabel: string;
  wishPh: string;
  next: string;
};

const tr: BranchText = {
  title: "Hangi sektördensiniz?",
  lead: "Seçerseniz demoyu ve programı sizin işinize göre hazırlarız.",
  selected: "Sektör",
  clear: "Seçimi kaldır",
  skip: "Seçmeden devam et",
  modTitle: "Hangi bölümlerle ilgileniyorsunuz?",
  modLead: "Birden fazla seçebilirsiniz. Demoyu bunlara göre hazırlarız.",
  modSelected: "Bölümler",
  change: "Sektörü değiştir",
  areas: [
    { name: "Genel Bakış ve İşletme", items: ["Genel Bakış", "Vardiya Planı", "Stempeluhr", "Görevler & Hijyen", "Duyuru Panosu", "Saha işleri", "Vitrin", "Sadakat kartı", "Web sitesi"] },
    { name: "Satın Alma ve Faturalar", items: ["Siparişler", "Depo", "Tedarikçiler", "Gelen faturalar", "Sabit giderler"] },
    { name: "Personel ve Bordro", items: ["Çalışanlar", "İzin ve devamsızlık", "Zaman hesapları", "İşe alış", "Personel dosyaları", "Maaş ve bordro"] },
    { name: "Finans ve Muhasebe", items: ["Kasa", "Banka", "Belgeler", "Ay kapanışı", "Yevmiye ve KDV", "Lohnausweis", "Mali müşavir"] },
  ],
  wishBtn: "Bizde olmayan bir modül istiyorum",
  wishLabel: "Yeni modül isteği",
  wishPh: "Hangi modül eksik? Kısaca anlatın…",
  next: "Devam",
  groups: [
    { name: "Yeme içme ve konaklama", items: ["Restoran", "Kafe", "Bar ve meyhane", "Fırın ve pastane", "Take-away ve büfe", "Catering", "Otel ve pansiyon"] },
    { name: "Ticaret", items: ["Gıda dükkânı", "Kiosk", "Butik", "Çiçekçi", "İçecek toptancısı", "Kasap"] },
    { name: "Zanaat ve inşaat", items: ["Elektrikçi", "Tesisat ve ısıtma", "Boyacı", "Marangoz", "Bahçe işleri", "Temizlik"] },
    { name: "Hizmet", items: ["Kuaför ve güzellik", "Spor salonu", "Muayenehane ve terapi", "Oto tamir", "Büro ve müşavirlik", "Nakliye ve kurye"] },
    { name: "Diğer", items: ["Dernek", "Etkinlik ve kültür", "Okul ve kurs", "Başka bir sektör"] },
  ],
};

const de: BranchText = {
  title: "Aus welcher Branche sind Sie?",
  lead: "Wenn Sie wählen, bereiten wir Demo und Programm passend zu Ihrem Betrieb vor.",
  selected: "Branche",
  clear: "Auswahl entfernen",
  skip: "Ohne Auswahl weiter",
  modTitle: "Welche Bereiche interessieren Sie?",
  modLead: "Mehrfachauswahl möglich. Wir richten die Demo danach aus.",
  modSelected: "Bereiche",
  change: "Branche ändern",
  areas: [
    { name: "Übersicht & Betrieb", items: ["Übersicht", "Schichtplan", "Stempeluhr", "Aufgaben & Hygiene", "Schwarzes Brett", "Einsätze", "Vitrine", "Treuekarte", "Webseite"] },
    { name: "Einkauf & Rechnungen", items: ["Bestellungen", "Lager", "Lieferanten", "Eingangsrechnungen", "Fixkosten"] },
    { name: "Personal & Lohn", items: ["Mitarbeiter", "Abwesenheiten", "Zeitkonten", "Onboarding", "Personalakten", "Lohn & Abrechnung"] },
    { name: "Finanzen & Buchhaltung", items: ["Kasse", "Bank", "Belege", "Monatsabschluss", "Journal & MWST", "Lohnausweis", "Treuhand"] },
  ],
  wishBtn: "Ich wünsche ein Modul, das es noch nicht gibt",
  wishLabel: "Wunschmodul",
  wishPh: "Welches Modul fehlt? Kurz beschreiben…",
  next: "Weiter",
  groups: [
    { name: "Gastronomie & Hotellerie", items: ["Restaurant", "Café", "Bar & Beiz", "Bäckerei & Konditorei", "Take-away & Imbiss", "Catering", "Hotel & Pension"] },
    { name: "Handel", items: ["Lebensmittelladen", "Kiosk", "Boutique", "Blumenladen", "Getränkehandel", "Metzgerei"] },
    { name: "Handwerk & Bau", items: ["Elektriker", "Sanitär & Heizung", "Maler", "Schreiner", "Gartenbau", "Reinigung"] },
    { name: "Dienstleistung", items: ["Coiffeur & Kosmetik", "Fitnessstudio", "Praxis & Therapie", "Autogarage", "Büro & Treuhand", "Transport & Kurier"] },
    { name: "Sonstiges", items: ["Verein", "Event & Kultur", "Schule & Kurse", "Andere Branche"] },
  ],
};

const en: BranchText = {
  title: "Which industry are you in?",
  lead: "If you choose, we prepare the demo and the program for your business.",
  selected: "Industry",
  clear: "Clear selection",
  skip: "Continue without choosing",
  modTitle: "Which areas interest you?",
  modLead: "Pick as many as you like. We tailor the demo to them.",
  modSelected: "Areas",
  change: "Change industry",
  areas: [
    { name: "Overview & Operations", items: ["Overview", "Shift plan", "Time clock", "Tasks & hygiene", "Notice board", "Field jobs", "Display case", "Loyalty card", "Website"] },
    { name: "Purchasing & Invoices", items: ["Orders", "Stock", "Suppliers", "Incoming invoices", "Fixed costs"] },
    { name: "Staff & Payroll", items: ["Employees", "Absences", "Time accounts", "Onboarding", "Personnel files", "Pay & payslips"] },
    { name: "Finance & Accounting", items: ["Till", "Bank", "Documents", "Month-end close", "Journal & VAT", "Salary certificate", "Accountant"] },
  ],
  wishBtn: "I’d like a module you don’t have yet",
  wishLabel: "Module request",
  wishPh: "Which module is missing? Describe it briefly…",
  next: "Continue",
  groups: [
    { name: "Food & hospitality", items: ["Restaurant", "Café", "Bar & pub", "Bakery & patisserie", "Take-away & snack bar", "Catering", "Hotel & guesthouse"] },
    { name: "Retail", items: ["Grocery store", "Kiosk", "Boutique", "Florist", "Drinks wholesale", "Butcher"] },
    { name: "Trades & construction", items: ["Electrician", "Plumbing & heating", "Painter", "Carpenter", "Gardening", "Cleaning"] },
    { name: "Services", items: ["Hairdresser & beauty", "Gym", "Practice & therapy", "Car garage", "Office & accounting", "Transport & courier"] },
    { name: "Other", items: ["Association", "Events & culture", "School & courses", "Another industry"] },
  ],
};

export const branches: Record<Locale, BranchText> = { tr, de, en };
