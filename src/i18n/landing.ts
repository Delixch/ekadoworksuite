import type { Locale } from "./useLocale";

/**
 * Yeni ana sayfa TASLAKLARI (A ve B) metinleri, 3 dil. Sayfalar: /taslak/anasayfa-a, /taslak/anasayfa-b (noindex).
 * Sadece programda gerçekten olanlar yazılır: fiyat, müşteri sayısı, yorum UYDURULMAZ.
 * Paketler programın kodundaki paketlerle aynı (Gastro apps supi: api/_lib/modules.ts → PACKAGES).
 */
export type ModKey =
  | "stempeluhr"
  | "aufgaben"
  | "haccp"
  | "bestellung"
  | "kreditoren"
  | "finanzen"
  | "personal"
  | "fibu"
  | "zentrale"
  | "treuekarte"
  | "vitrine"
  | "webseite"
  | "einsaetze";

export type PackKey = "restaurant" | "baeckerei" | "handwerk" | "buero" | "alle";

/** Programdaki paketler: hangi bölüm açık gelir */
export const packages: Record<PackKey, ModKey[]> = {
  restaurant: ["stempeluhr", "aufgaben", "bestellung", "kreditoren", "finanzen", "personal", "treuekarte", "haccp", "fibu", "webseite", "zentrale"],
  baeckerei: ["stempeluhr", "aufgaben", "bestellung", "kreditoren", "finanzen", "personal", "treuekarte", "haccp", "fibu", "vitrine", "webseite", "zentrale"],
  handwerk: ["stempeluhr", "aufgaben", "kreditoren", "finanzen", "personal", "einsaetze", "zentrale"],
  buero: ["stempeluhr", "aufgaben", "kreditoren", "finanzen", "personal", "fibu", "zentrale"],
  alle: ["stempeluhr", "aufgaben", "haccp", "bestellung", "kreditoren", "finanzen", "personal", "fibu", "zentrale", "treuekarte", "vitrine", "webseite", "einsaetze"],
};
export const modOrder: ModKey[] = packages.alle;
export const packOrder: PackKey[] = ["restaurant", "baeckerei", "handwerk", "buero", "alle"];

type Card = { title: string; text: string };
export type LandingText = {
  draft: string;
  draftOther: string;
  ctaDemo: string;
  ctaVideos: string;
  a: {
    eyebrow: string;
    h1: [string, string];
    lead: string;
    trust: string[];
    modulesTitle: string;
    modulesLead: string;
    moduleCards: Card[];
    moduleMore: string;
    beforeTitle: string;
    beforeLabel: string;
    afterLabel: string;
    before: [string, string][];
    stepsTitle: string;
    steps: Card[];
    faqTitle: string;
    faq: [string, string][];
    endTitle: string;
    endText: string;
  };
  b: {
    eyebrow: string;
    h1: string;
    lead: string;
    packLabel: string;
    packs: Record<PackKey, string>;
    mods: Record<ModKey, string>;
    countOn: string;
    hint: string;
    dayTitle: string;
    day: { time: string; mod: ModKey; text: string }[];
    videoTitle: string;
    videoText: string;
    forTitle: string;
    forCards: { pack: PackKey; title: string; text: string }[];
    swissTitle: string;
    swiss: Card[];
    supportTitle: string;
    supportText: string;
    endTitle: string;
    endText: string;
  };
};

