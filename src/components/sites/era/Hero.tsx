"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { ArrowRight, Check, Globe, Phone } from "lucide-react";
import { siInstagram, siMessenger, siWhatsapp } from "simple-icons";
import { useLocale } from "@/i18n/useLocale";
import { HeroPanel } from "./HeroPanel";

/** Açılış damgaları (Remotion): sadece tarayıcıda yüklenir */
const StampPlayer = dynamic(() => import("./stamp/StampPlayer"), { ssr: false });

const delay = (s: number) => ({ animationDelay: `${s}s` });

const iconBox = "era-in-pop flex h-12 w-12 items-center justify-center";

export function Hero() {
  const { t } = useLocale();
  const shake = useRef<HTMLDivElement>(null);
  return (
    <section className="ekado-hero-bg relative overflow-hidden pt-[128px] pb-[72px] tab:pt-[104px] tab:pb-12">
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
                  {i === t.hero.accent ? <span className="ekado-shine">{line}</span> : line}
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
                href="#bize-ulasin"
                className="demo-glow flex h-14 items-center rounded-(--r-s1) border-2 border-era-black px-8 text-[18px] whitespace-nowrap sm2:px-4 font-semibold text-era-black no-underline transition-all duration-300 hover:-translate-y-0.5 hover:bg-era-secondary sm2:flex-1 sm2:justify-center"
              >
                {t.hero.demo}
              </a>
            </div>

            {/* sosyal / iletişim kanalları (14.10'da yanlışlıkla kaldırılmıştı, Adnan 2026-10-15 geri istedi) */}
            <div className="flex items-center gap-4" aria-label="Telefon, WhatsApp, Instagram, Messenger, Web">
              <span className={`${iconBox} text-era-primary-ink`} style={delay(0.9)} title={t.hero.phone}>
                <Phone size={30} strokeWidth={2.2} />
              </span>
              <span className={iconBox} style={delay(0.97)} title="WhatsApp">
                <svg viewBox="0 0 24 24" className="h-9 w-9" aria-label="WhatsApp">
                  <path d={siWhatsapp.path} fill="var(--c-whatsapp)" />
                </svg>
              </span>
              <span className={iconBox} style={delay(1.04)} title="Instagram">
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
              <span className={iconBox} style={delay(1.11)} title="Messenger">
                <svg viewBox="0 0 24 24" className="h-9 w-9" aria-label="Messenger">
                  <path d={siMessenger.path} fill="var(--c-messenger)" />
                </svg>
              </span>
              <span className={`${iconBox} text-era-black`} style={delay(1.18)} title={t.hero.webChat}>
                <Globe size={30} strokeWidth={2} />
              </span>
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

          <div className="relative flex min-w-0 flex-col items-center gap-6">
            {/* laptop + telefon; açılış damgaları darbede bunu sarsar */}
            <div ref={shake} className="w-full will-change-transform">
              <HeroPanel />
            </div>
            <StampPlayer shake={shake} />
          </div>
        </div>
      </div>
    </section>
  );
}
