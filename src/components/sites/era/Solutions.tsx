"use client";

import type { ReactNode } from "react";
import { ArrowRight, Lock, LockOpen } from "lucide-react";
import { useLocale } from "@/i18n/useLocale";
import { Spot } from "./Spot";
import { Heading, Reveal } from "./ui";

/** Kart başına bağlantı: ilk kart özellikler bölümüne, diğerleri ileride açılacak sayfalara gider */
const ids = [undefined, "telefon-asistani", "pms", "akilli-kapi"];
const hrefs = ["#dijital-resepsiyon", "#bize-ulasin", "#bize-ulasin", "#bize-ulasin"];

/* ---- mini canlı görseller ---- */
function ChatViz() {
  return (
    <div className="flex w-full flex-col gap-2 px-5">
      <span className="h-5 w-28 rounded-xl rounded-tl-sm bg-era-on-dark/15" />
      <span className="era-dot flex h-5 w-fit items-center gap-1 self-end rounded-xl rounded-tr-sm bg-era-primary px-3 text-era-on-dark">
        <i />
        <i style={{ animationDelay: "0.15s" }} />
        <i style={{ animationDelay: "0.3s" }} />
      </span>
    </div>
  );
}

function WaveViz() {
  return (
    <div className="era-wave flex h-10 items-center gap-[3px] text-era-on-dark/80" aria-hidden>
      {Array.from({ length: 30 }).map((_, k) => (
        <i
          key={k}
          style={{
            animationDuration: `${0.7 + ((k * 37) % 7) / 10}s`,
            animationDelay: `-${((k * 53) % 10) / 10}s`,
            opacity: 0.5 + ((k * 29) % 10) / 20,
          }}
        />
      ))}
    </div>
  );
}

function RoomsViz() {
  return (
    <div className="grid grid-cols-6 gap-1.5" aria-hidden>
      {Array.from({ length: 12 }).map((_, k) => (
        <i key={k} className="era-room block h-3.5 w-3.5 rounded-[4px]" style={{ animationDelay: `-${(k * 0.43) % 5}s` }} />
      ))}
    </div>
  );
}

function LockViz() {
  return (
    <div className="relative flex h-12 w-12 items-center justify-center text-era-on-dark" aria-hidden>
      <span className="era-ring absolute inset-0 rounded-full border-2 border-era-on-dark/40" />
      <Lock className="era-lock-a absolute" size={26} strokeWidth={1.8} />
      <LockOpen className="era-lock-b absolute" size={26} strokeWidth={1.8} />
    </div>
  );
}

const visuals: ReactNode[] = [<ChatViz key="c" />, <WaveViz key="w" />, <RoomsViz key="r" />, <LockViz key="l" />];

/** Çözümlerimiz (menü ağacındaki 4 çözüm). Bölüm iki temada da koyu kalır. */
export function Solutions() {
  const { t } = useLocale();
  const s = t.solutions;

  return (
    <section id="cozumler" className="relative bg-era-dark py-[100px] text-era-on-dark tab:py-[60px] mob:py-12 sm2:py-10">
      <div className="mx-auto w-full max-w-[1470px] px-[15px]">
        <div className="flex flex-col gap-14 mob:gap-10">
          <div className="mx-auto flex w-full max-w-[720px] flex-col items-center gap-4 text-center">
            <span className="flex items-center gap-2 rounded-full bg-era-on-dark/12 px-4 py-1.5 text-[13px] font-semibold tracking-[0.12em] text-era-on-dark uppercase">
              <i className="block h-1.5 w-1.5 rounded-full bg-era-accent" /> {s.eyebrow}
            </span>
            <Heading>{s.heading}</Heading>
            <Reveal variant="fade">
              <p className="text-era-silver">{s.lead}</p>
            </Reveal>
          </div>

          <div className="grid grid-cols-4 gap-5 tab:grid-cols-2 mob:grid-cols-1">
            {s.cards.map((c, i) => (
              <Reveal key={c.title} variant="up" delay={i * 110} className="h-full">
                <Spot className="punn-dark-card flex h-full scroll-mt-28 flex-col gap-5 rounded-(--r-x) p-6">
                  <span id={ids[i]} className="-mt-24 block h-0 pt-24" aria-hidden />
                  <div className="relative z-[1] flex h-[96px] items-center justify-center overflow-hidden rounded-(--r-s1) bg-era-dark/70 ring-1 ring-era-on-dark/10">
                    {visuals[i]}
                  </div>
                  <div className="relative z-[1] flex flex-1 flex-col gap-2">
                    <h3 className="text-[21px] leading-[1.2] font-bold tracking-[-0.01em]">{c.title}</h3>
                    <p className="text-[15px] leading-[1.55] text-era-silver">{c.text}</p>
                  </div>
                  <a
                    href={hrefs[i]}
                    className="group/more relative z-[1] mt-1 flex w-fit items-center gap-2 text-[15px] font-semibold text-era-on-dark no-underline"
                  >
                    {s.more}
                    <ArrowRight size={16} className="transition-transform duration-300 group-hover/more:translate-x-1.5" />
                  </a>
                </Spot>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
