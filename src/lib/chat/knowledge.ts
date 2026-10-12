import { tr, type Dict } from "@/i18n/tr";
import { en } from "@/i18n/en";
import { de } from "@/i18n/de";
import { prices } from "@/lib/prices";

export type ChatLang = "tr" | "en" | "de";

type Entry = { lang: ChatLang; text: string; answer: string };

const dicts: Record<ChatLang, Dict> = { tr, en, de };

/** Konu başına arama kelimeleri: sayfa metninde geçmeyen ama insanların yazdığı sözcükler (fiyat, kurulum, iletişim...). */
const alias: Record<ChatLang, Record<"pricing" | "contact" | "lock" | "langs" | "channels" | "setup" | "pms", string>> = {
  tr: {
    pricing: "fiyat fiyatlar ücret ücretler paket paketler maliyet kaç para ne kadar euro aylık yıllık abonelik",
    contact: "iletişim ulaş ulaşmak demo talep randevu görüşmek arayın telefon mail eposta",
    lock: "kilit kapı anahtar parmak izi şifre kart akıllı kapı",
    langs: "dil diller dilde konuşuyor konuşur konuşuyorsun çok dilli türkçe ingilizce almanca rusça",
    channels: "kanal kanallar whatsapp instagram facebook messenger telefon web chat sohbet",
    setup: "kurulum kurulur kurmak süre ne kadar sürer eğitim destek",
    pms: "pms otel programı entegrasyon bağlantı opera elektra",
  },
  en: {
    pricing: "price prices pricing cost costs plan plans package packages how much euro monthly yearly subscription",
    contact: "contact reach demo request appointment call phone mail email talk",
    lock: "lock door key fingerprint password card smart door",
    langs: "language languages speak speaks talk multilingual turkish english german russian",
    channels: "channel channels whatsapp instagram facebook messenger phone web chat",
    setup: "setup install installation how long training support",
    pms: "pms hotel software integration connect opera",
  },
  de: {
    pricing: "preis preise kosten paket pakete wie viel euro monatlich jährlich abo abonnement tarif",
    contact: "kontakt erreichen demo anfrage termin anrufen telefon mail email sprechen",
    lock: "schloss tür schlüssel fingerabdruck passwort karte smart türschloss",
    langs: "sprache sprachen sprechen sprichst spricht mehrsprachig türkisch englisch deutsch russisch",
    channels: "kanal kanäle whatsapp instagram facebook messenger telefon web chat",
    setup: "einrichtung installation installieren wie lange dauer schulung support",
    pms: "pms hotelsoftware integration verbindung anbindung opera",
  },
};

const money = (n: number, lang: ChatLang) => (lang === "en" ? `€${n}` : `${n} €`);

function entriesFor(lang: ChatLang): Entry[] {
  const t = dicts[lang];
  const a = alias[lang];
  const out: Entry[] = [];
  const add = (key: string, answer: string, extra = "") => out.push({ lang, text: `${key} ${extra}`, answer });

  for (const f of t.faq.items) add(`${f.q} ${f.a}`, f.a);

  for (const g of t.features.groups) {
    for (const i of g.items) add(`${g.title} ${i.title} ${i.text}`, `${i.title}: ${i.text}`);
  }
  for (const i of t.features.extras) add(`${i.title} ${i.text}`, `${i.title}: ${i.text}`);

  for (const c of t.solutions.cards) add(`${c.title} ${c.text}`, `${c.title}: ${c.text}`);

  for (const s of t.journey.stages) {
    add(`${s.when} ${s.title} ${s.items.join(" ")}`, `${s.when} – ${s.title}: ${s.items.join("; ")}.`);
  }

  const p = t.pricing;
  add(
    `${p.heading} ${p.lead}`,
    `${p.lead} ${p.plans.map((pl, i) => `${pl.name}: ${money(prices[i].m, lang)} ${p.perMonth}`).join(", ")}. ${p.vat}`,
    a.pricing,
  );
  p.plans.forEach((plan, i) => {
    const pr = prices[i];
    const price = `${money(pr.m, lang)} ${p.perMonth}, ${p.yearlyHint.toLowerCase()} ${money(pr.y, lang)} ${p.perYear} (${pr.off}% ${p.off})`;
    add(
      `${plan.name} ${plan.sub} ${plan.features.join(" ")}`,
      `${plan.name} – ${plan.sub}. ${price}. ${plan.features.join("; ")}. ${plan.note} ${p.vat}`.replace(/\s+/g, " "),
      a.pricing,
    );
  });
  const k = t.technology;
  for (const f of k.features) add(`${f.title} ${f.text}`, `${f.title}: ${f.text}`, a.lock);
  add(`${k.sub} ${k.heading} ${k.lead}`, `${k.sub}: ${k.lead}`, a.lock);
  add(`${k.boxTitle} ${k.box.join(" ")}`, `${k.boxTitle}: ${k.box.join("; ")}.`, a.lock);

  add(`${t.hero.lines.join(" ")} ${t.hero.lead}`, `${t.hero.lines.join(" ")} ${t.hero.lead}`, `${a.channels} ${a.langs}`);
  add(`${t.cta.title} ${t.cta.text}`, `${t.cta.text} (${t.cta.primary})`, a.contact);
  add(a.setup, t.faq.items[2]?.a ?? "", a.setup);
  const pms = t.features.groups[1].items[2];
  add(a.pms, `${pms.title}: ${pms.text}`, a.pms);
  return out;
}

