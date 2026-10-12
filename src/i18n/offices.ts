import type { Locale } from "./useLocale";

/** İletişim bölümü metinleri (3 dil). Adresler ve numaralar src/lib/offices.ts içinde. */
export const officeText: Record<
  Locale,
  { eyebrow: string; heading: string; email: string; phone: string; mobile: string; openMap: string; hq: string; hqCountry: string; ch: string; chCountry: string }
> = {
  tr: { eyebrow: "İletişim", heading: "Bize ulaşın, buradayız.", email: "E-posta", phone: "Telefon", mobile: "Cep telefonu", openMap: "Haritada aç", hq: "Genel Merkez", hqCountry: "Türkiye", ch: "İsviçre Ofisi", chCountry: "İsviçre" },
  en: { eyebrow: "Contact", heading: "Get in touch, we are here.", email: "Email", phone: "Phone", mobile: "Mobile", openMap: "Open in Maps", hq: "Headquarters", hqCountry: "Türkiye", ch: "Switzerland office", chCountry: "Switzerland" },
  de: { eyebrow: "Kontakt", heading: "Schreiben Sie uns, wir sind da.", email: "E-Mail", phone: "Telefon", mobile: "Mobiltelefon", openMap: "In Karten öffnen", hq: "Hauptsitz", hqCountry: "Türkei", ch: "Büro Schweiz", chCountry: "Schweiz" },
};
