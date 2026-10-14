"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BatteryLow, Check, CreditCard, Copy, Fingerprint, KeyRound, Lock as LockIcon, LockOpen, ShieldCheck, Smartphone, WifiOff, type LucideIcon } from "lucide-react";
import { locksT } from "@/i18n/panel/locks";
import { usePT } from "@/i18n/panel/use";
import { useLocale } from "@/i18n/useLocale";
import { listRooms, listTempCodes } from "@/lib/panel/api";
import type { Lock, Room, TempCode } from "@/lib/panel/types";
import { usePanel } from "./context";
import { fmtAgo } from "./format";
import { RoomDrawer } from "./locks/RoomDrawer";
import { Avatar, Card, CardHead, Chip, LiveDot, Spinner, useCountUp } from "./ui";

type EventType = Lock["lastEvent"]["type"];
interface DoorEvent {
  id: string;
  roomNumber: string;
  type: EventType;
  at: string;
  by?: string;
}
type CodeRow = TempCode & { revoked?: boolean };

const eventIcon: Record<EventType, LucideIcon> = {
  unlock_code: KeyRound,
  unlock_app: Smartphone,
  unlock_card: CreditCard,
  unlock_fp: Fingerprint,
  lock: LockIcon,
  low_battery: BatteryLow,
};
const SIM_EVENTS: EventType[] = ["unlock_code", "unlock_app", "unlock_card", "unlock_fp"];
const SIM_GUESTS = ["Anna Weber", "Mehmet Kaya", "Olga Ivanova", "James Carter", "Yuki Tanaka", "Lena Fischer"];

const sameDay = (iso: string) => new Date(iso).toDateString() === new Date().toDateString();
const endOfDay = (d: string) => new Date(`${d.slice(0, 10)}T23:59:59`).getTime();

/* ------------------------------- Özet kutusu ------------------------------- */

function StatTile({ icon: Icon, label, value, total, tone }: { icon: LucideIcon; label: string; value: number; total?: number; tone: "primary" | "accent" | "danger" | "success" }) {
  const n = useCountUp(value, 900);
  const toneCls = {
    primary: "bg-era-coolblue text-era-primary-ink",
    accent: "bg-[color-mix(in_oklab,var(--c-accent)_18%,transparent)] text-era-accent",
    danger: "bg-[color-mix(in_oklab,var(--c-danger)_14%,transparent)] text-era-danger",
    success: "bg-[color-mix(in_oklab,var(--c-success)_16%,transparent)] text-era-success",
  }[tone];
  return (
    <div className="ekado-panel flex items-center gap-4 rounded-(--r-r) p-4 mob:gap-3 mob:p-3.5">
      <span className={`flex h-12 w-12 flex-none items-center justify-center rounded-2xl mob:h-10 mob:w-10 ${toneCls}`}>
        <Icon size={22} strokeWidth={1.9} />
      </span>
      <div className="min-w-0 leading-tight">
        <div className="text-[28px] font-extrabold text-era-black tabular-nums mob:text-[22px]">
          {Math.round(n)}
          {total !== undefined && <span className="text-[16px] font-semibold text-era-matte"> / {total}</span>}
        </div>
        <div className="truncate text-[13px] text-era-gray">{label}</div>
      </div>
    </div>
  );
}

/* ------------------------------- Oda kartı ------------------------------- */

