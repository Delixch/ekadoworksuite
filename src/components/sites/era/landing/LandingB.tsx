"use client";

import Link from "next/link";
import { useState } from "react";
import { ForWhom, ModuleGrid, modIcon, useBuilder } from "../builder/ModuleBuilder";
import { ArrowRight, HandHeart, Play } from "lucide-react";
import { useLocale } from "@/i18n/useLocale";
import { landing } from "@/i18n/landing";
import { moduleHref } from "@/i18n/modules/common";
import { pickPart, posterOf } from "@/lib/module-videos";
import { Footer } from "../Footer";
import { Navbar } from "../Navbar";
import { Reveal } from "../ui";
import { SwissBand } from "../SwissBand";
import { DraftBar } from "./DraftBar";


/**
 * Ana sayfa TASLAK B, "Kendi programını kur" (Odoo çizgisi, daha oyunlu): ilk ekranda 13 bölümlük ızgara;
 * işletme türü seçilince programdaki paket açılır, kutular tek tek açılıp kapanır. Sonra iş günü, video, kimin için, İsviçre, destek.
 */
export function LandingB() {
  const { locale } = useLocale();
  const c = landing[locale];
  const b = c.b;
  const bld = useBuilder();
  const [playing, setPlaying] = useState(false);
  const film = pickPart(1, locale);

  return (
    <div className="overflow-x-clip">
      <Navbar />
      <main>
        {/* ilk ekran: programı kur */}
        <section className="relative bg-[radial-gradient(60%_55%_at_15%_0%,var(--c-sky),transparent)] pt-[130px] pb-20 tab:pt-[100px]">
          <div className="mx-auto grid w-full max-w-[1400px] grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] items-center gap-14 px-[15px] tab:grid-cols-1 tab:gap-10">
            <div className="flex flex-col items-start gap-6">
              <span className="era-in-up flex w-fit items-center gap-2 rounded-full bg-era-secondary px-4 py-1.5 text-[13px] font-semibold tracking-[0.12em] text-era-primary-ink uppercase">
                <i className="block h-1.5 w-1.5 rounded-full bg-era-accent" /> {b.eyebrow}
              </span>
              <h1 className="era-in-up text-[clamp(2.8rem,6vw,5.2rem)] leading-[0.98] font-semibold tracking-[-0.04em] text-balance text-era-black" style={{ animationDelay: ".08s" }}>
                {b.h1}
              </h1>
              <p className="era-in-up max-w-[540px] text-[clamp(1.1rem,1.6vw,1.3rem)] leading-[1.6] text-era-gray" style={{ animationDelay: ".16s" }}>
                {b.lead}
              </p>
              <div className="era-in-up flex flex-wrap gap-3" style={{ animationDelay: ".24s" }}>
                <Link href="/#demo" className="flex items-center gap-2 rounded-(--r-s1) bg-era-primary px-7 py-3.5 text-[17px] font-semibold text-era-on-dark no-underline transition hover:-translate-y-0.5 hover:brightness-110">
                  {c.ctaDemo} <ArrowRight size={18} />
                </Link>
                <Link href={moduleHref("uebersicht-betrieb")} className="flex items-center gap-2 rounded-(--r-s1) px-6 py-3.5 text-[17px] font-semibold text-era-black no-underline ring-1 ring-era-cute transition hover:bg-era-white">
                  <Play size={16} className="fill-current" /> {c.ctaVideos}
                </Link>
              </div>
            </div>

            {/* bölüm ızgarası (ortak bileşen, Modüler Yapı sayfasında da var) */}
            <div className="era-in-rise">
              <ModuleGrid b={bld} />
            </div>
          </div>
        </section>

        {/* bir iş günü */}
        <section className="py-20 tab:py-14">
          <div className="mx-auto w-full max-w-[1400px] px-[15px]">
            <h2 className="mb-10 text-[clamp(2rem,3.8vw,3.2rem)] leading-[1.08] font-semibold tracking-[-0.025em] text-era-black">{b.dayTitle}</h2>
            <ol className="flex snap-x gap-4 overflow-x-auto pb-4 [scrollbar-width:thin]">
              {b.day.map((d, i) => {
                const Icon = modIcon[d.mod];
                const lit = bld.on.has(d.mod);
                return (
                  <Reveal key={d.time} variant="up" delay={i * 80} className="w-[260px] flex-none snap-start">
                    <li className={`flex h-full flex-col gap-4 rounded-(--r-x) p-6 ring-1 transition-all duration-500 ${lit ? "bg-era-white ring-era-lightgray" : "bg-era-secondary/40 opacity-50 ring-transparent"}`}>
                      <span className="text-[34px] leading-none font-light tracking-[-0.03em] text-era-black tabular-nums">{d.time}</span>
                      <span className={`flex w-fit items-center gap-2 rounded-full px-3 py-1 text-[13px] font-semibold ${lit ? "bg-era-coolblue text-era-primary-ink" : "bg-era-secondary text-era-matte"}`}>
                        <Icon size={14} /> {b.mods[d.mod]}
                      </span>
                      <span className="text-[16px] leading-[1.5] text-era-gray">{d.text}</span>
                    </li>
                  </Reveal>
                );
              })}
            </ol>
          </div>
        </section>

        {/* video */}
        <section className="pb-20 tab:pb-14">
          <div className="mx-auto grid w-full max-w-[1300px] grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)] items-center gap-12 px-[15px] tab:grid-cols-1">
            <div className="flex flex-col gap-4">
              <h2 className="text-[clamp(2rem,3.8vw,3.2rem)] leading-[1.08] font-semibold tracking-[-0.025em] text-era-black">{b.videoTitle}</h2>
              <p className="text-[18px] leading-[1.6] text-era-gray">{b.videoText}</p>
              <Link href={moduleHref("uebersicht-betrieb")} className="flex w-fit items-center gap-2 text-[16px] font-semibold text-era-primary-ink no-underline">
                {c.ctaVideos} <ArrowRight size={16} />
              </Link>
            </div>
            {film && (
              <div className="group/v relative aspect-video overflow-hidden rounded-(--r-mx) bg-era-device shadow-[0_26px_60px_var(--c-shadow)]">
                {playing ? (
                  <video src={film.url} poster={posterOf(film.url)} controls autoPlay playsInline className="h-full w-full object-contain" />
                ) : (
                  <button type="button" onClick={() => setPlaying(true)} aria-label="Play" className="absolute inset-0 block h-full w-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={posterOf(film.url)} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover/v:scale-[1.04]" />
                    <span className="absolute inset-0 flex items-center justify-center bg-black/10">
                      <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-era-white/95 text-era-primary shadow-lg transition-transform duration-300 group-hover/v:scale-110">
                        <span aria-hidden className="absolute inset-0 animate-[era-ring_1.8s_ease-out_infinite] rounded-full bg-era-white/60" />
                        <Play size={30} className="relative ml-1 fill-current" />
                      </span>
                    </span>
                  </button>
                )}
              </div>
            )}
          </div>
        </section>

        {/* kimin için */}
        <section className="bg-era-secondary/50 py-20 tab:py-14">
          <div className="mx-auto w-full max-w-[1400px] px-[15px]">
            <h2 className="mb-10 text-[clamp(2rem,3.8vw,3.2rem)] leading-[1.08] font-semibold tracking-[-0.025em] text-era-black">{b.forTitle}</h2>
            <ForWhom b={bld} onPick={() => window.scrollTo({ top: 0, behavior: "smooth" })} />
          </div>
        </section>

        {/* İsviçre (ortak bileşen, ana sayfada da var) */}
        <SwissBand />

        {/* destek + son çağrı */}
        <section className="pb-28 tab:pb-20">
          <div className="mx-auto grid w-full max-w-[1300px] grid-cols-2 gap-6 px-[15px] tab:grid-cols-1">
            <div className="flex flex-col gap-4 rounded-(--r-mx) bg-era-white p-10 ring-1 ring-era-lightgray mob:p-7">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-era-coolblue text-era-primary-ink">
                <HandHeart size={22} />
              </span>
              <h2 className="text-[clamp(1.6rem,2.8vw,2.3rem)] leading-tight font-semibold text-era-black">{b.supportTitle}</h2>
              <p className="text-[17px] leading-[1.6] text-era-gray">{b.supportText}</p>
              <Link href="/support" className="flex w-fit items-center gap-2 text-[16px] font-semibold text-era-primary-ink no-underline">
                Support <ArrowRight size={16} />
              </Link>
            </div>
            <div className="flex flex-col items-start gap-4 rounded-(--r-mx) bg-era-dark p-10 text-era-on-dark mob:p-7">
              <h2 className="text-[clamp(1.6rem,2.8vw,2.3rem)] leading-tight font-semibold">{b.endTitle}</h2>
              <p className="text-[17px] leading-[1.6] opacity-85">{b.endText}</p>
              <Link href="/#demo" className="mt-auto flex items-center gap-2 rounded-(--r-s1) bg-era-primary px-7 py-3.5 text-[17px] font-semibold text-era-on-dark no-underline transition hover:-translate-y-0.5 hover:brightness-110">
                {c.ctaDemo} <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <DraftBar current="b" />
    </div>
  );
}
