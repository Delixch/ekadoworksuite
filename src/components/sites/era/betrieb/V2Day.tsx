"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/i18n/useLocale";
import { betrieb } from "@/i18n/betrieb";
import { betriebIcons } from "./icons";
import { VideoSlot } from "./VideoSlot";

/** Saat kadranı: akrep ve yelkovan seçili saate yumuşakça döner */
function Dial({ time }: { time: string }) {
  const [h, m] = time.split(":").map(Number);
  const hourDeg = ((h % 12) + m / 60) * 30;
  const minDeg = m * 6;
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden>
      <circle cx="100" cy="100" r="92" className="fill-era-white stroke-era-lightgray" strokeWidth="2" />
      {Array.from({ length: 12 }, (_, i) => (
        <line key={i} x1="100" y1="16" x2="100" y2={i % 3 ? 24 : 30} strokeWidth={i % 3 ? 2 : 4} strokeLinecap="round" className="stroke-era-cute" transform={`rotate(${i * 30} 100 100)`} />
      ))}
      <g style={{ transform: `rotate(${hourDeg}deg)`, transformOrigin: "100px 100px", transition: "transform .9s cubic-bezier(.34,1.3,.64,1)" }}>
        <line x1="100" y1="100" x2="100" y2="54" strokeWidth="7" strokeLinecap="round" className="stroke-era-black" />
      </g>
      <g style={{ transform: `rotate(${minDeg + Math.floor(hourDeg / 360) * 360}deg)`, transformOrigin: "100px 100px", transition: "transform .9s cubic-bezier(.34,1.3,.64,1)" }}>
        <line x1="100" y1="100" x2="100" y2="30" strokeWidth="4" strokeLinecap="round" className="stroke-era-primary" />
      </g>
      <circle cx="100" cy="100" r="7" className="fill-era-primary" />
    </svg>
  );
}

/**
 * Taslak 2 - "Bir iş günü": sabahtan gece kapanışa kadar her bölüm, kullanıldığı saatte çıkar.
 * Soldaki saat sabit durur ve ekrandaki bölümün saatine döner; çizgi aşağı indikçe dolar.
 */
export function V2Day() {
  const { locale } = useLocale();
  const c = betrieb[locale];
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);
  const list = useRef<HTMLOListElement>(null);
  const [fill, setFill] = useState(0);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(Number((e.target as HTMLElement).dataset.i))),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    refs.current.forEach((el) => el && io.observe(el));
    const onScroll = () => {
      const el = list.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const p = (window.innerHeight * 0.5 - r.top) / r.height;
      setFill(Math.max(0, Math.min(1, p)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [c.items.length]);

  const now = c.items[active];

  return (
    <div className="mx-auto grid w-full max-w-[1200px] grid-cols-[300px_minmax(0,1fr)] gap-14 px-[15px] tab:grid-cols-1 tab:gap-6">
      {/* sabit saat */}
      <div className="sticky top-[140px] h-fit self-start tab:top-[108px] tab:z-[3] tab:flex tab:items-center tab:gap-4 tab:rounded-(--r-s) tab:bg-era-nav/95 tab:p-3 tab:backdrop-blur-md tab:ring-1 tab:ring-era-lightgray">
        <div className="aspect-square w-full tab:w-16 tab:flex-none">
          <Dial time={now.time} />
        </div>
        <div className="mt-5 text-center tab:mt-0 tab:text-left">
          <div className="text-[clamp(2.6rem,5vw,3.6rem)] leading-none font-light tracking-[-0.04em] text-era-black tabular-nums tab:text-[28px]">{now.time}</div>
          <div className="mt-2 text-[15px] font-semibold text-era-primary-ink tab:mt-0.5">{now.menu}</div>
        </div>
      </div>

      {/* gün akışı */}
      <ol ref={list} className="relative flex flex-col gap-24 pl-12 tab:gap-14 mob:pl-9">
        <span aria-hidden className="absolute top-2 bottom-2 left-[15px] w-[3px] rounded-full bg-era-lightgray mob:left-[11px]" />
        <span aria-hidden className="absolute top-2 left-[15px] w-[3px] origin-top rounded-full bg-era-primary mob:left-[11px]" style={{ height: `calc((100% - 16px) * ${fill})` }} />
        {c.items.map((it, i) => {
          const Icon = betriebIcons[it.key];
          const on = i <= active;
          return (
            <li key={it.key} data-i={i} ref={(el) => { refs.current[i] = el; }} className="relative flex flex-col gap-5">
              <span className={`absolute top-0 -left-12 flex h-[34px] w-[34px] items-center justify-center rounded-full ring-4 ring-era-white transition-all duration-500 mob:-left-9 mob:h-[26px] mob:w-[26px] ${on ? "scale-110 bg-era-primary text-era-on-dark" : "bg-era-lightgray text-era-gray"}`}>
                <Icon size={16} />
              </span>
              <div className={`flex flex-col gap-3 transition-opacity duration-500 ${i === active ? "opacity-100" : "opacity-55"}`}>
                <span className="text-[14px] font-semibold tracking-[0.1em] text-era-gray uppercase tabular-nums">
                  {it.time} · {it.menu}
                </span>
                <p className="text-[clamp(1.5rem,2.6vw,2.1rem)] leading-[1.18] font-semibold tracking-[-0.02em] text-balance text-era-black">{it.moment}</p>
                <p className="max-w-[640px] text-[17px] leading-[1.6] text-era-gray">{it.lead}</p>
                <ul className="flex flex-wrap gap-2 pt-1">
                  {it.features.map((f) => (
                    <li key={f} className="rounded-full bg-era-white px-3.5 py-1.5 text-[14px] font-medium text-era-black ring-1 ring-era-lightgray">
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <VideoSlot id={it.key} className="max-w-[640px]" />
            </li>
          );
        })}
      </ol>
    </div>
  );
}
