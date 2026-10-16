"use client";

import { useState } from "react";
import { ArrowRight, Banknote, BookOpenText, CalendarDays, ClipboardList, Coffee, FileText, Globe, LayoutDashboard, ShoppingCart, Store, ThermometerSnowflake, Users, Wallet, Wrench, type LucideIcon } from "lucide-react";
import { useLocale } from "@/i18n/useLocale";
import { landing, modOrder, packOrder, packages, type ModKey, type PackKey } from "@/i18n/landing";
import { Reveal } from "../ui";
import { GlowGrid } from "../GlowGrid";

/**
 * "Programınızı kurun" parçaları: modül ızgarası (sektör paketi + bölümleri tek tek aç/kapa) ve "Kimin için" kartları.
 * Kullanıldığı yerler: Modüler Yapı sayfası (kompakt), ana sayfa taslağı B (büyük). Paketler programın kodundakilerle aynı.
 */
export const modIcon: Record<ModKey, LucideIcon> = {
  stempeluhr: CalendarDays,
  aufgaben: ClipboardList,
  haccp: ThermometerSnowflake,
  bestellung: ShoppingCart,
  kreditoren: FileText,
  finanzen: Banknote,
  personal: Users,
  lohn: Wallet,
  fibu: BookOpenText,
  zentrale: LayoutDashboard,
  treuekarte: Coffee,
  vitrine: Store,
  webseite: Globe,
  einsaetze: Wrench,
};

export type Builder = { pack: PackKey | null; on: Set<ModKey>; choose: (p: PackKey) => void; toggle: (m: ModKey) => void };

export function useBuilder(start: PackKey = "restaurant"): Builder {
  const [pack, setPack] = useState<PackKey | null>(start);
  const [on, setOn] = useState<Set<ModKey>>(() => new Set(packages[start]));
  return {
    pack,
    on,
    choose: (p) => {
      setPack(p);
      setOn(new Set(packages[p]));
    },
    toggle: (m) => {
      setPack(null);
      setOn((prev) => {
        const next = new Set(prev);
        if (next.has(m)) next.delete(m);
        else next.add(m);
        return next;
      });
    },
  };
}

/** Modül ızgarası: üstte sektör seçimi, 13 kutu, açık bölüm sayacı */
export function ModuleGrid({ b, compact = false }: { b: Builder; compact?: boolean }) {
  const { locale } = useLocale();
  const t = landing[locale].b;
  return (
    <div className={`flex flex-col rounded-(--r-mx) bg-era-white ring-1 ring-era-lightgray ${compact ? "gap-4 p-5 shadow-[0_20px_50px_var(--c-shadow-soft)]" : "gap-5 p-6 shadow-[0_30px_80px_var(--c-shadow)] mob:p-4"}`}>
      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-1 text-[12px] font-medium tracking-[0.12em] text-era-gray uppercase">{t.packLabel}</span>
        {packOrder.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => b.choose(p)}
            className={`rounded-[8px] font-semibold transition ${compact ? "px-3 py-1 text-[13px]" : "px-3.5 py-1.5 text-[14px]"} ${b.pack === p ? "bg-era-primary text-era-on-dark" : "bg-era-secondary text-era-black hover:bg-era-coolblue"}`}
          >
            {t.packs[p]}
          </button>
        ))}
      </div>
      <GlowGrid as="ul" className={`grid grid-cols-4 mob:grid-cols-3 ${compact ? "gap-3.5" : "gap-4"}`} pad={compact ? 8 : 10} radius={compact ? 22 : 26}>
        {modOrder.map((m, i) => {
          const Icon = modIcon[m];
          const lit = b.on.has(m);
          return (
            <li key={m} data-glow className="relative z-[1]">
              <button
                type="button"
                onClick={() => b.toggle(m)}
                aria-pressed={lit}
                className={`flex w-full flex-col items-center justify-center gap-1.5 rounded-(--r-s) p-2 text-center leading-tight font-semibold transition-all duration-500 hover:-translate-y-0.5 ${compact ? "aspect-[3/2] text-[12px]" : "aspect-[5/4] text-[13px]"} ${
                  lit ? "scale-100 bg-era-primary text-era-on-dark shadow-[0_10px_22px_var(--c-shadow-soft)]" : "scale-[0.94] bg-era-secondary/70 text-era-matte"
                }`}
                style={{ transitionDelay: `${i * 25}ms` }}
              >
                <Icon size={compact ? 20 : 26} strokeWidth={1.8} className={`transition-transform duration-500 ${lit ? "scale-110" : ""}`} />
                {t.mods[m]}
              </button>
            </li>
          );
        })}
        <li className={`relative z-[1] flex flex-col items-center justify-center rounded-(--r-s) border-2 border-dashed border-era-cute p-2 text-center ${compact ? "aspect-[3/2]" : "aspect-[5/4]"}`}>
          <span className={`leading-none font-light text-era-primary tabular-nums ${compact ? "text-[26px]" : "text-[34px]"}`}>{b.on.size}</span>
          <span className="text-[12px] font-semibold text-era-gray">{t.countOn}</span>
        </li>
        <li className="relative z-[1] col-span-2 flex items-center rounded-(--r-s) bg-era-secondary/50 p-3 text-[13px] leading-snug text-era-gray mob:col-span-3">{t.hint}</li>
      </GlowGrid>
    </div>
  );
}

/** "Kimin için" kartları: her sektörün paketi ikonlarla; karta basınca ızgara o pakete geçer */
export function ForWhom({ b, onPick, compact = false }: { b: Builder; onPick?: () => void; compact?: boolean }) {
  const { locale } = useLocale();
  const t = landing[locale].b;
  return (
    <GlowGrid as="ul" className={`grid grid-cols-4 tab:grid-cols-2 mob:grid-cols-1 ${compact ? "gap-4" : "gap-5"}`}>
      {t.forCards.map((f, i) => (
        <Reveal key={f.pack} variant="up" delay={i * 90} className="h-full">
          <li data-glow className={`relative z-[1] flex h-full flex-col rounded-(--r-x) bg-era-white ring-1 transition-colors duration-300 ${b.pack === f.pack ? "ring-era-primary" : "ring-era-lightgray"} ${compact ? "gap-3 p-5" : "gap-4 p-6"}`}>
            <span className={`font-semibold text-era-black ${compact ? "text-[19px]" : "text-[22px]"}`}>{f.title}</span>
            <span className={`leading-[1.55] text-era-gray ${compact ? "text-[14px]" : "text-[15px]"}`}>{f.text}</span>
            <span className="flex flex-wrap gap-1.5">
              {packages[f.pack].map((m) => {
                const Icon = modIcon[m];
                return (
                  <span key={m} title={t.mods[m]} className={`flex items-center justify-center rounded-(--r-s1) bg-era-coolblue text-era-primary-ink ${compact ? "h-7 w-7" : "h-8 w-8"}`}>
                    <Icon size={compact ? 13 : 15} />
                  </span>
                );
              })}
            </span>
            <button
              type="button"
              onClick={() => {
                b.choose(f.pack);
                onPick?.();
              }}
              className={`mt-auto flex w-fit items-center gap-2 pt-2 font-semibold text-era-primary-ink ${compact ? "text-[14px]" : "text-[15px]"}`}
            >
              {t.packs[f.pack]} <ArrowRight size={16} />
            </button>
          </li>
        </Reveal>
      ))}
    </GlowGrid>
  );
}