const tr: LandingText = {
  draft: "Taslak",
  draftOther: "Diğer taslak",
  ctaDemo: "Hızlı Demo",
  ctaVideos: "Videoları izle",
  a: {
    eyebrow: "İsviçreli küçük işletmeler için",
    h1: ["İşletmenizin bütün işi", "tek programda."],
    lead: "Vardiya, giriş-çıkış, hijyen, sipariş, maaş ve muhasebe. Restoran, kafe, fırın ve küçük işletmeler için; sizin işinize göre kurulur.",
    trust: ["Veriler İsviçre’de", "İnternet kesilse de çalışır", "5 dil", "İlk 3 ay yerinde destek", "L-GAV, İş Kanunu, QR fatura"],
    modulesTitle: "Dört alan, tek giriş",
    modulesLead: "Her alanın kendi sayfası var: işletme sahiplerinin soruları, programdan cevapları ve kısa videolar.",
    moduleCards: [
      { title: "Genel Bakış ve İşletme", text: "Vardiya planı, giriş-çıkış, HACCP ve görevler, duyurular, saha işleri." },
      { title: "Satın Alma ve Faturalar", text: "Tedarikçi, sipariş, teslimat kontrolü, fatura tarama, depo ve ödeme." },
      { title: "Personel ve Bordro", text: "Yeni çalışan, izin ve avans talepleri, zaman hesapları, bordro." },
      { title: "Finans ve Muhasebe", text: "Kasa, banka, belgeler, ay kapanışı, KDV ve müşavir paketi." },
    ],
    moduleMore: "Sorular ve videolar",
    beforeTitle: "Bugün nasıl, Ekado ile nasıl",
    beforeLabel: "Bugün",
    afterLabel: "Ekado ile",
    before: [
      ["Soğutucu ölçümleri kâğıt listede, denetimde aranıyor.", "Telefonda ölçüm; ad ve saat sunucudan, aylık protokol tek tıkla PDF."],
      ["Vardiya planı WhatsApp’ta, değişiklik kayboluyor.", "Plan yayınlanır, herkes kendi vardiyasını görür, değişiklikte bildirim gider."],
      ["Saatler Excel’de, maaş elle hesaplanıyor.", "Damgadan zaman hesabına, oradan L-GAV’a göre bordroya, hepsi aynı veriden."],
      ["Faturalar klasörde, belgeler eksik çıkıyor.", "QR fatura taranır, eksik belge kırmızı görünür, ay kapanışı kontrol eder."],
    ],
    stepsTitle: "Üç adımda kendi programınız",
    steps: [
      { title: "Hızlı demo", text: "İşinizi anlatırsınız, programı sizin işinize göre gösteririz." },
      { title: "Yerinde kurulum", text: "Gerekli bölümleri açar, fazlasını kapatırız; ekibinizi tanıştırırız." },
      { title: "3 ay yerinde destek", text: "İlk üç ay yanınızdayız; eksik olanı ekler, fazlayı çıkarırız." },
    ],
    faqTitle: "Sık sorulanlar",
    faq: [
      ["İnternet kesilirse ne olur?", "Program çalışmaya devam eder; bağlantı gelince veriler kendiliğinden eşitlenir."],
      ["Verilerim nerede duruyor?", "İsviçre’de barındırılır. Kimin neyi gördüğünü roller belirler; müşavir sadece muhasebeyi okur."],
      ["Kullanmadığım bölümleri kapatabilir miyim?", "Evet. Her bölüm ayrı açılıp kapanır; kapanan bölüm menüden kalkar, veriler silinmez."],
      ["Ekibim hangi dili kullanır?", "Program Almanca, Fransızca, İtalyanca, İngilizce ve Türkçe; herkes kendi dilini seçer."],
      ["Müşavirimin yerini tutar mı?", "Hayır, ön muhasebe yapar: müşaviriniz dağınık kâğıt yerine düzenli bir paket alır."],
    ],
    endTitle: "Kendi işletmenizde görün",
    endText: "Kısa bir demoda programı sizin işinize göre ayarlayıp gösterelim.",
  },
  b: {
    eyebrow: "Modüler işletme yazılımı",
    h1: "Programınızı birlikte kuralım.",
    lead: "On üç bölümden işinize yarayanları açın, gerisi kapalı kalsın. Eksik bir şey varsa yeni bölüm olarak ekleriz.",
    packLabel: "İşletmeniz",
    packs: { restaurant: "Restoran", baeckerei: "Fırın / Kafe", handwerk: "Zanaat / Saha", buero: "Ofis", alle: "Hepsi" },
    mods: {
      stempeluhr: "Giriş-çıkış ve vardiya",
      aufgaben: "Görevler ve duyurular",
      haccp: "HACCP ve hijyen",
      bestellung: "Sipariş ve tedarikçi",
      kreditoren: "Faturalar",
      finanzen: "Kasa ve banka",
      personal: "Personel ve maaş",
      fibu: "Muhasebe",
      zentrale: "Genel bakış ve asistan",
      treuekarte: "Sadakat kartı",
      vitrine: "Vitrin",
      webseite: "Web sitesi",
      einsaetze: "Saha işleri",
    },
    countOn: "bölüm açık",
    hint: "Bir kutuya dokunarak açıp kapatın.",
    dayTitle: "Bir iş gününde",
    day: [
      { time: "06:30", mod: "zentrale", text: "Kahve soğumadan günün durumu ekranda." },
      { time: "07:15", mod: "stempeluhr", text: "Ekip tabletten PIN ile giriş yapıyor." },
      { time: "07:30", mod: "haccp", text: "Soğutucular ölçüldü, kayıt kendiliğinden." },
      { time: "11:00", mod: "bestellung", text: "Eksik ürün sepette, sipariş gidiyor." },
      { time: "18:00", mod: "personal", text: "İzin talebi onaylandı, plan güncellendi." },
      { time: "23:00", mod: "finanzen", text: "Kasa kör sayıldı, fark muhasebede." },
    ],
    videoTitle: "Bir dakikada Ekado",
    videoText: "Yönetici paneliyle başlıyoruz; diğer bölümlerin videoları modül sayfalarında.",
    forTitle: "Kimin için",
    forCards: [
      { pack: "restaurant", title: "Restoran", text: "Vardiya, HACCP, sipariş, kasa ve L-GAV’a göre maaş." },
      { pack: "baeckerei", title: "Fırın ve kafe", text: "Vitrin sayımı ve fire oranı, sadakat kartı, web sitesinde menü." },
      { pack: "handwerk", title: "Zanaat ve saha", text: "Müşteride yapılan işler, malzeme, fotoğraf ve ekip planı." },
      { pack: "buero", title: "Ofis", text: "Giriş-çıkış, izinler, faturalar ve muhasebe; gerisi kapalı." },
    ],
    swissTitle: "İsviçre’ye göre yapıldı",
    swiss: [
      { title: "L-GAV ve İş Kanunu", text: "Asgari ücret kontrolü, dinlenme süresi ve mola uyarıları." },
      { title: "QR fatura ve banka", text: "QR fatura okunur, camt.053 banka özeti eşleşir." },
      { title: "Veri gizliliği", text: "revDSG’ye uygun silme süreleri; veriler İsviçre’de." },
      { title: "5 dil", text: "DE, FR, IT, EN, TR: ekip kendi dilinde çalışır." },
    ],
    supportTitle: "İlk 3 ay yanınızdayız",
    supportText: "Kurulumu yerinde yaparız; ilk üç ay sorularınıza yerinde ve uzaktan ücretsiz cevap veririz.",
    endTitle: "Hangi bölümler sizin işinize yarar?",
    endText: "Kısa bir görüşmede birlikte seçelim; programı o hâliyle gösterelim.",
  },
};

