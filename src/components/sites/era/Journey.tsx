"use client";

import { CalendarCheck, Check, Star, Sun } from "lucide-react";
import { useLocale } from "@/i18n/useLocale";
import { Spot } from "./Spot";
import { Heading, Reveal } from "./ui";

const stageIcons = [CalendarCheck, Sun, Star];

/** Misafir yolculuğu (PDF sayfa 3) + kurulum adımları (eski site) */
export function Journey() {
  const { t } = useLocale();
  const j = t.journey;

  return (
    <section id="yolculuk" className="relative py-[70px] tab:py-[50px] mob:py-10 sm2:py-[35px]">
      <div className="mx-auto w-full max-w-[1470px] px-[15px]">
        <div className="flex flex-col gap-16 mob:gap-12">
          <div className="mx-auto flex w-full max-w-[860px] flex-col items-center gap-4 text-center">
            <span className="flex items-center gap-2 rounded-full bg-era-secondary px-4 py-1.5 text-[13px] font-semibold tracking-[0.12em] text-era-primary-ink uppercase">
              <i className="block h-1.5 w-1.5 rounded-full bg-era-accent" /> {j.eyebrow}
            </span>
            <Heading>{j.heading}</Heading>
            <Reveal variant="fade">
              <p className="text-era-gray">{j.lead}</p>
            </Reveal>
          </div>

          {/* zaman çizgisi: öncesi, sırası, sonrası */}
          <div className="relative mx-auto w-full max-w-[1200px]">
            <div aria-hidden className="pointer-events-none absolute top-[22px] right-[16.6%] left-[16.6%] h-px bg-era-line tab:hidden">
              <span className="era-travel absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-era-primary shadow-[0_0_14px_3px_var(--c-primary)]" />
            </div>
            <div aria-hidden className="pointer-events-none absolute top-6 bottom-6 left-[22px] hidden w-px bg-era-line tab:block">
              <span className="era-travel absolute h-2 w-2 rounded-full bg-era-primary shadow-[0_0_14px_3px_var(--c-primary)]" />
            </div>

            <ol className="grid grid-cols-3 gap-6 tab:grid-cols-1 tab:gap-8 tab:pl-14">
              {j.stages.map((s, i) => {
                const Icon = stageIcons[i];
                return (
                  <li key={s.when} className="relative pt-14 tab:pt-0">
                    <span className="absolute top-0 left-1/2 z-[1] flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full bg-era-primary text-era-on-dark shadow-[0_8px_20px_var(--c-shadow)] ring-4 ring-era-white tab:top-5 tab:-left-14 tab:translate-x-0">
                      <Icon size={20} strokeWidth={1.9} />
                    </span>
                    <Reveal variant="up" delay={i * 150} className="h-full">
                      <Spot className="punn-panel flex h-full flex-col gap-4 rounded-(--r-x) px-7 py-7 mob:px-5">
                        <span className="w-fit rounded-full bg-era-secondary px-3 py-1 text-[13px] font-semibold text-era-primary-ink">
                          {s.when}
                        </span>
                        <h3 className="text-[24px] leading-[1.15] font-extrabold tracking-[-0.02em] text-era-black">{s.title}</h3>
                        <ul className="flex flex-col gap-3">
                          {s.items.map((it) => (
                            <li key={it} className="flex gap-3 text-[15px] leading-[1.5] text-era-gray">
                              <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-era-secondary text-era-success">
                                <Check size={12} strokeWidth={3} />
                              </span>
                              {it}
                            </li>
                          ))}
                        </ul>
                      </Spot>
                    </Reveal>
                  </li>
                );
              })}
            </ol>
          </div>

          <Reveal variant="fade">
            <p className="mx-auto max-w-[760px] text-center text-[22px] leading-[1.35] font-semibold tracking-[-0.01em] text-era-black mob:text-[19px]">
              {j.tagline}
            </p>
          </Reveal>

          {/* kurulum: sıra gerçek, numaralar bu yüzden var */}
          <div id="kurulum" className="mx-auto flex w-full max-w-[1100px] scroll-mt-28 flex-col gap-8">
            <div className="flex flex-col items-center gap-3 text-center">
              <span className="text-[13px] font-semibold tracking-[0.14em] text-era-gray uppercase">{j.setupEyebrow}</span>
              <Heading as="h3" className="!text-(length:--h4)">
                {j.setupTitle}
              </Heading>
              <p className="max-w-[640px] text-era-gray">{j.setupLead}</p>
            </div>
            <ol className="grid grid-cols-3 gap-8 tab:grid-cols-1 tab:gap-6">
              {j.steps.map((st, i) => (
                <li key={st.title}>
                  <Reveal variant="up" delay={i * 130} className="flex gap-4">
                    <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-era-secondary text-[20px] font-extrabold text-era-primary-ink ring-1 ring-era-line">
                      {i + 1}
                    </span>
                    <div>
                      <h4 className="text-[18px] leading-snug font-bold text-era-black">{st.title}</h4>
                      <p className="mt-1 text-[15px] leading-[1.55] text-era-gray">{st.text}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
