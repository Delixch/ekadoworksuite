/**
 * PANEL VERİ ŞEMASI (TypeScript tarafı).
 * Veritabanı karşılığı: docs/db/schema.sql (aynı alan adları, snake_case).
 * Karşı taraf veritabanını bağlarken sadece src/lib/panel/api.ts içindeki fonksiyonları değiştirir;
 * ekranlar bu tiplerden başka bir şey bilmez.
 */

export type Channel = "whatsapp" | "instagram" | "messenger" | "phone" | "web";
export const CHANNELS: Channel[] = ["whatsapp", "instagram", "messenger", "phone", "web"];

/** ISO 639-1 dil kodu (tr, en, de, ru, ja, ar, fr, es, it, zh ...) */
export type LangCode = string;

export type ConversationStatus = "ai" | "human" | "waiting" | "closed";
export type MessageSender = "guest" | "ai" | "staff";

export interface Hotel {
  id: string;
  name: string;
  city: string;
  country: string;
  currency: "EUR" | "CHF" | "TRY" | "USD";
  timezone: string;
}

export interface Guest {
  id: string;
  name: string;
  lang: LangCode;
  country: string;
  email?: string;
  phone?: string;
}

export interface Message {
  id: string;
  conversationId: string;
  sender: MessageSender;
  text: string;
  /** Misafir mesajının personelin diline otomatik çevirisi */
  textTranslated?: string;
  lang: LangCode;
  /** ISO tarih */
  at: string;
}

export interface Conversation {
  id: string;
  hotelId: string;
  guest: Guest;
  channel: Channel;
  status: ConversationStatus;
  /** Yapay zekanın anladığı niyet: rezervasyon, fiyat, şikayet, check-in, bilgi ... */
  intent: "booking" | "price" | "complaint" | "checkin" | "info" | "lock" | "payment";
  unread: number;
  lastMessageAt: string;
  messages: Message[];
  bookingId?: string;
}

export type BookingStatus = "confirmed" | "pending" | "checked_in" | "checked_out" | "cancelled";

export interface Booking {
  id: string;
  hotelId: string;
  guestId: string;
  guestName: string;
  roomTypeId: string;
  roomNumber?: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  total: number;
  currency: Hotel["currency"];
  status: BookingStatus;
  /** Rezervasyonu yapay zeka mı aldı */
  source: "ai" | "web" | "phone" | "ota";
}

export type RoomStatus = "occupied" | "vacant" | "cleaning" | "arriving";

export interface Lock {
  id: string;
  provider: "tuya" | "ttlock";
  battery: number;
  online: boolean;
  locked: boolean;
  lastEvent: { type: "unlock_code" | "unlock_app" | "unlock_card" | "unlock_fp" | "lock" | "low_battery"; at: string; by?: string };
}

export interface Room {
  id: string;
  number: string;
  floor: number;
  roomTypeId: string;
  status: RoomStatus;
  guestName?: string;
  lock: Lock;
}

export interface TempCode {
  id: string;
  roomId: string;
  code: string;
  guestName: string;
  validFrom: string;
  validTo: string;
  /** Misafire hangi kanaldan gönderildi */
  sentVia?: Channel;
}

/* ------------------------------ Genel bakış ------------------------------ */

export type StatsRange = "today" | "7d" | "30d";

export interface Kpi {
  value: number;
  /** önceki döneme göre yüzde değişim (+/-) */
  delta: number;
  /** küçük grafik için noktalar */
  trend: number[];
}

export interface OverviewData {
  kpis: {
    conversations: Kpi;
    responseSeconds: Kpi;
    autoResolved: Kpi;
    revenue: Kpi;
  };
  /** günlük seri: konuşma ve AI'nin aldığı rezervasyon sayısı */
  /** date: ISO; ekran dile göre biçimlendirir (bugün: saat, 7 gün: gün adı, 30 gün: gün.ay) */
  series: { date: string; conversations: number; bookings: number }[];
  channels: { channel: Channel; count: number }[];
  languages: { lang: LangCode; count: number }[];
  topIntents: { intent: Conversation["intent"]; count: number }[];
  rooms: Room[];
  bookings: Booking[];
  currency: Hotel["currency"];
}

/* ------------------------------ Kurulum ------------------------------ */

export interface RoomType {
  id: string;
  name: string;
  capacity: number;
  pricePerNight: number;
  count: number;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
}

export type HandoffTrigger = "complaint" | "payment" | "negotiation" | "medical" | "lowConfidence" | "vip";

export interface SetupConfig {
  hotel: {
    name: string;
    stars: number;
    address: string;
    city: string;
    country: string;
    phone: string;
    email: string;
    website: string;
    checkIn: string;
    checkOut: string;
    description: string;
  };
  channels: Record<Channel, { connected: boolean; handle: string }>;
  languages: { enabled: LangCode[]; default: LangCode; autoDetect: boolean };
  persona: { name: string; /** 0 = resmi, 100 = samimi */ tone: number; emoji: boolean; greeting: string };
  knowledge: {
    rooms: RoomType[];
    faqs: Faq[];
    policies: { cancellation: string; pets: string; breakfast: string; parking: string; wifi: string };
    docs: { id: string; name: string; sizeKb: number }[];
  };
  handoff: {
    triggers: Record<HandoffTrigger, boolean>;
    /** 0-100: AI bu güvenin altındaysa insana devreder */
    confidence: number;
    hours: { from: string; to: string; days: boolean[] };
    notifyVia: "whatsapp" | "email" | "push";
    notifyTo: string;
  };
  integrations: {
    pms: { provider: "none" | "elektraweb" | "opera" | "protel" | "custom"; apiKey: string; connected: boolean };
    lock: { provider: "none" | "tuya" | "ttlock"; connected: boolean; autoSendCode: boolean };
    calendar: { connected: boolean };
  };
  published: boolean;
  publishedAt?: string;
}
