/**
 * Sohbet robotunun sunucu tarafı. Anahtar tarayıcıya hiç gitmez.
 * Herhangi bir OpenAI uyumlu servisle çalışır (/chat/completions). Anthropic/Claude API'si bilerek bağlı değil.
 *
 * Teslimde müşteri Vercel > Settings > Environment Variables içine kendisi yazar:
 *   CHAT_API_BASE = https://servis.example/v1   (sonunda /chat/completions olmadan)
 *   CHAT_API_KEY  = servisin anahtarı
 *   CHAT_MODEL    = servisteki model adı
 * İsteğe bağlı:
 *   CHAT_HOTEL_INFO    otele özel bilgi (adres, saatler, hizmetler) serbest metin
 *   CHAT_SYSTEM_PROMPT asistanın tüm talimatını kendi metninle değiştirir
 * Ayar yoksa 503 "no_key" döner; arayüz sayfa içeriğinden hazır cevap verir.
 */
import { pageSummary } from "@/lib/chat/knowledge";

const API_BASE = process.env.CHAT_API_BASE?.replace(/\/+$/, "");
const KEY = process.env.CHAT_API_KEY;
const MODEL = process.env.CHAT_MODEL || "";
const MAX_MESSAGES = 12;
const MAX_CHARS = 1000;
const LIMIT = 20; // aynı kişiden 10 dakikada en fazla bu kadar mesaj
const WINDOW_MS = 10 * 60 * 1000;

const hits = new Map<string, { n: number; t: number }>();

function limited(ip: string) {
  const now = Date.now();
  const h = hits.get(ip);
  if (!h || now - h.t > WINDOW_MS) {
    hits.set(ip, { n: 1, t: now });
    if (hits.size > 5000) hits.clear();
    return false;
  }
  h.n += 1;
  return h.n > LIMIT;
}

function systemPrompt(lang: string) {
  if (process.env.CHAT_SYSTEM_PROMPT) return process.env.CHAT_SYSTEM_PROMPT;
  const site = lang === "en" ? "English" : lang === "de" ? "German" : "Turkish";
  return [
    "You are the website assistant of Punn Digital, a company that builds a Digital Receptionist for hotels.",
    "The product answers guest messages and phone/WhatsApp calls 24/7 in 30+ languages, with a dashboard, PMS integration and smart door lock systems.",
    `Answer in the language the visitor writes in; if unclear, use ${site}.`,
    "Reply in plain text only: no markdown, no asterisks, no lists with symbols, no emojis. Be warm, brief (2-4 short sentences) and concrete. Never invent prices, features or promises; if you do not know, say so and suggest the Request a Demo button.",
    "Stay on topic: Punn Digital and hotel guest communication. Politely decline anything else.",
    `Everything you may state as fact comes from this website content:\n${pageSummary(lang === "en" || lang === "de" ? lang : "tr")}`,
    process.env.CHAT_HOTEL_INFO
      ?`Extra information:\n${process.env.CHAT_HOTEL_INFO}`
      : "",
  ]
    .filter(Boolean)
    .join("\n");
}

type Msg = { role: "user" | "assistant"; content: string };

function clean(input: unknown): Msg[] | null {
  if (!Array.isArray(input)) return null;
  const out: Msg[] = [];
  for (const m of input.slice(-MAX_MESSAGES)) {
    if (!m || typeof m !== "object") return null;
    const { role, content } = m as Record<string, unknown>;
    if (
      (role !== "user" && role !== "assistant") ||
      typeof content !== "string"
    )
      return null;
    const text = content.trim().slice(0, MAX_CHARS);
    if (text) out.push({ role, content: text });
  }
  // API ilk mesajın kullanıcıdan olmasını ister
  while (out.length && out[0].role !== "user") out.shift();
  return out.length && out[out.length - 1].role === "user" ? out : null;
}

export async function POST(req: Request) {
  if (!API_BASE || !KEY || !MODEL) return Response.json({ error: "no_key" }, { status: 503 });

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";
  if (limited(ip)) return Response.json({ error: "too_many" }, { status: 429 });

  let body: { messages?: unknown; lang?: unknown };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }
  const messages = clean(body.messages);
  if (!messages)
    return Response.json({ error: "bad_request" }, { status: 400 });
  const lang = typeof body.lang === "string" ? body.lang : "tr";

  try {
    const r = await fetch(`${API_BASE}/chat/completions`, {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${KEY}` },
      // düşünen (reasoning) modeller düşünce için de jeton harcar, bu yüzden pay geniş
      body: JSON.stringify({ model: MODEL, max_tokens: 1500, messages: [{ role: "system", content: systemPrompt(lang) }, ...messages] }),
      signal: AbortSignal.timeout(40000),
    });
    if (!r.ok) {
      console.error("chat: servis", r.status, await r.text().catch(() => ""));
      return Response.json({ error: r.status === 401 ? "bad_key" : "upstream" }, { status: 502 });
    }
    const data = (await r.json()) as { choices?: { message?: { content?: string } }[] };
    const reply = (data.choices?.[0]?.message?.content ?? "").trim();
    if (!reply) return Response.json({ error: "upstream" }, { status: 502 });
    return Response.json({ reply });
  } catch (e) {
    console.error("chat: istek başarısız", e);
    return Response.json({ error: "upstream" }, { status: 502 });
  }
}
