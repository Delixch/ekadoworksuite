"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Circle, Rocket, Send } from "lucide-react";
import { setupT } from "@/i18n/panel/setup";
import { usePT } from "@/i18n/panel/use";
import { useLocale } from "@/i18n/useLocale";
import type { SetupConfig } from "@/lib/panel/types";
import { usePanel } from "../context";
import { fmtDate, fmtMoney } from "../format";
import { Avatar, Btn, Chip, Spinner } from "../ui";
import { REQUIRED, isDone } from "./progress";
import { CheckMark, Lead, toneTier, type StepId, type StepProps } from "./shared";

interface Msg {
  id: number;
  from: "guest" | "ai";
  text: string;
}

const norm = (s: string) => s.toLocaleLowerCase("tr");

/**
 * Sahte yapay zeka: soruyu anahtar kelimeyle bilgi bankasına eşler.
 * BAĞLANTI NOKTASI: gerçek yapay zeka bağlanınca bu fonksiyon sunucu çağrısıyla değişir.
 */
function answer(q: string, cfg: SetupConfig, money: (n: number) => string, tx: (typeof setupT)["tr"]["publish"]): string {
  const s = norm(q);
  const k = cfg.knowledge;
  const words = s.split(/\s+/).filter((w) => w.length >= 4);
  const faq = k.faqs.find((f) => words.some((w) => norm(f.question).includes(w)));
  let body: string | null = null;
  if (/fiyat|preis|kosten|price|cost|ücret|tarif|rate|oda|room|zimmer|süit|suite/.test(s) && k.rooms.length) {
    body = k.rooms.map((r) => `• ${r.name || "—"}: ${money(r.pricePerNight)} ${tx.perNight} (${r.capacity} ${tx.persons})`).join("\n");
  } else if (/kahvalt|frühst|breakfast/.test(s) && k.policies.breakfast) body = k.policies.breakfast;
  else if (/otopark|park/.test(s) && k.policies.parking) body = k.policies.parking;
  else if (/wifi|wi-fi|wlan|internet/.test(s) && k.policies.wifi) body = k.policies.wifi;
  else if (/iptal|storn|cancel/.test(s) && k.policies.cancellation) body = k.policies.cancellation;
  else if (/evcil|haustier|hund|pet|dog|köpek|kedi/.test(s) && k.policies.pets) body = k.policies.pets;
  else if (/check|giriş|çıkış|anreise|abreise|arrival|saat/.test(s)) body = `${cfg.hotel.checkIn} / ${cfg.hotel.checkOut}`;
  else if (faq) body = faq.answer;
  if (!body) return tx.notAnswered;

  const tier = toneTier(cfg.persona.tone);
  const [pre, post] = [tx.toneFormal, tx.toneNeutral, tx.toneFriendly][tier];
  const emoji = cfg.persona.emoji && tier === 2 ? " 😊" : "";
  return `${pre}\n${body}\n${post}${emoji}`;
}

