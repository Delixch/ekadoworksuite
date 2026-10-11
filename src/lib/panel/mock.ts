/**
 * ÖRNEK VERİ. Veritabanı bağlanana kadar paneli dolduran sahte veriler.
 * Gerçek veri geldiğinde bu dosya kullanılmaz (api.ts fetch'e geçer), silinebilir.
 */
import type {
  Booking,
  Channel,
  Conversation,
  Hotel,
  OverviewData,
  Room,
  RoomStatus,
  SetupConfig,
  StatsRange,
  TempCode,
} from "./types";

export const hotels: Hotel[] = [
  { id: "nani", name: "Nani Butik Otel", city: "Antalya", country: "TR", currency: "EUR", timezone: "Europe/Istanbul" },
  { id: "kernhof", name: "Hotel Kernhof Zürich", city: "Zürich", country: "CH", currency: "CHF", timezone: "Europe/Zurich" },
];

/** Aynı tohum aynı sayıları üretir: sayfa her açıldığında tutarlı görünür. */
export function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

const minutesAgo = (m: number) => new Date(Date.now() - m * 60_000).toISOString();
const daysFromNow = (d: number) => {
  const x = new Date();
  x.setDate(x.getDate() + d);
  return x.toISOString().slice(0, 10);
};

/* ------------------------------ Genel bakış ------------------------------ */

export function buildOverview(hotelId: string, range: StatsRange): OverviewData {
  const hotel = hotels.find((h) => h.id === hotelId) ?? hotels[0];
  const r = rng(hotelId === "nani" ? 7 : 19);
  const n = range === "today" ? 12 : range === "7d" ? 7 : 30;
  const scale = hotelId === "nani" ? 1 : 0.8;
  const series = Array.from({ length: n }, (_, i) => {
    const d = new Date();
    if (range === "today") d.setHours(d.getHours() - (n - 1 - i) * 2);
    else d.setDate(d.getDate() - (n - 1 - i));
    const wave = 1 + 0.35 * Math.sin(i / (range === "30d" ? 3.2 : 1.6));
    const base = range === "today" ? 9 : 38;
    const conversations = Math.round((base + r() * base * 0.6) * wave * scale);
    return {
      date: d.toISOString(),
      conversations,
      bookings: Math.max(0, Math.round(conversations * (0.1 + r() * 0.12))),
    };
  });
  const total = series.reduce((a, s) => a + s.conversations, 0);
  const bookingsTotal = series.reduce((a, s) => a + s.bookings, 0);
  const trend = (base: number, spread: number) => Array.from({ length: 14 }, (_, i) => Math.round((base + r() * spread + i * (spread / 14)) * 10) / 10);

  return {
    kpis: {
      conversations: { value: total, delta: 12.4, trend: series.map((s) => s.conversations).slice(-14) },
      responseSeconds: { value: 4.2, delta: -18.6, trend: trend(6, -2.5).map((v) => Math.abs(v)) },
      autoResolved: { value: 87, delta: 3.1, trend: trend(80, 8) },
      revenue: { value: Math.round(bookingsTotal * (hotelId === "nani" ? 312 : 489)), delta: 21.7, trend: trend(30, 40) },
    },
    series,
    channels: [
      { channel: "whatsapp", count: Math.round(total * 0.46) },
      { channel: "instagram", count: Math.round(total * 0.19) },
      { channel: "web", count: Math.round(total * 0.15) },
      { channel: "phone", count: Math.round(total * 0.12) },
      { channel: "messenger", count: Math.round(total * 0.08) },
    ],
    languages: [
      { lang: "de", count: Math.round(total * 0.31) },
      { lang: "en", count: Math.round(total * 0.27) },
      { lang: "ru", count: Math.round(total * 0.18) },
      { lang: "tr", count: Math.round(total * 0.16) },
      { lang: "ja", count: Math.round(total * 0.05) },
      { lang: "ar", count: Math.round(total * 0.03) },
    ],
    topIntents: [
      { intent: "price", count: Math.round(total * 0.28) },
      { intent: "booking", count: Math.round(total * 0.24) },
      { intent: "info", count: Math.round(total * 0.21) },
      { intent: "checkin", count: Math.round(total * 0.14) },
      { intent: "lock", count: Math.round(total * 0.08) },
      { intent: "complaint", count: Math.round(total * 0.05) },
    ],
    rooms: buildRooms(hotelId),
    bookings: buildBookings(hotelId),
    currency: hotel.currency,
  };
}

