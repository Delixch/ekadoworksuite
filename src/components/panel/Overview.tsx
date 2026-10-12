"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowDownRight, ArrowUpRight, Bot, CalendarCheck, DoorOpen, Hand, MessageCircleReply, Sparkles, Timer, Wallet, type LucideIcon } from "lucide-react";
import { useLocale } from "@/i18n/useLocale";
import { commonT } from "@/i18n/panel/common";
import { overviewT } from "@/i18n/panel/overview";
import { usePT } from "@/i18n/panel/use";
import { getOverview } from "@/lib/panel/api";
import type { Channel, Kpi, OverviewData, Room, StatsRange } from "@/lib/panel/types";
import { AreaChart, Donut, Sparkline } from "./charts";
import { VideoButton } from "@/components/sites/era/VideoModal";
import { usePanel } from "./context";
import { fmtAgo, fmtDate, fmtMoney, fmtNum } from "./format";
import { Avatar, Card, CardHead, ChannelIcon, Chip, LiveDot, Spinner, useCountUp, type Tone } from "./ui";

const channelColor: Record<Channel, string> = {
  whatsapp: "var(--c-whatsapp)",
  instagram: "var(--c-ig-2)",
  messenger: "var(--c-messenger)",
  phone: "var(--c-primary)",
  web: "var(--c-accent)",
};

/* ------------------------------- Üst çubuk: aralık seçici ------------------------------- */

