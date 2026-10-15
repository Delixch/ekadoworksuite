"use client";

import { Check, X } from "lucide-react";
import { useLocale } from "@/i18n/useLocale";
import { landing } from "@/i18n/landing";
import { Reveal } from "./ui";

/** "Bugün nasıl, Ekado ile nasıl" karşılaştırması (Destek sayfasında). Metin: src/i18n/landing.ts (a.before) */
export function BeforeAfter() {
  const { locale } = useLocale();
  const a = landing[locale].a;
  return (
    <>
        {/* bugün → Ekado ile */}
        <section className="bg-era-secondary/50 py-24 tab:py-16">
          <div className="mx-auto w-full max-w-[1200px] px-[15px]">
            <h2 className="mb-12 text-[clamp(2rem,3.8vw,3.2rem)] leading-[1.08] font-semibold tracking-[-0.025em] text-balance text-era-black">{a.beforeTitle}</h2>
            <div className="grid grid-cols-2 gap-4 mob:hidden">
              <span className="px-6 text-[13px] font-bold tracking-[0.12em] text-era-gray uppercase">{a.beforeLabel}</span>
              <span className="px-6 text-[13px] font-bold tracking-[0.12em] text-era-primary-ink uppercase">{a.afterLabel}</span>
            </div>
            <ul className="mt-3 flex flex-col gap-4">
              {a.before.map(([was, now], i) => (
                <Reveal key={was} variant="up" delay={i * 80}>
                  <li className="grid grid-cols-2 gap-4 mob:grid-cols-1">
                    <span className="flex items-start gap-3 rounded-(--r-s) bg-era-white/60 p-6 text-[17px] leading-[1.5] text-era-gray ring-1 ring-era-lightgray">
                      <X size={18} className="mt-0.5 flex-none text-era-matte" /> {was}
                    </span>
                    <span className="flex items-start gap-3 rounded-(--r-s) bg-era-white p-6 text-[17px] leading-[1.5] text-era-black shadow-[0_12px_30px_var(--c-shadow-soft)] ring-1 ring-era-primary/30">
                      <Check size={18} strokeWidth={3} className="mt-0.5 flex-none text-era-primary" /> {now}
                    </span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
    </>
  );
}