/* ------------------------------ Odalar ve kilitler ------------------------------ */

const GUESTS = ["Anna Weber", "Mehmet Kaya", "Olga Ivanova", "James Carter", "Yuki Tanaka", "Lena Fischer", "Ahmed Nasser", "Sophie Martin", "Luca Rossi", "Elif Demir", "Tobias Keller", "Maria Lopez"];

export function buildRooms(hotelId: string): Room[] {
  const r = rng(hotelId === "nani" ? 3 : 11);
  const types = ["standard", "deluxe", "suite"];
  const rooms: Room[] = [];
  for (let floor = 1; floor <= 3; floor++) {
    for (let k = 1; k <= 8; k++) {
      const roll = r();
      const status: RoomStatus = roll < 0.55 ? "occupied" : roll < 0.72 ? "vacant" : roll < 0.86 ? "cleaning" : "arriving";
      const idx = (floor - 1) * 8 + (k - 1);
      const locked = r() > 0.2;
      rooms.push({
        id: `room-${floor}${k}`,
        number: `${floor}0${k}`,
        floor,
        roomTypeId: types[floor - 1],
        status,
        guestName: status === "occupied" || status === "arriving" ? GUESTS[idx % GUESTS.length] : undefined,
        lock: {
          id: `lock-${floor}${k}`,
          provider: idx % 4 === 0 ? "tuya" : "ttlock",
          battery: Math.round(24 + r() * 76),
          online: r() > 0.07,
          locked,
          lastEvent: {
            type: (["unlock_code", "unlock_app", "unlock_card", "unlock_fp", "lock"] as const)[Math.floor(r() * 5)],
            at: minutesAgo(Math.round(5 + r() * 900)),
            by: GUESTS[(idx + 3) % GUESTS.length],
          },
        },
      });
    }
  }
  return rooms;
}

export function buildTempCodes(rooms: Room[]): TempCode[] {
  const r = rng(5);
  return rooms
    .filter((x) => x.status === "occupied" || x.status === "arriving")
    .slice(0, 6)
    .map((room, i) => ({
      id: `code-${i}`,
      roomId: room.id,
      code: String(Math.floor(1000000 + r() * 8999999)),
      guestName: room.guestName ?? "",
      validFrom: daysFromNow(-1),
      validTo: daysFromNow(2 + (i % 4)),
      sentVia: (["whatsapp", "instagram", "messenger", "web"] as Channel[])[i % 4],
    }));
}

/* ------------------------------ Rezervasyonlar ------------------------------ */

export function buildBookings(hotelId: string): Booking[] {
  const hotel = hotels.find((h) => h.id === hotelId) ?? hotels[0];
  const r = rng(hotelId === "nani" ? 23 : 31);
  const names = [...GUESTS].sort(() => r() - 0.5).slice(0, 7);
  const sources: Booking["source"][] = ["ai", "ai", "web", "ai", "ota", "phone", "ai"];
  const statuses: Booking["status"][] = ["confirmed", "pending", "checked_in", "confirmed", "confirmed", "pending", "checked_in"];
  return names.map((name, i) => {
    const nights = 2 + Math.floor(r() * 5);
    const ci = i - 2;
    return {
      id: `BK-${4810 + i}`,
      hotelId,
      guestId: `g${i}`,
      guestName: name,
      roomTypeId: ["standard", "deluxe", "suite"][i % 3],
      roomNumber: statuses[i] === "checked_in" ? `${1 + (i % 3)}0${1 + i}` : undefined,
      checkIn: daysFromNow(ci),
      checkOut: daysFromNow(ci + nights),
      adults: 1 + (i % 3),
      total: Math.round(nights * (110 + (i % 3) * 70 + r() * 20)),
      currency: hotel.currency,
      status: statuses[i],
      source: sources[i],
    };
  });
}

/* ------------------------------ Konuşmalar ------------------------------ */

