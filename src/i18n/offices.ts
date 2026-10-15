import type { Locale } from "./useLocale";

/** İletişim bölümü metinleri (3 dil). Adresler ve numaralar src/lib/offices.ts içinde. */
export const officeText: Record<
  Locale,
  { eyebrow: string; heading: string; lead: string; email: string; phone: string; mobile: string; openMap: string; hq: string; hqCountry: string; ch: string; chCountry: string }
> = {
  tr: { eyebrow: "İletişim", heading: "Bize ulaşın, buradayız.", lead: "Kurulum, fiyat ya da modüller hakkında sorunuz mu var? Yazın, en kısa sürede size dönelim.", email: "E-posta", phone: "Telefon", mobile: "Cep telefonu", openMap: "Haritada aç", hq: "Genel Merkez", hqCountry: "Türkiye", ch: "Ekado, Zürih", chCountry: "İsviçre" },
  en: { eyebrow: "Contact", heading: "Get in touch, we are here.", lead: "Questions about setup, pricing or modules? Write to us and we will get back to you as soon as possible.", email: "Email", phone: "Phone", mobile: "Mobile", openMap: "Open in Maps", hq: "Headquarters", hqCountry: "Türkiye", ch: "Ekado, Zurich", chCountry: "Switzerland" },
  de: { eyebrow: "Kontakt", heading: "Schreiben Sie uns, wir sind da.", lead: "Fragen zu Einrichtung, Preis oder Modulen? Schreiben Sie uns, wir melden uns so schnell wie möglich.", email: "E-Mail", phone: "Telefon", mobile: "Mobiltelefon", openMap: "In Karten öffnen", hq: "Hauptsitz", hqCountry: "Türkei", ch: "Ekado, Zürich", chCountry: "Schweiz" },
};
