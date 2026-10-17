"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowDown, CheckCircle2, Play } from "lucide-react";
import { useLocale } from "@/i18n/useLocale";
import { schnellDemo } from "@/i18n/schnelldemo";
import { Footer } from "../Footer";
import { Navbar } from "../Navbar";
import { GlowGrid } from "../GlowGrid";
import { Reveal } from "../ui";
import { useVoiceVideo } from "./voice";
import { VoiceVideo } from "./VoiceVideo";
import { PlatformDiagram } from "./PlatformDiagram";
import { AreasShowcase } from "./AreasShowcase";
import { DemoAccessForm } from "./DemoAccessForm";

/**
 * Schnell-Demo sayfası (Adnan 2026-10-17): Ekado_V2'deki "Firma" bölümü sitenin renkleriyle, tek bölüm hâlinde.
 * Üstte 70 sn tanıtım filmi, ortada iki sekme (Plattform diyagramı | Bereiche & Ablauf: video + arkadan ses),
 * en altta demo erişimi formu (#demo-zugang). Menüdeki ve sayfalardaki "Schnell-Demo" bağlantıları buraya gelir.
 */
export function SchnellDemoPage() {
  const { locale } = useLocale();
  const t = schnellDemo[locale];
  const [tab, setTab] = useState<0 | 1>(0);
  const [area, setArea] = useState(0);
  const [playSignal, setPlaySignal] = useState(0);
  const tabsRef = useRef<HTMLDivElement>(null);
  const intro = useVoiceVideo("/videos/demo/intro.mp4", "/sounds/demo/intro", locale, false);
  const labels = { play: t.playVideo, pause: t.pauseVideo, full: t.fullscreen };

  const openArea = useCallback((i: number) => {
    setArea(i);
    setTab(1);
    setPlaySignal((n) => n + 1);
    tabsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  // aynı anda tek video konuşsun: biri başlayınca sayfadaki diğerleri durur
  useEffect(() => {
    const onPlay = (e: Event) => {
      document.querySelectorAll("video").forEach((v) => v !== e.target && !v.paused && v.pause());
    };
    document.addEventListener("play", onPlay, true);
    return () => document.removeEventListener("play", onPlay, true);
  }, []);

  return (
    <div className="overflow-hidden">
      <Navbar />
      <main>
        {/* Üst: başlık + tanıtım filmi */}
        <section className="ekado-hero-bg pt-[120px] pb-16 tab:pt-[100px] tab:pb-12">
          <div className="mx-auto grid w-full max-w-[1300px] grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] items-center gap-12 px-[15px] tab:grid-cols-1 tab:gap-8">
            <div className="flex flex-col gap-6">
              <span className="era-in-up flex w-fit items-center gap-2 rounded-full bg-era-white px-4 py-1.5 text-[13px] font-semibold tracking-[0.12em] text-era-primary-ink uppercase ring-1 ring-era-lightgray">
                <i className="block h-1.5 w-1.5 rounded-full bg-era-primary" /> {t.eyebrow}
              </span>
              <h1 className="era-in-up text-[clamp(2.3rem,4.6vw,4rem)] leading-[1.06] font-semibold tracking-[-0.03em] text-balance text-era-black" style={{ animationDelay: ".1s" }}>
                {t.heading}
              </h1>
              <p className="era-in-up max-w-[560px] text-[clamp(1.05rem,1.5vw,1.25rem)] leading-[1.6] text-era-gray" style={{ animationDelay: ".2s" }}>
                {t.lead}
              </p>
              <div className="era-in-up flex flex-wrap gap-3" style={{ animationDelay: ".3s" }}>
                <button type="button" onClick={intro.toggle} className="flex h-14 items-center gap-3 rounded-(--r-s1) bg-era-primary px-7 text-[17px] font-semibold text-era-on-dark transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110">
                  <Play size={18} fill="currentColor" /> {t.introPlay}
                </button>
                <a href="#demo-zugang" className="flex h-14 items-center gap-3 rounded-(--r-s1) bg-era-white px-7 text-[17px] font-semibold text-era-black no-underline ring-1 ring-era-cute transition-all duration-300 hover:-translate-y-0.5 hover:ring-era-primary">
                  {t.toForm} <ArrowDown size={18} />
                </a>
              </div>
            </div>
            {/* yeni film (v2, 2026-10-17): kadın solda, logo sol üst köşede, ekranlar sağdaki duvarda; kırpmadan 16:9 */}
            <div className="era-in-rise mt-16 flex w-full max-w-[580px] flex-col gap-3 justify-self-end tab:mt-0 tab:justify-self-center">
              <VoiceVideo player={intro} poster="/videos/demo/intro.jpg" loop={false} labels={labels} frameClass="aspect-video" videoClass="object-cover" className="shadow-[0_30px_70px_var(--c-shadow)]" />
              <p className="text-center text-[14px] font-semibold text-era-gray">{t.introTitle}</p>
            </div>
          </div>
        </section>

        {/* Firma bölümü: Plattform | Bereiche & Ablauf */}
        <section className="bg-era-secondary/50 py-20 tab:py-14">
          <div ref={tabsRef} className="mx-auto w-full max-w-[1300px] scroll-mt-[90px] px-[15px]">
            <div role="tablist" aria-label={t.tabsAria} className="mb-8 flex gap-2 border-b border-era-cute">
              {t.tabs.map((label, i) => {
                const on = tab === i;
                return (
                  <button
                    key={label}
                    id={`demo-tab-${i}`}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    aria-controls={`demo-page-${i}`}
                    tabIndex={on ? 0 : -1}
                    onClick={() => setTab(i as 0 | 1)}
                    onKeyDown={(e) => {
                      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
                      const n = e.key === "ArrowRight" ? 1 : 0;
                      setTab(n);
                      document.getElementById(`demo-tab-${n}`)?.focus();
                    }}
                    className={`-mb-px border-b-[3px] px-4 py-3 text-[16px] font-semibold transition-colors ${on ? "border-era-primary text-era-primary-ink" : "border-transparent text-era-gray hover:text-era-black"}`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            <div id="demo-page-0" role="tabpanel" aria-labelledby="demo-tab-0" hidden={tab !== 0}>
              <p className="mb-10 max-w-[760px] text-[18px] leading-[1.6] text-era-gray">{t.platformLead}</p>
              <PlatformDiagram t={t} heading={t.heading} onJump={openArea} />
            </div>
            <div id="demo-page-1" role="tabpanel" aria-labelledby="demo-tab-1" hidden={tab !== 1}>
              <AreasShowcase
                t={t}
                locale={locale}
                index={area}
                playSignal={playSignal}
                active={tab === 1}
                onSelect={(i) => {
                  setArea(i);
                  setPlaySignal((n) => n + 1);
                }}
              />
            </div>
          </div>
        </section>

        {/* Demo erişimi formu */}
        <section id="demo-zugang" className="scroll-mt-[80px] py-20 tab:py-14">
          <div className="mx-auto w-full max-w-[1300px] px-[15px]">
            <GlowGrid className="grid grid-cols-[minmax(0,.85fr)_minmax(0,1.15fr)] items-stretch gap-6 tab:grid-cols-1" pad={10} radius={34}>
              <Reveal variant="left" className="h-full">
                <div data-glow className="relative z-[1] flex h-full flex-col gap-5 rounded-[28px] bg-era-dark p-9 text-era-on-dark mob:p-6">
                  <span className="text-[13px] font-semibold tracking-[0.14em] text-era-silver uppercase">{t.formEyebrow}</span>
                  <h2 className="text-[clamp(1.9rem,3.4vw,2.8rem)] leading-[1.1] font-semibold tracking-tight text-balance">{t.formHeading}</h2>
                  <p className="text-[17px] leading-[1.6] text-era-on-dark/80">{t.formLead}</p>
                  <ul className="mt-auto flex flex-col gap-3 pt-4">
                    {t.formPoints.map((p) => (
                      <li key={p} className="flex items-center gap-3 text-[16px] font-medium">
                        <CheckCircle2 size={20} className="flex-none text-era-primary" /> {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
              <Reveal variant="right" className="h-full">
                <div data-glow className="relative z-[1] h-full rounded-[28px] bg-era-white p-9 shadow-[0_30px_80px_var(--c-shadow-soft)] ring-1 ring-era-lightgray mob:p-5">
                  <DemoAccessForm />
                </div>
              </Reveal>
            </GlowGrid>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
