"use client";

import { useEffect, useRef, useState } from "react";
import {
  Bell,
  Building2,
  Check,
  CheckCheck,
  ChevronDown,
  ChevronLeft,
  ClipboardList,
  Globe,
  LayoutGrid,
  Megaphone,
  MessageSquare,
  Phone,
  PhoneCall,
  Plus,
  Send,
  Settings,
  Sparkles,
  Users,
} from "lucide-react";
import { locales, useLocale } from "@/i18n/useLocale";

/** Tasarım boyutu (px). Gerçek genişliğe göre ölçeklenir. */
const W = 820;
const H = 600;

function useScale() {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setScale(e.contentRect.width / W));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return { ref, scale };
}

const menuIcons = [LayoutGrid, MessageSquare, Phone, ClipboardList, Users, Bell, Megaphone, Sparkles, Settings];

function Laptop() {
  const { t, locale } = useLocale();
  const m = t.mockup;
  const langName = locales.find((l) => l.code === locale)?.label ?? "";
  return (
    <div className="absolute top-0 right-0" style={{ width: 640, height: 470 }}>
      {/* ekran çerçevesi */}
      <div
        className="absolute inset-x-0 top-0 overflow-hidden rounded-[18px] border-[7px] border-era-device bg-era-device shadow-[0_30px_60px_-20px_var(--c-shadow)]"
        style={{ height: 410 }}
      >
        <div className="flex h-full overflow-hidden rounded-[10px] bg-era-white text-era-black">
          {/* kenar çubuğu */}
          <aside className="flex w-[118px] flex-none flex-col gap-1.5 bg-era-dark py-3 pr-2.5 pl-[22px] text-era-on-dark">
            <div className="mb-2 flex items-center gap-1.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-[6px] bg-era-primary text-[11px] font-bold">p</span>
              <span className="text-[11px] font-semibold tracking-wide">unn</span>
            </div>
            {m.menu.map((label, i) => {
              const Icon = menuIcons[i];
              const active = i === 0;
              return (
              <div
                key={label}
                className={`flex items-center gap-1.5 rounded-md px-1.5 py-[5px] text-[8.5px] ${
                  active ? "bg-era-on-dark/15 font-semibold" : "text-era-on-dark/75"
                }`}
              >
                <Icon size={10} />
                {label}
              </div>
            );
            })}
            <div className="mt-auto flex items-center gap-1.5 text-[8px] text-era-on-dark/80">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-era-on-dark/20 text-[7px] font-bold">SY</span>
              {m.admin}
              <ChevronDown size={8} />
            </div>
          </aside>

          {/* ana alan */}
          <div className="flex min-w-0 flex-1 flex-col gap-2.5 bg-era-secondary p-3">
            <div className="flex items-center justify-between text-[9px]">
              <span className="flex items-center gap-1 font-semibold">
                <LayoutGrid size={10} /> {m.overview}
              </span>
              <span className="flex items-center gap-2 text-[8px]">
                <span className="flex items-center gap-1">
                  <i className="block h-1.5 w-1.5 rounded-full bg-era-success" /> {m.aiOn}
                </span>
                <span className="flex h-3.5 w-7 items-center justify-end rounded-full bg-era-success px-0.5">
                  <i className="block h-2.5 w-2.5 rounded-full bg-era-on-dark" />
                </span>
                <span className="flex items-center gap-1 rounded-md bg-era-white px-1.5 py-0.5">
                  <Globe size={8} /> {langName}
                </span>
              </span>
            </div>

            {/* otel kartı */}
            <div className="overflow-hidden rounded-xl bg-era-white shadow-[0_2px_10px_var(--c-shadow-soft)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/sites/punn/hotel-lobby.jpg" alt="" className="h-[92px] w-full object-cover" />
              <div className="flex items-center gap-2 px-2.5 py-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-era-secondary text-era-primary-ink">
                  <Building2 size={13} />
                </span>
                <div className="leading-tight">
                  <div className="text-[10px] font-semibold">{m.hotel}</div>
                  <div className="text-[7.5px] text-era-gray">{m.hotelNote}</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[13px] font-bold tracking-tight">{m.greeting}</span>
              <span className="flex items-center gap-1 text-[8px]">
                {m.tabs.map((tab, i) => (
                  <span
                    key={tab}
                    className={`rounded-md px-1.5 py-[3px] ${i === 0 ? "bg-era-btn font-semibold text-era-on-btn" : "text-era-gray"}`}
                  >
                    {tab}
                  </span>
                ))}
              </span>
            </div>

            <div className="grid min-h-0 flex-1 grid-cols-[1.25fr_1fr] gap-2">
              <div className="flex flex-col justify-between rounded-xl bg-era-primary p-2.5 text-era-on-dark">
                <div>
                  <div className="mb-1 flex items-center gap-1 text-[7.5px] opacity-90">
                    <i className="block h-1.5 w-1.5 rounded-full bg-era-success" /> {m.autoReply}
                  </div>
                  <div className="text-[12.5px] leading-tight font-bold">{m.answered}</div>
                </div>
                <div className="grid grid-cols-3 gap-1 text-[7px] opacity-90">
                  <span>{m.statResponse}<b className="block text-[9px]">—</b></span>
                  <span>{m.statApproval}<b className="block text-[9px]">8 {m.minShort}</b></span>
                  <span>{m.statSatisfaction}<b className="block text-[9px]">0 {m.minShort}</b></span>
                </div>
              </div>
              <div className="flex flex-col gap-1.5 rounded-xl bg-era-white p-2.5">
                <div className="text-[8.5px] font-semibold">{m.attention}</div>
                <div className="text-[7px] text-era-gray">{m.pending}</div>
                <div className="mt-auto flex flex-col items-center gap-0.5 rounded-lg bg-era-secondary py-2 text-center">
                  <Sparkles size={11} className="text-era-primary-ink" />
                  <span className="text-[8px] font-semibold">{m.allGood}</span>
                  <span className="px-1 text-[6.5px] text-era-gray">{m.nothing}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* taban */}
      <div className="absolute right-[-18px] left-[-18px] bg-era-device" style={{ top: 410, height: 12, borderRadius: "0 0 18px 18px" }} />
      <div className="absolute left-1/2 -translate-x-1/2 bg-era-device/70" style={{ top: 422, width: 160, height: 5, borderRadius: "0 0 8px 8px" }} />
    </div>
  );
}

