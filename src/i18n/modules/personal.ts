import { betrieb } from "../betrieb";
import type { Locale } from "../useLocale";
import type { ModuleText, QaItem } from "./common";

/**
 * "Personel ve Bordro" modül sayfası (/modul/personal).
 * İçerik programın kodundan çıkarıldı (Gastro apps supi: modules/personal, stempeluhr, aufgaben/SuggestionsPage).
 * Yeni çalışan (video 02) soruları betrieb.ts qa.extra içinde, buradan alınıyor.
 * Bilerek yazılmayanlar: hastalık/kaza/doğumda maaş ödemesi, belge süresi için e-posta hatırlatması,
 * çalışanların kendi değerlendirmesini görmesi, pain.001'in bankada test edildiği.
 */
const own: Record<Locale, QaItem[]> = {
  tr: [
    {
      key: "urlaub",
      menu: "İzin Planlaması",
      question: "Çalışanlarım izni nasıl ister?",
      answer: "Uygulamadan, İzin Planlaması sayfasında. Program günleri kişinin kendi vardiya planına göre sayar; yeterli izin günü yoksa ya da tarihler çakışıyorsa talep gönderilemez. Çalışan kalan, kullanılan ve hak ettiği izni her zaman görür.",
      features: ["Kalan, kullanılan ve hak edilen izin", "Günler kişinin vardiya planına göre sayılır", "Yetersiz izin ya da çakışmada talep kilitli", "İzin, askerlik, doğum, ücretsiz izin, fazla mesai telafisi", "Açık talep geri çekilebilir"],
    },
    {
      key: "vorschuss",
      menu: "Maaş avansı",
      question: "Avans talepleri nasıl yürür?",
      answer: "Çalışan tutarı ve nedeni yazar. Aynı anda tek açık talep olur, yılda en fazla on talep ve CHF 10'000 sınırı var; bu sınırları sunucu da denetler. Avansı ödenmiş olarak işaretlediğinizde tutar bir sonraki maaştan kendiliğinden kesilir.",
      features: ["Tutar ve neden, tek açık talep", "Yılda en fazla 10 avans, en çok CHF 10'000", "Elden ödenen avans kasaya kendiliğinden yazılır", "Bir sonraki net maaştan otomatik kesinti", "Maaştan büyükse kalanı sonraki aya geçer"],
    },
    {
      key: "vorschlag",
      menu: "Öneriler",
      question: "Ekibim gerçekten anonim öneri ya da eleştiri yazabilir mi?",
      answer: "Evet. Anonim öneride ne kişi ne de saat kaydedilir, zamanı ele veren bir bildirim de gitmez. Çalışan bir kod alır ve cevabınızı o kodla okur. Öneri yeni, okundu, yapılıyor, uygulandı ya da gerekçeli reddedildi olarak ilerler.",
      features: ["Konu: fikir, sorun, güvenlik, diğer", "Anonim: kişi ve saat kaydedilmez", "Kodla cevabı görme", "Durum: yeni, okundu, yapılıyor, uygulandı, reddedildi", "Uygulanan öneri duyuru panosunda anonim paylaşılabilir"],
    },
    {
      key: "genehmigen",
      menu: "Personel · Devamsızlıklar",
      question: "Talepleri nerede onaylarım?",
      answer: "Bütün talepler zile bildirim olarak düşer. Devamsızlıklar sayfasında izni onaylayınca gün sayısı haktan düşer, o günlerin vardiyaları kendiliğinden boşa çıkar ve çalışana haber gider. Kararı sonradan geri almak da mümkün; günler geri yazılır.",
      features: ["Açık talepler, bugün hastalar, onaylı izinler", "Onayda izin günü haktan düşer", "Etkilenen vardiyalar boşa çıkar", "Çalışana bildirim, istenirse WhatsApp", "Karar geri alınabilir"],
    },
    {
      key: "karte",
      menu: "Personel · Çalışanlar",
      question: "Bir çalışanın her şeyini tek yerde görebilir miyim?",
      answer: "Evet. Çalışanlar sayfasında karta tıklayınca çalışan kartı açılır: damga geçmişi, ayın maaşı ve kesintileri, zaman hesabı, izin bakiyesi, çocuklar ve aile ödenekleri. Maaş detayı PDF olarak hazır.",
      features: ["Canlı durum: işte mi, mesai bitti mi", "Damga geçmişi ve unutulan çıkışın düzeltilmesi", "Ayın maaşı: saat, fazla mesai, brüt, net, kesintiler", "Zaman hesabı ve aylık rapor PDF", "L-GAV ücret basamağı ve asgari ücret kontrolü"],
    },
    {
      key: "lohn",
      menu: "Finans · Maaş dönemleri",
      question: "Maaşı program mı hesaplıyor?",
      answer: "Evet. Aylık maaş damga kayıtlarından İsviçre L-GAV kurallarına göre hesaplanır: çalışılan saatler, brüt maaş ve AHV, ALV, kaza sigortası gibi kesintiler. Bordro taslak, onay, çalışana gönderme ve ödeme adımlarından geçer; onaylanan bordro dondurulur.",
      features: ["Damga kayıtlarından aylık maaş", "AHV/IV/EO, ALV, NBU/BU, KTG, FAK, BVG, L-GAV katkısı", "Oranlar \"şu aydan geçerli\" saklanır, eski aylar değişmez", "Taslak, onay, gönderme, ödeme", "Eksik oran varsa sessiz sıfır değil, uyarı"],
    },
    {
      key: "lohnpdf",
      menu: "Bilgilerim",
      question: "Çalışan bordrosunu nereden alır?",
      answer: "Kendi ekranından. Bilgilerim sayfasında ödenen bordrolar PDF olarak hazırdır, son yılların maaş belgesi (Lohnausweis) de orada. Çalışan kâğıt beklemez, her ay kendisi indirir.",
      features: ["Son 12 bordro PDF olarak", "Son 3 yılın Lohnausweis'i", "Kişisel bilgiler, kimlik, banka, aile, acil durum kişisi", "Doğum günü gizliliği"],
    },
    {
      key: "krank",
      menu: "Hastalık Bildirimi",
      question: "Biri sabah hasta olduğunu bildirirse ne olur?",
      answer: "Bildirim hemen geçerli olur; çalışan nedeni seçer, tarihleri ve isterse doktor raporunu fotoğraf ya da PDF olarak ekler. Size anında bildirim gelir, yanında aynı bölümden en fazla üç yedek önerisi.",
      features: ["Nedeni dokunarak seçme, tarih ve not", "Doktor raporu fotoğraf ya da PDF", "Şefe anında bildirim", "Aynı bölümden yedek önerisi"],
    },
    {
      key: "zeitkonto",
      menu: "Personel · Zaman hesapları",
      question: "Fazla ve eksik saatleri görebilir miyim?",
      answer: "Evet. Zaman hesaplarında sözleşmedeki saat ile damgalanan saat ay ay ve işe girişten beri karşılaştırılır; Zürih tatilleri ve onaylı izinler düşülür. Sözleşme saati eksikse program yanlış hesaplamak yerine uyarır. Yıl sonunda izin devri ve fazla mesai ödemesi de buradan yapılır.",
      features: ["Ay başına: hedef, gerçek, ay ve toplam bakiye", "Tatiller ve onaylı izinler düşülür", "Çalışanın aylık raporu dijital onayı", "Yıl sonu: izin devri, 10 gün üstü uyarı", "Fazla mesai ödemesi ocak maaşına"],
    },
    {
      key: "akten",
      menu: "Personel · Personel Dosyaları",
      question: "Çalışma izninin süresi dolduğunda fark eder miyim?",
      answer: "Evet. Her belgenin geçerlilik tarihi ve bir uyarı süresi vardır (varsayılan 60 gün). Personel dosyaları, menüdeki kırmızı sayaç ve ana sayfa süresi dolan belgeleri gösterir. Zorunlu belgeler yeşil, sarı, kırmızı noktayla izlenir; saklama süresi boyunca silinemez.",
      features: ["Zorunlu belgeler: kimlik/izin, sözleşme, AHV, UVG, hijyen", "Geçerlilik tarihi ve uyarı süresi", "Menüde kırmızı sayaç, ana sayfada uyarı", "İşe giriş ve çıkış kontrol listeleri", "Saklama süresince silme kilitli"],
    },
  ],
  de: [
    {
      key: "urlaub",
      menu: "Urlaubsplanung",
      question: "Wie beantragen meine Leute Ferien?",
      answer: "In der App unter Urlaubsplanung. Das Programm zählt die Tage nach dem eigenen Dienstplan; reichen die Ferien nicht oder überschneidet sich etwas, lässt sich der Antrag nicht senden. Rest, Bezug und Anspruch sind jederzeit sichtbar.",
      features: ["Rest, bezogen und Anspruch", "Tage nach dem eigenen Dienstplan gezählt", "Gesperrt bei zu wenig Ferien oder Überschneidung", "Urlaub, Militär, Mutterschaft, unbezahlt, Überzeit-Kompensation", "Offene Anträge zurückziehen"],
    },
    {
      key: "vorschuss",
      menu: "Lohnvorschuss",
      question: "Wie läuft ein Lohnvorschuss?",
      answer: "Die Person trägt Betrag und Grund ein. Es gibt immer nur einen offenen Antrag, höchstens zehn pro Jahr und CHF 10'000; diese Grenzen prüft auch der Server. Markieren Sie den Vorschuss als ausbezahlt, wird er beim nächsten Lohn automatisch abgezogen.",
      features: ["Betrag und Grund, ein offener Antrag", "Höchstens 10 pro Jahr, bis CHF 10'000", "Bar ausbezahlt: automatisch in der Kasse", "Automatischer Abzug vom nächsten Nettolohn", "Rest als Übertrag im Folgemonat"],
    },
    {
      key: "vorschlag",
      menu: "Vorschläge",
      question: "Kann mein Team wirklich anonym Ideen oder Kritik schreiben?",
      answer: "Ja. Bei anonymen Vorschlägen werden weder Person noch Uhrzeit gespeichert, und keine Meldung verrät den Zeitpunkt. Die Person erhält einen Code und liest damit Ihre Antwort. Ein Vorschlag geht von Neu über In Arbeit bis Umgesetzt oder begründet Abgelehnt.",
      features: ["Themen: Idee, Problem, Sicherheit, Sonstiges", "Anonym: weder Person noch Uhrzeit gespeichert", "Antwort über einen Code", "Status: neu, gelesen, in Arbeit, umgesetzt, abgelehnt", "Umgesetztes anonym am Schwarzen Brett teilen"],
    },
    {
      key: "genehmigen",
      menu: "Personalwesen · Abwesenheiten",
      question: "Wo genehmige ich die Anträge?",
      answer: "Alle Anträge kommen als Meldung in die Glocke. Unter Abwesenheiten wird beim Genehmigen der Anspruch abgebucht, die betroffenen Schichten werden frei und die Person bekommt Bescheid. Eine Entscheidung lässt sich zurücknehmen; die Tage werden zurückgebucht.",
      features: ["Offene Anträge, heute krank, genehmigte Ferien", "Beim Genehmigen vom Anspruch abgebucht", "Betroffene Schichten werden offen", "Meldung an die Person, auf Wunsch per WhatsApp", "Entscheidung zurücknehmen"],
    },
    {
      key: "karte",
      menu: "Personalwesen · Mitarbeiter",
      question: "Sehe ich alles über eine Person an einem Ort?",
      answer: "Ja. Ein Klick auf die Karte unter Mitarbeiter öffnet die Mitarbeiterkarte: Stempelverlauf, Lohn des Monats mit Abzügen, Zeitkonto, Feriensaldo, Kinder und Familienzulagen. Die Lohndetails gibt es als PDF.",
      features: ["Live-Status: eingestempelt oder Feierabend", "Stempelverlauf, vergessenes Ausstempeln korrigieren", "Lohn des Monats: Stunden, Überzeit, Brutto, Netto, Abzüge", "Zeitkonto und Monatsrapport als PDF", "L-GAV-Lohnstufe mit Mindestlohn-Prüfung"],
    },
    {
      key: "lohn",
      menu: "Finanzen · Lohnläufe",
      question: "Rechnet das Programm den Lohn?",
      answer: "Ja. Der Monatslohn wird aus den Stempelzeiten nach dem Schweizer L-GAV berechnet: Stunden, Brutto und Abzüge wie AHV, ALV und Unfallversicherung. Die Abrechnung geht durch Entwurf, Freigabe, Versand und Auszahlung; eine freigegebene Abrechnung ist eingefroren.",
      features: ["Monatslohn aus den Stempelzeiten", "AHV/IV/EO, ALV, NBU/BU, KTG, FAK, BVG, L-GAV-Beitrag", "Sätze «gültig ab Monat», alte Monate bleiben", "Entwurf, Freigabe, Versand, Auszahlung", "Fehlender Satz: Warnung statt stiller Null"],
    },
    {
      key: "lohnpdf",
      menu: "Meine Daten",
      question: "Wo holt die Person ihre Lohnabrechnung?",
      answer: "Auf dem eigenen Bildschirm. Unter Meine Daten stehen die bezahlten Abrechnungen als PDF bereit, dazu der Lohnausweis der letzten Jahre. Niemand wartet auf Papier, jeder lädt sie jeden Monat selbst herunter.",
      features: ["Die letzten 12 Abrechnungen als PDF", "Lohnausweis der letzten 3 Jahre", "Angaben zu Person, Ausweis, Bank, Familie, Notfallkontakt", "Geburtstags-Privatsphäre"],
    },
    {
      key: "krank",
      menu: "Krankmeldung",
      question: "Was passiert, wenn sich jemand morgens krank meldet?",
      answer: "Die Meldung gilt sofort; die Person tippt den Grund an, wählt den Zeitraum und hängt auf Wunsch das Arztzeugnis als Foto oder PDF an. Sie bekommen sofort eine Meldung mit bis zu drei Vertretungsvorschlägen aus derselben Abteilung.",
      features: ["Grund antippen, Zeitraum und Notiz", "Arztzeugnis als Foto oder PDF", "Sofortige Meldung an den Chef", "Vertretungsvorschlag aus derselben Abteilung"],
    },
    {
      key: "zeitkonto",
      menu: "Personalwesen · Zeitkonten",
      question: "Sehe ich Überstunden und Minusstunden?",
      answer: "Ja. Unter Zeitkonten steht das Vertrags-Soll gegen die gestempelte Zeit, pro Monat und seit Eintritt, ohne Zürcher Feiertage und genehmigte Abwesenheiten. Fehlt das Soll, warnt das Programm, statt falsch zu rechnen. Im Jahresabschluss werden Ferienübertrag und Überzeit-Auszahlung erledigt.",
      features: ["Pro Monat: Soll, Ist, Saldo Monat und kumuliert", "Feiertage und Abwesenheiten abgezogen", "Monatsrapport digital bestätigt", "Jahresabschluss: Übertrag, Warnung ab 10 Tagen", "Überzeit-Auszahlung im Januar-Lohn"],
    },
    {
      key: "akten",
      menu: "Personalwesen · Personalakten",
      question: "Merke ich, wenn eine Arbeitsbewilligung abläuft?",
      answer: "Ja. Jedes Dokument hat «gültig bis» und eine Vorwarnzeit (Standard 60 Tage). Personalakten, ein roter Zähler im Menü und die Übersicht zeigen ablaufende Dokumente. Pflichtdokumente haben einen grünen, gelben oder roten Punkt und sind während der Aufbewahrungsfrist nicht löschbar.",
      features: ["Pflicht: Ausweis/Bewilligung, Vertrag, AHV, UVG, Hygiene", "Gültig bis und Vorwarnzeit", "Roter Zähler im Menü, Warnung auf der Übersicht", "Checklisten für Ein- und Austritt", "Löschen während der Aufbewahrungsfrist gesperrt"],
    },
  ],
  en: [
    {
      key: "urlaub",
      menu: "Holiday planning",
      question: "How do my people request holidays?",
      answer: "In the app under Holiday planning. The program counts the days from their own shift plan; if there are not enough days left or dates overlap, the request cannot be sent. Remaining, taken and entitled days are always visible.",
      features: ["Remaining, taken and entitlement", "Days counted from their own shift plan", "Blocked if not enough days or overlapping", "Holiday, military, maternity, unpaid, overtime compensation", "Open requests can be withdrawn"],
    },
    {
      key: "vorschuss",
      menu: "Salary advance",
      question: "How does a salary advance work?",
      answer: "The employee enters amount and reason. There is only one open request at a time, at most ten a year and CHF 10,000; the server checks these limits too. Once you mark the advance as paid, it is deducted from the next salary automatically.",
      features: ["Amount and reason, one open request", "At most 10 a year, up to CHF 10,000", "Paid in cash: booked in the till automatically", "Automatic deduction from the next net salary", "Any rest carried to the next month"],
    },
    {
      key: "vorschlag",
      menu: "Suggestions",
      question: "Can my team really write ideas or criticism anonymously?",
      answer: "Yes. For anonymous suggestions neither the person nor the time is stored, and no notification gives the moment away. The employee gets a code and reads your answer with it. A suggestion moves from new to in progress to done, or declined with a reason.",
      features: ["Topics: idea, problem, safety, other", "Anonymous: neither person nor time stored", "Answer read with a code", "Status: new, read, in progress, done, declined", "Done suggestions can be shared anonymously on the notice board"],
    },
    {
      key: "genehmigen",
      menu: "Staff · Absences",
      question: "Where do I approve requests?",
      answer: "All requests arrive as notifications in the bell. Under Absences, approving deducts the days from the entitlement, frees the affected shifts and tells the employee. A decision can be taken back; the days are booked back.",
      features: ["Open requests, sick today, approved holidays", "Approval deducts from the entitlement", "Affected shifts become open", "Notification to the employee, WhatsApp if wanted", "Decisions can be reversed"],
    },
    {
      key: "karte",
      menu: "Staff · Employees",
      question: "Can I see everything about one person in one place?",
      answer: "Yes. Click a card under Employees and the employee card opens: clock-in history, this month's pay with deductions, time account, holiday balance, children and family allowances. Pay details are ready as a PDF.",
      features: ["Live status: clocked in or off", "Clock-in history, fix forgotten clock-outs", "This month's pay: hours, overtime, gross, net, deductions", "Time account and monthly report as PDF", "L-GAV wage level with minimum wage check"],
    },
    {
      key: "lohn",
      menu: "Finance · Payroll runs",
      question: "Does the program calculate pay?",
      answer: "Yes. The monthly pay is calculated from the clock-in times following the Swiss L-GAV: hours, gross pay and deductions such as AHV, ALV and accident insurance. The payslip goes through draft, approval, sending and payment; once approved it is frozen.",
      features: ["Monthly pay from clock-in times", "AHV/IV/EO, ALV, NBU/BU, KTG, FAK, BVG, L-GAV contribution", "Rates stored \"valid from month\", old months stay", "Draft, approval, sending, payment", "Missing rate: a warning, not a silent zero"],
    },
    {
      key: "lohnpdf",
      menu: "My data",
      question: "Where does the employee get their payslip?",
      answer: "On their own screen. Under My data the paid payslips are ready as PDFs, along with the salary certificate of recent years. Nobody waits for paper; everyone downloads them each month.",
      features: ["The last 12 payslips as PDF", "Salary certificate of the last 3 years", "Personal, ID, bank, family and emergency contact details", "Birthday privacy"],
    },
    {
      key: "krank",
      menu: "Sick note",
      question: "What happens when someone calls in sick in the morning?",
      answer: "The sick note counts at once; the employee taps the reason, picks the dates and can attach a doctor's note as a photo or PDF. You are notified immediately, with up to three replacement suggestions from the same department.",
      features: ["Tap the reason, dates and note", "Doctor's note as photo or PDF", "Immediate notification to the boss", "Replacement suggestions from the same department"],
    },
    {
      key: "zeitkonto",
      menu: "Staff · Time accounts",
      question: "Can I see overtime and missing hours?",
      answer: "Yes. Time accounts compare contract hours with clocked hours, per month and since the start date, without Zurich public holidays and approved absences. If contract hours are missing, the program warns instead of miscalculating. Year-end handles holiday carry-over and overtime payout.",
      features: ["Per month: target, actual, month and running balance", "Public holidays and absences deducted", "Monthly report confirmed digitally", "Year-end: carry-over, warning from 10 days", "Overtime paid out in January pay"],
    },
    {
      key: "akten",
      menu: "Staff · Personnel files",
      question: "Will I notice when a work permit expires?",
      answer: "Yes. Every document has a \"valid until\" date and a warning period (60 days by default). Personnel files, a red counter in the menu and the overview show expiring documents. Required documents carry a green, yellow or red dot and cannot be deleted during the retention period.",
      features: ["Required: ID/permit, contract, AHV, UVG, hygiene", "Valid until and warning period", "Red counter in the menu, warning on the overview", "Checklists for joining and leaving", "Deleting blocked during the retention period"],
    },
  ],
};

