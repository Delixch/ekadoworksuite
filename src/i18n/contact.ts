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
};

export const contact: Record<Locale, ContactText> = {
  tr: {
    title: "Bize yazın",
    lead: "Birkaç satır yeter. En kısa sürede size dönelim.",
    close: "Kapat",
    route: { from: "Siz", to: "Punn" },
    fields: { name: "Adınız", email: "E-posta", phone: "Telefon", hotel: "Otel / firma", topic: "Konu", message: "İsteğiniz" },
    ph: { name: "Ad Soyad", email: "ornek@otel.com", phone: "+90 5xx xxx xx xx", hotel: "Otelinizin adı", topic: "Bir konu seçin", message: "Ne yapmak istediğinizi kısaca anlatın…" },
    optional: "isteğe bağlı",
    topics: [
      "Dijital Resepsiyon",
      "Yapay Zekâ Telefon Asistanı",
      "PMS / Otel Yönetim Sistemi",
      "Akıllı Kapı / Kilit Sistemleri",
      "Paketler ve fiyatlar",
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
  },
  en: {
    title: "Write to us",
    lead: "A few lines are enough. We'll get back to you as soon as possible.",
    close: "Close",
    route: { from: "You", to: "Punn" },
    fields: { name: "Your name", email: "Email", phone: "Phone", hotel: "Hotel / company", topic: "Topic", message: "Your request" },
    ph: { name: "Full name", email: "you@hotel.com", phone: "+41 xx xxx xx xx", hotel: "Your hotel's name", topic: "Choose a topic", message: "Briefly tell us what you'd like to do…" },
    optional: "optional",
    topics: [
      "Digital Receptionist",
      "AI Phone Assistant",
      "PMS / Hotel Management System",
      "Smart Door / Lock Systems",
      "Plans and pricing",
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
  },
  de: {
    title: "Schreiben Sie uns",
    lead: "Ein paar Zeilen genügen. Wir melden uns so schnell wie möglich.",
    close: "Schließen",
    route: { from: "Sie", to: "Punn" },
    fields: { name: "Ihr Name", email: "E-Mail", phone: "Telefon", hotel: "Hotel / Firma", topic: "Thema", message: "Ihr Anliegen" },
    ph: { name: "Vor- und Nachname", email: "sie@hotel.com", phone: "+41 xx xxx xx xx", hotel: "Name Ihres Hotels", topic: "Thema wählen", message: "Schildern Sie kurz, was Sie vorhaben…" },
    optional: "optional",
    topics: [
      "Digitale Rezeption",
      "KI-Telefonassistent",
      "PMS / Hotelverwaltungssystem",
      "Smarte Tür- / Schließsysteme",
      "Pakete und Preise",
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
  },
};
