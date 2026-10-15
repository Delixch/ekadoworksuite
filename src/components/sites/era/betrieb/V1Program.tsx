"use client";

import { useState } from "react";
import { Check, Minus } from "lucide-react";
import { useLocale } from "@/i18n/useLocale";
import { betrieb } from "@/i18n/betrieb";
import { betriebIcons } from "./icons";
import { VideoSlot } from "./VideoSlot";

/**
 * Taslak 1 - "Programın kendisi": soldaki menü programdaki menünün aynısı.
 * Menüden bir satıra basınca sağdaki pencere o bölümü, videosunu ve neler yaptığını gösterir.
 */
export function V1Program() {
  const { locale } = useLocale();
  const c = betrieb[locale];
  const [active, setActive] = useState(0);
  const item = c.items[active];
  const Icon = betriebIcons[item.key];

  const row = (i: number, main = false) => {
    const it = c.items[i];
    const RowIcon = betriebIcons[it.key];
    const on = i === active;
    return (
      <li key={it.key}>
        <button
          type="button"
          onClick={() => setActive(i)}
          aria-current={on}
          className={`flex w-full items-center gap-3 rounded-(--r-s1) px-3 py-2.5 text-left text-[15px] transition-all duration-300 ${
            on ? "bg-era-primary font-semibold text-era-on-dark shadow-[0_8px_20px_var(--c-shadow-soft)]" : `${main ? "font-semibold" : "font-medium"} text-era-black hover:bg-era-secondary`
          }`}
        >
          <RowIcon size={18} strokeWidth={2} className="flex-none" />
          <span className="truncate">{it.menu}</span>
        </button>
      </li>
    );
  };

  return (
    <div className="mx-auto w-full max-w-[1300px] px-[15px]">
      <div className="overflow-hidden rounded-(--r-mx) border border-era-cute bg-era-white shadow-[0_30px_80px_var(--c-shadow)]">
        {/* pencere üst çubuğu */}
        <div className="flex items-center gap-2 border-b border-era-lightgray bg-era-secondary/70 px-5 py-3">
          <i className="h-3 w-3 rounded-full bg-era-danger/70" />
          <i className="h-3 w-3 rounded-full bg-era-cute" />
          <i className="h-3 w-3 rounded-full bg-era-success/70" />
          <span className="ml-4 truncate rounded-full bg-era-white px-4 py-1 text-[13px] text-era-gray">Ekado WorkSuite · {item.menu}</span>
        </div>

        <div className="grid grid-cols-[260px_minmax(0,1fr)] tab:grid-cols-1">
          {/* programdaki menü */}
          <aside className="border-r border-era-lightgray bg-era-bright p-4 tab:border-r-0 tab:border-b">
            <ul className="flex flex-col gap-1 tab:flex-row tab:overflow-x-auto tab:pb-1">{row(0, true)}</ul>
            <div className="mt-4 flex items-center justify-between rounded-(--r-s1) bg-era-btn px-3 py-2 text-[13px] font-semibold tracking-wide text-era-on-btn uppercase tab:mt-3">
              {c.groupBetrieb}
              <Minus size={14} />
            </div>
            <ul className="mt-1 flex flex-col gap-1 tab:flex-row tab:overflow-x-auto tab:pb-1 [&_li]:tab:flex-none">{c.items.slice(1).map((_, i) => row(i + 1))}</ul>
          </aside>

          {/* seçili bölüm */}
          <section key={item.key} className="era-in-up grid grid-cols-[minmax(0,1.15fr)_minmax(0,.85fr)] gap-8 p-8 xl2:p-10 tab:grid-cols-1 mob:p-5" style={{ animationDuration: ".55s" }}>
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-(--r-s1) bg-era-coolblue text-era-primary-ink">
                  <Icon size={22} />
                </span>
                <span className="text-[13px] font-semibold tracking-[0.12em] text-era-gray uppercase">
                  {String(active + 1).padStart(2, "0")} / {String(c.items.length).padStart(2, "0")} · {c.inProgram}: {item.menu}
                </span>
              </div>
              <h3 className="text-[clamp(1.7rem,2.8vw,2.4rem)] leading-[1.1] font-semibold tracking-[-0.02em] text-balance text-era-black">{item.title}</h3>
              <p className="text-[17px] leading-[1.6] text-era-gray">{item.lead}</p>
              <VideoSlot id={item.key} />
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-[13px] font-semibold tracking-[0.12em] text-era-primary-ink uppercase">{c.featuresLabel}</span>
              <ul className="flex flex-col gap-2.5">
                {item.features.map((f, i) => (
                  <li key={f} className="era-in-up flex items-start gap-3 rounded-(--r-s) bg-era-bright p-3.5 text-[16px] leading-snug text-era-black ring-1 ring-era-lightgray" style={{ animationDelay: `${0.08 + i * 0.06}s`, animationDuration: ".5s" }}>
                    <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-era-primary text-era-on-dark">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
