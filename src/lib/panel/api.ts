/**
 * BAĞLANTI NOKTASI: panelin veriyle konuştuğu TEK yer.
 *
 * Şimdi: örnek veri (mock.ts) + kurulum ayarları tarayıcıda (localStorage) saklanır.
 * Veritabanı bağlanınca: her fonksiyonun gövdesi bir fetch() çağrısına çevrilir
 * (örn. `fetch("/api/panel/overview?hotel=...")`). Dönüş tipleri (types.ts) değişmez,
 * ekranlara dokunmak gerekmez. Tablolar: docs/db/schema.sql
 */
import { buildBookings, buildConversations, buildOverview, buildRooms, buildTempCodes, defaultSetup, hotels } from "./mock";
import type { Booking, Channel, Conversation, Hotel, Message, OverviewData, Room, SetupConfig, StatsRange, TempCode } from "./types";

const wait = <T,>(v: T, ms = 380) => new Promise<T>((r) => setTimeout(() => r(v), ms));
const SETUP_KEY = (id: string) => `panel-setup-${id}`;

/** Oteller (kullanıcının yetkili olduğu). Tablo: hotels */
export function listHotels(): Promise<Hotel[]> {
  return wait(hotels, 80);
}

/** Genel bakış rakamları ve grafikleri. Tablolar: daily_stats, conversations, bookings, rooms */
export function getOverview(hotelId: string, range: StatsRange): Promise<OverviewData> {
  return wait(buildOverview(hotelId, range));
}

/** Konuşma listesi (mesajlarla). Tablolar: conversations, messages, guests */
export function listConversations(hotelId: string): Promise<Conversation[]> {
  return wait(buildConversations(hotelId));
}

/** Personelin yazdığı mesajı kaydeder / konuşmayı devralır. Tablolar: messages, conversations.status */
export function sendStaffMessage(conversationId: string, text: string): Promise<Message> {
  return wait(
    { id: `m-${Date.now()}`, conversationId, sender: "staff", text, lang: "tr", at: new Date().toISOString() } satisfies Message,
    200
  );
}

/** Odalar ve akıllı kilitler. Tablolar: rooms, locks */
export function listRooms(hotelId: string): Promise<Room[]> {
  return wait(buildRooms(hotelId));
}

/** Aktif geçici şifreler. Tablo: temp_codes */
export function listTempCodes(hotelId: string): Promise<TempCode[]> {
  return wait(buildTempCodes(buildRooms(hotelId)));
}

/** Yeni geçici şifre üretir ve misafire gönderir. Kilit sağlayıcısı (Tuya / TTLock) çağrısı sunucuda yapılır. */
export function createTempCode(roomId: string, guestName: string, validTo: string, via: Channel): Promise<TempCode> {
  const code = String(Math.floor(1000000 + Math.random() * 8999999));
  return wait(
    { id: `code-${Date.now()}`, roomId, code, guestName, validFrom: new Date().toISOString().slice(0, 10), validTo, sentVia: via },
    900
  );
}

/** Rezervasyonlar. Tablo: bookings */
export function listBookings(hotelId: string): Promise<Booking[]> {
  return wait(buildBookings(hotelId));
}

/** Kurulum ayarlarını okur. Tablolar: hotel_settings, channels, faqs, room_types, integrations ... */
export function getSetup(hotelId: string): Promise<SetupConfig> {
  try {
    const raw = localStorage.getItem(SETUP_KEY(hotelId));
    if (raw) return wait(JSON.parse(raw) as SetupConfig, 150);
  } catch {}
  return wait(defaultSetup(hotelId), 150);
}

/** Kurulum ayarlarını kaydeder (otomatik, her değişiklikte). */
export function saveSetup(hotelId: string, config: SetupConfig): Promise<void> {
  try {
    localStorage.setItem(SETUP_KEY(hotelId), JSON.stringify(config));
  } catch {}
  return wait(undefined, 250);
}

/** Bir kanalı bağlama denemesi (OAuth / webhook kurulumu sunucuda). */
export function connectChannel(channel: Channel, handle: string): Promise<{ ok: boolean; handle: string }> {
  return wait({ ok: true, handle }, 1400);
}

/** Entegrasyon bağlantı testi (PMS, kilit). */
export function testIntegration(kind: "pms" | "lock" | "calendar", provider: string): Promise<{ ok: boolean }> {
  void kind;
  void provider;
  return wait({ ok: true }, 1500);
}
