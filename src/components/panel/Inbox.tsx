"use client";

import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { MessagesSquare } from "lucide-react";
import { commonT } from "@/i18n/panel/common";
import { inboxT, simGuest, simReply } from "@/i18n/panel/inbox";
import { usePT } from "@/i18n/panel/use";
import { useLocale } from "@/i18n/useLocale";
import { listBookings, listConversations, sendStaffMessage } from "@/lib/panel/api";
import type { Booking, Conversation, ConversationStatus, Message } from "@/lib/panel/types";
import { usePanel } from "./context";
import { ConversationList } from "./inbox/ConversationList";
import { InfoPanel } from "./inbox/InfoPanel";
import { Thread } from "./inbox/Thread";

const FIRST_SIM_MS = 7000;
const SIM_EVERY_MS = 20000;
const AI_TYPING_MS = 2600;

export function Inbox() {
  const { hotel, aiOn, goTo } = usePanel();
  const t = usePT(inboxT);
  const c = usePT(commonT);
  const { locale } = useLocale();

  const [convs, setConvs] = useState<Conversation[] | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selId, setSelId] = useState<string | null>(null);
  const [view, setView] = useState<"list" | "thread">("list");
  const [infoOpen, setInfoOpen] = useState(false);
  const [typing, setTyping] = useState<Record<string, boolean>>({});
  const [freshId, setFreshId] = useState<string | null>(null);
  const [, tick] = useReducer((x: number) => x + 1, 0);

  // zamanlayıcılar ve son durum (zamanlayıcı geri çağrıları güncel değeri buradan okur)
  const live = useRef({ convs, selId, aiOn });
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const busy = useRef(new Set<string>());
  useEffect(() => {
    live.current = { convs, selId, aiOn };
  });

  const later = useCallback((fn: () => void, ms: number) => {
    timers.current.push(setTimeout(fn, ms));
  }, []);

  // ilk yükleme (otel değişince PanelApp bileşeni yeniden kurar)
  useEffect(() => {
    let alive = true;
    Promise.all([listConversations(hotel.id), listBookings(hotel.id)]).then(([cs, bs]) => {
      if (!alive) return;
      setConvs(cs);
      setBookings(bs);
      setSelId(cs[0]?.id ?? null);
    });
    return () => {
      alive = false;
    };
  }, [hotel.id]);

  // "3 dk önce" yazıları eskimesin
  useEffect(() => {
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  const patch = useCallback((id: string, p: Partial<Conversation>) => {
    setConvs((cs) => cs && cs.map((x) => (x.id === id ? { ...x, ...p } : x)));
  }, []);

  const push = useCallback((id: string, m: Message, p: Partial<Conversation> = {}) => {
    setConvs((cs) => cs && cs.map((x) => (x.id === id ? { ...x, ...p, messages: [...x.messages, m], lastMessageAt: m.at } : x)));
  }, []);

  const mkMessage = (id: string, sender: Message["sender"], text: string, lang: string, textTranslated?: string): Message => ({
    id: `m-${id}-${Date.now()}-${Math.round(Math.random() * 1e4)}`,
    conversationId: id,
    sender,
    text,
    textTranslated,
    lang,
    at: new Date().toISOString(),
  });

  /** Yapay zeka "yazıyor" gösterir, sonra yanıtı ekler. */
  const aiReply = useCallback(
    (id: string, lang: string, delay = 600) => {
      if (busy.current.has(id)) return;
      busy.current.add(id);
      later(() => setTyping((x) => ({ ...x, [id]: true })), delay);
      later(() => {
        setTyping((x) => ({ ...x, [id]: false }));
        push(id, mkMessage(id, "ai", simReply[lang] ?? simReply.en, lang));
        busy.current.delete(id);
      }, delay + AI_TYPING_MS);
    },
    [later, push]
  );

  /** Seçilen konuşmanın son mesajı misafirden ve yapay zeka yönetiyorsa yanıt başlatır. */
  const answerIfPending = useCallback(
    (id: string) => {
      const { convs: cs, aiOn: on } = live.current;
      const conv = cs?.find((x) => x.id === id);
      if (!conv || conv.status !== "ai" || !on) return;
      if (conv.messages[conv.messages.length - 1]?.sender !== "guest") return;
      aiReply(id, conv.guest.lang);
    },
    [aiReply]
  );

  // canlı simülasyon: ara sıra bir konuşmaya yeni misafir mesajı gelir
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const fire = () => {
      const { convs: cs, selId: sel, aiOn: on } = live.current;
      const pool = (cs ?? []).filter((x) => x.status !== "closed" && !busy.current.has(x.id));
      if (pool.length) {
        const conv = pool[Math.floor(Math.random() * pool.length)];
        const msgs = simGuest[conv.guest.lang] ?? simGuest.en;
        const pick = msgs[Math.floor(Math.random() * msgs.length)];
        const unread = sel === conv.id ? 0 : conv.unread + 1;
        push(conv.id, mkMessage(conv.id, "guest", pick.text, conv.guest.lang, pick.tr), { unread });
        setFreshId(conv.id);
        later(() => setFreshId((f) => (f === conv.id ? null : f)), 2400);
        if (conv.status === "ai") {
          if (on) aiReply(conv.id, conv.guest.lang, 900);
          else patch(conv.id, { status: "waiting" });
        }
      }
      timer = setTimeout(fire, SIM_EVERY_MS);
    };
    timer = setTimeout(fire, FIRST_SIM_MS);
    return () => clearTimeout(timer);
  }, [push, patch, aiReply, later]);

  // sayfadan çıkarken bekleyen zamanlayıcıları temizle
  useEffect(() => {
    const list = timers.current;
    return () => list.forEach(clearTimeout);
  }, []);

  const open = (id: string) => {
    setSelId(id);
    setView("thread");
    patch(id, { unread: 0 });
    answerIfPending(id);
  };

  const setStatus = (id: string, status: ConversationStatus) => {
    patch(id, { status });
    if (status === "ai") later(() => answerIfPending(id), 50);
  };

  const send = (text: string) => {
    if (!selId) return;
    const m = mkMessage(selId, "staff", text, "tr");
    push(selId, m, { status: "human" });
    void sendStaffMessage(selId, text);
  };

  const sel = convs?.find((x) => x.id === selId) ?? null;
  const booking = sel ? bookings.find((b) => b.id === sel.bookingId || b.guestName === sel.guest.name) : undefined;

  const info = sel && (
    <InfoPanel
      conv={sel}
      booking={booking}
      t={t}
      c={c}
      locale={locale}
      onGoLocks={() => goTo("locks")}
      onTakeover={() => setStatus(sel.id, "human")}
      onGiveBack={() => setStatus(sel.id, "ai")}
      onClose={() => setStatus(sel.id, "closed")}
    />
  );

  return (
    <div className="grid h-[calc(100dvh-230px)] min-h-[600px] grid-cols-[minmax(300px,360px)_minmax(0,1fr)] gap-4 min-[1280px]:grid-cols-[minmax(300px,360px)_minmax(0,1fr)_300px] tab:h-[calc(100dvh-290px)] tab:min-h-[520px] tab:grid-cols-1">
      <div className={`min-h-0 flex-col ${view === "list" ? "flex" : "flex tab:hidden"}`}>
        <ConversationList items={convs} selectedId={selId} freshId={freshId} onSelect={open} t={t} c={c} locale={locale} />
      </div>

      <div className={`min-h-0 min-w-0 flex-col ${view === "thread" ? "flex" : "flex tab:hidden"}`}>
        {sel ? (
          <Thread
            conv={sel}
            typing={!!typing[sel.id]}
            aiOn={aiOn}
            onBack={() => setView("list")}
            onInfo={() => setInfoOpen(true)}
            onTakeover={() => setStatus(sel.id, "human")}
            onGiveBack={() => setStatus(sel.id, "ai")}
            onReopen={() => setStatus(sel.id, "ai")}
            onSend={send}
            t={t}
            c={c}
            locale={locale}
          />
        ) : (
          <div className="ekado-panel flex flex-1 flex-col items-center justify-center gap-3 rounded-(--r-x) p-8 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-era-coolblue text-era-primary-ink">
              <MessagesSquare size={28} />
            </span>
            <p className="text-[17px] font-bold text-era-black">{t.pick}</p>
            <p className="text-[14px] text-era-gray">{t.pickHint}</p>
          </div>
        )}
      </div>

      {/* geniş ekranda sabit sağ panel */}
      <div className="hidden min-h-0 min-[1280px]:flex min-[1280px]:flex-col">{info}</div>

      {/* dar ekranda çekmece */}
      {infoOpen && sel && (
        <div className="fixed inset-0 z-50 min-[1280px]:hidden">
          <button type="button" aria-label={t.closeInfo} onClick={() => setInfoOpen(false)} className="absolute inset-0 bg-era-dark/50 backdrop-blur-sm" />
          <div className="absolute inset-y-3 right-3 flex w-[min(340px,calc(100vw-24px))] flex-col [animation:era-in-right_.35s_cubic-bezier(.22,.61,.36,1)_both]">
            <InfoPanel
              conv={sel}
              booking={booking}
              t={t}
              c={c}
              locale={locale}
              onDismiss={() => setInfoOpen(false)}
              onGoLocks={() => goTo("locks")}
              onTakeover={() => setStatus(sel.id, "human")}
              onGiveBack={() => setStatus(sel.id, "ai")}
              onClose={() => setStatus(sel.id, "closed")}
            />
          </div>
        </div>
      )}
    </div>
  );
}
