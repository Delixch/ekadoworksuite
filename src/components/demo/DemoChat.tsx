"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowUp, Building2, CheckCheck } from "lucide-react";
import { useLocale } from "@/i18n/useLocale";
import { demoT } from "@/i18n/demo";
import { usePT } from "@/i18n/panel/use";
import { demoAnswer, demoGreeting } from "@/lib/demo/answer";
import { DEMO_WHATSAPP, type DemoInfo } from "@/lib/demo/api";
import { ChannelIcon } from "@/components/panel/ui";

interface Msg {
  id: number;
  from: "guest" | "ai";
  text: string;
}

/** Sayfadaki deneme sohbeti: otelin yazdığı bilgilerle sahte yanıt verir (gerçek yapay zeka api.ts üzerinden bağlanacak). */
export function DemoChat({ info, onTalk, onEdit, onDone }: { info: DemoInfo; onTalk: (n: number) => void; onEdit: () => void; onDone: () => void }) {
  const t = usePT(demoT);
  const { locale } = useLocale();
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const end = useRef<HTMLDivElement>(null);
  const idRef = useRef(1);
  const guestCount = useRef(0);

  // açılışta selamlama
  useEffect(() => {
    const id = setTimeout(() => setMsgs([{ id: idRef.current++, from: "ai", text: demoGreeting(info, locale) }]), 350);
    return () => clearTimeout(id);
    // yalnızca ilk açılışta; dil değişince geçmiş sohbet korunur
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    end.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [msgs, typing]);

  const send = (q: string) => {
    const v = q.trim();
    if (!v || typing) return;
    setMsgs((m) => [...m, { id: idRef.current++, from: "guest", text: v }]);
    setText("");
    guestCount.current += 1;
    onTalk(guestCount.current);
    setTyping(true);
    setTimeout(() => {
      setMsgs((m) => [...m, { id: idRef.current++, from: "ai", text: demoAnswer(info, v, locale) }]);
      setTyping(false);
    }, 900 + Math.random() * 700);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 border-b border-era-line pb-4">
        <button type="button" onClick={onEdit} aria-label={t.chat.edit} title={t.chat.edit} className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-era-lightgray bg-era-white text-era-black transition-transform hover:scale-95">
          <ArrowLeft size={18} />
        </button>
        <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-era-primary text-era-on-dark">
          <Building2 size={20} />
        </span>
        <div className="min-w-0 flex-1 leading-tight">
          <div className="truncate text-[17px] font-bold text-era-black">{info.hotelName}</div>
          <div className="flex items-center gap-1.5 text-[13px] text-era-gray">
            <span className="relative flex h-2 w-2">
              <span className="era-ring absolute inset-0 rounded-full bg-era-success opacity-60" />
              <span className="relative h-2 w-2 rounded-full bg-era-success" />
            </span>
            {t.chat.title} · {t.chat.online}
          </div>
        </div>
        <a
          href={`https://wa.me/${DEMO_WHATSAPP}?text=${encodeURIComponent(`Demo: ${info.hotelName}`)}`}
          target="_blank"
          rel="noreferrer"
          className="hidden items-center gap-2 rounded-full border border-era-lightgray bg-era-white px-3.5 py-2 text-[13px] font-semibold text-era-black no-underline transition-transform hover:scale-[.97] sm:flex"
        >
          <ChannelIcon channel="whatsapp" size={16} /> {t.chat.wa}
        </a>
      </div>

      <div className="my-4 flex min-h-[300px] flex-1 flex-col gap-2.5 overflow-y-auto pr-1" style={{ maxHeight: 420 }}>
        {msgs.map((m) => (
          <div key={m.id} className={`max-w-[86%] rounded-[18px] px-4 py-2.5 text-[15px] leading-snug [animation:era-bubble_.4s_both] ${m.from === "guest" ? "self-end rounded-br-md bg-era-primary text-era-on-dark" : "self-start rounded-bl-md bg-era-secondary text-era-black"}`}>
            {m.text}
            {m.from === "guest" && <CheckCheck size={14} className="mt-1 ml-auto text-era-on-dark/80" />}
          </div>
        ))}
        {typing && (
          <div className="flex items-center gap-1.5 self-start rounded-[18px] rounded-bl-md bg-era-secondary px-4 py-3" aria-label={t.chat.typing}>
            {[0, 1, 2].map((i) => (
              <i key={i} className="h-2 w-2 rounded-full bg-era-gray [animation:era-dot_1.1s_infinite]" style={{ animationDelay: `${i * 0.15}s` }} />
            ))}
          </div>
        )}
        <div ref={end} />
      </div>

      <div className="mb-3 flex flex-wrap gap-2">
        {t.chat.chips.map((c) => (
          <button key={c} type="button" onClick={() => send(c)} disabled={typing} className="rounded-full border border-era-lightgray bg-era-white px-3.5 py-1.5 text-[13px] font-medium text-era-primary-ink transition hover:bg-era-coolblue disabled:opacity-50">
            {c}
          </button>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(text);
        }}
        className="flex items-center gap-2"
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t.chat.placeholder}
          className="h-12 min-w-0 flex-1 rounded-full border border-era-lightgray bg-era-white px-5 text-[15px] text-era-black outline-none transition placeholder:text-era-matte focus:border-era-primary focus:ring-4 focus:ring-[color-mix(in_oklab,var(--c-primary)_16%,transparent)]"
        />
        <button type="submit" aria-label={t.chat.send} disabled={!text.trim() || typing} className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-era-primary text-era-on-dark transition active:scale-95 disabled:opacity-40">
          <ArrowUp size={20} />
        </button>
      </form>

      <button type="button" onClick={onDone} className="mt-4 self-center text-[14px] font-semibold text-era-primary-ink underline-offset-4 hover:underline">
        {t.chat.see} →
      </button>
    </div>
  );
}
