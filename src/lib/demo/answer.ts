/**
 * Sayfadaki deneme sohbeti için SAHTE yanıt üretici: otelin yazdığı bilgilerden anahtar kelimeyle cevap verir.
 * Gerçek yapay zeka bağlanınca bu dosya yerine api.ts üzerinden sunucu yanıtı gelir.
 */
import type { Locale } from "@/i18n/useLocale";
import type { DemoInfo } from "./api";

const words = {
  rooms: ["oda", "fiyat", "ücret", "kaç", "room", "price", "cost", "rate", "night", "zimmer", "preis", "kosten", "nacht", "suite", "bungalov"],
  food: ["kahvalt", "yemek", "restoran", "yeme", "içme", "breakfast", "food", "restaurant", "dinner", "frühstück", "essen", "restaurant"],
  location: ["konum", "adres", "nerede", "ulaş", "havalimanı", "uzak", "location", "address", "where", "airport", "far", "lage", "adresse", "wo ", "flughafen"],
  other: ["check", "giriş", "çıkış", "otopark", "havuz", "evcil", "pool", "parking", "pet", "haustier", "parkplatz", "wifi", "wi-fi"],
  hello: ["merhaba", "selam", "hello", "hi ", "hey", "hallo", "guten"],
};

const t = {
  tr: {
    hello: (n: string) => `Merhaba! Ben ${n} için hazırlanan demo asistanım. Odalar, fiyatlar, kahvaltı ya da konum hakkında sorabilirsiniz.`,
    rooms: (v: string) => `Odalarımız ve fiyatlarımız şöyle: ${v}. Hangi tarihler için bakmamı istersiniz?`,
    food: (v: string) => `Yeme içme hakkında şunu paylaşabilirim: ${v}`,
    location: (v: string) => `Konum ve ulaşım: ${v}`,
    other: (v: string) => `Bu konuda bildiklerim: ${v}`,
    missing: "Bu bilgiyi formda eklemediniz, o yüzden kesin söyleyemem. Gerçek kurulumda bunu otelin sistemlerinden öğrenirim.",
    fallback: "Bu soruyu şu an yanıtlayamıyorum. Gerçek kurulumda bilgi bankanız ve PMS bağlantısıyla çok daha fazlasını yanıtlarım.",
  },
  en: {
    hello: (n: string) => `Hello! I'm the demo assistant prepared for ${n}. You can ask about rooms, prices, breakfast or location.`,
    rooms: (v: string) => `Our rooms and prices: ${v}. Which dates would you like me to check?`,
    food: (v: string) => `About food and drinks: ${v}`,
    location: (v: string) => `Location and access: ${v}`,
    other: (v: string) => `Here is what I know about that: ${v}`,
    missing: "You did not add this information in the form, so I can't say for sure. In a real setup I learn it from the hotel's systems.",
    fallback: "I can't answer that right now. In a real setup, with your knowledge base and PMS connection, I can answer much more.",
  },
  de: {
    hello: (n: string) => `Guten Tag! Ich bin der Demo-Assistent für ${n}. Fragen Sie mich gern zu Zimmern, Preisen, Frühstück oder Lage.`,
    rooms: (v: string) => `Unsere Zimmer und Preise: ${v}. Für welche Daten soll ich nachsehen?`,
    food: (v: string) => `Zu Essen und Trinken: ${v}`,
    location: (v: string) => `Lage und Anreise: ${v}`,
    other: (v: string) => `Das weiß ich dazu: ${v}`,
    missing: "Diese Angabe haben Sie im Formular nicht gemacht, daher kann ich es nicht sicher sagen. Im echten Betrieb erfahre ich es aus den Systemen des Hotels.",
    fallback: "Das kann ich gerade nicht beantworten. Im echten Betrieb mit Wissensdatenbank und PMS-Anbindung kann ich deutlich mehr beantworten.",
  },
};

const has = (q: string, list: string[]) => list.some((w) => q.includes(w));

export function demoAnswer(info: DemoInfo, question: string, locale: Locale): string {
  const q = ` ${question.toLowerCase()} `;
  const x = t[locale];
  const oneLine = (s: string) => s.replace(/\s*\n+\s*/g, "; ").trim().replace(/[.!?]+$/, "");
  if (has(q, words.rooms)) return x.rooms(oneLine(info.rooms));
  if (has(q, words.food)) return info.food.trim() ? x.food(oneLine(info.food)) : x.missing;
  if (has(q, words.location)) return info.location.trim() ? x.location(oneLine(info.location)) : x.missing;
  if (has(q, words.other)) return info.other.trim() ? x.other(oneLine(info.other)) : x.missing;
  if (has(q, words.hello)) return x.hello(info.hotelName);
  return x.fallback;
}

export function demoGreeting(info: DemoInfo, locale: Locale) {
  return t[locale].hello(info.hotelName);
}

/** Formdaki oda metninden fiyatlı satırları sayar (sonuç ekranında "n oda tipi anlaşıldı") */
export function countRooms(rooms: string) {
  return rooms
    .split(/[\n;,]+/)
    .map((s) => s.trim())
    .filter((s) => /\d/.test(s)).length;
}