function RoomCard({ room, flash, onOpen }: { room: Room; flash: boolean; onOpen: () => void }) {
  const L = usePT(locksT);
  const { locale } = useLocale();
  const { lock } = room;
  const batt = lock.battery <= 25 ? "bg-era-danger" : lock.battery <= 50 ? "bg-era-accent" : "bg-era-success";
  const tone = room.status === "occupied" ? "primary" : room.status === "arriving" ? "success" : room.status === "cleaning" ? "accent" : "neutral";

  return (
    <button
      type="button"
      onClick={onOpen}
      className={`ekado-panel ekado-spot group/room flex w-full flex-col gap-3 rounded-(--r-r) p-4 text-left transition-shadow duration-500 ${
        flash ? "shadow-[0_0_0_4px_color-mix(in_oklab,var(--c-success)_38%,transparent),0_10px_32px_var(--c-shadow-soft)]" : ""
      } ${!lock.online ? "opacity-80" : ""}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="leading-none">
          <div className="text-[26px] font-extrabold tracking-tight text-era-black tabular-nums">{room.number}</div>
          <div className="mt-1.5">
            <Chip tone={tone}>{L.roomStatus[room.status]}</Chip>
          </div>
        </div>
        <span
          className={`relative flex h-12 w-12 flex-none items-center justify-center rounded-2xl transition-colors duration-500 ${
            lock.locked ? "bg-era-coolblue text-era-primary-ink" : "bg-[color-mix(in_oklab,var(--c-success)_22%,transparent)] text-era-success"
          }`}
        >
          {!lock.locked && <span className="era-ring absolute inset-0 rounded-2xl bg-era-success/30" />}
          <LockIcon size={22} className={`absolute transition-all duration-500 ${lock.locked ? "scale-100 opacity-100" : "scale-50 -rotate-12 opacity-0"}`} />
          <LockOpen size={22} className={`absolute transition-all duration-500 ${lock.locked ? "scale-50 rotate-12 opacity-0" : "scale-100 opacity-100"}`} />
        </span>
      </div>

      <div className="flex min-h-9 items-center gap-2">
        {room.guestName ? (
          <>
            <Avatar name={room.guestName} size={28} />
            <span className="truncate text-[14px] font-semibold text-era-black">{room.guestName}</span>
          </>
        ) : (
          <span className="text-[14px] text-era-matte">{L.noGuest}</span>
        )}
      </div>

      <div className="flex items-center gap-2.5">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-era-brightgray">
          <div className={`h-full rounded-full transition-all duration-1000 ${batt}`} style={{ width: `${lock.battery}%` }} />
        </div>
        <span className="text-[12px] font-semibold text-era-gray tabular-nums">%{lock.battery}</span>
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        <Chip>{L.lock.provider[lock.provider]}</Chip>
        {!lock.online && (
          <Chip tone="danger">
            <WifiOff size={11} /> {L.lock.offline}
          </Chip>
        )}
        {lock.battery <= 25 && (
          <Chip tone="danger">
            <BatteryLow size={11} />
          </Chip>
        )}
      </div>

      <p className="truncate text-[12px] text-era-gray">
        {L.event[lock.lastEvent.type]} · {fmtAgo(lock.lastEvent.at, locale)}
      </p>
    </button>
  );
}

/* ------------------------------- Aktif şifre satırı ------------------------------- */

function CodeItem({ row, roomNumber, now, onRevoke }: { row: CodeRow; roomNumber: string; now: number; onRevoke: () => void }) {
  const L = usePT(locksT);
  const [copied, setCopied] = useState(false);
  const from = new Date(row.validFrom.length <= 10 ? `${row.validFrom}T00:00:00` : row.validFrom).getTime();
  const to = endOfDay(row.validTo);
  const left = Math.max(0, to - now);
  const pct = Math.max(4, Math.min(100, (left / Math.max(1, to - from)) * 100));
  const d = Math.floor(left / 86_400_000);
  const h = Math.floor((left % 86_400_000) / 3_600_000);
  const m = Math.floor((left % 3_600_000) / 60_000);
  const leftText = d > 0 ? `${d}${L.codes.days} ${h}${L.codes.hours}` : `${h}${L.codes.hours} ${m}${L.codes.minutes}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(row.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <li className={`flex flex-col gap-2.5 rounded-(--r-s1) bg-era-secondary p-3 transition-opacity duration-500 [animation:era-bubble_.45s_both] ${row.revoked ? "opacity-40" : ""}`}>
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-era-white text-[13px] font-extrabold text-era-primary-ink tabular-nums ring-1 ring-era-line">{roomNumber}</span>
        <div className="min-w-0 flex-1 leading-tight">
          <div className="truncate text-[14px] font-bold text-era-black">{row.guestName}</div>
          <div className="font-mono text-[13px] tracking-[0.14em] text-era-gray tabular-nums">{row.code}</div>
        </div>
        <button type="button" onClick={copy} aria-label={L.codes.copy} title={copied ? L.codes.copied : L.codes.copy} className="flex h-8 w-8 flex-none items-center justify-center rounded-full text-era-gray transition-colors hover:bg-era-white hover:text-era-primary-ink">
          {copied ? <Check size={15} className="text-era-success" /> : <Copy size={15} />}
        </button>
        <button type="button" onClick={onRevoke} disabled={row.revoked} className="rounded-full px-2.5 py-1 text-[12px] font-semibold text-era-danger transition-colors hover:bg-era-white disabled:pointer-events-none">
          {row.revoked ? L.codes.revoked : L.codes.revoke}
        </button>
      </div>
      <div className="flex items-center gap-2.5">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-era-white">
          <div className="h-full rounded-full bg-linear-to-r from-era-primary to-era-accent transition-all duration-1000" style={{ width: `${pct}%` }} />
        </div>
        <span className="text-[12px] font-semibold text-era-gray tabular-nums">
          {leftText} {L.codes.left}
        </span>
      </div>
    </li>
  );
}

/* ------------------------------- Bölüm ------------------------------- */

export function Locks() {
  const L = usePT(locksT);
  const { locale } = useLocale();
  const { hotel } = usePanel();
  const [rooms, setRooms] = useState<Room[] | null>(null);
  const [codes, setCodes] = useState<CodeRow[]>([]);
  const [events, setEvents] = useState<DoorEvent[]>([]);
  const [floor, setFloor] = useState<number | "all">("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [flashId, setFlashId] = useState<string | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const roomsRef = useRef<Room[]>([]);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  // veriyi yükle (otel değişince yeniden)
  useEffect(() => {
    let live = true;
    Promise.all([listRooms(hotel.id), listTempCodes(hotel.id)]).then(([r, t]) => {
      if (!live) return;
      roomsRef.current = r;
      setRooms(r);
      setCodes(t);
      setEvents(
        r
          .map((x) => ({ id: `ev-${x.id}`, roomNumber: x.number, type: x.lock.lastEvent.type, at: x.lock.lastEvent.at, by: x.guestName ?? x.lock.lastEvent.by }))
          .sort((a, b) => b.at.localeCompare(a.at))
          .slice(0, 12)
      );
    });
    return () => {
      live = false;
    };
  }, [hotel.id]);

  useEffect(() => {
    roomsRef.current = rooms ?? [];
  }, [rooms]);

  // göreli zamanlar ve geri sayımlar tazelensin
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const list = timers.current;
    return () => list.forEach(clearTimeout);
  }, []);

  const later = useCallback((fn: () => void, ms: number) => {
    timers.current.push(setTimeout(fn, ms));
  }, []);

  const pushEvent = useCallback((room: Room, type: EventType, by?: string) => {
    setEvents((prev) => [{ id: `ev-${Date.now()}-${room.id}`, roomNumber: room.number, type, at: new Date().toISOString(), by }, ...prev].slice(0, 14));
  }, []);

  const setLocked = useCallback((roomId: string, locked: boolean) => {
    setRooms((prev) => prev?.map((x) => (x.id === roomId ? { ...x, lock: { ...x.lock, locked } } : x)) ?? prev);
  }, []);

  // canlı akış: arada bir odada kapı açılır, kart kısa süre parlar, sonra yeniden kilitlenir
  useEffect(() => {
    if (!rooms) return;
    const id = setInterval(() => {
      const list = roomsRef.current.filter((x) => x.lock.online && x.lock.locked && x.status !== "vacant");
      if (!list.length) return;
      const room = list[Math.floor(Math.random() * list.length)];
      const type = SIM_EVENTS[Math.floor(Math.random() * SIM_EVENTS.length)];
      const by = room.guestName ?? SIM_GUESTS[Math.floor(Math.random() * SIM_GUESTS.length)];
      setLocked(room.id, false);
      setFlashId(room.id);
      pushEvent(room, type, by);
      later(() => setFlashId((f) => (f === room.id ? null : f)), 2200);
      later(() => {
        setLocked(room.id, true);
        pushEvent(room, "lock", by);
      }, 5000);
    }, 11_000);
    return () => clearInterval(id);
  }, [rooms, later, pushEvent, setLocked]);

  const remoteOpen = useCallback(
    (roomId: string) => {
      const room = roomsRef.current.find((x) => x.id === roomId);
      if (!room) return;
      setLocked(roomId, false);
      setFlashId(roomId);
      pushEvent(room, "unlock_app", "Panel");
      later(() => setFlashId((f) => (f === roomId ? null : f)), 2200);
      later(() => {
        setLocked(roomId, true);
        pushEvent(room, "lock", "Panel");
      }, 3000);
    },
    [later, pushEvent, setLocked]
  );

  const onCreated = useCallback((t: TempCode) => setCodes((prev) => [t, ...prev]), []);

  const floors = useMemo(() => [...new Set((rooms ?? []).map((r) => r.floor))].sort((a, b) => a - b), [rooms]);
  const visible = (rooms ?? []).filter((r) => floor === "all" || r.floor === floor);
  const selected = rooms?.find((r) => r.id === selectedId) ?? null;

  if (!rooms) {
    return (
      <div className="flex items-center justify-center gap-3 py-24 text-era-gray">
        <Spinner size={18} /> {L.loading}
      </div>
    );
  }

  const online = rooms.filter((r) => r.lock.online).length;
  const low = rooms.filter((r) => r.lock.battery <= 25).length;
  const activeCodes = codes.filter((x) => !x.revoked && endOfDay(x.validTo) >= now);
  const opensToday = events.filter((e) => e.type.startsWith("unlock") && sameDay(e.at)).length;
  const roomNo = (id: string) => rooms.find((r) => r.id === id)?.number ?? "—";

  return (
    <div className="flex flex-col gap-6">
      {/* özet şeridi */}
      <div className="grid grid-cols-4 gap-4 tab:grid-cols-2 mob:gap-3">
        <StatTile icon={ShieldCheck} label={L.stats.online} value={online} total={rooms.length} tone="success" />
        <StatTile icon={BatteryLow} label={L.stats.lowBattery} value={low} tone="danger" />
        <StatTile icon={KeyRound} label={L.stats.activeCodes} value={activeCodes.length} tone="primary" />
        <StatTile icon={LockOpen} label={L.stats.opensToday} value={opensToday} tone="accent" />
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)_400px] items-start gap-6 tab:grid-cols-1">
        {/* odalar */}
        <div className="flex min-w-0 flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {(["all", ...floors] as const).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFloor(f)}
                aria-pressed={floor === f}
                className={`h-10 rounded-full px-4 text-[14px] font-semibold transition-all duration-300 ${
                  floor === f ? "bg-era-primary text-era-on-dark shadow-[0_8px_20px_var(--c-shadow)]" : "border border-era-lightgray bg-era-white text-era-black hover:bg-era-secondary"
                }`}
              >
                {f === "all" ? L.allFloors : `${L.floor} ${f}`}
              </button>
            ))}
          </div>
          <div key={String(floor)} className="grid grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4 mob:grid-cols-1">
            {visible.map((r, i) => (
              <div key={r.id} className="[animation:era-pop-in_.5s_both]" style={{ animationDelay: `${i * 35}ms` }}>
                <RoomCard room={r} flash={flashId === r.id} onOpen={() => setSelectedId(r.id)} />
              </div>
            ))}
          </div>
        </div>

        {/* sağ blok */}
        <div className="flex min-w-0 flex-col gap-6">
          <Card>
            <CardHead title={L.codes.title} hint={L.codes.hint} right={<Chip tone="primary">{activeCodes.length}</Chip>} />
            {activeCodes.length === 0 ? (
              <p className="py-6 text-center text-[14px] text-era-gray">{L.codes.empty}</p>
            ) : (
              <ul className="flex flex-col gap-2.5">
                {[...codes]
                  .filter((x) => endOfDay(x.validTo) >= now)
                  .sort((a, b) => a.validTo.localeCompare(b.validTo))
                  .map((row) => (
                    <CodeItem key={row.id} row={row} now={now} roomNumber={roomNo(row.roomId)} onRevoke={() => setCodes((p) => p.map((x) => (x.id === row.id ? { ...x, revoked: true } : x)))} />
                  ))}
              </ul>
            )}
          </Card>

          <Card>
            <CardHead
              title={L.events.title}
              hint={L.events.hint}
              right={
                <span className="flex items-center gap-2 text-[12px] font-semibold text-era-success">
                  <LiveDot /> Live
                </span>
              }
            />
            {events.length === 0 ? (
              <p className="py-6 text-center text-[14px] text-era-gray">{L.events.empty}</p>
            ) : (
              <ul className="flex flex-col">
                {events.map((e) => {
                  const Icon = eventIcon[e.type];
                  const warn = e.type === "low_battery";
                  return (
                    <li key={e.id} className="flex items-center gap-3 border-b border-era-line py-2.5 last:border-b-0 [animation:era-bubble_.5s_both]">
                      <span
                        className={`flex h-9 w-9 flex-none items-center justify-center rounded-full ${
                          warn ? "bg-[color-mix(in_oklab,var(--c-danger)_14%,transparent)] text-era-danger" : e.type === "lock" ? "bg-era-secondary text-era-gray" : "bg-era-coolblue text-era-primary-ink"
                        }`}
                      >
                        <Icon size={16} strokeWidth={1.9} />
                      </span>
                      <div className="min-w-0 flex-1 leading-tight">
                        <div className="truncate text-[14px] font-semibold text-era-black">
                          {L.drawer.title} {e.roomNumber} · {L.event[e.type]}
                        </div>
                        {e.by && (
                          <div className="truncate text-[12px] text-era-gray">
                            {L.events.by} {e.by}
                          </div>
                        )}
                      </div>
                      <span className="flex-none text-[12px] text-era-matte">{fmtAgo(e.at, locale)}</span>
                    </li>
                  );
                })}
              </ul>
            )}
          </Card>
        </div>
      </div>

      {selected && <RoomDrawer key={selected.id} room={selected} onClose={() => setSelectedId(null)} onRemoteOpen={remoteOpen} onCreated={onCreated} />}
    </div>
  );
}
