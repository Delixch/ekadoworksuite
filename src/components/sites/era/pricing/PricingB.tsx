"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Check, Plus } from "lucide-react";
import { useLocale } from "@/i18n/useLocale";
import { landing, modOrder, packOrder, packages, type ModKey, type PackKey } from "@/i18n/landing";
import { PRICE, modGroups, modRequires, pricing } from "@/i18n/pricing";
import { Footer } from "../Footer";
import { GlowGrid } from "../GlowGrid";
import { Navbar } from "../Navbar";
import { modIcon } from "../builder/ModuleBuilder";
import { DraftBar } from "../landing/DraftBar";
import { chf, PeriodToggle, SampleNote, yearlyMonthly } from "./PriceParts";

/** Temel pakette hep açık olan bölümler (fiyatı 0) */
const baseMods = modOrder.filter((m) => PRICE.mod[m] === 0);
const extraMods = modOrder.filter((m) => PRICE.mod[m] > 0 && !PRICE.onRequest.includes(m));

/** Seçince: ortakları da (programdaki gibi, rekursiv) */
function withRequires(set: Set<ModKey>, m: ModKey) {
  if (set.has(m)) return;
  set.add(m);
  (modRequires[m] ?? []).forEach((r) => withRequires(set, r));
}
/** Kaldırınca: ona bağlı olanları da (rekursiv) */
function withoutDependents(set: Set<ModKey>, m: ModKey) {
  set.delete(m);
  modOrder.filter((x) => set.has(x) && (modRequires[x] ?? []).includes(m)).forEach((x) => withoutDependents(set, x));
}

/**
 * Fiyat TASLAK B, "Kendin hesapla" (Odoo uygulama ızgarası + hesaplayıcı): temel paket + seçilen bölümler + çalışan sayısı,
 * aylık/yıllık; sektör seçince programdaki paket dolar. Fiyatlar src/i18n/pricing.ts → PRICE (ÖRNEK).
 */
