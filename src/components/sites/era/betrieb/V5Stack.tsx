"use client";

import { Check } from "lucide-react";
import { useLocale } from "@/i18n/useLocale";
import { betrieb } from "@/i18n/betrieb";
import { betriebIcons } from "./icons";
import { VideoSlot } from "./VideoSlot";

/** Kart zeminleri sırayla döner: açık, mavi, krem. Yazı rengi zemine uyar. */
const tones = [
  { card: "bg-era-white ring-1 ring-era-lightgray", text: "text-era-black", soft: "text-era-gray", chip: "bg-era-secondary text-era-primary-ink", num: "text-era-coolblue" },
  { card: "bg-era-primary", text: "text-era-on-dark", soft: "text-era-on-dark/80", chip: "bg-era-on-dark/15 text-era-on-dark", num: "text-era-on-dark/15" },
  { card: "bg-era-secondary ring-1 ring-era-lightgray", text: "text-era-black", soft: "text-era-gray", chip: "bg-era-white text-era-primary-ink", num: "text-era-cute/60" },
];

/**
 * Taslak 5 - "Üst üste kartlar": aşağı kaydırdıkça her bölüm bir kart olarak gelir
 * ve bir öncekinin üstüne biner; arkada kalanların kenarı görünür, deste büyür.
 */
export function V5Stack() {
  const { locale } = useLocale();
  const c = betrieb[locale];
  return (
    <div className="mx-auto w-full max-w-[1200px] px-[15px]">
      <ol className="flex flex-col gap-10">
        {c.items.map((it, i) => {
          const t = tones[i % tones.length];
          const Icon = betriebIcons[it.key];
          return (
            <li key={it.key} className="sticky" style={{ top: `${126 + i * 14}px` }}>
              <article className={`relative grid min-h-[min(560px,78vh)] grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] items-center gap-10 overflow-hidden rounded-(--r-mx) p-10 shadow-[0_-12px_40px_var(--c-shadow-soft)] tab:grid-cols-1 tab:gap-6 tab:p-7 mob:p-5 ${t.card}`}>
                <span aria-hidden className={`pointer-events-none absolute -top-6 -right-2 text-[clamp(8rem,18vw,15rem)] leading-none font-bold tracking-[-0.06em] select-none tabular-nums ${t.num}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="relative flex flex-col gap-4">
                  <span className={`flex w-fit items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] font-semibold tracking-wide ${t.chip}`}>
                    <Icon size={16} /> {it.menu}
                  </span>
                  <h3 className={`text-[clamp(1.7rem,3vw,2.6rem)] leading-[1.08] font-semibold tracking-[-0.02em] text-balance ${t.text}`}>{it.title}</h3>
                  <p className={`text-[17px] leading-[1.6] ${t.soft}`}>{it.lead}</p>
                  <ul className="flex flex-col gap-2 pt-1">
                    {it.features.slice(0, 5).map((f) => (
                      <li key={f} className={`flex items-start gap-2.5 text-[15px] leading-snug ${t.text}`}>
                        <Check size={16} strokeWidth={3} className="mt-0.5 flex-none opacity-80" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <VideoSlot id={it.key} className="relative" />
              </article>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
