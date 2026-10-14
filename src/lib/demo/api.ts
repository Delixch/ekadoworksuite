/**
 * "Test Et / Canlı Demo" sayfasının veriyle konuştuğu TEK yer.
 *
 * Şimdi: örnek (sahte) yanıtlar. Veritabanı ve yapay zeka bağlanınca her fonksiyon bir fetch() çağrısına
 * çevrilir; sayfa (TestPage) değişmez. Tablo: docs/db/schema.sql > demo_sessions, demo_messages.
 */

/** Formdaki bilgiler (tabloda demo_sessions alanları) */
export interface DemoInfo {
  hotelName: string;
  /** "Deluks double oda 5000 TL, ..." serbest metin */
  rooms: string;
  food: string;
  location: string;
  other: string;
}

/** Demo hattı ve WhatsApp numarası. Boş bırakılan numara sayfada "yakında" olarak görünür. */
export const DEMO_WHATSAPP = "905334019035"; // site alt bilgisindeki Ekado WhatsApp numarası
export const DEMO_PHONE: string = ""; // TODO: yapay zeka tarafı demo arama hattını verince buraya yazılır (örn. "+90 ...")

const wait = <T,>(v: T, ms: number) => new Promise<T>((r) => setTimeout(() => r(v), ms));

/** Formu kaydeder; yapay zeka bu bilgilerle demo asistanı hazırlar. Dönen demoId sohbet/arama için kullanılır. */
export function submitDemoInfo(info: DemoInfo): Promise<{ demoId: string }> {
  void info;
  return wait({ demoId: `demo-${Date.now().toString(36)}` }, 2600);
}

/** "Dijital resepsiyonistiniz sizi arasın": verilen numarayı arama kuyruğuna alır. */
export function requestCallback(demoId: string, phone: string): Promise<{ ok: boolean }> {
  void demoId;
  void phone;
  return wait({ ok: true }, 1200);
}

/** Görüşme özetini WhatsApp'a gönderme isteği. */
export function requestSummary(demoId: string, whatsapp: string): Promise<{ ok: boolean }> {
  void demoId;
  void whatsapp;
  return wait({ ok: true }, 600);
}