export function buildConversations(hotelId: string): Conversation[] {
  const mk = (
    id: string,
    name: string,
    lang: string,
    country: string,
    channel: Channel,
    status: Conversation["status"],
    intent: Conversation["intent"],
    unread: number,
    ago: number,
    msgs: [Conversation["messages"][number]["sender"], string, string?][]
  ): Conversation => ({
    id,
    hotelId,
    guest: { id: `g-${id}`, name, lang, country },
    channel,
    status,
    intent,
    unread,
    lastMessageAt: minutesAgo(ago),
    messages: msgs.map(([sender, text, tr], i) => ({
      id: `${id}-m${i}`,
      conversationId: id,
      sender,
      text,
      textTranslated: sender === "guest" && lang !== "tr" ? tr : undefined,
      lang: sender === "guest" ? lang : lang,
      at: minutesAgo(ago + (msgs.length - i) * 1.5),
    })),
  });

  return [
    mk("c1", "Anna Weber", "de", "DE", "whatsapp", "ai", "booking", 0, 2, [
      ["guest", "Guten Tag! Haben Sie vom 14. bis 18. Oktober ein Doppelzimmer frei?", "İyi günler! 14-18 Ekim arası boş çift kişilik odanız var mı?"],
      ["ai", "Guten Tag Frau Weber! Ja, für den 14.–18. Oktober haben wir ein Deluxe-Doppelzimmer mit Balkon frei: 142 € pro Nacht inklusive Frühstück. Soll ich es für Sie reservieren?"],
      ["guest", "Ja bitte. Gibt es auch einen Parkplatz?", "Evet lütfen. Otopark da var mı?"],
      ["ai", "Selbstverständlich, der hauseigene Parkplatz ist kostenlos. Ich benötige nur Ihre E-Mail-Adresse für die Bestätigung."],
    ]),
    mk("c2", "Mehmet Kaya", "tr", "TR", "instagram", "ai", "price", 1, 7, [
      ["guest", "Merhaba, hafta sonu için fiyat alabilir miyim?"],
      ["ai", "Merhaba Mehmet Bey! Cuma-Pazar arası 2 gece için Standart oda 3.240 ₺, Deluxe oda 4.180 ₺ (kahvaltı dahil). Kaç kişi konaklayacaksınız?"],
      ["guest", "2 kişi. Deluxe'te deniz manzarası var mı?"],
    ]),
    mk("c3", "Olga Ivanova", "ru", "RU", "whatsapp", "waiting", "complaint", 2, 12, [
      ["guest", "Здравствуйте, в номере 204 не работает кондиционер уже второй день!", "Merhaba, 204 numaralı odada klima iki gündür çalışmıyor!"],
      ["ai", "Приношу извинения, Ольга. Я уже передала заявку технической службе и отмечу номер как приоритетный. Хотите, чтобы вас переселили в другой номер?"],
      ["guest", "Да, и я хочу поговорить с менеджером.", "Evet, ve müdürle konuşmak istiyorum."],
    ]),
    mk("c4", "James Carter", "en", "GB", "web", "human", "checkin", 0, 26, [
      ["guest", "Hi, we land at 11pm. Is late check-in possible?", "Merhaba, saat 23:00'te ineceğiz. Geç check-in mümkün mü?"],
      ["ai", "Of course, Mr Carter. Our front desk is staffed 24/7, and your smart lock code will be sent to you before arrival."],
      ["staff", "Hello Mr Carter, this is Selin from the front desk. Everything is prepared for your arrival, safe travels!"],
    ]),
    mk("c5", "Yuki Tanaka", "ja", "JP", "messenger", "ai", "info", 0, 41, [
      ["guest", "朝食は何時からですか？ベジタリアン対応はありますか？", "Kahvaltı saat kaçta başlıyor? Vejetaryen seçenek var mı?"],
      ["ai", "田中様、朝食は7:00〜10:30です。ベジタリアンメニューもご用意しております。事前にお知らせいただければ、ヴィーガン対応も可能です。"],
    ]),
    mk("c6", "Elif Demir", "tr", "TR", "phone", "closed", "lock", 0, 95, [
      ["guest", "Kapı şifresi çalışmıyor, 3. kattayım."],
      ["ai", "Elif Hanım, şifrenizi yeniden gönderiyorum: 4829173#. Hâlâ açılmazsa uygulamadan 'Uzaktan aç' deneyebilirsiniz."],
      ["guest", "Açıldı, teşekkürler!"],
    ]),
    mk("c7", "Ahmed Nasser", "ar", "AE", "whatsapp", "ai", "booking", 3, 4, [
      ["guest", "مرحبا، أريد حجز جناح لثلاث ليال بدءا من الخميس", "Merhaba, Perşembe'den başlayarak üç gece için bir süit rezerve etmek istiyorum"],
      ["ai", "مرحبا بك سيد أحمد! الجناح الفاخر متاح بسعر 389 € لليلة الواحدة. هل تفضل إطلالة على البحر؟"],
      ["guest", "نعم، وهل يوجد نقل من المطار؟", "Evet, havalimanından transfer var mı?"],
    ]),
    mk("c8", "Sophie Martin", "fr", "FR", "instagram", "ai", "price", 0, 140, [
      ["guest", "Bonjour, avez-vous une chambre familiale pour 4 personnes ?", "Merhaba, 4 kişilik aile odanız var mı?"],
      ["ai", "Bonjour Sophie ! Oui, notre suite familiale accueille 4 personnes : 268 € la nuit, petit-déjeuner inclus."],
    ]),
  ];
}

