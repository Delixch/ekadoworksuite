"use client";

import { Bot, CalendarDays, KeyRound, Sparkles, UserRoundCheck, X } from "lucide-react";
import type { Locale } from "@/i18n/useLocale";
import type { Booking, Conversation } from "@/lib/panel/types";
import { fmtDate, fmtMoney } from "../format";
import { Avatar, Btn, Chip, ChannelIcon } from "../ui";
import { statusTone, type CommonText, type InboxText } from "./shared";

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 py-2 text-[14px]">
      <dt className="text-era-gray">{label}</dt>
      <dd className="flex min-w-0 items-center gap-1.5 text-right font-semibold text-era-black">{children}</dd>
    </div>
  );
}

export function InfoPanel({
  conv,
  booking,
  onGoLocks,
  onTakeover,
  onGiveBack,
  onClose,
  onDismiss,
  t,
  c,
  locale,
}: {
  conv: Conversation;
  booking?: Booking;
  onGoLocks: () => void;
  onTakeover: () => void;
  onGiveBack: () => void;
  onClose: () => void;
  /** çekmece olarak açıksa kapatma düğmesi */
  onDismiss?: () => void;
  t: InboxText;
  c: CommonText;
  locale: Locale;
}) {
  const p = t.panel;
  const nights = booking ? Math.max(1, Math.round((new Date(booking.checkOut).getTime() - new Date(booking.checkIn).getTime()) / 86400000)) : 0;
  const closed = conv.status === "closed";
  return (
    <div className="ekado-panel flex min-h-0 flex-col overflow-y-auto rounded-(--r-x) p-5">
      {onDismiss && (
        <button type="button" onClick={onDismiss} aria-label={t.closeInfo} className="mb-2 ml-auto flex h-9 w-9 items-center justify-center rounded-full bg-era-secondary text-era-black">
          <X size={17} />
        </button>
      )}
      <div className="flex flex-col items-center gap-2 text-center">
        <Avatar name={conv.guest.name} size={72} />
        <div>
          <p className="text-[18px] font-extrabold text-era-black">{conv.guest.name}</p>
          <p className="text-[13px] text-era-gray">{p.guest}</p>
        </div>
      </div>

      <dl className="mt-4 divide-y divide-era-line border-t border-era-line">
        <Row label={p.country}>{conv.guest.country}</Row>
        <Row label={p.language}>{c.langs[conv.guest.lang] ?? conv.guest.lang.toUpperCase()}</Row>
        <Row label={p.channel}>
          <ChannelIcon channel={conv.channel} size={15} /> {c.channels[conv.channel]}
        </Row>
        <Row label={p.intent}>
          <Chip tone="accent">{c.intents[conv.intent]}</Chip>
        </Row>
        <Row label={p.status}>
          <Chip tone={statusTone[conv.status]}>{c.status[conv.status]}</Chip>
        </Row>
      </dl>

      <div className="mt-4 rounded-(--r-r) bg-era-coolblue p-3.5">
        <p className="mb-1 flex items-center gap-1.5 text-[11px] font-bold tracking-wider text-era-primary-ink uppercase">
          <Sparkles size={13} /> {p.aiNote}
        </p>
        <p className="text-[13px] leading-snug text-era-black">{t.summaries[conv.intent]}</p>
      </div>

      <h4 className="mt-5 mb-2 text-[12px] font-bold tracking-wider text-era-gray uppercase">{p.booking}</h4>
      {booking ? (
        <div className="rounded-(--r-r) border border-era-line bg-era-white p-3.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[13px] font-bold text-era-black">{booking.id}</span>
            <Chip tone={booking.status === "cancelled" ? "danger" : booking.status === "pending" ? "neutral" : "success"}>{t.bookingStatus[booking.status]}</Chip>
          </div>
          <p className="mt-2 flex items-center gap-1.5 text-[13px] text-era-gray">
            <CalendarDays size={14} />
            {fmtDate(booking.checkIn, locale)} – {fmtDate(booking.checkOut, locale)} · {nights} {p.nights}
          </p>
          <p className="mt-1 text-[15px] font-extrabold text-era-black">{fmtMoney(booking.total, booking.currency, locale)}</p>
        </div>
      ) : (
        <p className="text-[13px] leading-snug text-era-gray">{p.noBooking}</p>
      )}

      <h4 className="mt-5 mb-2 text-[12px] font-bold tracking-wider text-era-gray uppercase">{p.quick}</h4>
      <div className="flex flex-col gap-2">
        <Btn variant="soft" onClick={onGoLocks}>
          <KeyRound size={16} /> {p.sendCode}
        </Btn>
        {conv.status === "ai" ? (
          <Btn variant="ghost" onClick={onTakeover}>
            <UserRoundCheck size={16} /> {t.composer.takeover}
          </Btn>
        ) : (
          !closed && (
            <Btn variant="ghost" onClick={onGiveBack}>
              <Bot size={16} /> {t.composer.giveBack}
            </Btn>
          )
        )}
        {!closed && (
          <Btn variant="danger" onClick={onClose}>
            {p.closeConv}
          </Btn>
        )}
      </div>
    </div>
  );
}
