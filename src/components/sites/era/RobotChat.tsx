"use client";

import { useEffect, useRef, useState } from "react";
import { Send, Volume2, VolumeX, X } from "lucide-react";
import { useLocale } from "@/i18n/useLocale";
import { answerLocal, fallbackText, guessLang } from "@/lib/chat/knowledge";
import { contact } from "@/i18n/contact";
import { canSpeak, speak, stopSpeaking } from "@/lib/chat/speak";

/** Modelin kaçırdığı markdown işaretlerini (kalın, başlık, kod) balonda ve sesli okumada göstermemek için temizler. */
const plain = (t: string) => t.replace(/[*_`#]+/g, "").replace(/^\s*[-•]\s+/gm, "").trim();

type Msg = { role: "user" | "assistant"; content: string; contact?: boolean };

/** Robotun sohbet paneli: sağ altta açılır. Mesajlar /api/chat'e gider; anahtar yoksa "çok yakında" der. */
export function RobotChat({ onClose }: { onClose: () => void }) {
  const { t, locale } = useLocale();
  const c = t.chat;
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [voice, setVoice] = useState(() => {
    try {
      return localStorage.getItem("chat-voice") !== "off";
    } catch {
      return true;
    }
  });
  const end = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    end.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [msgs, busy]);

  useEffect(() => {
    input.current?.focus();
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => {
      window.removeEventListener("keydown", esc);
      stopSpeaking();
    };
  }, [onClose]);

  const toggleVoice = () => {
    const next = !voice;
    setVoice(next);
    if (!next) stopSpeaking();
    try {
      localStorage.setItem("chat-voice", next ? "on" : "off");
    } catch {}
  };

  const send = async () => {
    const q = text.trim();
    if (!q || busy) return;
    const next: Msg[] = [...msgs, { role: "user", content: q }];
    setMsgs(next);
    setText("");
    setBusy(true);
    let reply = "";
    let replyLang = locale;
    let offerContact = false;
    // önce sayfanın içeriğinden (anında); bulamazsa yapay zekâya sor
    const local = answerLocal(q, locale);
    if (local) {
      await new Promise((r) => setTimeout(r, 450)); // "yazıyor" noktaları bir an görünsün
      reply = local.text;
      replyLang = local.lang;
    } else {
      try {
        const r = await fetch("/api/chat", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ messages: next, lang: locale }),
        });
        const d = (await r.json().catch(() => ({}))) as { reply?: string; error?: string };
        if (r.ok && d.reply) reply = plain(d.reply);
        else if (d.error === "too_many") reply = c.tooMany;
      } catch {}
      if (!reply) {
        replyLang = guessLang(q, locale);
        reply = fallbackText(replyLang);
        offerContact = true;
      }
    }
    if (voice) speak(reply, replyLang);
    setMsgs((m) => [...m, { role: "assistant", content: reply, contact: offerContact }]);
    setBusy(false);
    input.current?.focus();
  };

  return (
    <div
      role="dialog"
      aria-label={c.title}
      className="era-pop-in fixed right-[104px] bottom-24 z-[95] flex h-[min(520px,calc(100dvh-8rem))] w-[360px] max-w-[calc(100vw-1.5rem)] flex-col overflow-hidden rounded-[18px] bg-era-white shadow-[0_24px_60px_var(--c-shadow)] ring-1 ring-era-line mob:right-2 mob:bottom-24"
    >
      <div className="flex items-center gap-3 bg-era-dark px-4 py-3 text-era-on-dark">
        <span className="relative flex h-9 w-9 flex-none items-center justify-center rounded-[10px] bg-era-chinese">
          <i className="block h-2 w-2 rounded-full bg-white" />
          <i className="ml-1.5 block h-2 w-2 rounded-full bg-white" />
        </span>
        <div className="min-w-0 flex-1 leading-tight">
          <p className="text-[15px] font-bold">{c.title}</p>
          <p className="flex items-center gap-1.5 text-[12px] opacity-80">
            <i className="era-robot-led-a block h-1.5 w-1.5 rounded-full bg-era-success" />{" "}
            {c.status}
          </p>
        </div>
        {canSpeak() && (
          <button
            type="button"
            onClick={toggleVoice}
            aria-label={voice ? c.voiceOn : c.voiceOff}
            aria-pressed={voice}
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-era-on-dark/15"
          >
            {voice ? <Volume2 size={17} /> : <VolumeX size={17} />}
          </button>
        )}
        <button
          type="button"
          onClick={onClose}
          aria-label={c.close}
          className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-era-on-dark/15"
        >
          <X size={18} />
        </button>
      </div>

      <div
        className="flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto px-3.5 py-4"
        aria-live="polite"
      >
        {[{ role: "assistant" as const, content: c.welcome, contact: false }, ...msgs].map((m, i) => (
          <div key={i} className={`flex max-w-[85%] flex-col gap-2 ${m.role === "user" ? "self-end" : "self-start"}`}>
            <p
              className={`rounded-2xl px-3.5 py-2 text-[14.5px] leading-[1.45] whitespace-pre-wrap ${
                m.role === "user"
                  ? "rounded-br-md bg-era-primary text-era-on-btn"
                  : "rounded-bl-md bg-era-secondary text-era-black"
              }`}
            >
              {m.content}
            </p>
            {m.contact && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  window.dispatchEvent(new CustomEvent("punn:contact"));
                }}
                className="w-fit rounded-full bg-era-primary px-4 py-1.5 text-[13.5px] font-semibold text-era-on-btn transition hover:brightness-110 active:scale-95"
              >
                {contact[locale].title}
              </button>
            )}
          </div>
        ))}
        {busy && (
          <span
            className="flex gap-1 self-start rounded-2xl rounded-bl-md bg-era-secondary px-4 py-3"
            aria-hidden
          >
            {[0, 1, 2].map((k) => (
              <i
                key={k}
                className="era-robot-led-a block h-1.5 w-1.5 rounded-full bg-era-gray"
                style={{ animationDelay: `${k * 0.2}s` }}
              />
            ))}
          </span>
        )}
        <div ref={end} />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          void send();
        }}
        className="flex items-center gap-2 border-t border-era-line p-2.5"
      >
        <input
          ref={input}
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={1000}
          placeholder={c.placeholder}
          aria-label={c.placeholder}
          className="min-w-0 flex-1 rounded-full bg-era-secondary px-4 py-2.5 text-[16px] text-era-black outline-none placeholder:text-era-gray focus:ring-2 focus:ring-era-primary"
        />
        <button
          type="submit"
          disabled={busy || !text.trim()}
          aria-label={c.send}
          className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-era-primary text-era-on-btn transition hover:brightness-110 active:scale-95 disabled:opacity-40"
        >
          <Send size={17} />
        </button>
      </form>
    </div>
  );
}