/* ------------------------------ Kurulum varsayılanları ------------------------------ */

export function defaultSetup(hotelId: string): SetupConfig {
  const hotel = hotels.find((h) => h.id === hotelId) ?? hotels[0];
  return {
    hotel: {
      name: hotel.name,
      stars: 4,
      address: hotelId === "nani" ? "Kaleiçi, Hesapçı Sk. 12" : "Kernstrasse 60",
      city: hotel.city,
      country: hotel.country,
      phone: hotelId === "nani" ? "+90 242 555 01 23" : "+41 44 555 01 23",
      email: hotelId === "nani" ? "info@nanibutik.example" : "info@kernhof.example",
      website: hotelId === "nani" ? "nanibutik.example" : "kernhof.example",
      checkIn: "14:00",
      checkOut: "11:00",
      description: "Şehrin kalbinde, sakin ve zarif bir butik otel. Kahvaltı dahil, ücretsiz otopark ve 24 saat resepsiyon.",
    },
    channels: {
      whatsapp: { connected: true, handle: "+90 533 401 90 35" },
      instagram: { connected: true, handle: "@nanibutikotel" },
      messenger: { connected: false, handle: "" },
      phone: { connected: false, handle: "" },
      web: { connected: true, handle: "nanibutik.example" },
    },
    languages: { enabled: ["tr", "en", "de", "ru"], default: "tr", autoDetect: true },
    persona: {
      name: "Nani",
      tone: 62,
      emoji: true,
      greeting: "Merhaba, ben Nani! Nani Butik Otel'in dijital resepsiyonistiyim. Size nasıl yardımcı olabilirim?",
    },
    knowledge: {
      rooms: [
        { id: "r1", name: "Standart Oda", capacity: 2, pricePerNight: 110, count: 8 },
        { id: "r2", name: "Deluxe Oda (balkonlu)", capacity: 3, pricePerNight: 142, count: 10 },
        { id: "r3", name: "Aile Süiti", capacity: 4, pricePerNight: 268, count: 6 },
      ],
      faqs: [
        { id: "f1", question: "Kahvaltı saatleri nedir?", answer: "Kahvaltı her gün 07:00 – 10:30 arasındadır; vejetaryen ve vegan seçenekler mevcuttur." },
        { id: "f2", question: "Otopark var mı?", answer: "Evet, otelin kendi otoparkı misafirlerimiz için ücretsizdir." },
        { id: "f3", question: "Havalimanı transferi yapıyor musunuz?", answer: "Evet, önceden haber verirseniz sabit ücretle transfer ayarlarız." },
      ],
      policies: {
        cancellation: "Girişten 48 saat öncesine kadar ücretsiz iptal.",
        pets: "Küçük evcil hayvanlar günlük ek ücretle kabul edilir.",
        breakfast: "Tüm odalarda açık büfe kahvaltı dahildir.",
        parking: "Ücretsiz, rezervasyon gerekmez.",
        wifi: "Tüm alanlarda ücretsiz, şifre odanın kapı kartındadır.",
      },
      docs: [{ id: "d1", name: "oda-fiyat-listesi-2026.pdf", sizeKb: 412 }],
    },
    handoff: {
      triggers: { complaint: true, payment: true, negotiation: false, medical: true, lowConfidence: true, vip: false },
      confidence: 72,
      hours: { from: "08:00", to: "23:00", days: [true, true, true, true, true, true, true] },
      notifyVia: "whatsapp",
      notifyTo: "+90 533 401 90 35",
    },
    integrations: {
      pms: { provider: "none", apiKey: "", connected: false },
      lock: { provider: "ttlock", connected: true, autoSendCode: true },
      calendar: { connected: false },
    },
    published: false,
  };
}
