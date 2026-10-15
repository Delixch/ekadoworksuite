import type { Locale } from "./useLocale";

/**
 * "Destek" sayfasının metinleri (3 dil).
 * DİKKAT: Müşteri yorumları (quotes) DEMO metindir, gerçek müşteri değildir. Yayına almadan önce gerçek yorumlarla değiştir.
 * Yerinde kurulum ve 3 ay ücretsiz destek taahhütleri işletme sahibinin onayına bağlıdır.
 */
export type SupportText = {
  title: string;
  eyebrow: string;
  heading: string;
  lead: string;
  ring: { big: string; label: string; months: string[] };
  channels: string[];
  roadmapEyebrow: string;
  roadmapHeading: string;
  roadmap: { when: string; title: string; items: string[] }[];
  onsiteEyebrow: string;
  onsiteHeading: string;
  onsiteText: string;
  onsiteItems: { title: string; text: string }[];
  flowEyebrow: string;
  flowHeading: string;
  flowText: string;
  flowSteps: string[];
  flowExamplesLabel: string;
  flowExamples: string[];
  voicesEyebrow: string;
  voicesHeading: string;
  voices: { quote: string; name: string; role: string }[];
  ctaHeading: string;
  ctaText: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

export const support: Record<Locale, SupportText> = {
  tr: {
    title: "Destek",
    eyebrow: "Destek",
    heading: "Programı çözene kadar yanınızdayız.",
    lead: "İlk 3 ay destek ücretsiz. İşletmenizde, yerinde, telefonda ya da e-postayla: aklınıza takılan her şey için buradayız.",
    ring: { big: "3", label: "ay ücretsiz destek", months: ["1. ay", "2. ay", "3. ay"] },
    channels: ["Yerinde (Vor Ort)", "Telefon ve e-posta", "Hızlı Demo"],
    roadmapEyebrow: "Yol haritası",
    roadmapHeading: "İlk üç ay nasıl geçer?",
    roadmap: [
      { when: "1. ay", title: "Kurulum ve ilk günler", items: ["Kurulum işletmenizde, yerinde", "Ekibe ilk eğitim", "Mevcut bilgilerin aktarılması"] },
      { when: "2. ay", title: "Alışma ve ince ayar", items: ["Modüllerin işinize göre ayarı", "Sorulara hızlı dönüş", "Çalışan hesapları ve yetkiler"] },
      { when: "3. ay", title: "Kendi ayağınızın üzerinde", items: ["İlk ay sonu ve bordro birlikte", "Eksik kalan ne varsa tamamlanır", "Destek hâlâ ücretsiz"] },
    ],
    onsiteEyebrow: "Yerinde",
    onsiteHeading: "Programı mutfağınızda ve kasanızda kurarız.",
    onsiteText: "Toplantı odasında değil, işin yapıldığı yerde. Ekibiniz nasıl çalışıyorsa programı ona göre ayarlarız.",
    onsiteItems: [
      { title: "Yerinde kurulum", text: "Cihazlar, hesaplar ve modüller işletmenizde hazırlanır." },
      { title: "Uygulamalı eğitim", text: "Çalışanlara kısa ve uygulamalı anlatım. Kâğıt kılavuz okumak gerekmez." },
      { title: "İlk gün yanınızdayız", text: "İlk damga, ilk vardiya, ilk fatura: ilk günlerde sizinle birlikte." },
    ],
    flowEyebrow: "Sizden gelen fikirler",
    flowHeading: "Modüller sizin isteğinizle büyür.",
    flowText: "Destek hattından gelen her geri dönüş bir sonraki modülün tohumu olabilir. İsteyen müşteri için modülü birlikte geliştiririz.",
    flowSteps: ["İsteğinizi anlatın", "Birlikte netleştiririz", "Modülü geliştiririz", "Hesabınıza eklenir"],
    flowExamplesLabel: "Örnek istekler",
    flowExamples: ["Vitrin: devir ve fire raporu", "Saha işi planı", "Sefer kaydı"],
    voicesEyebrow: "Geri dönüşler",
    voicesHeading: "Müşterilerimiz ne diyor?",
    voices: [
      { quote: "Ay sonu bordro ve muhasebe eskiden iki gün sürüyordu. Şimdi ekip saatlerini kendisi onaylıyor, ben sadece kontrol ediyorum.", name: "Anna K.", role: "Kafe sahibi, Zürih" },
      { quote: "Destek ekibi mutfağımıza geldi, HACCP kayıtlarını bizimle birlikte kurdu. İlk haftadan beri kâğıt kullanmıyoruz.", name: "Marco B.", role: "Restoran müdürü" },
    ],
    ctaHeading: "Bir sorunuz mu var?",
    ctaText: "Bize yazın, size dönelim. Ya da önce Hızlı Demo ile programı gezin.",
    ctaPrimary: "Destek iste",
    ctaSecondary: "Hızlı Demo",
  },
  en: {
    title: "Support",
    eyebrow: "Support",
    heading: "We are with you until the software clicks.",
    lead: "Support is free for the first 3 months. On site, by phone or by email: we are here for anything on your mind.",
    ring: { big: "3", label: "months of free support", months: ["Month 1", "Month 2", "Month 3"] },
    channels: ["On site (Vor Ort)", "Phone and email", "Quick Demo"],
    roadmapEyebrow: "Roadmap",
    roadmapHeading: "How the first three months go.",
    roadmap: [
      { when: "Month 1", title: "Setup and first days", items: ["Setup at your business, on site", "First training for the team", "Existing data moved over"] },
      { when: "Month 2", title: "Settling in and fine-tuning", items: ["Modules adjusted to your work", "Quick answers to questions", "Employee accounts and permissions"] },
      { when: "Month 3", title: "On your own feet", items: ["First month-end and payroll together", "Whatever is missing gets finished", "Support is still free"] },
    ],
    onsiteEyebrow: "On site",
    onsiteHeading: "We set it up in your kitchen and at your till.",
    onsiteText: "Not in a meeting room, but where the work happens. We adjust the software to how your team already works.",
    onsiteItems: [
      { title: "Setup on site", text: "Devices, accounts and modules are prepared at your business." },
      { title: "Hands-on training", text: "Short, practical sessions for staff. No manual to read." },
      { title: "With you on day one", text: "First clock-in, first shift, first invoice: we are there with you." },
    ],
    flowEyebrow: "Ideas from you",
    flowHeading: "Modules grow from your requests.",
    flowText: "Every piece of feedback from the support line can become the seed of the next module. For customers who ask, we build the module together.",
    flowSteps: ["Tell us what you need", "We clarify it together", "We build the module", "It is added to your account"],
    flowExamplesLabel: "Example requests",
    flowExamples: ["Display case: carry-over and waste report", "Field job planning", "Trip log"],
    voicesEyebrow: "Feedback",
    voicesHeading: "What our customers say.",
    voices: [
      { quote: "Month-end payroll and accounting used to take two days. Now the team confirms their own hours and I only check.", name: "Anna K.", role: "Café owner, Zurich" },
      { quote: "The support team came to our kitchen and set up the HACCP records with us. We have not used paper since the first week.", name: "Marco B.", role: "Restaurant manager" },
    ],
    ctaHeading: "Have a question?",
    ctaText: "Write to us and we will get back to you. Or explore the program first with the Quick Demo.",
    ctaPrimary: "Ask for support",
    ctaSecondary: "Quick Demo",
  },
  de: {
    title: "Support",
    eyebrow: "Support",
    heading: "Wir sind da, bis Sie das Programm im Griff haben.",
    lead: "Die ersten 3 Monate ist der Support kostenlos. Vor Ort, telefonisch oder per E-Mail: Wir sind für alles da, was Sie beschäftigt.",
    ring: { big: "3", label: "Monate kostenloser Support", months: ["Monat 1", "Monat 2", "Monat 3"] },
    channels: ["Vor Ort", "Telefon und E-Mail", "Schnell-Demo"],
    roadmapEyebrow: "Fahrplan",
    roadmapHeading: "So verlaufen die ersten drei Monate.",
    roadmap: [
      { when: "Monat 1", title: "Einrichtung und erste Tage", items: ["Einrichtung in Ihrem Betrieb, vor Ort", "Erste Schulung fürs Team", "Bestehende Daten übernehmen"] },
      { when: "Monat 2", title: "Eingewöhnen und Feinabstimmung", items: ["Module auf Ihre Arbeit abgestimmt", "Schnelle Antworten auf Fragen", "Mitarbeiterkonten und Berechtigungen"] },
      { when: "Monat 3", title: "Auf eigenen Beinen", items: ["Erster Monatsabschluss und Lohn gemeinsam", "Was noch fehlt, wird fertig gemacht", "Support bleibt kostenlos"] },
    ],
    onsiteEyebrow: "Vor Ort",
    onsiteHeading: "Wir richten es in Ihrer Küche und an Ihrer Kasse ein.",
    onsiteText: "Nicht im Sitzungszimmer, sondern dort, wo gearbeitet wird. Wir stellen das Programm so ein, wie Ihr Team schon arbeitet.",
    onsiteItems: [
      { title: "Einrichtung vor Ort", text: "Geräte, Konten und Module werden in Ihrem Betrieb vorbereitet." },
      { title: "Schulung zum Anfassen", text: "Kurze, praktische Einführung für die Mitarbeitenden. Kein Handbuch nötig." },
      { title: "Am ersten Tag dabei", text: "Erstes Einstempeln, erste Schicht, erste Rechnung: Wir sind an Ihrer Seite." },
    ],
    flowEyebrow: "Ideen von Ihnen",
    flowHeading: "Module wachsen aus Ihren Wünschen.",
    flowText: "Jede Rückmeldung aus dem Support kann der Keim für das nächste Modul sein. Für Kundinnen und Kunden, die es wünschen, entwickeln wir das Modul gemeinsam.",
    flowSteps: ["Wunsch schildern", "Gemeinsam klären", "Modul entwickeln", "Wird Ihrem Konto hinzugefügt"],
    flowExamplesLabel: "Beispielwünsche",
    flowExamples: ["Vitrine: Übertrag und Schwundbericht", "Einsatzplanung", "Fahrtenbuch"],
    voicesEyebrow: "Rückmeldungen",
    voicesHeading: "Das sagen unsere Kunden.",
    voices: [
      { quote: "Lohn und Buchhaltung am Monatsende dauerten früher zwei Tage. Jetzt bestätigt das Team die Stunden selbst und ich kontrolliere nur.", name: "Anna K.", role: "Café-Inhaberin, Zürich" },
      { quote: "Das Support-Team kam in unsere Küche und hat die HACCP-Protokolle mit uns eingerichtet. Seit der ersten Woche brauchen wir kein Papier mehr.", name: "Marco B.", role: "Restaurantleiter" },
    ],
    ctaHeading: "Haben Sie eine Frage?",
    ctaText: "Schreiben Sie uns, wir melden uns bei Ihnen. Oder schauen Sie sich das Programm zuerst in der Schnell-Demo an.",
    ctaPrimary: "Support anfragen",
    ctaSecondary: "Schnell-Demo",
  },
};
