"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Check } from "lucide-react";
import { useLocale, type Locale } from "@/i18n/useLocale";
import { prices } from "@/lib/prices";
import { Spot } from "./Spot";
import { Heading, Reveal, type Variant } from "./ui";

const variants: Variant[] = ["left", "up", "right"];
const FEATURED = 1;

const tags: Record<Locale, string> = { tr: "tr-TR", en: "en-GB", de: "de-DE" };

function money(n: number, locale: Locale) {
  const v = new Intl.NumberFormat(tags[locale], { maximumFractionDigits: 0 }).format(n);
  return locale === "en" ? `€${v}` : `${v} €`;
}

function offLabel(n: number, off: string, locale: Locale) {
  if (locale === "tr") return `%${n} ${off}`;
  if (locale === "de") return `${n} % ${off}`;
  return `${n}% ${off}`;
}

/** Fiyat değişince rakamlar akarak yeni değere gider */
function Money({ value, locale }: { value: number; locale: Locale }) {
  const [shown, setShown] = useState(value);
  const from = useRef(value);
  useEffect(() => {
    const dur = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 1 : 650;
    const start = performance.now();
    const a = from.current;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const v = a + (value - a) * (1 - Math.pow(1 - p, 3));
      from.current = v;
      setShown(v);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return <>{money(Math.round(shown), locale)}</>;
}

export function Pricing() {
  const { t, locale } = useLocale();
  const p = t.pricing;
  const [yearly, setYearly] = useState(false);

  return (
    <section id="paketler" className="relative py-[70px] tab:py-[50px] mob:py-10 sm2:py-[35px]">
      <div className="mx-auto w-full max-w-[1470px] px-[15px]">
        <div className="flex flex-col gap-12 mob:gap-9">
          <div className="mx-auto flex w-full max-w-[760px] flex-col items-center gap-4 text-center">
            <span className="flex items-center gap-2 rounded-full bg-era-secondary px-4 py-1.5 text-[13px] font-semibold tracking-[0.12em] text-era-primary-ink uppercase">
              <i className="block h-1.5 w-1.5 rounded-full bg-era-accent" /> {p.eyebrow}
            </span>
            <Heading>{p.heading}</Heading>
            <Reveal variant="fade">
              <p className="text-era-gray">{p.lead}</p>
            </Reveal>

            {/* aylık / yıllık seçici */}
            <Reveal variant="up" className="mt-2 flex flex-wrap items-center justify-center gap-3">
              <div role="tablist" className="relative grid grid-cols-2 rounded-full bg-era-secondary p-1 ring-1 ring-era-line">
                <span
                  aria-hidden
                  className="absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] rounded-full bg-era-primary shadow-[0_6px_16px_var(--c-shadow)] transition-transform duration-500 ease-out"
                  style={{ transform: yearly ? "translateX(100%)" : "translateX(0)" }}
                />
                {[
                  [false, p.monthly],
                  [true, p.yearly],
                ].map(([val, label]) => (
                  <button
                    key={String(label)}
                    type="button"
                    role="tab"
                    aria-selected={yearly === val}
                    onClick={() => setYearly(val as boolean)}
                    className={`relative z-[1] rounded-full px-7 py-2.5 text-[15px] font-semibold transition-colors duration-300 ${
                      yearly === val ? "text-era-on-dark" : "text-era-gray"
                    }`}
                  >
                    {label as string}
                  </button>
                ))}
              </div>
              <span
                className={`rounded-full bg-era-secondary px-3 py-1.5 text-[13px] font-semibold text-era-success ring-1 ring-era-line transition-transform duration-500 ${
                  yearly ? "scale-110" : "scale-100"
                }`}
              >
                {p.save}
              </span>
            </Reveal>
          </div>

          <div className="mx-auto grid w-full max-w-[1200px] grid-cols-3 items-stretch gap-6 tab:max-w-[520px] tab:grid-cols-1 tab:gap-8">
            {p.plans.map((plan, i) => {
              const featured = i === FEATURED;
              const pr = prices[i];
              return (
                <Reveal
                  key={plan.name}
                  variant={variants[i]}
                  delay={i * 120}
                  className={`relative h-full ${featured ? "min-[992px]:-my-4" : ""}`}
                >
                  {/* kenar kareleri: solda yukarıdan aşağı, sağda aşağıdan yukarı; sırayla karttan karta geçer */}
                  <span aria-hidden className="edge-track edge-track-l" style={{ "--edge-delay": `${i * 4}s` } as CSSProperties}>
                    <i className="edge-sq edge-sq-down" />
                  </span>
                  <span aria-hidden className="edge-track edge-track-r" style={{ "--edge-delay": `${i * 4}s` } as CSSProperties}>
                    <i className="edge-sq edge-sq-up" />
                  </span>
                  <Spot
                    className={`relative flex h-full flex-col gap-6 rounded-(--r-x) px-8 py-9 mob:px-6 ${
                      featured ? "punn-feature text-era-on-dark" : "punn-panel"
                    }`}
                  >
                    {featured && (
                      <div className="absolute inset-x-8 -top-[11px] z-[2] flex h-[22px] items-center">
                        <span className="h-px flex-1 bg-gradient-to-r from-transparent to-era-accent" />
                        <span className="bg-[var(--c-page)] px-3 text-[12px] leading-[22px] font-bold tracking-[0.12em] whitespace-nowrap text-era-primary-ink uppercase">{p.popular}</span>
                        <span className="h-px flex-1 bg-gradient-to-l from-transparent to-era-accent" />
                      </div>
                    )}

                    <div className="relative z-[1] flex flex-col gap-1.5">
                      <h3 className="text-[26px] leading-tight font-extrabold tracking-[-0.02em]">{plan.name}</h3>
                      <p className={`text-[15px] ${featured ? "text-era-on-dark/75" : "text-era-gray"}`}>{plan.sub}</p>
                    </div>

                    <div className="relative z-[1] flex flex-col gap-2">
                      <div className="flex items-end gap-2">
                        <span className="text-[54px] leading-none font-extrabold tracking-[-0.03em] tabular-nums">
                          <Money value={yearly ? pr.y : pr.m} locale={locale} />
                        </span>
                        <span className={`pb-1.5 text-[16px] ${featured ? "text-era-on-dark/75" : "text-era-gray"}`}>
                          {yearly ? p.perYear : p.perMonth}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setYearly((v) => !v)}
                        className={`w-fit text-left text-[14px] font-medium underline decoration-dotted underline-offset-4 ${
                          featured ? "text-era-on-dark/85" : "text-era-primary-ink"
                        }`}
                      >
                        {yearly
                          ? `${p.monthlyHint}: ${money(pr.m, locale)} ${p.perMonth}`
                          : `${p.yearlyHint}: ${money(pr.y, locale)} (${offLabel(pr.off, p.off, locale)})`}
                      </button>
                    </div>

                    <a
                      href="#demo"
                      className={`relative z-[1] flex h-14 items-center justify-center rounded-(--r-s1) text-[17px] font-semibold no-underline transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 ${
                        featured ? "bg-era-on-dark text-era-dark" : "bg-era-primary text-era-on-dark"
                      }`}
                    >
                      {p.cta}
                    </a>

                    <ul className="relative z-[1] flex flex-col gap-3">
                      {plan.features.map((f) => (
                        <li key={f} className="flex gap-3 text-[15px] leading-[1.45]">
                          <span
                            className={`mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full ${
                              featured ? "bg-era-on-dark/15 text-era-on-dark" : "bg-era-secondary text-era-success"
                            }`}
                          >
                            <Check size={12} strokeWidth={3} />
                          </span>
                          <span className={featured ? "" : "text-era-black"}>{f}</span>
                        </li>
                      ))}
                    </ul>

                    {plan.note && (
                      <p
                        className={`relative z-[1] mt-auto rounded-(--r-s1) px-4 py-3 text-[14px] leading-[1.45] ${
                          featured ? "bg-era-on-dark/12 text-era-on-dark" : "bg-era-secondary text-era-gray"
                        }`}
                      >
                        {plan.note}
                      </p>
                    )}
                  </Spot>
                </Reveal>
              );
            })}
          </div>

          <Reveal variant="fade">
            <p className="text-center text-[14px] text-era-gray">{p.vat}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
