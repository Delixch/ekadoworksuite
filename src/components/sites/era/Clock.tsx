"use client";

import { useEffect, useId, useState } from "react";
import { useLocale, type Locale } from "@/i18n/useLocale";

/** Canlı saat. Alt bilgide koyu zeminli küçük sürüm (Clock), bölümler arasında tema renkli yuvarlak sürüm (ClockDivider). */
const zones = [{ tz: "Europe/Zurich", name: { tr: "Zürih", en: "Zurich", de: "Zürich" } as Record<Locale, string> }];

/** İsviçre sözü: saatin çevresinde daire şeklinde yavaşça döner */
const SAYING = "Zeit ist Geld";

function RingText({ className = "" }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  const text = Array.from({ length: 3 }, () => `${SAYING.toUpperCase()} · `).join("");
  return (
    <svg viewBox="0 0 200 200" aria-hidden className={`animate-[spin_36s_linear_infinite] ${className}`}>
      <defs>
        <path id={id} d="M100 100 m-86 0 a86 86 0 1 1 172 0 a86 86 0 1 1 -172 0" />
      </defs>
      <text fill="currentColor" fontSize="15" fontWeight="600" style={{ fontFamily: "var(--font-main)" }}>
        <textPath href={`#${id}`} textLength="535" lengthAdjust="spacing">
          {text}
        </textPath>
      </text>
    </svg>
  );
}

function parts(date: Date, tz: string) {
  const f = new Intl.DateTimeFormat("en-GB", { timeZone: tz, hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
  const o: Record<string, number> = {};
  for (const p of f.formatToParts(date)) if (p.type !== "literal") o[p.type] = Number(p.value) % (p.type === "hour" ? 24 : 60);
  return { h: o.hour ?? 0, m: o.minute ?? 0, s: o.second ?? 0 };
}

const two = (n: number) => String(n).padStart(2, "0");

/** Sunucuda ve ilk çizimde boş; saat tarayıcıda başlar (sunucu/tarayıcı uyumsuzluğu olmasın). */
function useNow() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const tick = () => setNow(new Date());
    const first = requestAnimationFrame(tick);
    const id = setInterval(tick, 1000);
    return () => {
      cancelAnimationFrame(first);
      clearInterval(id);
    };
  }, []);
  return now;
}

/** Analog saat yüzü. ink: rakam/akrep rengi, line: dış halka rengi (css değişkenleri). */
function Face({ now, tz = zones[0].tz, className, ink, line, tickStrong, tickSoft }: { now: Date | null; tz?: string; className?: string; ink: string; line: string; tickStrong: number; tickSoft: number }) {
  const t = now ? parts(now, tz) : null;
  const hourDeg = t ? ((t.h % 12) + t.m / 60) * 30 : 0;
  const minDeg = t ? (t.m + t.s / 60) * 6 : 0;
  const secDeg = t ? t.s * 6 : 0;
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <circle cx="24" cy="24" r="22" fill="none" stroke={line} strokeWidth="1.5" />
      {Array.from({ length: 12 }).map((_, i) => (
        <line key={i} x1="24" y1="4.5" x2="24" y2={i % 3 === 0 ? 8.5 : 6.5} stroke={ink} strokeOpacity={i % 3 === 0 ? tickStrong : tickSoft} strokeWidth="1.4" strokeLinecap="round" transform={`rotate(${i * 30} 24 24)`} />
      ))}
      <line x1="24" y1="24" x2="24" y2="14" stroke={ink} strokeWidth="2.4" strokeLinecap="round" transform={`rotate(${hourDeg} 24 24)`} />
      <line x1="24" y1="24" x2="24" y2="9" stroke={ink} strokeWidth="1.8" strokeLinecap="round" transform={`rotate(${minDeg} 24 24)`} />
      <g transform={`rotate(${secDeg} 24 24)`} style={{ transition: t && t.s === 0 ? "none" : "transform 0.35s cubic-bezier(.4,2.2,.5,1)" }}>
        <line x1="24" y1="28" x2="24" y2="7" stroke="var(--c-accent)" strokeWidth="1.2" strokeLinecap="round" />
      </g>
      <circle cx="24" cy="24" r="2.4" fill="var(--c-accent)" />
    </svg>
  );
}