export function StepPublish({ cfg, change, goStep }: StepProps & { goStep: (s: StepId) => void }) {
  const tp = usePT(setupT);
  const t = tp.publish;
  const names = tp.stepTitles;
  const { locale } = useLocale();
  const { hotel } = usePanel();
  const money = (n: number) => fmtMoney(n, hotel.currency, locale);

  const [msgs, setMsgs] = useState<Msg[]>(() => [{ id: 0, from: "ai", text: cfg.persona.greeting }]);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [burst, setBurst] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => {
    const list = timers.current;
    return () => list.forEach(clearTimeout);
  }, []);
  useEffect(() => {
    box.current?.scrollTo({ top: box.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing]);

  const send = (q: string) => {
    const v = q.trim();
    if (!v || typing) return;
    setMsgs((m) => [...m, { id: Date.now(), from: "guest", text: v }]);
    setText("");
    setTyping(true);
    timers.current.push(
      setTimeout(() => {
        setMsgs((m) => [...m, { id: Date.now() + 1, from: "ai", text: answer(v, cfg, money, t) }]);
        setTyping(false);
      }, 900 + (v.length % 5) * 120)
    );
  };
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    send(text);
  };

  const missing = REQUIRED.filter((id) => !isDone(id, cfg));
  const ready = missing.length === 0;

  const publish = () => {
    setPublishing(true);
    // BAĞLANTI NOKTASI: hotels.published = 1, published_at = şimdi (yapay zeka tarafı bunu görünce kanalları dinlemeye başlar)
    timers.current.push(
      setTimeout(() => {
        setPublishing(false);
        setBurst(true);
        change((x) => ({ ...x, published: true, publishedAt: new Date().toISOString() }));
        timers.current.push(setTimeout(() => setBurst(false), 2200));
      }, 1500)
    );
  };

  const squares = Array.from({ length: 14 }, (_, i) => ({
    a: (360 / 14) * i,
    d: 70 + ((i * 37) % 40),
    color: ["bg-era-primary", "bg-era-accent", "bg-era-success"][i % 3],
    delay: (i % 4) * 40,
  }));

  return (
    <div>
      <Lead>{t.lead}</Lead>
      <div className="grid grid-cols-1 gap-5">
        {/* test sohbeti */}
        <div className="flex flex-col overflow-hidden rounded-(--r-r) border border-era-lightgray bg-era-white">
          <div className="flex items-center gap-3 border-b border-era-line px-4 py-3">
            <Avatar name={cfg.persona.name || "?"} size={36} />
            <div className="min-w-0 leading-tight">
              <div className="text-[14px] font-bold text-era-black">{t.chatTitle}</div>
              <div className="truncate text-[12px] text-era-gray">{t.chatHint}</div>
            </div>
          </div>
          <div ref={box} className="flex h-[340px] flex-col gap-2.5 overflow-y-auto bg-era-secondary p-4">
            {msgs.map((m) => (
              <div
                key={m.id}
                className={`setup-bubble max-w-[86%] rounded-2xl px-3.5 py-2 text-[14px] leading-snug whitespace-pre-line ${
                  m.from === "guest" ? "self-end rounded-tr-md bg-era-primary text-era-on-dark" : "self-start rounded-tl-md bg-era-white text-era-black shadow-sm"
                }`}
              >
                {m.from === "ai" && <div className="mb-0.5 text-[11px] font-bold text-era-primary-ink">{cfg.persona.name}</div>}
                {m.text}
              </div>
            ))}
            {typing && (
              <div className="setup-typing setup-bubble flex gap-1 self-start rounded-2xl rounded-tl-md bg-era-white px-4 py-3 text-era-matte shadow-sm" aria-label="…">
                <i />
                <i />
                <i />
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-2 border-t border-era-line px-3 pt-3">
            {t.suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => send(s)}
                className="rounded-full bg-era-coolblue px-3 py-1 text-[12px] font-semibold text-era-primary-ink transition-transform hover:scale-[1.04] active:scale-95"
              >
                {s}
              </button>
            ))}
          </div>
          <form onSubmit={onSubmit} className="flex items-center gap-2 p-3">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={t.placeholder}
              aria-label={t.placeholder}
              className="h-11 min-w-0 flex-1 rounded-full border border-era-lightgray bg-era-white px-4 text-[14px] text-era-black outline-none placeholder:text-era-matte focus:border-era-primary"
            />
            <Btn type="submit" aria-label={t.send} disabled={!text.trim() || typing} className="!h-11 !w-11 !px-0">
              <Send size={17} />
            </Btn>
          </form>
        </div>

        {/* yayın */}
        <div className="flex flex-col gap-4">
          <div className="rounded-(--r-r) border border-era-lightgray bg-era-white p-5">
            <h4 className="mb-3 text-[15px] font-bold text-era-black">{t.checklist}</h4>
            <ul className="flex flex-col gap-2">
              {(["hotel", "channels", "language", "knowledge", "handoff", "integrations"] as StepId[]).map((id) => {
                const done = isDone(id, cfg);
                const optional = id === "integrations";
                return (
                  <li key={id} className="flex items-center gap-3 text-[14px]">
                    <span
                      className={`flex h-6 w-6 flex-none items-center justify-center rounded-full transition-colors duration-500 ${
                        done ? "bg-era-success text-era-on-dark" : "text-era-cute"
                      }`}
                    >
                      {done ? <CheckMark size={13} /> : <Circle size={22} strokeWidth={1.6} />}
                    </span>
                    <span className={`flex-1 ${done ? "text-era-black" : "text-era-gray"}`}>{names[id]}</span>
                    {optional && !done && <Chip>{tp.optional}</Chip>}
                    {!done && (
                      <button type="button" onClick={() => goStep(id)} className="text-[13px] font-bold text-era-primary-ink hover:underline">
                        {t.goto}
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="relative flex flex-col items-center gap-3 overflow-visible rounded-(--r-r) border border-era-lightgray bg-era-white p-6 text-center">
            {cfg.published ? (
              <>
                <span className="setup-ring-pop relative flex h-20 w-20 items-center justify-center rounded-full bg-era-success text-era-on-dark">
                  <span className="era-ring absolute inset-0 rounded-full bg-era-success opacity-40" />
                  <CheckMark size={38} />
                </span>
                <div className="text-[18px] font-extrabold text-era-black">{t.successTitle}</div>
                <p className="text-[14px] text-era-gray">{t.successText}</p>
                {cfg.publishedAt && (
                  <Chip tone="success">
                    {t.liveSince}: {fmtDate(cfg.publishedAt, locale, { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                  </Chip>
                )}
                <Btn
                  variant="ghost"
                  size="sm"
                  onClick={() => change((x) => ({ ...x, published: false, publishedAt: undefined }))}
                >
                  {t.unpublish}
                </Btn>
              </>
            ) : (
              <>
                <span className="era-float flex h-16 w-16 items-center justify-center rounded-full bg-era-coolblue text-era-primary-ink">
                  <Rocket size={28} strokeWidth={1.8} />
                </span>
                <div className="text-[16px] font-bold text-era-black">{ready ? t.ready : `${missing.length} / ${REQUIRED.length}`}</div>
                {!ready && <p className="text-[13px] text-era-gray">{missing.map((m) => names[m]).join(" · ")}</p>}
                <Btn onClick={publish} disabled={!ready || publishing} className="w-full max-w-[260px]">
                  {publishing ? (
                    <>
                      <Spinner size={15} /> {t.publishing}
                    </>
                  ) : (
                    <>
                      <Rocket size={17} /> {t.publish}
                    </>
                  )}
                </Btn>
              </>
            )}

            {burst && (
              <div className="pointer-events-none absolute top-[88px] left-1/2" aria-hidden>
                {squares.map((s, i) => (
                  <span
                    key={i}
                    className={`setup-burst ${s.color}`}
                    style={{ ["--a" as string]: `${s.a}deg`, ["--d" as string]: `${s.d}px`, animationDelay: `${s.delay}ms` }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
