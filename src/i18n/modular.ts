import type { Locale } from "./useLocale";

/** "Modüler Yapı" sayfasının metinleri (3 dil). Modül adları uygulamadaki gerçek modüllerdir; "request" olanlar istek üzerine geliştirilir. */
export type ShowModule = { name: string; request?: boolean };
export type ShowBusiness = { name: string; request?: boolean; modules: ShowModule[] };

export type ModularText = {
  title: string;
  eyebrow: string;
  heading: string;
  lead: string;
  steps: string[];
  core: { name: string; items: string[] };
  goal: { label: string; text: string };
  businesses: ShowBusiness[];
  requestBadge: string;
  note: string;
  customHeading: string;
  customText: string;
  ctaTitle: string;
  ctaText: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

export const modular: Record<Locale, ModularText> = {
  tr: {
    title: "Modüler Yapı",
    eyebrow: "Modüler yapı",
    heading: "Ne iş yaparsanız yapın, biz işinize uyarız.",
    lead: "İşletmenizde nasıl çalışıyorsanız anlatın. İhtiyacınız olan modülü biz kurar, çekirdeğe takarız. Siz dert etmeyin.",
    steps: ["Çekirdek", "Branşınız", "Modülleriniz", "Ortak amaç"],
    core: { name: "Ekado WorkSuite", items: ["Personel ve zaman", "Finans ve muhasebe", "Özet ekranı"] },
    goal: { label: "Ortak amaç", text: "İşletmeniz kontrol altında" },
    businesses: [
      { name: "Restoran · Kafe", modules: [{ name: "HACCP" }, { name: "Kasa" }, { name: "Sipariş" }, { name: "Sadakat kartı" }] },
      { name: "Fırın · Pastane", modules: [{ name: "Vitrin ve fire" }, { name: "HACCP" }, { name: "Sipariş" }, { name: "Sadakat kartı" }] },
      { name: "Zanaat · Elektrik", modules: [{ name: "Saha işi", request: true }, { name: "Malzeme siparişi" }, { name: "Görevler" }] },
      { name: "Taksi", request: true, modules: [{ name: "Dispatch paneli", request: true }, { name: "Şoför vardiyası" }, { name: "Sefer kaydı", request: true }] },
    ],
    requestBadge: "Size özel",
    note: "Kesik çizgili kutular size özel yazılır. Orasını biz hallederiz, siz dert etmeyin. Modülü kapatınca verisi silinmez.",
    customHeading: "İşiniz listede yok mu? Sorun değil.",
    customText: "Kuaför, şantiye, bakım servisi, ne olursa. Böyle çalışıyoruz deyin, eksik parçayı biz yazalım. Çekirdek aynı kalır, siz işinize bakın.",
    ctaTitle: "Modüllerinizi birlikte seçelim.",
    ctaText: "Canlı demoda çekirdeği gezin, ardından işinize hangi modüllerin gerektiğini bize yazın.",
    ctaPrimary: "Demo erişimi iste",
    ctaSecondary: "İletişime Geç",
  },
  en: {
    title: "Modular Build",
    eyebrow: "Modular build",
    heading: "Whatever your business, we fit it.",
    lead: "Tell us how you work in your business. We build the module you need and plug it into the core. You do not have to worry about it.",
    steps: ["Core", "Your industry", "Your modules", "Shared goal"],
    core: { name: "Ekado WorkSuite", items: ["Staff and time", "Finance and accounting", "Overview screen"] },
    goal: { label: "Shared goal", text: "Your business under control" },
    businesses: [
      { name: "Restaurant · Café", modules: [{ name: "HACCP" }, { name: "Cash register" }, { name: "Ordering" }, { name: "Loyalty card" }] },
      { name: "Bakery · Pastry", modules: [{ name: "Display and waste" }, { name: "HACCP" }, { name: "Ordering" }, { name: "Loyalty card" }] },
      { name: "Trades · Electrician", modules: [{ name: "Field jobs", request: true }, { name: "Material orders" }, { name: "Tasks" }] },
      { name: "Taxi", request: true, modules: [{ name: "Dispatch board", request: true }, { name: "Driver shifts" }, { name: "Trip log", request: true }] },
    ],
    requestBadge: "Made for you",
    note: "Dashed boxes are written just for you. We take care of that part, you do not have to worry. Switching a module off keeps its data.",
    customHeading: "Your industry is not listed? No problem.",
    customText: "Hair salon, building site, maintenance service, anything. Tell us how you work and we write the missing piece. The core stays the same, you get on with your business.",
    ctaTitle: "Let's choose your modules together.",
    ctaText: "Explore the core in the live demo, then tell us which modules your business needs.",
    ctaPrimary: "Request demo access",
    ctaSecondary: "Get in Touch",
  },
  de: {
    title: "Modulares System",
    eyebrow: "Modulares System",
    heading: "Egal welcher Betrieb, wir passen uns an.",
    lead: "Sagen Sie uns, wie Sie in Ihrem Betrieb arbeiten. Das Modul, das Sie brauchen, bauen wir und stecken es auf den Kern. Darum müssen Sie sich nicht kümmern.",
    steps: ["Kern", "Ihre Branche", "Ihre Module", "Gemeinsames Ziel"],
    core: { name: "Ekado WorkSuite", items: ["Personal und Zeit", "Finanzen und Buchhaltung", "Übersicht"] },
    goal: { label: "Gemeinsames Ziel", text: "Ihr Betrieb im Griff" },
    businesses: [
      { name: "Restaurant · Café", modules: [{ name: "HACCP" }, { name: "Kasse" }, { name: "Bestellung" }, { name: "Treuekarte" }] },
      { name: "Bäckerei · Konditorei", modules: [{ name: "Vitrine und Schwund" }, { name: "HACCP" }, { name: "Bestellung" }, { name: "Treuekarte" }] },
      { name: "Handwerk · Elektro", modules: [{ name: "Einsätze", request: true }, { name: "Materialbestellung" }, { name: "Aufgaben" }] },
      { name: "Taxi", request: true, modules: [{ name: "Dispositions-Board", request: true }, { name: "Fahrerschichten" }, { name: "Fahrtenbuch", request: true }] },
    ],
    requestBadge: "Für Sie gebaut",
    note: "Gestrichelte Kästchen schreiben wir extra für Sie. Das übernehmen wir, Sie müssen sich nicht kümmern. Beim Ausschalten eines Moduls bleiben die Daten erhalten.",
    customHeading: "Ihre Branche fehlt in der Liste? Kein Problem.",
    customText: "Coiffeur, Baustelle, Servicedienst, was auch immer. Sagen Sie uns, wie Sie arbeiten, und wir schreiben das fehlende Stück. Der Kern bleibt gleich, Sie kümmern sich um Ihr Geschäft.",
    ctaTitle: "Wählen wir Ihre Module gemeinsam.",
    ctaText: "Erkunden Sie den Kern in der Live-Demo und sagen Sie uns dann, welche Module Ihr Betrieb braucht.",
    ctaPrimary: "Demo-Zugang anfordern",
    ctaSecondary: "Kontakt aufnehmen",
  },
};