type Msg = { from: "guest" | "bot"; text: string; time: string };
type Scene = {
  code: string;
  chip: string;
  messages: Msg[];
  confirm?: { title: string; rows: [string, string][]; note: string };
};

/** Örnek sohbetler: her biri kendi dilinde (çeviri yok, çok dillilik gösterisi) */
const scenes: Scene[] = [
  {
    code: "RU",
    chip: "Русский",
    messages: [
      { from: "guest", text: "Здравствуйте! У вас есть трансфер из аэропорта?", time: "18:02" },
      { from: "bot", text: "Здравствуйте! Да, организуем трансфер. Напишите, пожалуйста, время прилёта.", time: "18:02" },
    ],
  },
  {
    code: "TR",
    chip: "Türkçe",
    messages: [
      { from: "guest", text: "Kahvaltı var mı?", time: "20:14" },
      { from: "bot", text: "Evet, her sabah 07.00–10.00 saatleri arasında açık büfe kahvaltı sunuyoruz.", time: "20:15" },
    ],
  },
  {
    code: "DE",
    chip: "Deutsch",
    messages: [
      { from: "guest", text: "Haben Sie ein Doppelzimmer frei? Wir sind zu zweit.", time: "21:40" },
      {
        from: "bot",
        text: "Hallo und willkommen! Ja, für den 14.–17. Mai haben wir ein Doppelzimmer frei. Soll ich es für Sie reservieren?",
        time: "21:40",
      },
      { from: "guest", text: "Ja, sehr gerne!", time: "21:41" },
    ],
    confirm: {
      title: "Reservierung bestätigt",
      rows: [
        ["Zimmer", "Doppelzimmer"],
        ["Datum", "14.–17. Mai"],
        ["Gäste", "2 Erwachsene"],
      ],
      note: "Zahlungslink gesendet",
    },
  },
  {
    code: "EN",
    chip: "English",
    messages: [
      { from: "guest", text: "Can you send me the hotel's location?", time: "05:19" },
      { from: "bot", text: "Of course! I'm sending the location now.", time: "05:19" },
    ],
  },
  {
    code: "JA",
    chip: "日本語",
    messages: [
      { from: "guest", text: "ホテルの場所を送ってもらえますか？", time: "21:03" },
      { from: "bot", text: "もちろんです。位置情報をこちらでお送りします。", time: "21:04" },
    ],
  },
];