const de: LandingText = {
  draft: "Entwurf",
  draftOther: "Anderer Entwurf",
  ctaDemo: "Schnell-Demo",
  ctaVideos: "Videos ansehen",
  a: {
    eyebrow: "Für kleine Betriebe in der Schweiz",
    h1: ["Die ganze Arbeit Ihres Betriebs", "in einem Programm."],
    lead: "Schichtplan, Stempeluhr, Hygiene, Bestellung, Lohn und Buchhaltung. Für Restaurants, Cafés, Bäckereien und kleine Betriebe; eingerichtet nach Ihrem Betrieb.",
    trust: ["Daten in der Schweiz", "Funktioniert auch offline", "5 Sprachen", "3 Monate Support vor Ort", "L-GAV, Arbeitsgesetz, QR-Rechnung"],
    modulesTitle: "Vier Bereiche, ein Zugang",
    modulesLead: "Jeder Bereich hat seine eigene Seite: Fragen von Inhabern, die Antwort aus dem Programm und kurze Videos.",
    moduleCards: [
      { title: "Übersicht & Betrieb", text: "Schichtplan, Stempeluhr, HACCP und Aufgaben, Schwarzes Brett, Einsätze." },
      { title: "Einkauf & Rechnungen", text: "Lieferanten, Bestellung, Lieferkontrolle, Rechnung scannen, Lager und Zahlung." },
      { title: "Personal & Lohn", text: "Neue Mitarbeitende, Ferien- und Vorschussanträge, Zeitkonten, Lohnabrechnung." },
      { title: "Finanzen & Buchhaltung", text: "Kasse, Bank, Belege, Monatsabschluss, MWST und Paket für die Treuhand." },
    ],
    moduleMore: "Fragen und Videos",
    beforeTitle: "Wie es heute ist, wie es mit Ekado ist",
    beforeLabel: "Heute",
    afterLabel: "Mit Ekado",
    before: [
      ["Kühlmessungen auf Papier, bei der Kontrolle wird gesucht.", "Messung am Handy; Name und Zeit vom Server, Monatsprotokoll per Klick als PDF."],
      ["Schichtplan im WhatsApp, Änderungen gehen verloren.", "Der Plan wird veröffentlicht, alle sehen ihre Schichten, Änderungen werden gemeldet."],
      ["Stunden in Excel, Lohn von Hand gerechnet.", "Vom Stempel ins Zeitkonto, von dort nach L-GAV in die Abrechnung, alles aus denselben Daten."],
      ["Rechnungen im Ordner, Belege fehlen.", "QR-Rechnung scannen, fehlende Belege sind rot, der Monatsabschluss prüft mit."],
    ],
    stepsTitle: "In drei Schritten zu Ihrem Programm",
    steps: [
      { title: "Schnell-Demo", text: "Sie erzählen von Ihrem Betrieb, wir zeigen das Programm passend dazu." },
      { title: "Einrichtung vor Ort", text: "Wir schalten die nötigen Bereiche ein, den Rest aus, und führen Ihr Team ein." },
      { title: "3 Monate Support vor Ort", text: "Die ersten drei Monate sind wir da; was fehlt, kommt dazu, was zu viel ist, fällt weg." },
    ],
    faqTitle: "Häufige Fragen",
    faq: [
      ["Was passiert ohne Internet?", "Das Programm läuft weiter; sobald die Verbindung zurück ist, gleichen sich die Daten selbst ab."],
      ["Wo liegen meine Daten?", "In der Schweiz. Rollen bestimmen, wer was sieht; die Treuhand liest nur die Buchhaltung."],
      ["Kann ich Bereiche ausschalten?", "Ja. Jeder Bereich lässt sich einzeln ein- und ausschalten; die Daten bleiben erhalten."],
      ["Welche Sprache nutzt mein Team?", "Deutsch, Französisch, Italienisch, Englisch und Türkisch; jede Person wählt ihre Sprache."],
      ["Ersetzt es meine Treuhand?", "Nein, es macht die Vorbuchhaltung: Ihre Treuhand bekommt ein geordnetes Paket statt loser Zettel."],
    ],
    endTitle: "Sehen Sie es in Ihrem Betrieb",
    endText: "In einer kurzen Demo richten wir das Programm nach Ihrem Betrieb ein und zeigen es Ihnen.",
  },
  b: {
    eyebrow: "Modulare Betriebssoftware",
    h1: "Bauen wir Ihr Programm zusammen.",
    lead: "Schalten Sie von dreizehn Bereichen ein, was Sie brauchen; der Rest bleibt aus. Fehlt etwas, entwickeln wir es als neuen Bereich.",
    packLabel: "Ihr Betrieb",
    packs: { restaurant: "Restaurant", baeckerei: "Bäckerei / Café", handwerk: "Handwerk", buero: "Büro", alle: "Alle" },
    mods: {
      stempeluhr: "Stempeluhr & Schichtplan",
      aufgaben: "Aufgaben & Schwarzes Brett",
      haccp: "HACCP & Hygiene",
      bestellung: "Bestellung & Lieferanten",
      kreditoren: "Rechnungen",
      finanzen: "Kasse & Bank",
      personal: "Personal & Lohn",
      fibu: "Buchhaltung",
      zentrale: "Übersicht & Assistent",
      treuekarte: "Treuekarte",
      vitrine: "Vitrine",
      webseite: "Webseite",
      einsaetze: "Einsätze",
    },
    countOn: "Bereiche aktiv",
    hint: "Ein Tipp auf eine Kachel schaltet sie ein oder aus.",
    dayTitle: "An einem Arbeitstag",
    day: [
      { time: "06:30", mod: "zentrale", text: "Bevor der Kaffee kalt ist, steht der Tag auf dem Bildschirm." },
      { time: "07:15", mod: "stempeluhr", text: "Das Team stempelt am Tablet mit PIN." },
      { time: "07:30", mod: "haccp", text: "Kühlgeräte gemessen, die Aufzeichnung entsteht von selbst." },
      { time: "11:00", mod: "bestellung", text: "Was fehlt, liegt im Warenkorb, die Bestellung geht raus." },
      { time: "18:00", mod: "personal", text: "Ferienantrag genehmigt, der Plan ist aktuell." },
      { time: "23:00", mod: "finanzen", text: "Blinder Kassensturz, die Differenz ist verbucht." },
    ],
    videoTitle: "Ekado in einer Minute",
    videoText: "Wir beginnen mit der Übersicht; die Videos der anderen Bereiche stehen auf den Modulseiten.",
    forTitle: "Für wen",
    forCards: [
      { pack: "restaurant", title: "Restaurant", text: "Schichtplan, HACCP, Bestellung, Kasse und Lohn nach L-GAV." },
      { pack: "baeckerei", title: "Bäckerei & Café", text: "Vitrine zählen und Abfallquote, Treuekarte, Speisekarte auf der Webseite." },
      { pack: "handwerk", title: "Handwerk", text: "Einsätze beim Kunden, Material, Fotos und Teamplanung." },
      { pack: "buero", title: "Büro", text: "Stempeluhr, Ferien, Rechnungen und Buchhaltung; der Rest bleibt aus." },
    ],
    swissTitle: "Für die Schweiz gemacht",
    swiss: [
      { title: "L-GAV & Arbeitsgesetz", text: "Mindestlohn-Prüfung, Ruhezeit- und Pausenhinweise." },
      { title: "QR-Rechnung & Bank", text: "QR-Rechnungen werden gelesen, camt.053-Auszüge zugeordnet." },
      { title: "Datenschutz", text: "Löschfristen nach revDSG; Daten in der Schweiz." },
      { title: "5 Sprachen", text: "DE, FR, IT, EN, TR: das Team arbeitet in seiner Sprache." },
    ],
    supportTitle: "Die ersten 3 Monate an Ihrer Seite",
    supportText: "Wir richten vor Ort ein und beantworten Ihre Fragen in den ersten drei Monaten kostenlos, vor Ort und aus der Ferne.",
    endTitle: "Welche Bereiche passen zu Ihrem Betrieb?",
    endText: "Wählen wir sie in einem kurzen Gespräch gemeinsam aus und zeigen Ihnen das Programm genau so.",
  },
};

