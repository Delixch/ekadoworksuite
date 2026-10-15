"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { useLocale } from "@/i18n/useLocale";
import { betrieb, type BetriebItem } from "@/i18n/betrieb";
import { useInView } from "../ui";
import { betriebIcons } from "./icons";
import { VideoSlot } from "./VideoSlot";

/** Bir soru-cevap: ekrana gelince soru düşer, kısa "yazıyor" noktaları, sonra cevap ve video */
function Exchange({ it, owner, bot }: { it: BetriebItem; owner: string; bot: string }) {
  const [ref, seen] = useInView<HTMLDivElement>(0.3);
  const [step, setStep] = useState(0);
  const Icon = betriebIcons[it.key];

  useEffect(() => {
    if (!seen) return;
    const a = setTimeout(() => setStep(1), 150);
    const b = setTimeout(() => setStep(2), 1050);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, [seen]);

  return (
    <div ref={ref} className="flex flex-col gap-4">
      {/* işletme sahibi */}
      <div className={`flex items-end justify-end gap-3 transition-all duration-500 ${step >= 1 ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}>
        <div className="max-w-[560px] rounded-[22px] rounded-br-[6px] bg-era-primary px-5 py-3.5 text-[17px] leading-snug text-era-on-dark shadow-[0_10px_26px_var(--c-shadow-soft)]">
          <span className="mb-1 block text-[12px] font-semibold tracking-wider uppercase opacity-75">{owner}</span>
          {it.question}
        </div>
      </div>

      {/* Ekado */}
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-era-coolblue text-era-primary-ink ring-4 ring-era-white">
          <Icon size={18} />
        </span>
        {step < 2 ? (
          <div className={`flex h-12 items-center gap-1.5 rounded-[22px] rounded-tl-[6px] bg-era-white px-5 ring-1 ring-era-lightgray transition-opacity duration-300 ${step === 1 ? "opacity-100" : "opacity-0"}`}>
            {[0, 1, 2].map((d) => (
              <i key={d} className="h-2 w-2 animate-bounce rounded-full bg-era-matte" style={{ animationDelay: `${d * 0.15}s` }} />
            ))}
          </div>
        ) : (
          <div className="era-in-up flex w-full max-w-[820px] flex-col gap-4 rounded-[22px] rounded-tl-[6px] bg-era-white p-5 ring-1 ring-era-lightgray shadow-[0_14px_36px_var(--c-shadow-soft)]" style={{ animationDuration: ".6s" }}>
            <span className="text-[12px] font-semibold tracking-wider text-era-gray uppercase">
              {bot} · {it.menu}
            </span>
            <p className="text-[17px] leading-[1.6] text-era-black">{it.answer}</p>
            <div className="grid grid-cols-[minmax(0,1.1fr)_minmax(0,.9fr)] gap-5 mob:grid-cols-1">
              <VideoSlot id={it.key} rounded="rounded-(--r-s)" />
              <ul className="flex flex-col gap-2">
                {it.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[15px] leading-snug text-era-gray">
                    <Check size={16} strokeWidth={3} className="mt-0.5 flex-none text-era-primary-ink" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/** Taslak 3 - "Sorun, gösterelim": işletme sahibinin gerçek soruları, cevabı programdan bir bölüm */
export function V3Chat() {
  const { locale } = useLocale();
  const c = betrieb[locale];
  return (
    <div className="mx-auto w-full max-w-[960px] px-[15px]">
      <div className="flex flex-col gap-12 rounded-(--r-mx) bg-era-secondary/60 p-8 ring-1 ring-era-lightgray mob:gap-9 mob:p-4">
        {c.items.map((it) => (
          <Exchange key={it.key} it={it} owner={c.chatOwner} bot={c.chatBot} />
        ))}
      </div>
    </div>
  );
}