const STEP = 1700; // iki mesaj arası
const FIRST = 700; // sahne başlayınca ilk mesaj
const HOLD = 2800; // son mesajdan sonra bekleme

/** Telefon: sahneler sırayla yazılır, dil rozeti ve çipler değişir */
function PhoneChat({ onBooking, onScene }: { onBooking: (v: boolean) => void; onScene: (i: number) => void }) {
  const { t } = useLocale();
  const m = t.mockup;
  const [scene, setScene] = useState(0);
  const [shown, setShown] = useState(0);
  const [typing, setTyping] = useState(false);
  const [still, setStill] = useState(false);

  useEffect(() => {
    setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const sc = scenes[scene];
  const total = sc.messages.length + (sc.confirm ? 1 : 0);

  useEffect(() => {
    if (still) {
      setShown(scenes[0].messages.length);
      return;
    }
    const timers: ReturnType<typeof setTimeout>[] = [];
    const cur = scenes[scene];
    const count = cur.messages.length + (cur.confirm ? 1 : 0);
    setShown(0);
    setTyping(false);
    for (let k = 0; k < count; k++) {
      const at = FIRST + k * STEP;
      const isBot = cur.messages[k]?.from === "bot";
      if (isBot) timers.push(setTimeout(() => setTyping(true), at - 900));
      timers.push(
        setTimeout(() => {
          setTyping(false);
          setShown(k + 1);
        }, at)
      );
    }
    timers.push(setTimeout(() => setScene((x) => (x + 1) % scenes.length), FIRST + count * STEP + HOLD));
    return () => timers.forEach(clearTimeout);
  }, [scene, still]);

  useEffect(() => {
    onScene(scene);
  }, [scene, onScene]);

  const confirmVisible = !!sc.confirm && shown >= total;
  useEffect(() => {
    onBooking(confirmVisible);
  }, [confirmVisible, onBooking]);

  return (
    <div className="absolute left-0 overflow-hidden rounded-[30px] border-[7px] border-era-device bg-era-device shadow-[0_30px_60px_-18px_var(--c-shadow)]" style={{ width: 200, height: 410, top: 150 }}>
      <div className="flex h-full flex-col overflow-hidden rounded-[22px] bg-era-secondary text-era-black">
        <div className="relative flex-none bg-era-dark px-2 pt-1.5 pb-2 text-era-on-dark">
          <div className="mx-auto mb-1 h-2.5 w-14 rounded-full bg-era-device" />
          <div className="flex items-center gap-1.5">
            <ChevronLeft size={11} />
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-era-primary text-[11px] font-bold">p</span>
            <div className="leading-tight">
              <div className="text-[8.5px] font-semibold">Punn Digital</div>
              <div className="text-[6.5px] opacity-80">{m.online}</div>
            </div>
            <span key={sc.code} className="era-bubble ml-auto rounded-md bg-era-on-dark/20 px-1.5 py-0.5 text-[7px] font-bold tracking-wider">
              {sc.code}
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-end gap-1.5 overflow-hidden px-2 py-2" aria-label={m.chatAria}>
          {sc.messages.slice(0, shown).map((msg, k) => (
            <div
              key={`${scene}-${k}`}
              className={`era-bubble max-w-[88%] rounded-xl px-2 py-1.5 text-[8px] leading-snug shadow-[0_1px_4px_var(--c-shadow-soft)] ${
                msg.from === "guest"
                  ? "self-start rounded-tl-sm bg-era-white"
                  : "self-end rounded-tr-sm bg-era-primary text-era-on-dark"
              }`}
            >
              {msg.text}
              <div className={`mt-0.5 flex items-center justify-end gap-0.5 text-[6px] ${msg.from === "guest" ? "text-era-gray" : "opacity-80"}`}>
                {msg.time} {msg.from === "bot" && <CheckCheck size={8} />}
              </div>
            </div>
          ))}
          {sc.confirm && shown >= total && (
            <div key={`${scene}-c`} className="era-bubble self-end overflow-hidden rounded-lg bg-era-white text-[7.5px] shadow-[0_1px_6px_var(--c-shadow-soft)]" style={{ width: "92%" }}>
              <div className="flex items-center gap-1 bg-era-success px-2 py-1 text-[8px] font-semibold text-era-on-dark">
                <Check size={9} strokeWidth={3} /> {sc.confirm.title}
              </div>
              <div className="flex flex-col gap-0.5 px-2 py-1.5">
                {sc.confirm.rows.map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-2">
                    <span className="text-era-gray">{k}</span>
                    <span className="font-semibold">{v}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-era-line px-2 py-1 text-[6.5px] text-era-gray">{sc.confirm.note}</div>
            </div>
          )}
          {typing && (
            <div className="era-bubble era-dot flex w-fit items-center gap-[3px] self-end rounded-xl rounded-tr-sm bg-era-primary px-2.5 py-2 text-era-on-dark" aria-hidden>
              <i />
              <i style={{ animationDelay: "0.15s" }} />
              <i style={{ animationDelay: "0.3s" }} />
            </div>
          )}
        </div>

        <div className="flex flex-none items-center gap-1.5 bg-era-white px-2 py-1.5">
          <Plus size={11} className="text-era-primary-ink" />
          <span className="flex-1 rounded-full bg-era-secondary px-2 py-1 text-[7px] text-era-gray">{m.typeMsg}</span>
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-era-primary text-era-on-dark">
            <Send size={8} />
          </span>
        </div>
      </div>
    </div>
  );
}

/** Telefonun altındaki dil çipleri */
function LangChips({ active }: { active: number }) {
  return (
    <div className="absolute left-0 flex gap-1" style={{ top: 570, width: 200 }}>
      {scenes.map((s, i) => (
        <span
          key={s.code}
          className={`flex-1 rounded-full px-1 py-1 text-center text-[7px] font-semibold whitespace-nowrap transition-colors duration-300 ${
            i === active ? "bg-era-primary text-era-on-dark" : "bg-era-white text-era-gray ring-1 ring-era-line"
          }`}
        >
          {s.chip}
        </span>
      ))}
    </div>
  );
}

/** Sürpriz teknoloji: canlı arama, dil algılama ve anlık çeviri */
function VoiceCard() {
  const { t } = useLocale();
  const m = t.mockup;
  const [sec, setSec] = useState(42);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setSec((x) => x + 1), 1000);
    return () => clearInterval(id);
  }, []);
  const mm = String(Math.floor(sec / 60)).padStart(2, "0");
  const ss = String(sec % 60).padStart(2, "0");

  return (
    <div className="era-float absolute rounded-2xl border border-era-line bg-era-white/85 p-3 text-era-black shadow-[0_18px_40px_-14px_var(--c-shadow)] backdrop-blur-md" style={{ left: 232, top: 444, width: 330 }}>
      <div className="flex items-center gap-2.5">
        <span className="relative flex h-8 w-8 flex-none items-center justify-center rounded-full bg-era-primary text-era-on-dark">
          <span className="era-ring absolute inset-0 rounded-full bg-era-primary" />
          <PhoneCall size={14} className="relative" />
        </span>
        <div className="leading-tight">
          <div className="text-[11px] font-semibold">{m.liveCall}</div>
          <div className="text-[9px] text-era-gray tabular-nums">
            <span className="text-era-success">●</span> {mm}:{ss}
          </div>
        </div>
        <span className="ml-auto flex items-center gap-1 rounded-full bg-era-secondary px-2 py-1 text-[8.5px] font-semibold text-era-primary-ink">
          <Globe size={9} /> {m.detected}: Русский
        </span>
      </div>

      <div className="era-wave my-2.5 flex h-6 items-center gap-[2px] text-era-primary" aria-hidden>
        {Array.from({ length: 56 }).map((_, k) => (
          <i
            key={k}
            style={{
              animationDuration: `${0.7 + ((k * 37) % 7) / 10}s`,
              animationDelay: `-${((k * 53) % 10) / 10}s`,
              opacity: 0.45 + ((k * 29) % 10) / 20,
            }}
          />
        ))}
      </div>

      <div className="flex flex-col gap-0.5">
        <div className="text-[10.5px] leading-snug font-semibold">«Сколько стоит номер на двоих?»</div>
        <div className="text-[9.5px] leading-snug text-era-gray">→ {m.translated}</div>
        <div className="era-dot mt-1 flex items-center gap-1.5 text-[9px] text-era-primary-ink">
          <span className="flex gap-[3px]">
            <i />
            <i style={{ animationDelay: "0.15s" }} />
            <i style={{ animationDelay: "0.3s" }} />
          </span>
          {m.replying}
        </div>
      </div>
    </div>
  );
}

