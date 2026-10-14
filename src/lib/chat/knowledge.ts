import { tr, type Dict } from "@/i18n/tr";
import { en } from "@/i18n/en";
import { de } from "@/i18n/de";

export type ChatLang = "tr" | "en" | "de";

type Entry = { lang: ChatLang; text: string; answer: string };

const dicts: Record<ChatLang, Dict> = { tr, en, de };

/** Konu başına arama kelimeleri: sayfa metninde geçmeyen ama insanların yazdığı sözcükler (fiyat, kurulum, iletişim...). */
const alias: Record<ChatLang, Record<"pricing" | "contact" | "lock" | "langs" | "channels" | "setup" | "pms", string>> = {
  tr: {
    pricing: "fiyat fiyatlar ücret ücretler paket paketler maliyet kaç para ne kadar frank aylık yıllık abonelik teklif",
    contact: "iletişim ulaş ulaşmak demo talep randevu görüşmek arayın telefon mail eposta",
    lock: "modül modüller seçim",
    langs: "dil diller dilde dilleri çok dilli türkçe ingilizce almanca fransızca italyanca",
    channels: "telefon mobil tablet çevrimdışı internet offline kiosk",
    setup: "kurulum kurulur kurmak süre ne kadar sürer eğitim destek",
    pms: "muhasebeci treuhand excel csv dışa aktarım",
  },
  en: {
    pricing: "price prices pricing cost costs plan plans package packages how much franc monthly yearly subscription quote",
    contact: "contact reach demo request appointment call phone mail email talk",
    lock: "module modules choose selection",
    langs: "language languages multilingual turkish english german french italian",
    channels: "phone mobile tablet offline internet kiosk",
    setup: "setup install installation how long training support",
    pms: "accountant treuhand excel csv export",
  },
  de: {
    pricing: "preis preise kosten paket pakete wie viel franken monatlich jährlich abo abonnement tarif offerte",
    contact: "kontakt erreichen demo anfrage termin anrufen telefon mail email sprechen",
    lock: "modul module auswahl",
    langs: "sprache sprachen mehrsprachig türkisch englisch deutsch französisch italienisch",
    channels: "telefon handy tablet offline internet kiosk",
    setup: "einrichtung installation installieren wie lange dauer schulung support",
    pms: "treuhand treuhänder excel csv export",
  },
};

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

  const priceAnswer: Record<ChatLang, string> = {
    tr: "Fiyat, seçtiğiniz modüllere ve işletmenize göre hazırlanır. İletişime Geç düğmesiyle bize yazın, size teklif hazırlayalım.",
    en: "Pricing depends on the modules you choose and your business. Use the Get in Touch button and we will prepare a quote.",
    de: "Der Preis richtet sich nach den gewählten Modulen und Ihrem Betrieb. Über den Button Kontakt aufnehmen erstellen wir Ihnen gern eine Offerte.",
  };
  add(a.pricing, priceAnswer[lang], a.pricing);
  add(`${t.hero.lines.join(" ")} ${t.hero.lead}`, `${t.hero.lines.join(" ")} ${t.hero.lead}`, `${a.channels} ${a.langs}`);
  add(`${t.cta.title} ${t.cta.text}`, `${t.cta.text} (${t.cta.primary})`, a.contact);
  add(a.setup, `${t.journey.setupTitle} ${t.journey.setupLead} ${t.journey.steps.map((st) => st.title).join(", ")}.`, a.setup);
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
    hiA: "Merhaba! Ekado WorkSuite modülleri, kurulum, diller ya da demo hakkında soru sorabilirsiniz.",
    thanksA: "Rica ederim! Başka bir sorunuz olursa buradayım.",
  },
  en: {
    hi: /^(hello|hi|hey|good (morning|afternoon|evening))\b/,
    thanks: /thank|thx/,
    hiA: "Hi! Ask me about Ekado WorkSuite modules, setup, languages or the demo.",
    thanksA: "You're welcome! I'm here if you have more questions.",
  },
  de: {
    hi: /^(hallo|hi|guten (tag|morgen|abend)|servus|moin)\b/,
    thanks: /danke|vielen dank/,
    hiA: "Hallo! Fragen Sie mich zu den Modulen von Ekado WorkSuite, zur Einrichtung, zu Sprachen oder zur Demo.",
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
