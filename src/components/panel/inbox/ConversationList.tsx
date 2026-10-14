"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { Locale } from "@/i18n/useLocale";
import type { Conversation } from "@/lib/panel/types";
import { fmtAgo } from "../format";
import { Avatar, Chip, ChannelIcon, Input } from "../ui";
import { statusTone, type CommonText, type InboxText } from "./shared";

type Filter = "all" | "ai" | "handoff";

const match: Record<Filter, (c: Conversation) => boolean> = {
  all: () => true,
  ai: (c) => c.status === "ai",
  handoff: (c) => c.status === "waiting" || c.status === "human",
};

export function ConversationList({
  items,
  selectedId,
  freshId,
  onSelect,
  t,
  c,
  locale,
}: {
  items: Conversation[] | null;
  selectedId: string | null;
  freshId: string | null;
  onSelect: (id: string) => void;
  t: InboxText;
  c: CommonText;
  locale: Locale;
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  const counts = useMemo(
    () => ({
      all: items?.length ?? 0,
      ai: items?.filter(match.ai).length ?? 0,
      handoff: items?.filter(match.handoff).length ?? 0,
    }),
    [items]
  );

  const visible = useMemo(() => {
    if (!items) return [];
    const q = query.trim().toLowerCase();
    return items
      .filter(match[filter])
      .filter((x) => !q || x.guest.name.toLowerCase().includes(q) || x.messages.some((m) => m.text.toLowerCase().includes(q)))
      .sort((a, b) => b.lastMessageAt.localeCompare(a.lastMessageAt));
  }, [items, filter, query]);

  return (
    <div className="ekado-panel flex min-h-0 flex-col rounded-(--r-x)">
      <div className="flex flex-col gap-3 border-b border-era-line p-4">
        <div className="relative">
          <Search size={16} className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-era-matte" />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t.searchPlaceholder} aria-label={t.searchPlaceholder} className="pl-10!" />
        </div>
        <div className="flex gap-1.5 overflow-x-auto" role="tablist">
          {(Object.keys(match) as Filter[]).map((f) => (
            <button
              key={f}
              type="button"
              role="tab"
              aria-selected={filter === f}
              onClick={() => setFilter(f)}
              className={`flex flex-none items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition-colors duration-300 ${
                filter === f ? "bg-era-primary text-era-on-dark" : "bg-era-secondary text-era-gray hover:text-era-black"
              }`}
            >
              {t.filters[f]}
              <span className={`rounded-full px-1.5 text-[11px] leading-4 ${filter === f ? "bg-era-on-dark/20" : "bg-era-white"}`}>{counts[f]}</span>
            </button>
          ))}
        </div>
      </div>

      <ul className="min-h-0 flex-1 overflow-y-auto p-2">
        {!items &&
          Array.from({ length: 6 }).map((_, i) => (
            <li key={i} className="flex animate-pulse gap-3 p-3">
              <span className="h-11 w-11 flex-none rounded-full bg-era-secondary" />
              <span className="flex flex-1 flex-col gap-2 pt-1">
                <span className="h-3 w-1/2 rounded-full bg-era-secondary" />
                <span className="h-3 w-4/5 rounded-full bg-era-secondary" />
              </span>
            </li>
          ))}
        {items && visible.length === 0 && <li className="px-4 py-10 text-center text-[14px] text-era-gray">{t.empty}</li>}
        {visible.map((conv) => {
          const last = conv.messages[conv.messages.length - 1];
          const on = conv.id === selectedId;
          const prefix = last.sender === "ai" ? `${t.aiBadge}: ` : last.sender === "staff" ? t.you : "";
          return (
            <li key={conv.id} className={conv.id === freshId ? "era-bubble" : ""}>
              <button
                type="button"
                onClick={() => onSelect(conv.id)}
                aria-current={on ? "true" : undefined}
                className={`flex w-full gap-3 rounded-(--r-r) p-3 text-left transition-colors duration-300 ${on ? "bg-era-coolblue" : "hover:bg-era-secondary"}`}
              >
                <span className="relative flex-none">
                  <Avatar name={conv.guest.name} size={44} />
                  <span className="absolute -right-1 -bottom-1 flex h-5 w-5 items-center justify-center rounded-full bg-era-white ring-2 ring-era-white">
                    <ChannelIcon channel={conv.channel} size={13} />
                  </span>
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline justify-between gap-2">
                    <span className={`truncate text-[15px] text-era-black ${conv.unread ? "font-extrabold" : "font-bold"}`}>{conv.guest.name}</span>
                    <span className="flex-none text-[12px] text-era-matte">{fmtAgo(conv.lastMessageAt, locale)}</span>
                  </span>
                  <span className="mt-0.5 flex items-center justify-between gap-2">
                    <span className={`truncate text-[13px] ${conv.unread ? "font-semibold text-era-black" : "text-era-gray"}`}>
                      {prefix}
                      {last.text}
                    </span>
                    {conv.unread > 0 && (
                      <span className="flex h-5 min-w-5 flex-none items-center justify-center rounded-full bg-era-primary px-1.5 text-[11px] font-bold text-era-on-dark">{conv.unread}</span>
                    )}
                  </span>
                  <span className="mt-1.5 flex flex-wrap gap-1.5">
                    <Chip tone={statusTone[conv.status]}>{c.status[conv.status]}</Chip>
                    <Chip>{c.intents[conv.intent]}</Chip>
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
