"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Bot, Globe, Info, Languages, Send, Sparkles, UserRoundCheck } from "lucide-react";
import type { Locale } from "@/i18n/useLocale";
import type { Conversation, Message } from "@/lib/panel/types";
import { fmtTime } from "../format";
import { Avatar, Btn, Chip, ChannelIcon } from "../ui";
import { statusTone, type CommonText, type InboxText } from "./shared";

function Bubble({ m, index, t, c, locale }: { m: Message; index: number; t: InboxText; c: CommonText; locale: Locale }) {
  const guest = m.sender === "guest";
  const ai = m.sender === "ai";
  const delay = { animationDelay: `${Math.min(index, 8) * 55}ms` };
  return (
    <li className={`era-bubble flex flex-col gap-1 ${guest ? "items-start" : "items-end"}`} style={delay}>
      <div
        className={`max-w-[82%] rounded-[20px] px-4 py-2.5 text-[15px] leading-snug mob:max-w-[90%] ${
          guest
            ? "rounded-bl-md border border-era-line bg-era-white text-era-black"
            : ai
              ? "rounded-br-md bg-era-primary text-era-on-dark"
              : "rounded-br-md bg-era-btn text-era-on-btn"
        }`}
      >
        {guest && m.textTranslated && (
          <span className="mb-1.5 flex items-center gap-1 text-[11px] font-semibold tracking-wide text-era-primary-ink uppercase">
            <Globe size={12} /> {c.langs[m.lang] ?? m.lang.toUpperCase()}
          </span>
        )}
        {ai && (
          <span className="mb-1 flex items-center gap-1 text-[11px] font-bold tracking-wide uppercase opacity-80">
            <Sparkles size={11} /> {t.aiBadge}
          </span>
        )}
        <p dir="auto">{m.text}</p>
        {guest && m.textTranslated && (
          <p className="mt-2 flex gap-1.5 border-t border-era-line pt-2 text-[13px] text-era-gray">
            <Languages size={14} className="mt-0.5 flex-none" />
            <span>
              <span className="mr-1 text-[10px] font-bold tracking-wider uppercase">{t.translated}</span>
              {m.textTranslated}
            </span>
          </p>
        )}
      </div>
      <span className="px-1 text-[11px] text-era-matte">
        {m.sender === "staff" ? `${t.staffLabel} · ` : ""}
        {fmtTime(m.at, locale)}
      </span>
    </li>
  );
}

function TypingBubble({ t }: { t: InboxText }) {
  return (
    <li className="era-bubble flex flex-col items-end gap-1" aria-live="polite">
      <div className="flex items-center gap-2 rounded-[20px] rounded-br-md bg-era-coolblue px-4 py-3 text-era-primary-ink">
        <Sparkles size={13} />
        <span className="text-[12px] font-bold tracking-wide uppercase">
          {t.aiBadge} {t.typing}
        </span>
        <span className="era-dot flex items-center gap-1">
          <i />
          <i className="[animation-delay:.15s]" />
          <i className="[animation-delay:.3s]" />
        </span>
      </div>
    </li>
  );
}