/** Alt bilgi: koyu zeminde küçük saat + iki şehrin dijital saati */
export function Clock() {
  const { locale } = useLocale();
  const now = useNow();
  return (
    <div className="flex items-center gap-4" role="timer" aria-label={zones.map((z) => `${z.name[locale]} ${now ? `${two(parts(now, z.tz).h)}:${two(parts(now, z.tz).m)}` : ""}`).join(", ")}>
      <Face now={now} className="h-11 w-11 flex-none" ink="var(--c-on-dark)" line="color-mix(in oklab, var(--c-on-dark) 28%, transparent)" tickStrong={0.8} tickSoft={0.4} />
      <div className="flex flex-col gap-0.5 tabular-nums">
        {zones.map((z) => {
          const p = now ? parts(now, z.tz) : null;
          return (
            <div key={z.tz} className="flex items-baseline gap-2 leading-tight">
              <span className="w-[52px] text-[12px] tracking-wide text-era-on-dark/55 uppercase">{z.name[locale]}</span>
              <span className="text-[16px] font-semibold text-era-on-dark">
                {p ? two(p.h) : "--"}
                <span className="mx-px animate-pulse text-era-accent">:</span>
                {p ? two(p.m) : "--"}
                <span className="ml-1 text-[12px] font-medium text-era-on-dark/55">{p ? two(p.s) : "--"}</span>
              </span>
            </div>
          );
        })}
        <span className="text-[11px] tracking-[0.14em] text-era-on-dark/55 uppercase">{SAYING}</span>
      </div>
    </div>
  );
}

/** Bölüm içinde: iki ince çizgi ortasında yuvarlak Zürih saati, çevresinde dönen "Zeit ist Geld" yazısı (tema renklerine uyar) */
export function ClockDivider() {
  const { locale } = useLocale();
  const now = useNow();
  return (
    <div className="flex w-full items-center gap-6 min-[1280px]:hidden mob:gap-3" role="group" aria-label={zones.map((z) => z.name[locale]).join(" / ")}>
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-era-cute mob:hidden" />
      <div className="flex items-start justify-center gap-10 mob:w-full mob:gap-6">
        {zones.map((z, i) => {
          const p = now ? parts(now, z.tz) : null;
          return (
            <div key={z.tz} role="timer" aria-label={`${z.name[locale]} ${p ? `${two(p.h)}:${two(p.m)}` : ""}`} className="flex flex-col items-center gap-2.5">
              <div className="relative flex h-[184px] w-[184px] items-center justify-center mob:h-[156px] mob:w-[156px]">
                <RingText className="absolute inset-0 h-full w-full text-era-gray" />
                <div className="relative flex h-[116px] w-[116px] items-center justify-center rounded-full bg-era-white shadow-[0_18px_44px_var(--c-shadow)] ring-1 ring-era-lightgray mob:h-[98px] mob:w-[98px]">
                  <span aria-hidden className="era-ring absolute inset-0 rounded-full bg-era-primary/20" style={{ animationDelay: `${i * 1.2}s` }} />
                  <Face now={now} tz={z.tz} className="relative h-[96px] w-[96px] mob:h-[82px] mob:w-[82px]" ink="var(--c-ink)" line="var(--c-line-strong)" tickStrong={0.85} tickSoft={0.4} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-era-cute mob:hidden" />
    </div>
  );
}

/** Özellikler bölümünün solunda: Zürih saati ve çevresinde dönen "Zeit ist Geld". Yalnızca masaüstünde; mobilde bölüm arasındaki saat görünür. */
export function ClockRow({ className = "" }: { className?: string }) {
  const { locale } = useLocale();
  const now = useNow();
  return (
    <div className={`flex-col items-start gap-5 ${className}`}>
      {zones.map((z, i) => {
        const p = now ? parts(now, z.tz) : null;
        return (
          <div key={z.tz} role="timer" aria-label={`${z.name[locale]} ${p ? `${two(p.h)}:${two(p.m)}` : ""}`} className="flex items-center gap-3">
            <div className="relative flex h-[112px] w-[112px] flex-none items-center justify-center">
              <RingText className="absolute inset-0 h-full w-full text-era-gray" />
              <div className="relative flex h-[66px] w-[66px] items-center justify-center rounded-full bg-era-white shadow-[0_10px_26px_var(--c-shadow)] ring-1 ring-era-lightgray">
                <span aria-hidden className="era-ring absolute inset-0 rounded-full bg-era-primary/15" style={{ animationDelay: `${i * 1.2}s` }} />
                <Face now={now} tz={z.tz} className="relative h-[55px] w-[55px]" ink="var(--c-ink)" line="var(--c-line-strong)" tickStrong={0.85} tickSoft={0.4} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
