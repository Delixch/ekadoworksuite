"use client";

import { ArrowRight, Check } from "lucide-react";
import { useLocale } from "@/i18n/useLocale";
import { HeroPanel } from "./HeroPanel";

const delay = (s: number) => ({ animationDelay: `${s}s` });

export function Hero() {
  const { t } = useLocale();
  return (
    <section className="punn-hero-bg relative overflow-hidden pt-[128px] pb-[72px] tab:pt-[104px] tab:pb-12">
      <div className="mx-auto w-full max-w-[1470px] px-[15px]">
        <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-12 min-[992px]:grid-cols-[minmax(0,1.02fr)_minmax(0,.98fr)] min-[992px]:gap-8">
          <div className="flex min-w-0 flex-col gap-7">
            <h1 className="text-(length:--hero-title) leading-[1.04] font-extrabold tracking-[-0.035em] text-era-black">
              {t.hero.lines.map((line, i) => (
                <span
                  key={line}
                  className={`era-in-up block ${i === t.hero.accent ? "text-era-primary" : ""}`}
                  style={delay(0.2 + i * 0.15)}
                >
                  {line}
                </span>
              ))}
            </h1>

            <p className="era-in-up max-w-[640px] text-(length:--hero-lead) min-[992px]:max-w-[min(640px,calc(100%-110px))] leading-[1.45] text-era-gray" style={delay(0.65)}>
              {t.hero.lead}
            </p>

            <div className="era-in-up flex flex-wrap gap-4" style={delay(0.8)}>
              <a
                href="#hizli-demo"
                className="flex h-14 items-center gap-3 rounded-(--r-s1) bg-era-primary px-8 text-[18px] whitespace-nowrap sm2:px-4 font-semibold text-era-on-dark no-underline transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 sm2:flex-1 sm2:justify-center"
              >
                {t.hero.test} <ArrowRight size={20} />
              </a>
              <a
                href="#demo"
                className="demo-glow flex h-14 items-center rounded-(--r-s1) border-2 border-era-black px-8 text-[18px] whitespace-nowrap sm2:px-4 font-semibold text-era-black no-underline transition-all duration-300 hover:-translate-y-0.5 hover:bg-era-secondary sm2:flex-1 sm2:justify-center"
              >
                {t.hero.demo}
              </a>
            </div>

            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-1" aria-label={t.hero.channelsAria}>
              {t.hero.points.map((p, i) => (
                <li key={p} className="era-in-pop flex items-center gap-2 text-[16px] font-medium text-era-black" style={delay(1.0 + i * 0.1)}>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-era-secondary text-era-primary-ink">
                    <Check size={14} strokeWidth={2.6} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex min-w-0 flex-col items-center gap-6">
            <HeroPanel />
          </div>
        </div>
      </div>
    </section>
  );
}