export function Thread({
  conv,
  typing,
  aiOn,
  onBack,
  onInfo,
  onTakeover,
  onGiveBack,
  onReopen,
  onSend,
  t,
  c,
  locale,
}: {
  conv: Conversation;
  typing: boolean;
  aiOn: boolean;
  onBack: () => void;
  onInfo: () => void;
  onTakeover: () => void;
  onGiveBack: () => void;
  onReopen: () => void;
  onSend: (text: string) => void;
  t: InboxText;
  c: CommonText;
  locale: Locale;
}) {
  const [draft, setDraft] = useState("");
  const scroller = useRef<HTMLUListElement>(null);
  const count = conv.messages.length;

  // yeni mesaj gelince en alta kaydır
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ top: el.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }, [conv.id, count, typing]);

  const closed = conv.status === "closed";
  const aiHandling = conv.status === "ai";
  const submit = () => {
    const text = draft.trim();
    if (!text) return;
    onSend(text);
    setDraft("");
  };

  return (
    <div className="ekado-panel flex min-h-0 flex-col rounded-(--r-x)">
      {/* başlık */}
      <div className="flex items-center gap-3 border-b border-era-line px-4 py-3">
        <button
          type="button"
          onClick={onBack}
          aria-label={t.back}
          className="hidden h-10 w-10 flex-none items-center justify-center rounded-full bg-era-secondary text-era-black tab:flex"
        >
          <ArrowLeft size={18} />
        </button>
        <Avatar name={conv.guest.name} size={42} />
        <div className="min-w-0 flex-1 leading-tight">
          <p className="truncate text-[16px] font-bold text-era-black">{conv.guest.name}</p>
          <p className="mt-0.5 flex items-center gap-1.5 truncate text-[13px] text-era-gray">
            <ChannelIcon channel={conv.channel} size={14} />
            {c.channels[conv.channel]} · {c.langs[conv.guest.lang] ?? conv.guest.lang.toUpperCase()}
          </p>
        </div>
        <Chip tone={statusTone[conv.status]} className="mob:hidden">
          {c.status[conv.status]}
        </Chip>
        <button
          type="button"
          onClick={onInfo}
          aria-label={t.info}
          className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-era-secondary text-era-black min-[1280px]:hidden"
        >
          <Info size={18} />
        </button>
      </div>

      {/* mesajlar */}
      <ul ref={scroller} key={conv.id} className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-4 py-5 mob:px-3">
        {conv.messages.map((m, i) => (
          <Bubble key={m.id} m={m} index={i} t={t} c={c} locale={locale} />
        ))}
        {typing && <TypingBubble t={t} />}
        {closed && <li className="py-2 text-center text-[12px] font-semibold tracking-wide text-era-matte uppercase">{t.closedAt}</li>}
      </ul>

      {/* yazma alanı */}
      <div className="border-t border-era-line p-3.5">
        {closed ? (
          <div className="flex items-center justify-between gap-3">
            <p className="text-[14px] text-era-gray">{t.composer.closed}</p>
            <Btn size="sm" variant="soft" onClick={onReopen}>
              {t.composer.reopen}
            </Btn>
          </div>
        ) : aiHandling ? (
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-era-coolblue text-era-primary-ink">
              <Bot size={20} />
            </span>
            <div className="min-w-0 flex-1 leading-snug">
              <p className="text-[14px] font-semibold text-era-black">{aiOn ? t.composer.aiActive : t.composer.aiPaused}</p>
              {aiOn && <p className="text-[12px] text-era-gray mob:hidden">{t.composer.aiActiveHint}</p>}
            </div>
            <Btn onClick={onTakeover}>
              <UserRoundCheck size={17} /> {t.composer.takeover}
            </Btn>
          </div>
        ) : (
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex gap-1.5 overflow-x-auto">
                {t.suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setDraft(s)}
                    className="flex-none rounded-full bg-era-secondary px-3 py-1.5 text-[12px] font-semibold text-era-gray transition-colors hover:bg-era-coolblue hover:text-era-primary-ink"
                  >
                    {s}
                  </button>
                ))}
              </div>
              <Btn size="sm" variant="ghost" onClick={onGiveBack} className="flex-none">
                <Bot size={15} /> <span className="mob:hidden">{t.composer.giveBack}</span>
              </Btn>
            </div>
            <div className="flex items-end gap-2">
              <textarea
                rows={1}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    submit();
                  }
                }}
                placeholder={t.composer.placeholder}
                aria-label={t.composer.placeholder}
                className="max-h-32 min-h-11 flex-1 resize-none rounded-(--r-s1) border border-era-lightgray bg-era-white px-3.5 py-2.5 text-[15px] text-era-black outline-none transition placeholder:text-era-matte focus:border-era-primary focus:ring-4 focus:ring-[color-mix(in_oklab,var(--c-primary)_16%,transparent)]"
              />
              <Btn onClick={submit} disabled={!draft.trim()} aria-label={t.composer.send} className="h-11! w-11! px-0!">
                <Send size={17} />
              </Btn>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
