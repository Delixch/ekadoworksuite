"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Building2, Check, ChevronDown, KeyRound, LayoutDashboard, MessagesSquare, Settings2, type LucideIcon } from "lucide-react";
import { Logo } from "@/components/sites/era/Logo";
import { LanguageSwitcher } from "@/components/sites/era/LanguageSwitcher";
import { ThemeToggle } from "@/components/sites/era/ThemeToggle";
import { commonT } from "@/i18n/panel/common";
import { usePT } from "@/i18n/panel/use";
import { listHotels } from "@/lib/panel/api";
import type { Hotel } from "@/lib/panel/types";
import { PanelContext, type PanelTab } from "./context";
import { Inbox } from "./Inbox";
import { Locks } from "./Locks";
import { Overview } from "./Overview";
import { Setup } from "./Setup";
import { LiveDot, Toggle } from "./ui";

const tabs: { id: PanelTab; icon: LucideIcon }[] = [
  { id: "overview", icon: LayoutDashboard },
  { id: "inbox", icon: MessagesSquare },
  { id: "setup", icon: Settings2 },
  { id: "locks", icon: KeyRound },
];

function HotelSwitcher({ hotels, current, onPick }: { hotels: Hotel[]; current: Hotel; onPick: (id: string) => void }) {
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const down = (e: MouseEvent) => !box.current?.contains(e.target as Node) && setOpen(false);
    const key = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", down);
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("mousedown", down);
      document.removeEventListener("keydown", key);
    };
  }, [open]);
  return (
    <div ref={box} className="relative min-w-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex h-12 max-w-full items-center gap-2.5 rounded-(--r-s1) border border-era-lightgray bg-era-white px-3 text-left transition-transform duration-300 hover:scale-[.985]"
      >
        <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-era-coolblue text-era-primary-ink">
          <Building2 size={16} />
        </span>
        <span className="min-w-0 leading-tight">
          <span className="block truncate text-[14px] font-bold text-era-black">{current.name}</span>
          <span className="block truncate text-[12px] text-era-gray">
            {current.city}, {current.country}
          </span>
        </span>
        <ChevronDown size={15} className={`flex-none text-era-gray transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <ul role="listbox" className="absolute top-[calc(100%+8px)] left-0 z-40 min-w-full overflow-hidden rounded-(--r-r) border border-era-cute bg-era-white p-1.5 shadow-[0_18px_40px_var(--c-shadow)] [animation:era-pop-in_.25s_both]">
          {hotels.map((h) => (
            <li key={h.id}>
              <button
                type="button"
                role="option"
                aria-selected={h.id === current.id}
                onClick={() => {
                  onPick(h.id);
                  setOpen(false);
                }}
                className="flex w-full items-center gap-3 rounded-(--r-s1) px-3 py-2.5 text-left transition-colors hover:bg-era-secondary"
              >
                <span className="min-w-0 flex-1 leading-tight">
                  <span className="block truncate text-[14px] font-semibold text-era-black">{h.name}</span>
                  <span className="block truncate text-[12px] text-era-gray">
                    {h.city}, {h.country}
                  </span>
                </span>
                {h.id === current.id && <Check size={16} className="text-era-primary-ink" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function PanelApp() {
  const c = usePT(commonT);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [hotelId, setHotelId] = useState("nani");
  const [tab, setTab] = useState<PanelTab>("overview");
  const [aiOn, setAiOn] = useState(true);

  useEffect(() => {
    let live = true;
    listHotels().then((h) => live && setHotels(h));
    return () => {
      live = false;
    };
  }, []);

  // adres çubuğundaki #inbox gibi bölümü aç
  useEffect(() => {
    const read = () => {
      const h = window.location.hash.slice(1) as PanelTab;
      if (tabs.some((t) => t.id === h)) setTab(h);
    };
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, []);

  const goTo = useCallback((t: PanelTab) => {
    setTab(t);
    history.replaceState(null, "", `#${t}`);
    window.scrollTo({ top: 0 });
  }, []);

  const hotel = hotels.find((h) => h.id === hotelId) ?? hotels[0];
  if (!hotel) return <div className="flex min-h-screen items-center justify-center text-era-gray">{c.loading}</div>;

  const [title, hint] = c.titles[tab];

  return (
    <PanelContext.Provider value={{ hotel, hotels, setHotelId, tab, goTo, aiOn, setAiOn }}>
      <div className="min-h-screen bg-era-cloud/40">
        {/* yan menü (masaüstü) */}
        <aside className="fixed inset-y-0 left-0 z-30 flex w-[264px] flex-col gap-6 bg-era-dark px-4 py-6 text-era-on-dark tab:hidden">
          <Link href="/" aria-label="Punn Digital" className="px-2">
            <Logo onDark className="h-9 w-auto" />
          </Link>

          <nav className="flex flex-col gap-1.5" aria-label="Panel">
            {tabs.map(({ id, icon: Icon }) => {
              const on = tab === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => goTo(id)}
                  aria-current={on ? "page" : undefined}
                  className={`group relative flex h-12 items-center gap-3 overflow-hidden rounded-(--r-s1) px-3.5 text-[15px] font-semibold transition-colors duration-300 ${
                    on ? "bg-era-primary text-era-on-dark" : "text-era-on-dark/70 hover:bg-era-on-dark/10 hover:text-era-on-dark"
                  }`}
                >
                  {on && <span className="absolute inset-y-2 left-0 w-1 rounded-full bg-era-accent" />}
                  <Icon size={19} strokeWidth={1.9} className="transition-transform duration-300 group-hover:scale-110" />
                  {c.nav[id]}
                </button>
              );
            })}
          </nav>

          <div className="mt-auto flex flex-col gap-3">
            <div className="rounded-(--r-r) bg-era-on-dark/10 p-3.5">
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-[13px] font-semibold">
                  {aiOn ? <LiveDot /> : <span className="h-2.5 w-2.5 rounded-full bg-era-matte" />}
                  {aiOn ? c.ai.online : c.ai.paused}
                </span>
                <Toggle checked={aiOn} onChange={setAiOn} label={c.ai.online} />
              </div>
              <p className="mt-2 text-[12px] leading-snug text-era-on-dark/60">{c.demoNote}</p>
            </div>
            <Link href="/" className="flex items-center gap-2 px-2 text-[13px] font-semibold text-era-on-dark/70 transition-colors hover:text-era-on-dark">
              <ArrowLeft size={15} /> {c.backToSite}
            </Link>
          </div>
        </aside>

        {/* içerik */}
        <div className="pl-[264px] tab:pl-0">
          <header className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-era-line bg-era-nav px-8 py-3.5 backdrop-blur-xl tab:px-4 mob:py-2.5">
            <Link href="/" aria-label="Punn Digital" className="hidden flex-none tab:block">
              <Logo className="h-8 w-auto" />
            </Link>
            <HotelSwitcher hotels={hotels} current={hotel} onPick={setHotelId} />
            <div className="flex flex-none items-center gap-2">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </header>

          <main className="mx-auto w-full max-w-[1500px] px-8 pt-7 pb-28 tab:px-4 tab:pt-5">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h1 className="text-[32px] leading-none font-extrabold tracking-tight text-era-black mob:text-[26px]">{title}</h1>
                <p className="mt-2 text-[15px] text-era-gray">{hint}</p>
              </div>
            </div>
            <div key={`${tab}-${hotel.id}`} className="[animation:era-pop-in_.5s_both]">
              {tab === "overview" && <Overview />}
              {tab === "inbox" && <Inbox />}
              {tab === "setup" && <Setup />}
              {tab === "locks" && <Locks />}
            </div>
          </main>
        </div>

        {/* alt menü (mobil/tablet) */}
        <nav className="fixed inset-x-3 bottom-3 z-30 hidden items-center justify-around rounded-full border border-era-cute bg-era-dark p-1.5 shadow-[0_14px_36px_var(--c-shadow)] tab:flex" aria-label="Panel">
          {tabs.map(({ id, icon: Icon }) => {
            const on = tab === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => goTo(id)}
                aria-label={c.nav[id]}
                aria-current={on ? "page" : undefined}
                className={`flex h-12 flex-1 items-center justify-center gap-2 rounded-full px-3 text-[13px] font-semibold transition-all duration-300 ${
                  on ? "flex-[1.7] bg-era-primary text-era-on-dark" : "text-era-on-dark/70"
                }`}
              >
                <Icon size={19} strokeWidth={1.9} />
                {on && <span className="mob:hidden">{c.nav[id]}</span>}
              </button>
            );
          })}
        </nav>
      </div>
    </PanelContext.Provider>
  );
}
