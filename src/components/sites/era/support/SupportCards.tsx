"use client";

import { useRef, useState } from "react";
import { ArrowRight, CalendarRange, Check, Lightbulb, ListOrdered, Mail, MapPin, MessageCircleQuestion, Plus, Users, Wrench, type LucideIcon } from "lucide-react";
import { useLocale } from "@/i18n/useLocale";
import { support } from "@/i18n/support";
import { officeText } from "@/i18n/offices";
import { GlowGrid } from "../GlowGrid";

type Key = "setup" | "onsite" | "roadmap" | "flow" | "faq" | "contact";
const icons: Record<Key, LucideIcon> = { setup: ListOrdered, onsite: MapPin, roadmap: CalendarRange, flow: Lightbulb, faq: MessageCircleQuestion, contact: Mail };
const onsiteIcons = [Wrench, Users, Check];

/**
 * Destek sayfası "Kartei" (Adnan 2026-10-15, öneri C): eskiden ayrı bölümler olan kurulum, yerinde, ilk 3 ay, fikirden modüle,
 * sık sorulanlar ve iletişim tek kart ızgarasında. Kartın yüzünde başlık + tek cümle; tıklanan kartın ayrıntısı ızgaranın altında açılır.
 * Metinler değişmedi: src/i18n/support.ts, tr/de/en.ts (journey.steps, faq), offices.ts.
 */
