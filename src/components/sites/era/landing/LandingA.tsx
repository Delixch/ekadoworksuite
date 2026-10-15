"use client";

import Link from "next/link";
import { ArrowRight, Check, CircleDot, Play } from "lucide-react";
import { useLocale } from "@/i18n/useLocale";
import { landing } from "@/i18n/landing";
import { moduleHref } from "@/i18n/modules/common";
import { Footer } from "../Footer";
import { HeroPanel } from "../HeroPanel";
import { Navbar } from "../Navbar";
import { Reveal } from "../ui";
import { DraftBar } from "./DraftBar";
import { ModuleCards } from "../ModuleCards";
import { BeforeAfter } from "../BeforeAfter";


/**
 * Ana sayfa TASLAK A, "Net ve İsviçreli" (bexio / nextesy çizgisi): iddia + ürün, gerçek bilgilerden güven şeridi,
 * 4 modül kartı (videolu), bugün → Ekado ile, 3 adım, SSS, son çağrı.
 */
export function LandingA() {
  const { locale } = useLocale();
  const c = landing[locale];
  const a = c.a;


  return (
    <div className="overflow-x-clip">
      <Navbar />
      <main>
        {/* ilk ekran */}
        <section className="relative bg-[radial-gradient(70%_60%_at_85%_10%,var(--c-sky),transparent)] pt-[130px] pb-16 tab:pt-[100px]">
          <div className="mx-auto grid w-full max-w-[1400px] grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] items-center gap-12 px-[15px] tab:grid-cols-1">
            <div className="flex flex-col items-start gap-6">
              <span className="era-in-up flex w-fit items-center gap-2 rounded-full bg-era-secondary px-4 py-1.5 text-[13px] font-semibold tracking-[0.12em] text-era-primary-ink uppercase">
                <i className="block h-1.5 w-1.5 rounded-full bg-era-accent" /> {a.eyebrow}
              </span>
              <h1 className="era-in-up text-[clamp(2.6rem,5.6vw,4.8rem)] leading-[1.02] font-semibold tracking-[-0.035em] text-balance text-era-black" style={{ animationDelay: ".08s" }}>
                {a.h1[0]} <span className="text-era-primary">{a.h1[1]}</span>
              </h1>
              <p className="era-in-up max-w-[600px] text-[clamp(1.1rem,1.6vw,1.3rem)] leading-[1.6] text-era-gray" style={{ animationDelay: ".16s" }}>
                {a.lead}
              </p>
              <div className="era-in-up flex flex-wrap gap-3" style={{ animationDelay: ".24s" }}>
                <Link href="/#demo" className="flex h-13 items-center gap-2 rounded-(--r-s1) bg-era-primary px-7 py-3.5 text-[17px] font-semibold text-era-on-dark no-underline transition hover:-translate-y-0.5 hover:brightness-110">
                  {c.ctaDemo} <ArrowRight size={18} />
                </Link>
                <Link href={moduleHref("uebersicht-betrieb")} className="flex items-center gap-2 rounded-(--r-s1) px-6 py-3.5 text-[17px] font-semibold text-era-black no-underline ring-1 ring-era-cute transition hover:bg-era-white">
                  <Play size={16} className="fill-current" /> {c.ctaVideos}
                </Link>
              </div>
            </div>
            <div className="era-in-rise">
              <HeroPanel />
            </div>
          </div>
        </section>

        {/* güven şeridi: sadece gerçek bilgiler */}
        <section className="border-y border-era-lightgray bg-era-white">
          <ul className="mx-auto flex w-full max-w-[1400px] flex-wrap items-center justify-between gap-x-8 gap-y-3 px-[15px] py-5 tab:justify-start">
            {a.trust.map((t) => (
              <li key={t} className="flex items-center gap-2 text-[16px] font-semibold text-era-black">
                <Check size={18} strokeWidth={3} className="text-era-primary" />
                {t}
              </li>
            ))}
          </ul>
        </section>

        <ModuleCards />

        <BeforeAfter />

        {/* üç adım */}
        <section className="py-24 tab:py-16">
          <div className="mx-auto w-full max-w-[1200px] px-[15px]">
            <h2 className="mb-12 text-[clamp(2rem,3.8vw,3.2rem)] leading-[1.08] font-semibold tracking-[-0.025em] text-balance text-era-black">{a.stepsTitle}</h2>
            <ol className="relative grid grid-cols-3 gap-6 tab:grid-cols-1">
              <span aria-hidden className="absolute top-[27px] right-[16%] left-[16%] h-[3px] rounded-full bg-gradient-to-r from-era-primary via-era-accent to-era-primary opacity-40 tab:hidden" />
              {a.steps.map((s, i) => (
                <Reveal key={s.title} variant="up" delay={i * 120}>
                  <li className="flex flex-col gap-5">
                    <span className="relative z-[1] flex h-[56px] w-[56px] items-center justify-center rounded-full bg-era-primary text-[22px] font-medium text-era-on-dark shadow-[0_10px_28px_var(--c-shadow)]">{i + 1}</span>
                    <span className="flex flex-col gap-2 rounded-(--r-x) bg-era-white p-7 ring-1 ring-era-lightgray">
                      <span className="text-[22px] leading-tight font-semibold text-era-black">{s.title}</span>
                      <span className="text-[16px] leading-[1.6] text-era-gray">{s.text}</span>
                    </span>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* SSS */}
        <section className="pb-24 tab:pb-16">
          <div className="mx-auto w-full max-w-[900px] px-[15px]">
            <h2 className="mb-8 text-[clamp(2rem,3.8vw,3.2rem)] leading-[1.08] font-semibold tracking-[-0.025em] text-era-black">{a.faqTitle}</h2>
            <div className="flex flex-col divide-y divide-era-lightgray rounded-(--r-x) bg-era-white ring-1 ring-era-lightgray">
              {a.faq.map(([q, ans]) => (
                <details key={q} className="group/f px-6 py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[18px] font-semibold text-era-black [&::-webkit-details-marker]:hidden">
                    {q}
                    <CircleDot size={20} className="flex-none text-era-primary transition-transform group-open/f:rotate-90" />
                  </summary>
                  <p className="mt-3 text-[16px] leading-[1.6] text-era-gray">{ans}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* son çağrı */}
        <section className="pb-28 tab:pb-20">
          <div className="mx-auto flex w-full max-w-[1270px] flex-col items-start gap-5 rounded-(--r-mx) bg-era-dark p-14 text-era-on-dark mob:mx-[15px] mob:w-auto mob:p-8">
            <h2 className="text-[clamp(2rem,3.8vw,3.2rem)] leading-tight font-semibold tracking-[-0.02em]">{a.endTitle}</h2>
            <p className="max-w-[620px] text-[18px] leading-[1.6] opacity-85">{a.endText}</p>
            <Link href="/#demo" className="flex items-center gap-2 rounded-(--r-s1) bg-era-primary px-7 py-3.5 text-[17px] font-semibold text-era-on-dark no-underline transition hover:-translate-y-0.5 hover:brightness-110">
              {c.ctaDemo} <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <DraftBar current="a" />
    </div>
  );
}
