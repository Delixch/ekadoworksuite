import type { Locale } from "./useLocale";
import type { CompanyKey } from "@/lib/company";

/** Impressum, Datenschutz ve çerez şeridi metinleri (3 dil). Firma bilgileri src/lib/company.ts içinde. */
type Block = { h: string; p: string[] };

export type Legal = {
  links: { imprint: string; privacy: string };
  missing: (label: string) => string;
  cookie: { text: string; ok: string; more: string };
  imprint: { title: string; intro: string; labels: Record<CompanyKey, string>; rows: CompanyKey[]; blocks: Block[] };
  privacy: { title: string; updated: string; blocks: Block[] };
  back: string;
};

export const legal: Record<Locale, Legal> = {
  tr: {
    links: { imprint: "Künye (Impressum)", privacy: "Gizlilik (Datenschutz)" },
    missing: (l) => `[${l} girilmeli]`,
    cookie: {
      text: "Bu sitede takip veya reklam çerezi yok. Yalnızca dil, tema ve sohbet sesi tercihiniz cihazınızda saklanır.",
      ok: "Tamam",
      more: "Ayrıntı",
    },
    imprint: {
      title: "Künye (Impressum)",
      intro: "Hizmet sağlayıcıya ilişkin bilgiler:",
      labels: {
        name: "Firma unvanı",
        street: "Adres",
        city: "Posta kodu / Şehir",
        country: "Ülke",
        representative: "Yetkili kişi",
        email: "E-posta",
        phone: "Telefon",
        website: "Web sitesi",
        taxId: "Vergi bilgisi",
        registerNo: "Sicil / MERSİS no",
        privacyEmail: "Gizlilik başvurusu",
      },
      rows: ["name", "street", "city", "country", "representative", "email", "phone", "website", "taxId", "registerNo"],
      blocks: [
        {
          h: "İçerikten sorumlu",
          p: ["Bu sitenin içeriğinden yukarıda adı geçen yetkili kişi sorumludur."],
        },
        {
          h: "Dış bağlantılar",
          p: ["Sitemiz üçüncü kişilerin sayfalarına bağlantı içerebilir. Bu sayfaların içeriğinden ilgili sağlayıcılar sorumludur."],
        },
      ],
    },
    privacy: {
      title: "Gizlilik Politikası (Datenschutz)",
      updated: "Son güncelleme: Ekim 2026",
      blocks: [
        {
          h: "1. Sorumlu",
          p: ["Kişisel verilerinizin işlenmesinden sorumlu olan taraf Künye sayfasında belirtilen firmadır. Gizlilik taleplerinizi aynı sayfadaki e-posta adresine gönderebilirsiniz."],
        },
        {
          h: "2. Barındırma ve sunucu kayıtları",
          p: ["Site Vercel Inc. (ABD) altyapısında barındırılır. Siteyi açtığınızda IP adresiniz, tarayıcı bilginiz ve istek zamanı güvenlik ve çalışma amacıyla geçici sunucu kayıtlarına yazılır. Hukuki dayanak: meşru menfaat (siteyi güvenli ve çalışır tutmak)."],
        },
        {
          h: "3. Çerezler ve cihazda saklanan veriler",
          p: [
            "Sitede analiz, takip veya reklam çerezi kullanılmaz. Yalnızca seçtiğiniz dil, tema ve sohbet sesi tercihi, siteyi sizin için çalıştırmak üzere cihazınızın yerel depolamasında tutulur. Bu veriler bize gönderilmez ve tarayıcınızdan silebilirsiniz.",
          ],
        },
        {
          h: "4. İletişim ve demo talepleri",
          p: ["Bize e-posta, telefon ya da demo talebi ile ulaştığınızda ilettiğiniz bilgiler (ad, iletişim bilgisi, otel bilgisi, mesajınız) talebinizi yanıtlamak için kullanılır ve gereken süre boyunca saklanır."],
        },
        {
          h: "5. Sohbet asistanı",
          p: [
            "Sohbet asistanına yazdığınız mesajlar cevap üretmek için işlenir. Yapay zekâ servisi bağlı olduğunda mesajlarınız bu servisin sağlayıcısına iletilir. Lütfen sohbette sağlık, kimlik veya ödeme bilgisi paylaşmayın.",
          ],
        },
        {
          h: "6. Haklarınız",
          p: [
            "Verilerinize erişme, düzeltilmesini, silinmesini veya işlenmesinin kısıtlanmasını isteme, veri taşınabilirliği ve işlemeye itiraz haklarına sahipsiniz. Türkiye'de KVKK madde 11 kapsamındaki haklarınızı kullanabilirsiniz. AB/İsviçre'de yaşıyorsanız bulunduğunuz yerin veri koruma otoritesine şikâyet edebilirsiniz.",
          ],
        },
        {
          h: "7. Değişiklikler",
          p: ["Bu metin gerektiğinde güncellenir; geçerli sürüm bu sayfadadır."],
        },
      ],
    },
    back: "Ana sayfa",
  },

  en: {
    links: { imprint: "Legal notice (Impressum)", privacy: "Privacy (Datenschutz)" },
    missing: (l) => `[${l} required]`,
    cookie: {
      text: "This site uses no tracking or advertising cookies. Only your language, theme and chat voice preference are stored on your device.",
      ok: "OK",
      more: "Details",
    },
    imprint: {
      title: "Legal notice (Impressum)",
      intro: "Information about the service provider:",
      labels: {
        name: "Company name",
        street: "Address",
        city: "Postcode / City",
        country: "Country",
        representative: "Represented by",
        email: "Email",
        phone: "Phone",
        website: "Website",
        taxId: "Tax information",
        registerNo: "Register / registration no.",
        privacyEmail: "Privacy requests",
      },
      rows: ["name", "street", "city", "country", "representative", "email", "phone", "website", "taxId", "registerNo"],
      blocks: [
        {
          h: "Responsible for content",
          p: ["The person named above is responsible for the content of this website."],
        },
        {
          h: "External links",
          p: ["Our website may link to third-party pages. The respective providers are responsible for their content."],
        },
      ],
    },
    privacy: {
      title: "Privacy policy (Datenschutz)",
      updated: "Last updated: October 2026",
      blocks: [
        {
          h: "1. Controller",
          p: ["The company named in the legal notice is responsible for processing your personal data. Send privacy requests to the email address given there."],
        },
        {
          h: "2. Hosting and server logs",
          p: ["The site is hosted on the infrastructure of Vercel Inc. (USA). When you open the site, your IP address, browser information and request time are written to temporary server logs for security and operation. Legal basis: legitimate interest (keeping the site secure and running)."],
        },
        {
          h: "3. Cookies and data stored on your device",
          p: [
            "The site uses no analytics, tracking or advertising cookies. Only your chosen language, theme and chat voice preference are kept in your device's local storage so the site works for you. This data is not sent to us and you can delete it in your browser.",
          ],
        },
        {
          h: "4. Contact and demo requests",
          p: ["If you contact us by email, phone or demo request, the details you provide (name, contact details, hotel details, your message) are used to answer your request and kept for as long as necessary."],
        },
        {
          h: "5. Chat assistant",
          p: [
            "Messages you write to the chat assistant are processed to produce an answer. When the AI service is connected, your messages are sent to its provider. Please do not share health, identity or payment data in the chat.",
          ],
        },
        {
          h: "6. Your rights",
          p: [
            "You have the right to access, rectify and erase your data, to restrict processing, to data portability and to object. In Türkiye you can exercise your rights under Article 11 of the KVKK. If you live in the EU or Switzerland you may lodge a complaint with your local data protection authority.",
          ],
        },
        {
          h: "7. Changes",
          p: ["This text is updated when necessary; the current version is on this page."],
        },
      ],
    },
    back: "Home",
  },

  de: {
    links: { imprint: "Impressum", privacy: "Datenschutz" },
    missing: (l) => `[${l} eintragen]`,
    cookie: {
      text: "Diese Seite verwendet keine Tracking- oder Werbe-Cookies. Nur Ihre Einstellungen für Sprache, Design und Chat-Stimme werden auf Ihrem Gerät gespeichert.",
      ok: "OK",
      more: "Details",
    },
    imprint: {
      title: "Impressum",
      intro: "Angaben zum Diensteanbieter:",
      labels: {
        name: "Firma",
        street: "Anschrift",
        city: "PLZ / Ort",
        country: "Land",
        representative: "Vertreten durch",
        email: "E-Mail",
        phone: "Telefon",
        website: "Website",
        taxId: "Steuerangaben / USt-IdNr.",
        registerNo: "Registereintrag",
        privacyEmail: "Datenschutzanfragen",
      },
      rows: ["name", "street", "city", "country", "representative", "email", "phone", "website", "taxId", "registerNo"],
      blocks: [
        {
          h: "Verantwortlich für den Inhalt",
          p: ["Für die Inhalte dieser Website ist die oben genannte vertretungsberechtigte Person verantwortlich."],
        },
        {
          h: "Externe Links",
          p: ["Unsere Website kann Links zu Seiten Dritter enthalten. Für deren Inhalte sind die jeweiligen Anbieter verantwortlich."],
        },
      ],
    },
    privacy: {
      title: "Datenschutzerklärung",
      updated: "Stand: Oktober 2026",
      blocks: [
        {
          h: "1. Verantwortlicher",
          p: ["Verantwortlich für die Verarbeitung Ihrer personenbezogenen Daten ist die im Impressum genannte Firma. Datenschutzanfragen richten Sie bitte an die dort angegebene E-Mail-Adresse."],
        },
        {
          h: "2. Hosting und Server-Logfiles",
          p: ["Die Website wird bei Vercel Inc. (USA) gehostet. Beim Aufruf werden Ihre IP-Adresse, Browserangaben und der Zeitpunkt der Anfrage zur Sicherheit und zum Betrieb vorübergehend in Server-Logfiles gespeichert. Rechtsgrundlage: berechtigtes Interesse (sicherer und stabiler Betrieb der Website)."],
        },
        {
          h: "3. Cookies und auf Ihrem Gerät gespeicherte Daten",
          p: [
            "Die Website verwendet keine Analyse-, Tracking- oder Werbe-Cookies. Nur Ihre gewählte Sprache, das Design und die Chat-Stimme werden im lokalen Speicher Ihres Geräts abgelegt, damit die Seite für Sie funktioniert. Diese Daten werden nicht an uns übertragen und können in Ihrem Browser gelöscht werden.",
          ],
        },
        {
          h: "4. Kontakt und Demo-Anfragen",
          p: ["Wenn Sie uns per E-Mail, Telefon oder Demo-Anfrage kontaktieren, werden Ihre Angaben (Name, Kontaktdaten, Hoteldaten, Nachricht) zur Bearbeitung Ihrer Anfrage verwendet und so lange wie nötig gespeichert."],
        },
        {
          h: "5. Chat-Assistent",
          p: [
            "Nachrichten an den Chat-Assistenten werden verarbeitet, um eine Antwort zu erzeugen. Ist der KI-Dienst angebunden, werden Ihre Nachrichten an dessen Anbieter übermittelt. Bitte geben Sie im Chat keine Gesundheits-, Ausweis- oder Zahlungsdaten an.",
          ],
        },
        {
          h: "6. Ihre Rechte",
          p: [
            "Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. In der Türkei können Sie Ihre Rechte nach Art. 11 KVKK ausüben. Wenn Sie in der EU oder der Schweiz leben, können Sie sich bei Ihrer Datenschutzbehörde beschweren.",
          ],
        },
        {
          h: "7. Änderungen",
          p: ["Dieser Text wird bei Bedarf aktualisiert; maßgeblich ist die auf dieser Seite veröffentlichte Fassung."],
        },
      ],
    },
    back: "Startseite",
  },
};