function RangeTabs({ value, onChange }: { value: StatsRange; onChange: (r: StatsRange) => void }) {
  const c = usePT(commonT);
  const items: [StatsRange, string][] = [
    ["today", c.today],
    ["7d", c.d7],
    ["30d", c.d30],
  ];
  return (
    <div className="relative flex rounded-full border border-era-lightgray bg-era-white p-1">
      {items.map(([id, label]) => (
        <button
          key={id}
          type="button"
          onClick={() => onChange(id)}
          aria-pressed={value === id}
          className={`relative z-[1] h-9 rounded-full px-4 text-[13px] font-semibold transition-colors duration-300 ${value === id ? "bg-era-primary text-era-on-dark" : "text-era-gray hover:text-era-black"}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

/* ------------------------------- KPI kartı ------------------------------- */

function KpiCard({ icon: Icon, label, value, display, kpi, goodWhenDown, featured, delay }: { icon: LucideIcon; label: string; value: number; display: (v: number) => string; kpi: Kpi; goodWhenDown?: boolean; featured?: boolean; delay: number }) {
  const t = usePT(overviewT);
  const v = useCountUp(value);
  const up = kpi.delta >= 0;
  const good = goodWhenDown ? !up : up;
  const { locale } = useLocale();
  return (
    <section
      className={`${featured ? "punn-feature text-era-on-dark" : "punn-panel text-era-black"} punn-spot relative flex flex-col gap-3 overflow-hidden rounded-(--r-x) p-5 mob:p-4 [animation:era-pop-in_.6s_both]`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between gap-2">
        <span className={`flex items-center gap-2 text-[13px] font-semibold ${featured ? "text-era-on-dark/80" : "text-era-gray"}`}>
          <span className={`flex h-8 w-8 items-center justify-center rounded-full ${featured ? "bg-era-on-dark/15" : "bg-era-coolblue text-era-primary-ink"}`}>
            <Icon size={16} strokeWidth={2} />
          </span>
          {label}
        </span>
        <span
          className={`flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[12px] font-bold ${
            featured ? "bg-era-on-dark/15 text-era-on-dark" : good ? "bg-[color-mix(in_oklab,var(--c-success)_16%,transparent)] text-era-success" : "bg-[color-mix(in_oklab,var(--c-danger)_14%,transparent)] text-era-danger"
          }`}
        >
          {up ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
          {fmtNum(Math.abs(kpi.delta), locale, 1)}%
        </span>
      </div>
      <div className="text-[38px] leading-none font-extrabold tracking-tight tabular-nums mob:text-[32px]">{display(v)}</div>
      <Sparkline data={kpi.trend} color={featured ? "var(--c-on-dark)" : "var(--c-primary)"} />
      <span className={`text-[12px] ${featured ? "text-era-on-dark/70" : "text-era-matte"}`}>{t.kpi.vsPrev}</span>
    </section>
  );
}

/* ------------------------------- Canlı akış ------------------------------- */

type FeedKind = keyof (typeof overviewT)["tr"]["feed"]["events"];
const feedIcon: Record<FeedKind, LucideIcon> = {
  booking: CalendarCheck,
  answered: MessageCircleReply,
  code: Sparkles,
  handoff: Hand,
  checkin: DoorOpen,
  unlock: DoorOpen,
};
const feedTone: Record<FeedKind, Tone> = { booking: "success", answered: "primary", code: "accent", handoff: "danger", checkin: "success", unlock: "neutral" };

interface FeedItem {
  id: number;
  kind: FeedKind;
  name: string;
  at: string;
}

function Feed({ names }: { names: string[] }) {
  const t = usePT(overviewT);
  const { locale } = useLocale();
  const kinds = useMemo(() => Object.keys(t.feed.events) as FeedKind[], [t.feed.events]);
  const [items, setItems] = useState<FeedItem[]>([]);

  // başlangıç satırları ve arada bir gelen yeni olay
  useEffect(() => {
    if (!names.length) return;
    let n = 0;
    const mk = (ago: number): FeedItem => ({
      id: n++,
      kind: kinds[(n * 5 + 1) % kinds.length],
      name: names[(n * 3) % names.length],
      at: new Date(Date.now() - ago * 1000).toISOString(),
    });
    setItems([mk(300), mk(180), mk(95), mk(40), mk(12)].reverse());
    const id = setInterval(() => setItems((cur) => [mk(0), ...cur].slice(0, 7)), 5200);
    return () => clearInterval(id);
  }, [names, kinds]);

  return (
    <Card className="flex flex-col">
      <CardHead
        title={t.feed.title}
        hint={t.feed.hint}
        right={
          <span className="flex items-center gap-2 text-[12px] font-semibold text-era-success">
            <LiveDot /> LIVE
          </span>
        }
      />
      <ul className="flex flex-col gap-1">
        {items.map((it) => {
          const Icon = feedIcon[it.kind];
          return (
            <li key={it.id} className="flex items-center gap-3 rounded-(--r-s1) px-2 py-2 [animation:era-pop-in_.5s_both]">
              <Chip tone={feedTone[it.kind]} className="!h-8 !w-8 flex-none !justify-center !p-0">
                <Icon size={15} />
              </Chip>
              <span className="min-w-0 flex-1 text-[14px] leading-snug text-era-black">{t.feed.events[it.kind].replace("{name}", it.name)}</span>
              <span className="flex-none text-[12px] text-era-matte">{Date.now() - new Date(it.at).getTime() < 4000 ? t.feed.now : fmtAgo(it.at, locale)}</span>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}

/* ------------------------------- Oda haritası ------------------------------- */

function RoomsMap({ rooms }: { rooms: Room[] }) {
  const t = usePT(overviewT);
  const floors = [...new Set(rooms.map((r) => r.floor))];
  const occ = Math.round((rooms.filter((r) => r.status === "occupied").length / rooms.length) * 100);
  const count = useCountUp(occ);
  const cls: Record<Room["status"], string> = {
    occupied: "bg-era-primary text-era-on-dark",
    vacant: "bg-era-secondary text-era-gray",
    cleaning: "bg-[color-mix(in_oklab,var(--c-accent)_26%,transparent)] text-era-black",
    arriving: "bg-[color-mix(in_oklab,var(--c-success)_26%,transparent)] text-era-black ring-1 ring-era-success",
  };
  return (
    <Card>
      <CardHead title={t.rooms.title} hint={t.rooms.hint} right={<span className="text-[26px] leading-none font-extrabold text-era-primary-ink tabular-nums">{Math.round(count)}%<small className="ml-1 text-[11px] font-semibold text-era-gray">{t.rooms.occupancy}</small></span>} />
      <div className="flex flex-col gap-2">
        {floors.map((f, fi) => (
          <div key={f} className="flex items-center gap-2">
            <span className="w-9 flex-none text-[11px] font-semibold text-era-matte uppercase">{t.rooms.floor} {f}</span>
            <div className="grid flex-1 grid-cols-8 gap-1.5">
              {rooms
                .filter((r) => r.floor === f)
                .map((r, i) => (
                  <span
                    key={r.id}
                    title={`${r.number} · ${t.rooms[r.status]}${r.guestName ? ` · ${r.guestName}` : ""}`}
                    className={`flex aspect-square items-center justify-center rounded-lg text-[11px] font-bold transition-transform duration-300 hover:scale-110 [animation:era-pop-in_.5s_both] ${cls[r.status]}`}
                    style={{ animationDelay: `${(fi * 8 + i) * 22}ms` }}
                  >
                    {r.number}
                  </span>
                ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-[12px] text-era-gray">
        {(["occupied", "vacant", "cleaning", "arriving"] as const).map((s) => (
          <span key={s} className="flex items-center gap-1.5">
            <i className={`h-2.5 w-2.5 rounded-sm ${cls[s].split(" ")[0]}`} /> {t.rooms[s]}
          </span>
        ))}
      </div>
    </Card>
  );
}

/* ------------------------------- Sayfa ------------------------------- */

export function Overview() {
  const t = usePT(overviewT);
  const c = usePT(commonT);
  const { locale } = useLocale();
  const { hotel } = usePanel();
  const [range, setRange] = useState<StatsRange>("7d");
  const [data, setData] = useState<OverviewData | null>(null);
  const [activeCh, setActiveCh] = useState<string | null>(null);

  useEffect(() => {
    let live = true;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- veri yüklenirken eski veriyi temizle
    setData(null);
    getOverview(hotel.id, range).then((d) => live && setData(d));
    return () => {
      live = false;
    };
  }, [hotel.id, range]);

  const names = useMemo(() => (data ? data.bookings.map((b) => b.guestName) : []), [data]);

  if (!data)
    return (
      <div className="flex h-64 items-center justify-center gap-3 text-era-gray">
        <Spinner /> {c.loading}
      </div>
    );

  const hour = new Date().getHours();
  const hello = t.hello[hour < 12 ? 0 : hour < 18 ? 1 : 2];
  const chTotal = data.channels.reduce((a, x) => a + x.count, 0);
  const langMax = Math.max(...data.languages.map((l) => l.count));
  const intentMax = Math.max(...data.topIntents.map((l) => l.count));
  const series = data.series.map((s) => ({
    label: range === "today" ? new Date(s.date).toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit" }) : range === "7d" ? fmtDate(s.date, locale, { weekday: "short" }) : fmtDate(s.date, locale),
    a: s.conversations,
    b: s.bookings,
  }));

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="flex items-center gap-2 text-[15px] text-era-gray">
          <Bot size={18} className="text-era-primary-ink" />
          <span>
            <b className="text-era-black">{hello}!</b> {t.summary.replace("{n}", fmtNum(data.kpis.conversations.value, locale))}
          </span>
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <VideoButton variant="small" />
          <RangeTabs value={range} onChange={setRange} />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-5 tab:grid-cols-2 mob:grid-cols-1">
        <KpiCard featured delay={0} icon={MessageCircleReply} label={t.kpi.conversations} value={data.kpis.conversations.value} display={(v) => fmtNum(Math.round(v), locale)} kpi={data.kpis.conversations} />
        <KpiCard delay={90} icon={Timer} label={t.kpi.response} value={data.kpis.responseSeconds.value} display={(v) => `${fmtNum(v, locale, 1)} ${t.kpi.sec}`} kpi={data.kpis.responseSeconds} goodWhenDown />
        <KpiCard delay={180} icon={Bot} label={t.kpi.auto} value={data.kpis.autoResolved.value} display={(v) => `${Math.round(v)}%`} kpi={data.kpis.autoResolved} />
        <KpiCard delay={270} icon={Wallet} label={t.kpi.revenue} value={data.kpis.revenue.value} display={(v) => fmtMoney(Math.round(v), data.currency, locale)} kpi={data.kpis.revenue} />
      </div>

      <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-5 tab:grid-cols-1">
        <Card>
          <CardHead
            title={t.chart.title}
            hint={t.chart.hint}
            right={
              <div className="flex flex-none flex-col items-end gap-1 text-[12px] text-era-gray">
                <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-era-primary" /> {t.chart.conversations}</span>
                <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-era-accent" /> {t.chart.bookings}</span>
              </div>
            }
          />
          <AreaChart key={`${hotel.id}-${range}`} data={series} aName={t.chart.conversations} bName={t.chart.bookings} />
        </Card>

        <Card>
          <CardHead title={t.channels.title} hint={t.channels.hint} />
          <Donut
            parts={data.channels.map((x) => ({ key: x.channel, value: x.count, color: channelColor[x.channel] }))}
            centerTop={fmtNum(chTotal, locale)}
            centerBottom={t.channels.total}
            active={activeCh}
            onActive={setActiveCh}
          />
          <ul className="mt-4 flex flex-col gap-1">
            {data.channels.map((x) => (
              <li
                key={x.channel}
                onPointerEnter={() => setActiveCh(x.channel)}
                onPointerLeave={() => setActiveCh(null)}
                className={`flex items-center gap-2.5 rounded-(--r-s1) px-2 py-1.5 text-[14px] transition-colors ${activeCh === x.channel ? "bg-era-secondary" : ""}`}
              >
                <ChannelIcon channel={x.channel} size={17} />
                <span className="flex-1 font-medium text-era-black">{c.channels[x.channel]}</span>
                <span className="tabular-nums text-era-gray">{fmtNum(x.count, locale)}</span>
                <span className="w-10 text-right font-bold tabular-nums text-era-black">{Math.round((x.count / chTotal) * 100)}%</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="grid grid-cols-3 gap-5 tab:grid-cols-1">
        <Card>
          <CardHead title={t.languages.title} hint={t.languages.hint} />
          <ul className="flex flex-col gap-3">
            {data.languages.map((l, i) => (
              <li key={l.lang} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-[14px]">
                  <span className="flex items-center gap-2 font-medium text-era-black">
                    <Chip tone="primary" className="uppercase">{l.lang}</Chip> {c.langs[l.lang] ?? l.lang}
                  </span>
                  <span className="tabular-nums text-era-gray">{fmtNum(l.count, locale)}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-era-secondary">
                  <div className="panel-grow-x h-full rounded-full bg-gradient-to-r from-era-primary to-era-accent" style={{ width: `${(l.count / langMax) * 100}%`, animationDelay: `${i * 90}ms` }} />
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <CardHead title={t.intents.title} hint={t.intents.hint} />
          <ul className="flex flex-col gap-3">
            {data.topIntents.map((x, i) => (
              <li key={x.intent} className="flex items-center gap-3">
                <span className="w-24 flex-none text-[14px] font-medium text-era-black">{c.intents[x.intent]}</span>
                <div className="h-7 flex-1 overflow-hidden rounded-lg bg-era-secondary">
                  <div
                    className="panel-grow-x flex h-full items-center justify-end rounded-lg bg-era-coolblue pr-2 text-[12px] font-bold text-era-primary-ink"
                    style={{ width: `${Math.max(14, (x.count / intentMax) * 100)}%`, animationDelay: `${i * 90}ms` }}
                  >
                    {fmtNum(x.count, locale)}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <div>
          <Feed names={names} />
        </div>
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.9fr)] gap-5 tab:grid-cols-1">
        <RoomsMap rooms={data.rooms} />

        <Card>
          <CardHead title={t.bookings.title} hint={t.bookings.hint} />
          <div className="mob:hidden">
            <div className="grid grid-cols-[1.6fr_1fr_1.2fr_.9fr_.9fr_1fr] gap-3 border-b border-era-line px-2 pb-2 text-[11px] font-semibold tracking-wide text-era-matte uppercase">
              <span>{t.bookings.guest}</span>
              <span>{t.bookings.room}</span>
              <span>{t.bookings.dates}</span>
              <span className="text-right">{t.bookings.total}</span>
              <span>{t.bookings.source}</span>
              <span>{t.bookings.status}</span>
            </div>
            {data.bookings.map((b, i) => {
              const nights = Math.round((+new Date(b.checkOut) - +new Date(b.checkIn)) / 86400000);
              return (
                <div key={b.id} className="grid grid-cols-[1.6fr_1fr_1.2fr_.9fr_.9fr_1fr] items-center gap-3 border-b border-era-line px-2 py-3 text-[14px] transition-colors last:border-0 hover:bg-era-secondary/60 [animation:era-pop-in_.5s_both]" style={{ animationDelay: `${i * 60}ms` }}>
                  <span className="flex min-w-0 items-center gap-2.5">
                    <Avatar name={b.guestName} size={32} />
                    <span className="truncate font-semibold text-era-black">{b.guestName}</span>
                  </span>
                  <span className="text-era-gray">{t.bookings.types[b.roomTypeId as "standard"]}{b.roomNumber ? ` · ${b.roomNumber}` : ""}</span>
                  <span className="text-era-gray">{fmtDate(b.checkIn, locale)} – {fmtDate(b.checkOut, locale)} <small className="text-era-matte">({nights} {t.bookings.nights})</small></span>
                  <span className="text-right font-bold tabular-nums text-era-black">{fmtMoney(b.total, b.currency, locale)}</span>
                  <span>{b.source === "ai" ? <Chip tone="primary"><Bot size={12} /> {t.bookings.sources.ai}</Chip> : <Chip>{t.bookings.sources[b.source]}</Chip>}</span>
                  <span><Chip tone={b.status === "confirmed" || b.status === "checked_in" ? "success" : b.status === "pending" ? "accent" : "neutral"}>{t.bookings.statuses[b.status]}</Chip></span>
                </div>
              );
            })}
          </div>
          <ul className="hidden flex-col gap-3 mob:flex">
            {data.bookings.map((b) => (
              <li key={b.id} className="flex flex-col gap-2 rounded-(--r-s1) bg-era-secondary/60 p-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2 font-semibold text-era-black"><Avatar name={b.guestName} size={28} /> {b.guestName}</span>
                  <b className="tabular-nums text-era-black">{fmtMoney(b.total, b.currency, locale)}</b>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-[13px] text-era-gray">
                  {fmtDate(b.checkIn, locale)} – {fmtDate(b.checkOut, locale)}
                  <Chip tone={b.source === "ai" ? "primary" : "neutral"}>{t.bookings.sources[b.source]}</Chip>
                  <Chip tone={b.status === "confirmed" || b.status === "checked_in" ? "success" : "neutral"}>{t.bookings.statuses[b.status]}</Chip>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
