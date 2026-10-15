import type { Locale } from "./useLocale";

/** "Bize Ulaşın" iletişim penceresinin metinleri (3 dil). */
export type ContactText = {
  title: string;
  lead: string;
  close: string;
  route: { from: string; to: string };
  fields: {
    name: string;
    email: string;
    phone: string;
    hotel: string;
    topic: string;
    message: string;
  };
  ph: { name: string; email: string; phone: string; hotel: string; topic: string; message: string };
  optional: string;
  topics: string[];
  consent: string;
  consentLink: string;
  send: string;
  sending: string;
  errors: { required: string; email: string; consent: string; server: string };
  sent: { title: string; text: string; again: string };
  mailto: { title: string; text: string };
  demo: {
    topic: string;
    title: string;
    lead: string;
    fields: { first: string; last: string; email: string; wish: string };
    ph: { first: string; last: string; email: string; wish: string };
    wishDefault: string;
    send: string;
    sending: string;
    sent: { title: string; text: string };
  };
};

export const contact: Record<Locale, ContactText> = {
  tr: {
    title: "Bize yazın",
    lead: "Birkaç satır yeter. En kısa sürede size dönelim.",
    close: "Kapat",
    route: { from: "Siz", to: "Ekado" },
    fields: { name: "Adınız", email: "E-posta", phone: "Telefon", hotel: "İşletme / firma", topic: "Konu", message: "İsteğiniz" },
    ph: { name: "Ad Soyad", email: "ornek@firma.com", phone: "+90 5xx xxx xx xx", hotel: "İşletmenizin adı", topic: "Bir konu seçin", message: "Ne yapmak istediğinizi kısaca anlatın…" },
    optional: "isteğe bağlı",
    topics: [
      "Genel Bakış ve İşletme",
      "Satın Alma ve Faturalar",
      "Personel ve Bordro",
      "Finans ve Muhasebe",
      "Fiyat teklifi",
      "Demo talebi",
      "İş birliği",
      "Diğer",
    ],
    consent: "Bilgilerimin talebimi yanıtlamak için kullanılmasını kabul ediyorum.",
    consentLink: "Gizlilik",
    send: "Gönder",
    sending: "Yola çıkıyor…",
    errors: {
      required: "Bu alan gerekli",
      email: "Geçerli bir e-posta yazın",
      consent: "Devam etmek için onay gerekli",
      server: "Gönderilemedi, lütfen biraz sonra tekrar deneyin.",
    },
    sent: { title: "Mesajınız yola çıktı", text: "En kısa sürede e-postayla dönüş yapacağız. Teşekkürler!", again: "Kapat" },
    mailto: { title: "E-posta uygulamanız açıldı", text: "Mesajınız hazır. Göndermeyi e-posta uygulamanızdan tamamlayın." },
    demo: {
      topic: "Hızlı demo",
      title: "Hızlı demo",
      lead: "Adınızı ve e-postanızı bırakın, demo giriş bilgilerini size gönderelim.",
      fields: { first: "Ad", last: "Soyad", email: "E-posta", wish: "Neye küçük bir göz atmak istersiniz?" },
      ph: { first: "Adınız", last: "Soyadınız", email: "ornek@firma.com", wish: "Örneğin vardiya planı, bordro, HACCP…" },
      wishDefault: "(belirtilmedi)",
      send: "Gönder",
      sending: "Yola çıkıyor…",
      sent: { title: "Giriş bilgileriniz yolda", text: "Giriş bilgileriniz birazdan e-postanıza gelecek. Gelen kutunuza ve istenmeyen klasörüne bakın." },
    },
  },
  en: {
    title: "Write to us",
    lead: "A few lines are enough. We'll get back to you as soon as possible.",
    close: "Close",
    route: { from: "You", to: "Ekado" },
    fields: { name: "Your name", email: "Email", phone: "Phone", hotel: "Business / company", topic: "Topic", message: "Your request" },
    ph: { name: "Full name", email: "you@company.com", phone: "+41 xx xxx xx xx", hotel: "Your business name", topic: "Choose a topic", message: "Briefly tell us what you'd like to do…" },
    optional: "optional",
    topics: [
      "Overview & Operations",
      "Purchasing & Invoices",
      "Staff & Payroll",
      "Finance & Accounting",
      "Price quote",
      "Demo request",
      "Partnership",
      "Other",
    ],
    consent: "I agree that my details are used to answer my request.",
    consentLink: "Privacy",
    send: "Send",
    sending: "Taking off…",
    errors: {
      required: "This field is required",
      email: "Enter a valid email",
      consent: "Consent is required to continue",
      server: "Could not be sent, please try again in a moment.",
    },
    sent: { title: "Your message is on its way", text: "We'll reply by email as soon as possible. Thank you!", again: "Close" },
    mailto: { title: "Your email app was opened", text: "Your message is ready. Finish sending it in your email app." },
    demo: {
      topic: "Quick demo",
      title: "Quick demo",
      lead: "Leave your name and email and we will send you the demo login.",
      fields: { first: "First name", last: "Last name", email: "Email", wish: "What would you like a quick look at?" },
      ph: { first: "First name", last: "Last name", email: "you@company.com", wish: "For example shift planning, payroll, HACCP…" },
      wishDefault: "(not specified)",
      send: "Send",
      sending: "Taking off…",
      sent: { title: "Your login details are on the way", text: "Your login details will reach your email shortly. Check your inbox and your spam folder." },
    },
  },
  de: {
    title: "Schreiben Sie uns",
    lead: "Ein paar Zeilen genügen. Wir melden uns so schnell wie möglich.",
    close: "Schließen",
    route: { from: "Sie", to: "Ekado" },
    fields: { name: "Ihr Name", email: "E-Mail", phone: "Telefon", hotel: "Betrieb / Firma", topic: "Thema", message: "Ihr Anliegen" },
    ph: { name: "Vor- und Nachname", email: "sie@firma.com", phone: "+41 xx xxx xx xx", hotel: "Name Ihres Betriebs", topic: "Thema wählen", message: "Schildern Sie kurz, was Sie vorhaben…" },
    optional: "optional",
    topics: [
      "Übersicht & Betrieb",
      "Einkauf & Rechnungen",
      "Personal & Lohn",
      "Finanzen & Buchhaltung",
      "Preisofferte",
      "Demo-Anfrage",
      "Zusammenarbeit",
      "Sonstiges",
    ],
    consent: "Ich bin einverstanden, dass meine Angaben zur Beantwortung meiner Anfrage verwendet werden.",
    consentLink: "Datenschutz",
    send: "Senden",
    sending: "Startet…",
    errors: {
      required: "Pflichtfeld",
      email: "Bitte eine gültige E-Mail angeben",
      consent: "Zum Fortfahren ist Ihre Zustimmung nötig",
      server: "Senden fehlgeschlagen, bitte versuchen Sie es gleich noch einmal.",
    },
    sent: { title: "Ihre Nachricht ist unterwegs", text: "Wir antworten so schnell wie möglich per E-Mail. Vielen Dank!", again: "Schließen" },
    mailto: { title: "Ihre E-Mail-App wurde geöffnet", text: "Ihre Nachricht ist vorbereitet. Schließen Sie das Senden in Ihrer E-Mail-App ab." },
    demo: {
      topic: "Schnell-Demo",
      title: "Schnell-Demo",
      lead: "Hinterlassen Sie Name und E-Mail, wir senden Ihnen die Demo-Zugangsdaten.",
      fields: { first: "Vorname", last: "Nachname", email: "E-Mail", wish: "Worin möchten Sie einen kleinen Einblick?" },
      ph: { first: "Vorname", last: "Nachname", email: "sie@firma.com", wish: "Zum Beispiel Dienstplan, Lohn, HACCP…" },
      wishDefault: "(keine Angabe)",
      send: "Senden",
      sending: "Hebt ab…",
      sent: { title: "Ihre Zugangsdaten sind unterwegs", text: "Ihre Zugangsdaten kommen in Kürze per E-Mail. Prüfen Sie auch den Spam-Ordner." },
    },
  },
};
