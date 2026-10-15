"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Play } from "lucide-react";
import { useLocale } from "@/i18n/useLocale";
import { betrieb } from "@/i18n/betrieb";
import { betriebVideos, pickVideo, posterOf } from "@/lib/betrieb-videos";
import { betriebIcons } from "./icons";
import { VideoSlot } from "./VideoSlot";

/**
 * Taslak 4 - "Bölüm bölüm": dizi izler gibi. Üstte büyük oynatıcı ve bölümün özeti,
 * altta 01/09 ... 09/09 bölüm şeridi. Videosu gelen bölümün kapağı görünür.
 */
export function V4Episodes() {
  const { locale } = useLocale();
  const c = betrieb[locale];
  const [active, setActive] = useState(0);
  const it = c.items[active];
  const total = String(c.items.length).padStart(2, "0");
  const go = (d: number) => setActive((a) => (a + d + c.items.length) % c.items.length);

  return (
    <div className="mx-auto w-full max-w-[1300px] px-[15px]">
      <div className="grid grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] items-start gap-10 tab:grid-cols-1 tab:gap-6">
        <VideoSlot key={it.key} id={it.key} rounded="rounded-(--r-mx)" />
        <div key={`t-${it.key}`} className="era-in-up flex flex-col gap-4" style={{ animationDuration: ".55s" }}>
          <span className="flex items-baseline gap-3">
            <span className="text-[clamp(3.4rem,6vw,5rem)] leading-none font-light tracking-[-0.05em] text-era-primary tabular-nums">{String(active + 1).padStart(2, "0")}</span>
            <span className="text-[18px] font-semibold text-era-matte tabular-nums">/ {total}</span>
          </span>
          <span className="text-[13px] font-semibold tracking-[0.12em] text-era-gray uppercase">
            {c.inProgram}: {it.menu}
          </span>
          <h3 className="text-[clamp(1.6rem,2.6vw,2.2rem)] leading-[1.12] font-semibold tracking-[-0.02em] text-balance text-era-black">{it.title}</h3>
          <p className="text-[17px] leading-[1.6] text-era-gray">{it.lead}</p>
          <ul className="grid grid-cols-1 gap-x-5 gap-y-2 pt-1">
            {it.features.slice(0, 5).map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-[15px] leading-snug text-era-black">
                <i className="mt-[7px] block h-1.5 w-1.5 flex-none rounded-full bg-era-accent" />
                {f}
              </li>
            ))}
          </ul>
          <div className="flex gap-2 pt-2">
            <button type="button" onClick={() => go(-1)} aria-label="←" className="flex h-11 w-11 items-center justify-center rounded-full bg-era-white text-era-black ring-1 ring-era-lightgray transition hover:bg-era-secondary">
              <ArrowLeft size={18} />
            </button>
            <button type="button" onClick={() => go(1)} className="flex h-11 items-center gap-2 rounded-[8px] bg-era-primary px-5 text-[15px] font-semibold text-era-on-dark transition hover:brightness-110">
              {c.next} <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* bölüm şeridi */}
      <ol className="mt-12 flex snap-x gap-4 overflow-x-auto pb-4 [scrollbar-width:thin]">
        {c.items.map((e, i) => {
          const v = pickVideo(e.key, locale);
          const Icon = betriebIcons[e.key];
          const on = i === active;
          const ready = !!(betriebVideos[e.key].de || betriebVideos[e.key].tr);
          return (
            <li key={e.key} className="w-[220px] flex-none snap-start">
              <button type="button" onClick={() => setActive(i)} className="group/e flex w-full flex-col gap-2.5 text-left">
                <span className={`relative block aspect-video w-full overflow-hidden rounded-(--r-s) transition-all duration-300 ${on ? "ring-[3px] ring-era-primary ring-offset-2 ring-offset-era-white" : "ring-1 ring-era-lightgray"}`}>
                  {v ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={posterOf(v.url)} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover/e:scale-105" />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center bg-era-secondary text-era-primary-ink">
                      <Icon size={30} strokeWidth={1.6} />
                    </span>
                  )}
                  <span className="absolute bottom-2 left-2 rounded-full bg-black/55 px-2 py-0.5 text-[11px] font-medium text-white tabular-nums backdrop-blur-sm">
                    {String(i + 1).padStart(2, "0")}/{total}
                  </span>
                  {ready && (
                    <span className="absolute right-2 bottom-2 flex h-7 w-7 items-center justify-center rounded-full bg-era-white/90 text-era-primary">
                      <Play size={12} className="ml-0.5 fill-current" />
                    </span>
                  )}
                  {on && <span className="absolute inset-x-0 bottom-0 h-1 bg-era-primary" />}
                </span>
                <span className={`text-[15px] leading-tight font-semibold ${on ? "text-era-primary-ink" : "text-era-black"}`}>{e.menu}</span>
                <span className="-mt-1.5 line-clamp-2 text-[13px] leading-snug text-era-gray">{e.title}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
