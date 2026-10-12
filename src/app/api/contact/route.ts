import { company } from "@/lib/company";

/**
 * İletişim formunun sunucu tarafı. Anahtar tarayıcıya hiç gitmez. E-posta Resend ile gönderilir.
 * Teslimde müşteri Vercel > Settings > Environment Variables içine kendisi yazar:
 *   RESEND_API_KEY = re_...
 *   CONTACT_FROM   = Punn Digital <noreply@alanadi.com>   (Resend'de doğrulanmış alan adı)
 *   CONTACT_TO     = mesajların gideceği adres            (yoksa src/lib/company.ts içindeki e-posta)
 * Ayar yoksa 503 "no_config" döner; form bunu kullanıcının e-posta uygulamasını açarak karşılar.
 */
const LIMIT = 5; // aynı kişiden 10 dakikada en fazla bu kadar form
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

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ");

export async function POST(req: Request) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM;
  if (!key || !from) return Response.json({ error: "no_config" }, { status: 503 });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";
  if (limited(ip)) return Response.json({ error: "too_many" }, { status: 429 });

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }
  // bal küpü: botlar gizli alanı doldurur, sessizce "başarılı" deriz
  if (str(body.hp, 100)) return Response.json({ ok: true });

  const name = oneLine(str(body.name, 120));
  const email = oneLine(str(body.email, 160));
  const phone = oneLine(str(body.phone, 60));
  const hotel = oneLine(str(body.hotel, 160));
  const topic = oneLine(str(body.topic, 120));
  const message = str(body.message, 4000);
  const lang = str(body.lang, 4);
  if (!name || !topic || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }

  const lines = [`Konu: ${topic}`, `Ad: ${name}`, `E-posta: ${email}`];
  if (phone) lines.push(`Telefon: ${phone}`);
  if (hotel) lines.push(`Otel/firma: ${hotel}`);
  lines.push(`Dil: ${lang || "-"}`, "", message);
  const text = lines.join("\n");

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${key}` },
      body: JSON.stringify({
        from,
        to: [process.env.CONTACT_TO || company.email],
        reply_to: email,
        subject: `Web formu: ${topic} (${name})`,
        text,
      }),
      signal: AbortSignal.timeout(15000),
    });
    if (!r.ok) {
      console.error("contact: Resend", r.status, await r.text().catch(() => ""));
      return Response.json({ error: "upstream" }, { status: 502 });
    }
    return Response.json({ ok: true });
  } catch (e) {
    console.error("contact: istek başarısız", e);
    return Response.json({ error: "upstream" }, { status: 502 });
  }
}
