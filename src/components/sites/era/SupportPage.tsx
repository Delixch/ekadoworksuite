"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Check, Mail, MapPin, Phone, Quote, Sparkles, Star, Users, Wrench } from "lucide-react";
import { useLocale } from "@/i18n/useLocale";
import { support } from "@/i18n/support";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { Reveal } from "./ui";

const CX = 200;
const R = 118;
const arc = (i: number) => {
  const a0 = ((-90 + i * 120 + 9) * Math.PI) / 180;
  const a1 = ((-90 + i * 120 + 111) * Math.PI) / 180;
  const p = (a: number) => `${CX + R * Math.cos(a)} ${CX + R * Math.sin(a)}`;
  return `M${p(a0)} A${R} ${R} 0 0 1 ${p(a1)}`;
};
const labelPos = (i: number) => {
  const a = ((-90 + i * 120 + 60) * Math.PI) / 180;
  return { left: `${((CX + 168 * Math.cos(a)) / 400) * 100}%`, top: `${((CX + 168 * Math.sin(a)) / 400) * 100}%` };
};

/** Üç aylık halka: her ay bir yay, sırayla çizilir; ortada büyük rakam */
function Ring() {
  const { locale } = useLocale();
  const r = support[locale].ring;
  const [drawn, setDrawn] = useState(0);

  useEffect(() => {
    const ids = [0, 1, 2].map((i) => setTimeout(() => setDrawn(i + 1), 500 + i * 650));
    return () => ids.forEach(clearTimeout);
  }, []);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[430px]">
      <span aria-hidden className="absolute inset-[10%] rounded-full bg-era-primary/20 blur-[60px]" />
      <span aria-hidden className="era-aurora absolute inset-[18%] rounded-full bg-era-accent/25 blur-[70px]" />
      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" aria-hidden>
        <circle cx={CX} cy={CX} r={R} fill="none" strokeWidth="14" className="stroke-era-lightgray" />
        {[0, 1, 2].map((i) => (
          <path
            key={i}
            d={arc(i)}
            pathLength={1}
            fill="none"
            strokeWidth="14"
            strokeLinecap="round"
            className={i === 1 ? "stroke-era-accent" : "stroke-era-primary"}
            style={{ strokeDasharray: 1, strokeDashoffset: drawn > i ? 0 : 1, transition: "stroke-dashoffset 900ms cubic-bezier(.4,0,.2,1)" }}
          />
        ))}
        <g className="animate-[spin_40s_linear_infinite]" style={{ transformOrigin: `${CX}px ${CX}px` }}>
          <circle cx={CX} cy={CX - 150} r="6" className="fill-era-primary" />
          <circle cx={CX} cy={CX + 150} r="4" className="fill-era-accent" />
        </g>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-[clamp(6rem,15vw,9.5rem)] leading-none font-light tracking-[-0.05em] text-era-black">{r.big}</span>
        <span className="mt-1 max-w-[150px] text-[15px] leading-tight font-semibold text-era-gray">{r.label}</span>
      </div>
      {r.months.map((m, i) => (
        <span
          key={m}
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-era-white px-3 py-1 text-[12px] font-semibold text-era-primary-ink shadow-[0_8px_22px_var(--c-shadow-soft)] ring-1 ring-era-lightgray transition-opacity duration-500"
          style={{ ...labelPos(i), opacity: drawn > i ? 1 : 0 }}
        >
          {m}
        </span>
      ))}
    </div>
  );
}

const channelIcons = [MapPin, Phone, Sparkles];
const onsiteIcons = [Wrench, Users, Check];