const en: LandingText = {
  draft: "Draft",
  draftOther: "Other draft",
  ctaDemo: "Quick Demo",
  ctaVideos: "Watch the videos",
  a: {
    eyebrow: "For small businesses in Switzerland",
    h1: ["All the work of your business", "in one program."],
    lead: "Shift plan, time clock, hygiene, ordering, payroll and accounting. For restaurants, cafés, bakeries and small businesses; set up for your business.",
    trust: ["Data in Switzerland", "Works offline too", "5 languages", "3 months on-site support", "L-GAV, labour law, QR-bill"],
    modulesTitle: "Four areas, one login",
    modulesLead: "Each area has its own page: questions from owners, answers from the program and short videos.",
    moduleCards: [
      { title: "Overview & Operations", text: "Shift plan, time clock, HACCP and tasks, notice board, field jobs." },
      { title: "Purchasing & Invoices", text: "Suppliers, ordering, delivery check, invoice scanning, stock and payment." },
      { title: "Staff & Payroll", text: "New employees, holiday and advance requests, time accounts, payslips." },
      { title: "Finance & Accounting", text: "Till, bank, documents, month-end close, VAT and the accountant package." },
    ],
    moduleMore: "Questions and videos",
    beforeTitle: "How it is today, how it is with Ekado",
    beforeLabel: "Today",
    afterLabel: "With Ekado",
    before: [
      ["Fridge readings on paper, searched for at inspections.", "Readings on the phone; name and time from the server, monthly log as PDF in one click."],
      ["Shift plan on WhatsApp, changes get lost.", "The plan is published, everyone sees their shifts, changes are notified."],
      ["Hours in Excel, pay calculated by hand.", "From clock-in to time account, from there to L-GAV payroll, all from the same data."],
      ["Invoices in a folder, documents go missing.", "QR-bill scanned, missing documents shown in red, the month-end close checks too."],
    ],
    stepsTitle: "Your program in three steps",
    steps: [
      { title: "Quick demo", text: "You tell us about your business, we show the program to match it." },
      { title: "On-site setup", text: "We switch on the areas you need, switch off the rest and introduce your team." },
      { title: "3 months on-site support", text: "We are with you for the first three months; what is missing gets added." },
    ],
    faqTitle: "Frequently asked",
    faq: [
      ["What happens without internet?", "The program keeps working; once the connection is back, the data syncs by itself."],
      ["Where is my data?", "In Switzerland. Roles decide who sees what; the accountant only reads the books."],
      ["Can I switch off areas?", "Yes. Each area is switched on or off separately; the data is kept."],
      ["Which language does my team use?", "German, French, Italian, English and Turkish; everyone picks their own."],
      ["Does it replace my accountant?", "No, it does the groundwork: your accountant gets an orderly package instead of loose papers."],
    ],
    endTitle: "See it in your business",
    endText: "In a short demo we set the program up for your business and show it to you.",
  },
  b: {
    eyebrow: "Modular business software",
    h1: "Let’s build your program together.",
    lead: "Switch on the areas you need out of thirteen; the rest stays off. If something is missing, we build it as a new area.",
    packLabel: "Your business",
    packs: { restaurant: "Restaurant", baeckerei: "Bakery / Café", handwerk: "Trades", buero: "Office", alle: "All" },
    mods: {
      stempeluhr: "Time clock & shifts",
      aufgaben: "Tasks & notice board",
      haccp: "HACCP & hygiene",
      bestellung: "Ordering & suppliers",
      kreditoren: "Invoices",
      finanzen: "Till & bank",
      personal: "Staff & payroll",
      fibu: "Accounting",
      zentrale: "Overview & assistant",
      treuekarte: "Loyalty card",
      vitrine: "Display case",
      webseite: "Website",
      einsaetze: "Field jobs",
    },
    countOn: "areas on",
    hint: "Tap a tile to switch it on or off.",
    dayTitle: "On a working day",
    day: [
      { time: "06:30", mod: "zentrale", text: "Before the coffee gets cold, the day is on screen." },
      { time: "07:15", mod: "stempeluhr", text: "The team clocks in on the tablet with a PIN." },
      { time: "07:30", mod: "haccp", text: "Fridges measured, the record keeps itself." },
      { time: "11:00", mod: "bestellung", text: "What is missing is in the basket, the order goes out." },
      { time: "18:00", mod: "personal", text: "Holiday request approved, the plan is up to date." },
      { time: "23:00", mod: "finanzen", text: "Blind cash count, the difference is booked." },
    ],
    videoTitle: "Ekado in one minute",
    videoText: "We start with the overview; the videos of the other areas are on the module pages.",
    forTitle: "Who it is for",
    forCards: [
      { pack: "restaurant", title: "Restaurant", text: "Shift plan, HACCP, ordering, till and L-GAV payroll." },
      { pack: "baeckerei", title: "Bakery & café", text: "Display count and waste rate, loyalty card, menu on the website." },
      { pack: "handwerk", title: "Trades", text: "Jobs at the customer’s site, materials, photos and team planning." },
      { pack: "buero", title: "Office", text: "Time clock, holidays, invoices and accounting; the rest stays off." },
    ],
    swissTitle: "Made for Switzerland",
    swiss: [
      { title: "L-GAV & labour law", text: "Minimum wage check, rest time and break hints." },
      { title: "QR-bill & bank", text: "QR-bills are read, camt.053 statements matched." },
      { title: "Data protection", text: "Deletion periods under revDSG; data in Switzerland." },
      { title: "5 languages", text: "DE, FR, IT, EN, TR: the team works in its own language." },
    ],
    supportTitle: "With you for the first 3 months",
    supportText: "We set up on site and answer your questions free of charge for the first three months, on site and remotely.",
    endTitle: "Which areas fit your business?",
    endText: "Let’s pick them together in a short call and show you the program exactly like that.",
  },
};

export const landing: Record<Locale, LandingText> = { tr, de, en };
