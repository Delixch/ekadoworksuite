"use client";

import { useEffect, useRef, useState } from "react";
import { BatteryLow, Check, Copy, EyeOff, Lock as LockIcon, LockOpen, WifiOff, X } from "lucide-react";
import { commonT } from "@/i18n/panel/common";
import { locksT } from "@/i18n/panel/locks";
import { usePT } from "@/i18n/panel/use";
import { useLocale } from "@/i18n/useLocale";
import { createTempCode } from "@/lib/panel/api";
import type { Channel, Room, TempCode } from "@/lib/panel/types";
import { fmtAgo } from "../format";
import { Avatar, Btn, ChannelIcon, Chip, Field, Input, Spinner } from "../ui";

const VIA: Channel[] = ["whatsapp", "instagram", "messenger", "web"];
const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"];

const isoDay = (offset: number) => {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toISOString().slice(0, 10);
};

/** Şifre tuş takımında rakam rakam belirir; sonunda gerçek şifre sahte rakamlar arasında gösterilir. */
function CodeReveal({ code }: { code: string }) {
  const L = usePT(locksT);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = requestAnimationFrame(() => setN(code.length));
      return () => cancelAnimationFrame(id);
    }
    const id = setInterval(() => setN((v) => (v >= code.length ? v : v + 1)), 420);
    return () => clearInterval(id);
  }, [code]);

  const done = n >= code.length;
  const pressed = n > 0 && !done ? code[n - 1] : null;
  const before = code.split("").reverse().slice(0, 2).join("");
  const after = code.slice(1, 4).split("").reverse().join("");

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex h-16 w-full items-center justify-center gap-0.5 overflow-hidden rounded-(--r-r) bg-era-dark px-3 font-mono text-[30px] font-bold tracking-[0.18em] text-era-on-dark tabular-nums mob:text-[26px]">
        {done ? (
          <span className="[animation:era-pop-in_.5s_both]">
            <span className="text-era-on-dark/30">{before}</span>
            <span className="text-era-accent">{code}</span>
            <span className="text-era-on-dark/30">{after}</span>
          </span>
        ) : (
          <>
            {code.slice(0, n)}
            <span className="text-era-on-dark/25">{"•".repeat(code.length - n)}</span>
          </>
        )}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {KEYS.map((k) => {
          const on = pressed === k;
          return (
            <span
              key={k}
              className={`flex h-11 w-14 items-center justify-center rounded-(--r-s1) text-[18px] font-semibold transition-all duration-150 ${
                on ? "scale-90 bg-era-primary text-era-on-dark shadow-[0_0_0_6px_color-mix(in_oklab,var(--c-primary)_22%,transparent)]" : "bg-era-secondary text-era-black"
              }`}
            >
              {k}
            </span>
          );
        })}
      </div>
      {done && (
        <p className="flex items-start gap-2 rounded-(--r-s1) bg-era-secondary px-3 py-2.5 text-[12px] leading-snug text-era-gray [animation:era-bubble_.45s_both]">
          <EyeOff size={15} className="mt-0.5 flex-none text-era-primary-ink" />
          <span>
            <b className="text-era-black">{L.drawer.hideTitle}.</b> {L.drawer.hideText}
          </span>
        </p>
      )}
    </div>
  );
}