export function SupportPage() {
  const { locale } = useLocale();
  const s = support[locale];
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setStep((x) => (x + 1) % (s.flowSteps.length + 1)), 1400);
    return () => clearInterval(id);
  }, [s.flowSteps.length]);

  return (
    <div className="overflow-hidden">
      <Navbar />
      <main>
        {/* Üst: büyük başlık ve üç aylık halka */}
        <section className="relative bg-[radial-gradient(60%_45%_at_80%_0%,var(--c-sky),transparent)] pt-[120px] pb-[80px] tab:pt-[100px] tab:pb-14">
          <div className="mx-auto w-full max-w-[1300px] px-[15px]">
            <div className="grid grid-cols-[minmax(0,1.1fr)_minmax(0,.9fr)] items-center gap-12 tab:grid-cols-1">
              <div className="flex flex-col gap-6">
                <span className="flex w-fit items-center gap-2 rounded-full bg-era-secondary px-4 py-1.5 text-[13px] font-semibold tracking-[0.12em] text-era-primary-ink uppercase">
                  <i className="block h-1.5 w-1.5 rounded-full bg-era-accent" /> {s.eyebrow}
                </span>
                <h1 className="text-[clamp(2.4rem,5.2vw,4.4rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-balance text-era-black">{s.heading}</h1>
                <p className="max-w-[560px] text-[clamp(1.1rem,1.6vw,1.3rem)] leading-[1.55] text-era-gray">{s.lead}</p>
                <ul className="flex flex-wrap gap-3 pt-2">
                  {s.channels.map((c, i) => {
                    const Icon = channelIcons[i];
                    return (
                      <li key={c} className="flex items-center gap-2 rounded-full bg-era-white px-4 py-2 text-[15px] font-semibold text-era-black shadow-[0_8px_22px_var(--c-shadow-soft)] ring-1 ring-era-lightgray">
                        <Icon size={17} strokeWidth={2} className="text-era-primary-ink" />
                        {c}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <Ring />
            </div>
          </div>
        </section>

        {/* Yol haritası */}
        <section className="relative py-[70px] tab:py-[50px] mob:py-10">
          <div className="mx-auto w-full max-w-[1200px] px-[15px]">
            <div className="mb-14 flex max-w-[760px] flex-col items-start gap-4 text-left">
              <span className="rounded-full bg-era-secondary px-4 py-1.5 text-[13px] font-semibold tracking-[0.12em] text-era-primary-ink uppercase">{s.roadmapEyebrow}</span>
              <h2 className="text-[clamp(2rem,3.8vw,3.1rem)] leading-[1.1] font-semibold tracking-[-0.02em] text-balance text-era-black">{s.roadmapHeading}</h2>
            </div>
            <div className="relative grid grid-cols-3 gap-6 tab:grid-cols-1">
              <span aria-hidden className="absolute top-[26px] right-[16%] left-[16%] h-[3px] rounded-full bg-gradient-to-r from-era-primary via-era-accent to-era-primary opacity-40 tab:hidden" />
              {s.roadmap.map((r, i) => (
                <Reveal key={r.when} variant="up" delay={i * 130} className="h-full">
                  <div className="flex h-full flex-col gap-5">
                    <span className="relative z-[1] flex h-[54px] w-fit items-center rounded-full bg-era-primary px-6 text-[16px] font-bold text-era-on-dark shadow-[0_10px_28px_var(--c-shadow)]">{r.when}</span>
                    <div className="punn-panel flex h-full flex-col gap-4 rounded-(--r-x) p-7">
                      <h3 className="text-[22px] leading-tight font-semibold text-era-black">{r.title}</h3>
                      <ul className="flex flex-col gap-3">
                        {r.items.map((it) => (
                          <li key={it} className="flex items-start gap-3 text-[17px] leading-snug text-era-gray">
                            <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-era-secondary text-era-primary-ink">
                              <Check size={12} strokeWidth={3} />
                            </span>
                            {it}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Yerinde */}
        <section className="relative bg-era-secondary py-[80px] tab:py-[56px] mob:py-12">
          <div className="mx-auto grid w-full max-w-[1200px] grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] items-center gap-14 px-[15px] tab:grid-cols-1 tab:gap-8">
            <div className="flex flex-col gap-5">
              <span className="flex w-fit items-center gap-2 rounded-full bg-era-white px-4 py-1.5 text-[13px] font-semibold tracking-[0.12em] text-era-primary-ink uppercase ring-1 ring-era-lightgray">
                <MapPin size={14} /> {s.onsiteEyebrow}
              </span>
              <h2 className="text-[clamp(2rem,3.8vw,3.1rem)] leading-[1.1] font-semibold tracking-[-0.02em] text-balance text-era-black">{s.onsiteHeading}</h2>
              <p className="max-w-[460px] text-[19px] leading-[1.6] text-era-gray">{s.onsiteText}</p>
            </div>
            <div className="flex flex-col gap-4">
              {s.onsiteItems.map((it, i) => {
                const Icon = onsiteIcons[i];
                return (
                  <Reveal key={it.title} variant="right" delay={i * 110}>
                    <div className="flex items-start gap-5 rounded-(--r-x) bg-era-white p-6 shadow-[0_14px_40px_var(--c-shadow-soft)] ring-1 ring-era-lightgray">
                      <span className="flex h-12 w-12 flex-none items-center justify-center rounded-2xl bg-era-coolblue text-era-primary-ink">
                        <Icon size={22} strokeWidth={1.9} />
                      </span>
                      <div>
                        <h3 className="text-[19px] font-semibold text-era-black">{it.title}</h3>
                        <p className="mt-1 text-[17px] leading-[1.55] text-era-gray">{it.text}</p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* İstek -> modül */}
        <section className="relative py-[80px] tab:py-[56px] mob:py-12">
          <div className="mx-auto flex w-full max-w-[1200px] flex-col items-start gap-8 px-[15px] text-left">
            <span className="rounded-full bg-era-secondary px-4 py-1.5 text-[13px] font-semibold tracking-[0.12em] text-era-primary-ink uppercase">{s.flowEyebrow}</span>
            <h2 className="text-[clamp(2rem,3.8vw,3.1rem)] leading-[1.1] font-semibold tracking-[-0.02em] text-balance text-era-black">{s.flowHeading}</h2>
            <p className="max-w-[720px] text-[19px] leading-[1.6] text-era-gray">{s.flowText}</p>

            <ol className="relative mt-4 grid w-full grid-cols-4 gap-4 tab:grid-cols-2 mob:grid-cols-1">
              {s.flowSteps.map((f, i) => {
                const on = step > i;
                return (
                  <li key={f} className={`relative flex flex-col items-start gap-3 rounded-(--r-x) p-6 text-left ring-1 transition-all duration-500 ${on ? "bg-era-primary text-era-on-dark ring-era-primary shadow-[0_18px_44px_var(--c-shadow)]" : "bg-era-white text-era-black ring-era-lightgray"}`}>
                    <span className={`flex h-9 w-9 items-center justify-center rounded-full text-[15px] font-bold transition-colors duration-500 ${on ? "bg-era-on-dark/20 text-era-on-dark" : "bg-era-secondary text-era-primary-ink"}`}>{i + 1}</span>
                    <span className="text-[17px] leading-snug font-semibold">{f}</span>
                    {i < s.flowSteps.length - 1 && <ArrowRight aria-hidden size={20} className="absolute top-1/2 -right-[18px] z-[1] -translate-y-1/2 text-era-primary-ink tab:hidden" />}
                  </li>
                );
              })}
            </ol>

            <div className="flex flex-wrap items-center justify-start gap-3 pt-2">
              <span className="text-[13px] font-semibold tracking-[0.12em] text-era-gray uppercase">{s.flowExamplesLabel}</span>
              {s.flowExamples.map((e) => (
                <span key={e} className="rounded-full border border-dashed border-era-cute px-4 py-1.5 text-[15px] font-semibold text-era-black">
                  {e}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Müşteri yorumları (DEMO metin) */}
        <section className="relative bg-era-secondary py-[80px] tab:py-[56px] mob:py-12">
          <div className="mx-auto w-full max-w-[1200px] px-[15px]">
            <div className="mb-12 flex max-w-[760px] flex-col items-start gap-4 text-left">
              <span className="rounded-full bg-era-white px-4 py-1.5 text-[13px] font-semibold tracking-[0.12em] text-era-primary-ink uppercase ring-1 ring-era-lightgray">{s.voicesEyebrow}</span>
              <h2 className="text-[clamp(2rem,3.8vw,3.1rem)] leading-[1.1] font-semibold tracking-[-0.02em] text-balance text-era-black">{s.voicesHeading}</h2>
            </div>
            <div className="grid grid-cols-2 gap-6 tab:grid-cols-1">
              {s.voices.map((v, i) => (
                <Reveal key={v.name} variant="up" delay={i * 140} className={`h-full ${i === 1 ? "min-[992px]:translate-y-8" : ""}`}>
                  <figure className="relative flex h-full flex-col gap-6 overflow-hidden rounded-(--r-x) bg-era-white p-8 shadow-[0_20px_56px_var(--c-shadow-soft)] ring-1 ring-era-lightgray mob:p-6">
                    <Quote aria-hidden size={72} strokeWidth={1.2} className="absolute -top-2 right-4 text-era-coolblue" />
                    <div className="flex gap-1 text-era-accent" aria-label="5/5">
                      {Array.from({ length: 5 }).map((_, k) => (
                        <Star key={k} size={18} className="fill-current" />
                      ))}
                    </div>
                    <blockquote className="relative text-[clamp(1.15rem,1.6vw,1.4rem)] leading-[1.55] font-medium text-era-black">{v.quote}</blockquote>
                    <figcaption className="mt-auto flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-era-primary text-[16px] font-bold text-era-on-dark">{v.name[0]}</span>
                      <span className="flex flex-col leading-tight">
                        <span className="text-[16px] font-bold text-era-black">{v.name}</span>
                        <span className="text-[14px] text-era-gray">{v.role}</span>
                      </span>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Çağrı */}
        <section className="relative py-[90px] tab:py-[60px] mob:py-12">
          <div className="mx-auto flex w-full max-w-[1200px] flex-col items-start gap-5 px-[15px] text-left">
            <h2 className="text-[clamp(2.1rem,4vw,3.3rem)] leading-[1.08] font-semibold tracking-[-0.025em] text-balance text-era-black">{s.ctaHeading}</h2>
            <p className="max-w-[640px] text-[20px] leading-[1.55] text-era-gray">{s.ctaText}</p>
            <div className="flex flex-wrap items-center justify-start gap-4 pt-2">
              <a
                href="mailto:info@ekado.ch?subject=Support"
                className="flex h-14 items-center gap-3 rounded-(--r-s1) bg-era-primary px-8 text-[18px] font-semibold text-era-on-dark no-underline transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
              >
                <Mail size={20} /> {s.ctaPrimary}
              </a>
              <a
                href="#hizli-demo"
                className="flex h-14 items-center gap-3 rounded-(--r-s1) border-2 border-era-black px-8 text-[18px] font-semibold text-era-black no-underline transition-all duration-300 hover:-translate-y-0.5 hover:bg-era-secondary"
              >
                {s.ctaSecondary} <ArrowRight size={20} />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