export function PricingB() {
  const { locale } = useLocale();
  const p = pricing[locale];
  const lb = landing[locale].b;
  const [yearly, setYearly] = useState(false);
  const [staff, setStaff] = useState(8);
  const [pack, setPack] = useState<PackKey | null>("restaurant");
  const [on, setOn] = useState<Set<ModKey>>(() => new Set(packages.restaurant));

  const choose = (k: PackKey) => {
    setPack(k);
    setOn(new Set(packages[k]));
  };
  const toggle = (m: ModKey) => {
    setPack(null);
    setOn((prev) => {
      const n = new Set(prev);
      if (n.has(m)) withoutDependents(n, m);
      else withRequires(n, m);
      baseMods.forEach((b) => n.add(b));
      return n;
    });
  };

  const modsSum = extraMods.reduce((s, m) => s + (on.has(m) ? PRICE.mod[m] : 0), 0);
  const staffSum = Math.max(0, staff - PRICE.baseStaff) * PRICE.perStaff;
  const monthly = PRICE.base + modsSum + staffSum;
  const shown = yearly ? yearlyMonthly(monthly) : monthly;

  return (
    <div className="overflow-x-clip">
      <Navbar />
      <main>
        <section className="relative bg-[radial-gradient(60%_50%_at_20%_0%,var(--c-sky),transparent)] pt-[130px] pb-10 tab:pt-[100px]">
          <div className="mx-auto flex w-full max-w-[1300px] flex-col items-start gap-5 px-[15px]">
            <span className="era-in-up flex w-fit items-center gap-2 rounded-full bg-era-secondary px-4 py-1.5 text-[13px] font-semibold tracking-[0.12em] text-era-primary-ink uppercase">
              <i className="block h-1.5 w-1.5 rounded-full bg-era-accent" /> {p.eyebrow}
            </span>
            <h1 className="era-in-up text-[clamp(2.6rem,5.6vw,4.6rem)] leading-[1.02] font-semibold tracking-[-0.035em] text-balance text-era-black">{p.calcTitle}</h1>
            <p className="era-in-up max-w-[700px] text-[clamp(1.1rem,1.6vw,1.3rem)] leading-[1.6] text-era-gray">{p.calcLead}</p>
            <SampleNote />
          </div>
        </section>

        <section className="pb-24">
          <div className="mx-auto grid w-full max-w-[1300px] grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] items-start gap-10 px-[15px] tab:grid-cols-1">
            {/* sol: seçim */}
            <div className="flex flex-col gap-8">
              {/* sektör */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="mr-1 text-[12px] font-medium tracking-[0.12em] text-era-gray uppercase">{lb.packLabel}</span>
                {packOrder.map((k) => (
                  <button key={k} type="button" onClick={() => choose(k)} className={`rounded-[8px] px-3.5 py-1.5 text-[14px] font-semibold transition ${pack === k ? "bg-era-primary text-era-on-dark" : "bg-era-secondary text-era-black hover:bg-era-coolblue"}`}>
                    {lb.packs[k]}
                  </button>
                ))}
              </div>

              {/* temel paket */}
              <div className="flex flex-col gap-3 rounded-(--r-x) bg-era-coolblue/50 p-6 ring-1 ring-era-primary/20">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-[20px] font-semibold text-era-black">{p.baseLabel}</span>
                  <span className="text-[18px] font-semibold text-era-primary-ink tabular-nums">
                    CHF {chf(PRICE.base)} <span className="text-[14px] font-medium text-era-gray">{p.perMonth}</span>
                  </span>
                </div>
                <span className="text-[15px] text-era-gray">
                  {p.baseText} · {p.upTo} {PRICE.baseStaff} {p.staff}
                </span>
                <div className="flex flex-wrap gap-2">
                  {baseMods.map((m) => {
                    const Icon = modIcon[m];
                    return (
                      <span key={m} className="flex items-center gap-2 rounded-full bg-era-white px-3 py-1.5 text-[13px] font-semibold text-era-black">
                        <Icon size={14} className="text-era-primary-ink" /> {lb.mods[m]}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* bölümler, gruplu */}
              <div className="flex flex-col gap-6">
                <span className="text-[13px] font-medium tracking-[0.12em] text-era-gray uppercase">{p.modsLabel}</span>
                {modGroups.map((g) => (
                  <div key={g.key} className="flex flex-col gap-3">
                    <span className="text-[16px] font-semibold text-era-black">{p.groups[g.key]}</span>
                    <GlowGrid as="ul" className="grid grid-cols-2 gap-3 mob:grid-cols-1" pad={6} radius={24}>
                      {g.mods.filter((m) => extraMods.includes(m)).map((m) => {
                        const Icon = modIcon[m];
                        const lit = on.has(m);
                        const needs = (modRequires[m] ?? []).filter((r) => extraMods.includes(r));
                        return (
                          <li key={m} data-glow className="relative z-[1]">
                            <button
                              type="button"
                              onClick={() => toggle(m)}
                              aria-pressed={lit}
                              className={`flex w-full items-center gap-3 rounded-(--r-s) p-4 text-left transition-all duration-300 ${lit ? "bg-era-white ring-2 ring-era-primary shadow-[0_10px_24px_var(--c-shadow-soft)]" : "bg-era-white/60 ring-1 ring-era-lightgray"}`}
                            >
                              <span className={`flex h-10 w-10 flex-none items-center justify-center rounded-full transition-colors ${lit ? "bg-era-primary text-era-on-dark" : "bg-era-secondary text-era-matte"}`}>
                                <Icon size={18} />
                              </span>
                              <span className="flex min-w-0 flex-1 flex-col">
                                <span className={`text-[15px] font-semibold ${lit ? "text-era-black" : "text-era-gray"}`}>{lb.mods[m]}</span>
                                {needs.length > 0 && (
                                  <span className="text-[12px] text-era-gray">
                                    {p.needs.replace("{mods}", needs.map((r) => lb.mods[r]).join(", "))}
                                  </span>
                                )}
                              </span>
                              <span className="text-[14px] font-semibold text-era-gray tabular-nums">+{chf(PRICE.mod[m])}</span>
                              <span className={`flex h-6 w-6 flex-none items-center justify-center rounded-full transition ${lit ? "bg-era-primary text-era-on-dark" : "ring-1 ring-era-cute text-transparent"}`}>
                                <Check size={14} strokeWidth={3} />
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </GlowGrid>
                  </div>
                ))}
                <span className="text-[14px] text-era-gray">{p.onRequestNote}</span>
              </div>

              {/* çalışan sayısı */}
              <div className="flex flex-col gap-3 rounded-(--r-x) bg-era-white p-6 ring-1 ring-era-lightgray">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-[18px] font-semibold text-era-black">{p.staffLabel}</span>
                  <span className="text-[32px] leading-none font-light text-era-primary tabular-nums">{staff}</span>
                </div>
                <input type="range" min={1} max={60} value={staff} onChange={(e) => setStaff(Number(e.target.value))} className="w-full accent-[var(--c-primary)]" aria-label={p.staffLabel} />
                <span className="text-[14px] text-era-gray">
                  {PRICE.baseStaff} {p.staff} {p.included0}; +CHF {chf(PRICE.perStaff)} {p.perMonth}
                </span>
              </div>
            </div>

            {/* sağ: toplam (sabit) */}
            <aside className="sticky top-[100px] flex flex-col gap-5 rounded-(--r-mx) bg-era-primary p-8 text-era-on-dark shadow-[0_26px_60px_var(--c-shadow)] tab:static">
              <PeriodToggle yearly={yearly} setYearly={setYearly} />
              <span className="text-[14px] font-medium tracking-[0.12em] uppercase opacity-80">{p.totalLabel}</span>
              <div className="flex items-baseline gap-2">
                <span className="text-[16px] font-semibold opacity-80">CHF</span>
                <span key={shown} className="era-in-up text-[clamp(3.4rem,5vw,4.6rem)] leading-none font-semibold tracking-[-0.03em] tabular-nums" style={{ animationDuration: ".35s" }}>
                  {chf(shown)}
                </span>
                <span className="text-[16px] opacity-80">{p.perMonth}</span>
              </div>
              <span className="-mt-3 h-5 text-[13px] opacity-75">{yearly ? `${p.billedYearly} · ${p.yearlyGift}` : ""}</span>
              <ul className="flex flex-col gap-1.5 border-t border-era-on-dark/20 pt-4 text-[14px]">
                <li className="flex justify-between gap-4">
                  <span>{p.baseLabel}</span>
                  <span className="tabular-nums">{chf(PRICE.base)}</span>
                </li>
                {extraMods
                  .filter((m) => on.has(m))
                  .map((m) => (
                    <li key={m} className="flex justify-between gap-4 opacity-90">
                      <span className="flex items-center gap-1.5">
                        <Plus size={12} /> {lb.mods[m]}
                      </span>
                      <span className="tabular-nums">{chf(PRICE.mod[m])}</span>
                    </li>
                  ))}
                {staffSum > 0 && (
                  <li className="flex justify-between gap-4 opacity-90">
                    <span className="flex items-center gap-1.5">
                      <Plus size={12} /> {staff - PRICE.baseStaff} {p.staff}
                    </span>
                    <span className="tabular-nums">{chf(staffSum)}</span>
                  </li>
                )}
              </ul>
              <span className="text-[14px] opacity-85">{p.totalNote}</span>
              <Link href="/schnell-demo" className="flex h-12 items-center justify-center gap-2 rounded-(--r-s1) bg-era-white text-[16px] font-semibold text-era-black no-underline transition hover:-translate-y-0.5">
                {p.ctaTry} <ArrowRight size={16} />
              </Link>
            </aside>
          </div>
        </section>

        {/* SSS */}
        <section className="pb-28">
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
      <DraftBar current="b" base="preise" />
    </div>
  );
}
