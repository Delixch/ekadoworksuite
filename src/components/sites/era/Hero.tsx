"use client";

import { ArrowRight, Globe, Phone } from "lucide-react";
import { siInstagram, siMessenger, siWhatsapp } from "simple-icons";
import { useLocale } from "@/i18n/useLocale";
import { HeroMockup } from "./HeroMockup";

const delay = (s: number) => ({ animationDelay: `${s}s` });

const iconBox = "era-in-pop flex h-12 w-12 items-center justify-center";

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
                href="/test-et"
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

            <div className="flex items-center gap-4 pt-1" aria-label={t.hero.channelsAria}>
              <span className={`${iconBox} text-era-primary-ink`} style={delay(1.0)} title={t.hero.phone}>
                <Phone size={30} strokeWidth={2.2} />
              </span>
              <span className={iconBox} style={delay(1.07)} title="WhatsApp">
                <svg viewBox="0 0 24 24" className="h-9 w-9" aria-label="WhatsApp">
                  <path d={siWhatsapp.path} fill="var(--c-whatsapp)" />
                </svg>
              </span>
              <span className={iconBox} style={delay(1.14)} title="Instagram">
                <svg viewBox="0 0 24 24" className="h-9 w-9" aria-label="Instagram">
                  <defs>
                    <linearGradient id="ig-grad" x1="0" y1="1" x2="1" y2="0">
                      <stop offset="0" style={{ stopColor: "var(--c-ig-1)" }} />
                      <stop offset="0.5" style={{ stopColor: "var(--c-ig-2)" }} />
                      <stop offset="1" style={{ stopColor: "var(--c-ig-3)" }} />
                    </linearGradient>
                  </defs>
                  <path d={siInstagram.path} fill="url(#ig-grad)" />
                </svg>
              </span>
              <span className={iconBox} style={delay(1.21)} title="Messenger">
                <svg viewBox="0 0 24 24" className="h-9 w-9" aria-label="Messenger">
                  <path d={siMessenger.path} fill="var(--c-messenger)" />
                </svg>
              </span>
              <span className={`${iconBox} text-era-black`} style={delay(1.28)} title={t.hero.webChat}>
                <Globe size={30} strokeWidth={2} />
              </span>
            </div>
          </div>

          <div className="flex min-w-0 flex-col items-center gap-6">
            <HeroMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
