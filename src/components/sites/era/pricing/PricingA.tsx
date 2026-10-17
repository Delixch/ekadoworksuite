"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Check, Minus, Plus } from "lucide-react";
import { useLocale } from "@/i18n/useLocale";
import { landing, modOrder } from "@/i18n/landing";
import { PRICE, pricing, tierMods, tierOrder, type TierKey } from "@/i18n/pricing";
import { Footer } from "../Footer";
import { GlowGrid } from "../GlowGrid";
import { Navbar } from "../Navbar";
import { Spot } from "../Spot";
import { modIcon } from "../builder/ModuleBuilder";
import { DraftBar } from "../landing/DraftBar";
import { PeriodToggle, PriceTag, SampleNote } from "./PriceParts";

/**
 * Fiyat TASLAK A, "Paketler" (bexio / ERP çizgisi): 4 paket kartı, aylık/yıllık, "pakette neler var" karşılaştırması, SSS.
 * Fiyatlar src/i18n/pricing.ts → PRICE (ÖRNEK).
 */
export function PricingA() {
  const { locale } = useLocale();
  const p = pricing[locale];
  const mods = landing[locale].b.mods;
  const [yearly, setYearly] = useState(false);
  const [open, setOpen] = useState(false);

  const added = (k: TierKey, i: number) => (i === 0 ? tierMods[k] : tierMods[k].filter((m) => !tierMods[tierOrder[i - 1]].includes(m)));

  return (
    <div className="overflow-x-clip">
      <Navbar />
      <main>
        <section className="relative bg-[radial-gradient(60%_50%_at_50%_0%,var(--c-sky),transparent)] pt-[130px] pb-10 tab:pt-[100px]">
          <div className="mx-auto flex w-full max-w-[1000px] flex-col items-center gap-5 px-[15px] text-center">
            <span className="era-in-up flex w-fit items-center gap-2 rounded-full bg-era-secondary px-4 py-1.5 text-[13px] font-semibold tracking-[0.12em] text-era-primary-ink uppercase">
              <i className="block h-1.5 w-1.5 rounded-full bg-era-accent" /> {p.eyebrow}
            </span>
            <h1 className="era-in-up text-[clamp(2.6rem,5.6vw,4.6rem)] leading-[1.02] font-semibold tracking-[-0.035em] text-balance text-era-black">{p.heading}</h1>
            <p className="era-in-up max-w-[640px] text-[clamp(1.1rem,1.6vw,1.3rem)] leading-[1.6] text-era-gray">{p.lead}</p>
            <SampleNote />
            <div className="pt-3">
              <PeriodToggle yearly={yearly} setYearly={setYearly} />
            </div>
          </div>
        </section>

        {/* paket kartları */}
        <section className="pb-10">
          <div className="mx-auto w-full max-w-[1400px] px-[15px]">
            <GlowGrid className="grid grid-cols-4 items-stretch gap-6 pt-4 tab:grid-cols-2 mob:grid-cols-1">
              {tierOrder.map((k, i) => {
                const t = p.tiers[k];
                const star = k === "betrieb";
                const price = k === "individuell" ? null : PRICE.tiers[k];
                return (
                  <div key={k} data-glow className="relative z-[1] h-full">
                    {star && <span className="absolute -top-3.5 left-7 z-[2] rounded-full bg-era-accent px-3 py-1 text-[12px] font-medium tracking-wide text-era-on-dark uppercase">{p.recommended}</span>}
                    <Spot className={`relative flex h-full flex-col gap-5 rounded-(--r-x) p-7 ${star ? "ekado-feature bg-era-primary text-era-on-dark shadow-[0_26px_60px_var(--c-shadow)]" : "bg-era-white text-era-black ring-1 ring-era-lightgray"}`}>
                      <div className="relative z-[1] flex flex-col gap-2">
                        <span className="text-[26px] font-semibold tracking-[-0.02em]">{t.name}</span>
                        <span className={`min-h-[48px] text-[15px] leading-[1.5] ${star ? "opacity-85" : "text-era-gray"}`}>{t.text}</span>
                      </div>
                      <div className="relative z-[1]">
                        {price != null ? (
                          <PriceTag monthly={price} yearly={yearly} light={star} />
                        ) : (
                          <div className="flex h-[78px] items-center text-[clamp(1.8rem,3vw,2.4rem)] font-semibold tracking-[-0.02em]">{p.onRequest}</div>
                        )}
                      </div>
                      <span className={`relative z-[1] text-[16px] font-semibold ${star ? "" : "text-era-black"}`}>
                        {k === "individuell" ? `> ${PRICE.tierStaff.komplett} ${p.staff}` : `${p.upTo} ${PRICE.tierStaff[k]} ${p.staff}`}
                      </span>
                      <Link
                        href={k === "individuell" ? "/#bize-ulasin" : "/schnell-demo"}
                        className={`relative z-[1] flex h-12 items-center justify-center gap-2 rounded-(--r-s1) text-[16px] font-semibold no-underline transition hover:-translate-y-0.5 ${star ? "bg-era-white text-era-black" : "bg-era-btn text-era-on-btn"}`}
                      >
                        {k === "individuell" ? p.ctaTalk : p.ctaTry} <ArrowRight size={16} />
                      </Link>
                      <div className="relative z-[1] flex flex-col gap-2.5 border-t pt-5 text-[14px] leading-snug border-current/15">
                        <span className={`text-[13px] font-semibold ${star ? "opacity-80" : "text-era-gray"}`}>{i === 0 ? p.included : p.allFrom}</span>
                        {(k === "individuell" ? [] : added(k, i)).map((m) => {
                          const Icon = modIcon[m];
                          return (
                            <span key={m} className="flex items-center gap-2.5">
                              <Icon size={16} className={star ? "" : "text-era-primary-ink"} /> {mods[m]}
                            </span>
                          );
                        })}
                        {k === "individuell" &&
                          p.individualExtras.map((x) => (
                            <span key={x} className="flex items-center gap-2.5">
                              <Plus size={16} className="text-era-primary-ink" /> {x}
                            </span>
                          ))}
                      </div>
                    </Spot>
                  </div>
                );
              })}
            </GlowGrid>

            {/* her pakette */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 rounded-(--r-x) bg-era-secondary/60 px-6 py-4">
              <span className="text-[13px] font-medium tracking-[0.12em] text-era-gray uppercase">{p.extrasTitle}</span>
              {p.extras.map((x) => (
                <span key={x} className="flex items-center gap-2 text-[15px] font-semibold text-era-black">
                  <Check size={16} strokeWidth={3} className="text-era-primary" /> {x}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* karşılaştırma */}
        <section className="py-10">
          <div className="mx-auto w-full max-w-[1200px] px-[15px]">
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              className="mx-auto flex items-center gap-2 rounded-[8px] bg-era-white px-6 py-3 text-[16px] font-semibold text-era-black ring-1 ring-era-lightgray transition hover:ring-era-primary"
            >
              {p.compareTitle} {open ? <Minus size={18} /> : <Plus size={18} />}
            </button>
            {open && (
              <div className="era-in-up mt-6 overflow-x-auto rounded-(--r-x) bg-era-white ring-1 ring-era-lightgray" style={{ animationDuration: ".45s" }}>
                <table className="w-full min-w-[720px] border-collapse text-[15px]">
                  <thead>
                    <tr className="border-b border-era-lightgray">
                      <th className="px-5 py-4 text-left text-[13px] font-medium tracking-[0.1em] text-era-gray uppercase">{p.compareModules}</th>
                      {tierOrder.map((k) => (
                        <th key={k} className={`px-4 py-4 text-center text-[16px] font-semibold ${k === "betrieb" ? "text-era-primary-ink" : "text-era-black"}`}>
                          {p.tiers[k].name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {modOrder.map((m) => {
                      const Icon = modIcon[m];
                      return (
                        <tr key={m} className="border-b border-era-line last:border-0">
                          <td className="flex items-center gap-2.5 px-5 py-3 text-era-black">
                            <Icon size={16} className="text-era-primary-ink" /> {mods[m]}
                          </td>
                          {tierOrder.map((k) => (
                            <td key={k} className={`px-4 py-3 text-center ${k === "betrieb" ? "bg-era-coolblue/40" : ""}`}>
                              {tierMods[k].includes(m) ? <Check size={18} strokeWidth={3} className="mx-auto text-era-primary" /> : <Minus size={16} className="mx-auto text-era-cute" />}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>

        {/* SSS */}
        <section className="py-16 pb-28">
          <div className="mx-auto w-full max-w-[900px] px-[15px]">
            <h2 className="mb-8 text-[clamp(1.9rem,3.4vw,2.8rem)] leading-[1.08] font-semibold tracking-[-0.025em] text-era-black">{p.faqTitle}</h2>
            <div className="flex flex-col divide-y divide-era-lightgray rounded-(--r-x) bg-era-white ring-1 ring-era-lightgray">
              {p.faq.map(([q, a]) => (
                <details key={q} className="group/f px-6 py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[18px] font-semibold text-era-black [&::-webkit-details-marker]:hidden">
                    {q}
                    <Plus size={20} className="flex-none text-era-primary transition-transform group-open/f:rotate-45" />
                  </summary>
                  <p className="mt-3 text-[16px] leading-[1.6] text-era-gray">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <DraftBar current="a" base="preise" />
    </div>
  );
}