export function SupportCards() {
  const { locale, t } = useLocale();
  const s = support[locale];
  const j = t.journey;
  const f = t.faq;
  const [open, setOpen] = useState<Key>("setup");
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const detail = useRef<HTMLDivElement>(null);

  const cards: { key: Key; title: string; teaser: string }[] = [
    { key: "setup", title: j.setupEyebrow, teaser: j.setupTitle },
    { key: "onsite", title: s.onsiteEyebrow, teaser: s.onsiteHeading },
    { key: "roadmap", title: s.roadmapEyebrow, teaser: s.roadmapHeading },
    { key: "flow", title: s.flowEyebrow, teaser: s.flowHeading },
    { key: "faq", title: f.eyebrow, teaser: f.heading },
    { key: "contact", title: officeText[locale].eyebrow, teaser: s.ctaHeading },
  ];

  const pick = (k: Key) => {
    setOpen(k);
    // telefonda ayrıntı ızgaranın altında kalır: oraya kaydır
    if (window.innerWidth < 992) setTimeout(() => detail.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
  };

  return (
    <section className="relative py-[70px] tab:py-[50px] mob:py-10">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8 px-[15px]">
        <GlowGrid as="ul" className="grid grid-cols-3 gap-5 tab:grid-cols-2 mob:grid-cols-1">
          {cards.map((c) => {
            const Icon = icons[c.key];
            const on = open === c.key;
            return (
              <li key={c.key} data-glow className="relative z-[1]">
                <button
                  type="button"
                  onClick={() => pick(c.key)}
                  aria-expanded={on}
                  aria-controls="destek-ayrinti"
                  className={`flex h-full w-full flex-col items-start gap-4 rounded-(--r-x) p-6 text-left ring-1 transition-all duration-300 ${on ? "bg-era-primary text-era-on-dark ring-era-primary shadow-[0_18px_44px_var(--c-shadow)]" : "bg-era-white text-era-black ring-era-lightgray hover:-translate-y-0.5 hover:ring-era-primary/50"}`}
                >
                  <span className="flex w-full items-center justify-between">
                    <span className={`flex h-11 w-11 items-center justify-center rounded-[10px] transition-colors ${on ? "bg-era-on-dark/15" : "bg-era-secondary text-era-primary-ink"}`}>
                      <Icon size={20} strokeWidth={1.8} />
                    </span>
                    <Plus size={18} className={`transition-transform duration-300 ${on ? "rotate-45" : "text-era-gray"}`} />
                  </span>
                  <span className={`text-[12.5px] font-medium tracking-[0.12em] uppercase ${on ? "text-era-on-dark/75" : "text-era-gray"}`}>{c.title}</span>
                  <span className="text-[19px] leading-snug font-medium">{c.teaser}</span>
                </button>
              </li>
            );
          })}
        </GlowGrid>

        {/* açılan kartın ayrıntısı */}
        <div id="destek-ayrinti" ref={detail} className="scroll-mt-[90px]">
          <div key={open} className="era-in-up rounded-(--r-x) bg-era-white p-8 shadow-[0_20px_56px_var(--c-shadow-soft)] ring-1 ring-era-lightgray mob:p-5">
            {open === "setup" && (
              <div className="flex flex-col gap-6">
                <p className="max-w-[640px] text-[17px] leading-[1.6] text-era-gray">{j.setupLead}</p>
                <ol className="grid grid-cols-3 gap-6 tab:grid-cols-1">
                  {j.steps.map((st, i) => (
                    <li key={st.title} className="flex gap-4">
                      <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-era-secondary text-[18px] font-medium text-era-primary-ink ring-1 ring-era-line">{i + 1}</span>
                      <div>
                        <h4 className="text-[17px] leading-snug font-medium text-era-black">{st.title}</h4>
                        <p className="mt-1 text-[15px] leading-[1.55] text-era-gray">{st.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {open === "onsite" && (
              <div className="flex flex-col gap-6">
                <p className="max-w-[640px] text-[17px] leading-[1.6] text-era-gray">{s.onsiteText}</p>
                <ul className="grid grid-cols-3 gap-5 tab:grid-cols-1">
                  {s.onsiteItems.map((it, i) => {
                    const Icon = onsiteIcons[i];
                    return (
                      <li key={it.title} className="flex items-start gap-4">
                        <span className="flex h-11 w-11 flex-none items-center justify-center rounded-[10px] bg-era-coolblue text-era-primary-ink">
                          <Icon size={20} strokeWidth={1.9} />
                        </span>
                        <div>
                          <h4 className="text-[17px] font-medium text-era-black">{it.title}</h4>
                          <p className="mt-1 text-[15px] leading-[1.55] text-era-gray">{it.text}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {open === "roadmap" && (
              <ol className="grid grid-cols-3 gap-6 tab:grid-cols-1">
                {s.roadmap.map((r) => (
                  <li key={r.when} className="flex flex-col gap-4">
                    <span className="w-fit rounded-[8px] bg-era-primary px-4 py-1.5 text-[14px] font-medium text-era-on-dark">{r.when}</span>
                    <h4 className="text-[18px] leading-tight font-medium text-era-black">{r.title}</h4>
                    <ul className="flex flex-col gap-2.5">
                      {r.items.map((it) => (
                        <li key={it} className="flex items-start gap-3 text-[15.5px] leading-snug text-era-gray">
                          <Check size={15} strokeWidth={2.6} className="mt-0.5 flex-none text-era-primary-ink" />
                          {it}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            )}

            {open === "flow" && (
              <div className="flex flex-col gap-6">
                <p className="max-w-[720px] text-[17px] leading-[1.6] text-era-gray">{s.flowText}</p>
                <ol className="grid grid-cols-4 gap-3 tab:grid-cols-2 mob:grid-cols-1">
                  {s.flowSteps.map((fs, i) => (
                    <li key={fs} className="relative flex items-center gap-3 rounded-[10px] bg-era-secondary px-4 py-3.5 text-[15.5px] font-medium text-era-black">
                      <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-era-white text-[14px] text-era-primary-ink">{i + 1}</span>
                      {fs}
                      {i < s.flowSteps.length - 1 && <ArrowRight aria-hidden size={16} className="absolute top-1/2 -right-[14px] z-[1] -translate-y-1/2 text-era-primary-ink tab:hidden" />}
                    </li>
                  ))}
                </ol>
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="text-[12.5px] font-medium tracking-[0.12em] text-era-gray uppercase">{s.flowExamplesLabel}</span>
                  {s.flowExamples.map((e) => (
                    <span key={e} className="rounded-[8px] border border-dashed border-era-cute px-3.5 py-1.5 text-[14.5px] text-era-black">
                      {e}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {open === "faq" && (
              <ul className="flex flex-col divide-y divide-era-lightgray">
                {f.items.map((it, i) => {
                  const o = faqOpen === i;
                  return (
                    <li key={it.q}>
                      <button type="button" onClick={() => setFaqOpen(o ? null : i)} aria-expanded={o} className="flex w-full items-center justify-between gap-4 py-4 text-left text-[17px] font-medium text-era-black">
                        {it.q}
                        <Plus size={18} className={`flex-none text-era-primary-ink transition-transform duration-300 ${o ? "rotate-45" : ""}`} />
                      </button>
                      {o && <p className="era-in-up pb-5 text-[15.5px] leading-[1.6] text-era-gray">{it.a}</p>}
                    </li>
                  );
                })}
              </ul>
            )}

            {open === "contact" && (
              <div className="flex flex-col items-start gap-5">
                <p className="max-w-[640px] text-[17px] leading-[1.6] text-era-gray">{s.ctaText}</p>
                <div className="flex flex-wrap gap-3">
                  <a href="mailto:info@ekado.ch?subject=Support" className="flex h-12 items-center gap-2 rounded-(--r-s1) bg-era-primary px-6 text-[16px] font-medium text-era-on-dark no-underline transition hover:-translate-y-0.5 hover:brightness-110">
                    <Mail size={18} /> {s.ctaPrimary}
                  </a>
                  <a href="#hizli-demo" className="flex h-12 items-center gap-2 rounded-(--r-s1) border-2 border-era-black px-6 text-[16px] font-medium text-era-black no-underline transition hover:-translate-y-0.5 hover:bg-era-secondary">
                    {s.ctaSecondary} <ArrowRight size={18} />
                  </a>
                </div>
                <span className="text-[14px] text-era-gray">info@ekado.ch</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