export function RoomDrawer({
  room,
  onClose,
  onRemoteOpen,
  onCreated,
}: {
  room: Room;
  onClose: () => void;
  onRemoteOpen: (roomId: string) => void;
  onCreated: (code: TempCode) => void;
}) {
  const L = usePT(locksT);
  const c = usePT(commonT);
  const { locale } = useLocale();
  const [guest, setGuest] = useState(room.guestName ?? "");
  const [validTo, setValidTo] = useState(isoDay(3));
  const [via, setVia] = useState<Channel>("whatsapp");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<TempCode | null>(null);
  const [copied, setCopied] = useState(false);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const key = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", key);
    panel.current?.focus();
    return () => document.removeEventListener("keydown", key);
  }, [onClose]);

  const { lock } = room;
  const low = lock.battery <= 25;

  const create = async () => {
    setBusy(true);
    const t = await createTempCode(room.id, guest.trim() || L.noGuest, validTo, via);
    setBusy(false);
    setResult(t);
    onCreated(t);
  };

  const copy = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end mob:items-end" role="dialog" aria-modal="true" aria-label={`${L.drawer.title} ${room.number}`}>
      <button type="button" aria-label={L.drawer.close} onClick={onClose} className="absolute inset-0 cursor-default bg-era-dark/60 backdrop-blur-[2px] [animation:era-pop-in_.3s_both]" />
      <div
        ref={panel}
        tabIndex={-1}
        className="relative flex h-full w-[440px] max-w-full flex-col gap-5 overflow-y-auto border-l border-era-cute bg-era-white p-6 shadow-[-18px_0_44px_var(--c-shadow)] outline-none [animation:era-in-right_.45s_cubic-bezier(.22,.61,.36,1)_both] mob:h-auto mob:max-h-[90vh] mob:w-full mob:rounded-t-[24px] mob:border-t mob:border-l-0 mob:p-5 mob:[animation:era-in-rise_.45s_cubic-bezier(.22,.61,.36,1)_both]"
      >
        {/* başlık */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span
              className={`relative flex h-14 w-14 flex-none items-center justify-center rounded-2xl transition-colors duration-500 ${
                lock.locked ? "bg-era-coolblue text-era-primary-ink" : "bg-[color-mix(in_oklab,var(--c-success)_20%,transparent)] text-era-success"
              }`}
            >
              <LockIcon size={26} className={`absolute transition-all duration-500 ${lock.locked ? "scale-100 opacity-100" : "scale-50 opacity-0"}`} />
              <LockOpen size={26} className={`absolute transition-all duration-500 ${lock.locked ? "scale-50 opacity-0" : "scale-100 opacity-100"}`} />
            </span>
            <div className="leading-tight">
              <h2 className="text-[24px] font-extrabold text-era-black">
                {L.drawer.title} {room.number}
              </h2>
              <p className="mt-0.5 text-[13px] text-era-gray">
                {L.floor} {room.floor} · {L.lock.provider[lock.provider]} · {lock.locked ? L.lock.locked : L.lock.unlocked}
              </p>
            </div>
          </div>
          <button type="button" onClick={onClose} aria-label={L.drawer.close} className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-era-lightgray text-era-black transition-colors hover:bg-era-secondary">
            <X size={18} />
          </button>
        </div>

        {/* kilit ayrıntısı */}
        <div className="flex flex-wrap items-center gap-2">
          <Chip tone={room.status === "occupied" ? "primary" : room.status === "arriving" ? "success" : room.status === "cleaning" ? "accent" : "neutral"}>{L.roomStatus[room.status]}</Chip>
          {!lock.online && (
            <Chip tone="danger">
              <WifiOff size={12} /> {L.lock.offline}
            </Chip>
          )}
          <Chip tone={low ? "danger" : "neutral"}>
            <BatteryLow size={12} /> {L.lock.battery} %{lock.battery}
          </Chip>
        </div>
        {room.guestName && (
          <div className="flex items-center gap-3 rounded-(--r-r) bg-era-secondary p-3">
            <Avatar name={room.guestName} size={38} />
            <div className="min-w-0 leading-tight">
              <div className="truncate text-[15px] font-bold text-era-black">{room.guestName}</div>
              <div className="text-[12px] text-era-gray">
                {L.lastEvent}: {L.event[lock.lastEvent.type]} · {fmtAgo(lock.lastEvent.at, locale)}
              </div>
            </div>
          </div>
        )}

        {/* uzaktan aç */}
        <div className="flex flex-col gap-2">
          <Btn variant="soft" onClick={() => onRemoteOpen(room.id)} disabled={!lock.online || !lock.locked} className="w-full">
            {lock.locked ? <LockOpen size={16} /> : <Check size={16} />}
            {L.drawer.remoteOpen}
          </Btn>
          <p className="min-h-5 text-center text-[12px] text-era-gray">
            {!lock.online ? L.drawer.offlineNote : !lock.locked ? <span className="font-semibold text-era-success">{L.drawer.opening}</span> : ""}
          </p>
        </div>

        <div className="h-px bg-era-lightgray" />

        {/* geçici şifre */}
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="text-[17px] font-bold text-era-black">{L.drawer.createTitle}</h3>
            <p className="mt-1 text-[13px] leading-snug text-era-gray">{L.drawer.createHint}</p>
          </div>

          {!result ? (
            <>
              <Field label={L.drawer.guest}>
                <Input value={guest} onChange={(e) => setGuest(e.target.value)} placeholder={L.drawer.guestPlaceholder} />
              </Field>
              <Field label={L.drawer.validTo}>
                <Input type="date" value={validTo} min={isoDay(0)} onChange={(e) => setValidTo(e.target.value)} />
              </Field>
              <div className="flex flex-col gap-1.5">
                <span className="text-[13px] font-semibold text-era-black">{L.drawer.via}</span>
                <div className="grid grid-cols-2 gap-2">
                  {VIA.map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setVia(v)}
                      aria-pressed={via === v}
                      className={`flex h-11 items-center gap-2.5 rounded-(--r-s1) border px-3 text-[14px] font-semibold transition-all duration-200 ${
                        via === v ? "border-era-primary bg-era-coolblue text-era-primary-ink" : "border-era-lightgray bg-era-white text-era-black hover:bg-era-secondary"
                      }`}
                    >
                      <ChannelIcon channel={v} size={18} />
                      {c.channels[v]}
                    </button>
                  ))}
                </div>
              </div>
              <Btn onClick={create} disabled={busy || !validTo} className="w-full">
                {busy ? (
                  <>
                    <Spinner /> {L.drawer.creating}
                  </>
                ) : (
                  L.drawer.create
                )}
              </Btn>
            </>
          ) : (
            <div className="flex flex-col gap-4">
              <CodeReveal code={result.code} />
              <p className="flex items-center justify-center gap-2 text-center text-[13px] font-semibold text-era-success">
                <Check size={16} />
                {L.drawer.sentVia.replace("{channel}", c.channels[via])}
              </p>
              <div className="grid grid-cols-2 gap-2">
                <Btn variant="soft" onClick={copy}>
                  {copied ? <Check size={15} /> : <Copy size={15} />}
                  {copied ? L.drawer.copied : L.drawer.copy}
                </Btn>
                <Btn variant="ghost" onClick={() => setResult(null)}>
                  {L.drawer.another}
                </Btn>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