const all: Entry[] = [...entriesFor("tr"), ...entriesFor("en"), ...entriesFor("de")];

const fold = (s: string) =>
  s
    .toLocaleLowerCase("tr")
    .replace(/ı/g, "i")
    .replace(/ß/g, "ss")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

const STOP = new Set(
  "ve bir bu da de mi mu ile icin gibi ama veya ne nasil var the an is are of to for and or in on it what how do does can you your me my und der die das ein eine ist sind von zu fur mit oder wie was ich sie ihr kann haben istiyorum isterim istiyoruz want would like need moechte mochte brauche".split(" "),
);

/** Sözcükleri 5 harfe indirerek (kaba kök) karşılaştırır: "fiyatlar" ile "fiyat", "prices" ile "price" eşleşir. */
function stems(s: string): string[] {
  return fold(s)
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length > 2 && !STOP.has(w))
    .map((w) => w.slice(0, 5));
}

const index = all.map((e) => ({ e, set: new Set(stems(e.text)) }));
const df = new Map<string, number>();
for (const { set } of index) for (const w of set) df.set(w, (df.get(w) ?? 0) + 1);

const weight = (w: string) => Math.log(1 + index.length / (df.get(w) ?? 1));

const SMALL_TALK: Record<ChatLang, { hi: RegExp; thanks: RegExp; hiA: string; thanksA: string }> = {
  tr: {
    hi: /^(merhaba|selam|iyi (gunler|aksamlar|sabahlar)|hey|hi|hello)\b/,
    thanks: /tesekkur|sag ol|eyvallah/,
    hiA: "Merhaba! Dijital Resepsiyonist, paketler, kanallar, akıllı kapı kilidi ya da kurulum hakkında soru sorabilirsiniz.",
    thanksA: "Rica ederim! Başka bir sorunuz olursa buradayım.",
  },
  en: {
    hi: /^(hello|hi|hey|good (morning|afternoon|evening))\b/,
    thanks: /thank|thx/,
    hiA: "Hi! Ask me about the Digital Receptionist, plans, channels, the smart door lock or setup.",
    thanksA: "You're welcome! I'm here if you have more questions.",
  },
  de: {
    hi: /^(hallo|hi|guten (tag|morgen|abend)|servus|moin)\b/,
    thanks: /danke|vielen dank/,
    hiA: "Hallo! Fragen Sie mich zur Digitalen Rezeption, zu Paketen, Kanälen, dem smarten Türschloss oder zur Einrichtung.",
    thanksA: "Gern geschehen! Bei weiteren Fragen bin ich da.",
  },
};

/** Sorunun dilini kelimelerden kabaca bulur; eşitlikte ve belirsizlikte sitenin dili kazanır. */
export function guessLang(q: string, fallback: ChatLang): ChatLang {
  const f = ` ${fold(q)} `;
  const count = (re: RegExp) => (f.match(re) ?? []).length;
  const score: Record<ChatLang, number> = {
    tr: count(/ (ve|bir|bu|icin|nedir|nasil|kac|var mi|mi|ne kadar|fiyat\w*|merhaba|selam|kurulum\w*|hangi|nelerdir|musun) /g) + (/[ığşçİĞŞÇ]/.test(q) ? 1 : 0),
    en: count(/ (the|what|how|is|are|do|does|can|price|prices|hello|much|which|and|with|you) /g),
    de: count(/ (der|die|das|und|ist|wie|was|kann|preis|preise|hallo|kosten|welche|mit|ich|sie|gibt) /g),
  };
  const best = Math.max(score.tr, score.en, score.de);
  if (best === 0 || score[fallback] === best) return fallback;
  return (["tr", "en", "de"] as const).find((l) => score[l] === best) ?? fallback;
}

/** Bir şey bulunamayınca söylenen cümle, sorunun diliyle. */
export const fallbackText = (lang: ChatLang) => dicts[lang].chat.fallback;

/** Anahtar yokken (ya da yapay zekâ cevap veremezken) sayfa içeriğinden cevap verir. Bulamazsa null. */
export function answerLocal(question: string, siteLang: ChatLang): { text: string; lang: ChatLang } | null {
  const lang = guessLang(question, siteLang);
  const q = fold(question).trim();
  const sm = SMALL_TALK[lang];
  if (sm.thanks.test(q)) return { text: sm.thanksA, lang };
  if (sm.hi.test(q) && q.split(/\s+/).length <= 4) return { text: sm.hiA, lang };

  const qs = [...new Set(stems(question))];
  if (!qs.length) return null;
  let best: { score: number; e: Entry } | null = null;
  for (const { e, set } of index) {
    if (e.lang !== lang) continue;
    let score = 0;
    for (const w of qs) if (set.has(w)) score += weight(w);
    if (!best || score > best.score) best = { score, e };
  }
  // ayırt edici bir sözcük eşleşmeli ve sorunun yarısına yakını karşılanmalı ("bugün hava nasıl" cevapsız kalsın)
  const total = qs.reduce((n, w) => n + weight(w), 0);
  return best && best.score >= 2.2 && best.score > total * 0.5 && best.e.answer ? { text: best.e.answer, lang } : null;
}

/** Yapay zekâya verilen sayfa özeti: sitedeki içeriğin kendisi, sitenin dilinde. */
export function pageSummary(lang: ChatLang): string {
  return entriesFor(lang)
    .map((e) => `- ${e.answer}`)
    .filter((x, i, arr) => x.length > 4 && arr.indexOf(x) === i)
    .join("\n");
}
