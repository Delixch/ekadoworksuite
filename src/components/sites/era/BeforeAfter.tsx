"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { CalendarClock, FileText, Thermometer, Wallet, type LucideIcon } from "lucide-react";
import { useLocale } from "@/i18n/useLocale";
import { landing } from "@/i18n/landing";
import { Reveal } from "./ui";

/** Remotion sahnesi: sadece tarayıcıda yüklenir */
const BeforeAfterPlayer = dynamic(() => import("./beforeafter/BeforeAfterPlayer"), { ssr: false });

const icons: LucideIcon[] = [Thermometer, CalendarClock, Wallet, FileText];

/**
 * "Bugün nasıl, Ekado ile nasıl" (Destek sayfasında). Metin: src/i18n/landing.ts (a.before, a.beforeTopics).
 * Adnan 2026-10-15: "yardım yeri gibi olmuş, farklı olsun" → koyu sahne, solda konular, sağda Remotion ile canlanan dönüşüm
 * (kâğıt not çizilir, Ekado kartı gelir). Konular sırayla döner; tıklanan konuya atlar. Metin ekran okuyucu için listede de var.
 */
export function BeforeAfter() {
  const { locale } = useLocale();
  const a = landing[locale].a;
  const [active, setActive] = useState(0);
  const [prog, setProg] = useState(0);
  const [pick, setPick] = useState({ i: 0, n: 0 });

  return (
    <section className="relative overflow-hidden bg-era-dark py-24 text-era-on-dark tab:py-16">
      <div aria-hidden className="pointer-events-none absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full bg-era-primary/30 blur-[120px]" />
      <div className="relative mx-auto grid w-full max-w-[1300px] grid-cols-[minmax(0,.7fr)_minmax(0,1.3fr)] items-center gap-12 px-[15px] tab:grid-cols-1 tab:gap-8">
        <div className="flex flex-col gap-7">
          <h2 className="text-[clamp(2rem,3.6vw,3rem)] leading-[1.08] font-semibold tracking-[-0.025em] text-balance">{a.beforeTitle}</h2>
          <ul className="flex flex-col gap-2.5 tab:grid tab:grid-cols-2 mob:grid-cols-1">
            {a.beforeTopics.map((topic, i) => {
              const Icon = icons[i];
              const on = active === i;
              return (
                <li key={topic}>
                  <button
                    type="button"
                    onClick={() => setPick((p) => ({ i, n: p.n + 1 }))}
                    aria-pressed={on}
                    className={`relative flex w-full items-center gap-3 overflow-hidden rounded-[8px] px-4 py-3.5 text-left text-[16px] font-semibold ring-1 transition-colors duration-300 ${on ? "bg-era-on-dark/12 text-era-on-dark ring-era-on-dark/35" : "text-era-on-dark/60 ring-era-on-dark/12 hover:text-era-on-dark/90"}`}
                  >
                    <Icon size={19} strokeWidth={1.8} className="flex-none" />
                    {topic}
                    {/* bu konunun sahnedeki ilerlemesi */}
                    <span aria-hidden className="absolute bottom-0 left-0 h-[3px] bg-era-accent" style={{ width: on ? `${prog * 100}%` : "0%" }} />
                  </button>
                </li>
              );
            })}
          </ul>
          {/* ekran okuyucu ve arama motoru için düz metin */}
          <ul className="sr-only">
            {a.before.map(([was, now]) => (
              <li key={was}>
                {a.beforeLabel}: {was} {a.afterLabel}: {now}
              </li>
            ))}
          </ul>
        </div>
        <Reveal variant="up">
          <div className="relative aspect-[1000/620] w-full overflow-hidden rounded-(--r-x) bg-[radial-gradient(80%_70%_at_50%_40%,color-mix(in_oklab,var(--c-primary)_22%,transparent),transparent)] ring-1 ring-era-on-dark/10">
            <BeforeAfterPlayer
              items={a.before}
              before={a.beforeLabel}
              after={a.afterLabel}
              pick={pick}
              onActive={(i, p) => {
                setActive(i);
                setProg(p);
              }}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