const head: Record<Locale, { title: string; heading: string; lead: string; films: { title: string; text: string }[] }> = {
  tr: {
    title: "Personel ve Bordro",
    heading: "Personel ve Bordro",
    lead: "Yeni çalışanın kaydından izin, avans ve öneri taleplerine, çalışan kartından aylık bordroya kadar. Kâğıt ve telefon yok: her şey çalışan ile şef arasında programdan geçer. İşletme sahiplerinin soruları ve programdan cevapları; yanında kısa videolar.",
    films: [
      { title: "Yeni bir çalışan", text: "İlk iş gününden önce: kayıt, PIN, belgeler ve şefin onayı. Kâğıtsız, telefonsuz." },
      { title: "Çalışan istekleri", text: "İzin, avans, öneri kutusu; şefin bildirimi, onayı ve sonucu." },
      { title: "Çalışan kartı", text: "Damga geçmişi, maaş, zaman hesabı ve izin bakiyesi tek kartta." },
      { title: "Maaş", text: "Damga kayıtlarından bordro, onay, ödeme ve çalışanın PDF'i." },
      { title: "Hastalık, zaman hesabı ve personel dosyaları", text: "Hasta bildirimi, fazla ve eksik saatler, süresi dolan belgeler." },
    ],
  },
  de: {
    title: "Personal & Lohn",
    heading: "Personal & Lohn",
    lead: "Von der Erfassung neuer Mitarbeitender über Ferien-, Vorschuss- und Vorschlagsanträge bis zur Mitarbeiterkarte und zur Lohnabrechnung. Kein Papier, kein Telefon: alles zwischen Team und Chef läuft über das Programm. Fragen von Inhabern und die Antwort aus dem Programm, dazu kurze Videos.",
    films: [
      { title: "Eine neue Mitarbeiterin", text: "Vor dem ersten Arbeitstag: Erfassung, PIN, Dokumente und Freigabe durch den Chef. Ohne Papier, ohne Telefon." },
      { title: "Anträge aus dem Team", text: "Ferien, Vorschuss, Vorschlagskasten; Meldung, Genehmigung und Ergebnis beim Chef." },
      { title: "Die Mitarbeiterkarte", text: "Stempelverlauf, Lohn, Zeitkonto und Feriensaldo auf einer Karte." },
      { title: "Lohn", text: "Abrechnung aus den Stempelzeiten, Freigabe, Auszahlung und das PDF für die Person." },
      { title: "Krankheit, Zeitkonten und Personalakten", text: "Krankmeldung, Über- und Minusstunden, ablaufende Dokumente." },
    ],
  },
  en: {
    title: "Staff & Payroll",
    heading: "Staff & Payroll",
    lead: "From recording a new employee to holiday, advance and suggestion requests, the employee card and the monthly payslip. No paper, no phone calls: everything between team and boss goes through the program. Questions from owners answered from the program, with short videos.",
    films: [
      { title: "A new employee", text: "Before day one: record, PIN, documents and approval by the boss. No paper, no phone calls." },
      { title: "Requests from the team", text: "Holiday, advance, suggestion box; the boss's notification, approval and result." },
      { title: "The employee card", text: "Clock-in history, pay, time account and holiday balance on one card." },
      { title: "Pay", text: "Payslip from clock-in times, approval, payment and the employee's PDF." },
      { title: "Sickness, time accounts and personnel files", text: "Sick notes, overtime and missing hours, expiring documents." },
    ],
  },
};

const build = (l: Locale): ModuleText => ({ ...head[l], items: [...betrieb[l].qa.extra, ...own[l]] });

export const personal: Record<Locale, ModuleText> = { tr: build("tr"), de: build("de"), en: build("en") };