/** Rezervasyon onay bildirimi: sohbette onay kartı çıkınca belirir */
function BookingChip({ show }: { show: boolean }) {
  const { t } = useLocale();
  const m = t.mockup;
  return (
    <div
      className={`absolute flex items-center gap-2.5 rounded-2xl border border-era-line bg-era-white px-3 py-2.5 shadow-[0_18px_40px_-14px_var(--c-shadow)] transition-all duration-500 ${
        show ? "translate-y-0 scale-100 opacity-100" : "translate-y-3 scale-95 opacity-0"
      }`}
      style={{ left: 624, top: 452, width: 196 }}
      aria-hidden={!show}
    >
      <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-era-success text-era-on-dark">
        <Check size={14} strokeWidth={3} />
      </span>
      <div className="leading-tight">
        <div className="text-[10.5px] font-semibold">{m.bookingTitle}</div>
        <div className="text-[9px] text-era-gray">{m.bookingNote}</div>
      </div>
    </div>
  );
}

/** Hero sağ taraf: laptop paneli, çok dilli telefon sohbeti ve canlı arama kartı (kodla çizilmiş) */
export function HeroMockup() {
  const { ref, scale } = useScale();
  const [booking, setBooking] = useState(false);
  const [scene, setScene] = useState(0);
  return (
    <div ref={ref} className="era-in-rise relative w-full min-w-0 overflow-hidden" style={{ height: H * scale }} aria-hidden>
      <div style={{ width: W, height: H, transform: `scale(${scale})`, transformOrigin: "top left" }} className="absolute top-0 left-0">
        <Laptop />
        <VoiceCard />
        <BookingChip show={booking} />
        <PhoneChat onBooking={setBooking} onScene={setScene} />
        <LangChips active={scene} />
      </div>
    </div>
  );
}
