import type { Locale } from "./useLocale";

/** Ana sayfa açılış damgaları (Remotion): dört kelime cihazların üstüne damga gibi basılır, sonra büyük EKADO damgası. */
export type StampText = { words: [string, string, string, string]; brand: string; claim: string; sound: string; replay: string };

export const stamp: Record<Locale, StampText> = {
  tr: {
    words: ["Kullanıcı dostu", "Müşteriye duyarlı", "Size göre fiyat", "Bütçe dostu"],
    brand: "EKADO",
    claim: "Muhasebeyi yeniden kuruyoruz",
    sound: "Sesli izle",
    replay: "Tekrar",
  },
  de: {
    words: ["Benutzerfreundlich", "Kundennah", "Preis nach Mass", "Budgetfreundlich"],
    brand: "EKADO",
    claim: "Wir bauen Buchhaltung neu",
    sound: "Mit Ton ansehen",
    replay: "Nochmal",
  },
  en: {
    words: ["User-friendly", "Close to customers", "Priced for you", "Budget-friendly"],
    brand: "EKADO",
    claim: "We are rebuilding accounting",
    sound: "Watch with sound",
    replay: "Again",
  },
};
