"use client";

import { useState } from "react";
import { MessageCircleQuestion, Plus } from "lucide-react";
import { useLocale } from "@/i18n/useLocale";
import { Heading, Reveal } from "./ui";

/** SSS: sorular ve cevaplar eski siteden, üç dilde (src/i18n) */
export function Faq() {
  const { t } = useLocale();
  const f = t.faq;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="sss" className="relative py-[70px] tab:py-[50px] mob:py-10 sm2:py-[35px]">
      <div className="mx-auto w-full max-w-[1470px] px-[15px]">
        <div className="mx-auto grid w-full max-w-[1200px] grid-cols-[minmax(0,.85fr)_minmax(0,1.15fr)] items-start gap-14 tab:grid-cols-1 tab:gap-10">
          <div className="flex flex-col gap-6 tab:items-center tab:text-center">
            <div className="flex flex-col gap-4 tab:items-center">
              <span className="flex w-fit items-center gap-2 rounded-full bg-era-secondary px-4 py-1.5 text-[13px] font-semibold tracking-[0.12em] text-era-primary-ink uppercase">
                <i className="block h-1.5 w-1.5 rounded-full bg-era-accent" /> {f.eyebrow}
              </span>
              <Heading>{f.heading}</Heading>
            </div>
            <Reveal variant="up" className="w-full max-w-[420px]">
              <div className="ekado-panel flex flex-col gap-3 rounded-(--r-x) p-6 text-left">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-era-white text-era-primary-ink ring-1 ring-era-line">
                  <MessageCircleQuestion size={21} strokeWidth={1.8} />
                </span>
                <h3 className="text-[19px] font-bold text-era-black">{f.stillTitle}</h3>
                <p className="text-[15px] text-era-gray">{f.stillText}</p>
                <a
                  href="#bize-ulasin"
                  className="mt-1 flex h-12 w-fit items-center rounded-(--r-s1) bg-era-primary px-6 text-[16px] font-semibold text-era-on-dark no-underline transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
                >
                  {f.stillCta}
                </a>
              </div>
            </Reveal>
          </div>

          <div className="flex flex-col gap-3">
            {f.items.map((it, i) => {
              const isOpen = open === i;
              return (
                <Reveal key={it.q} variant="up" delay={i * 90}>
                  <div
                    className={`rounded-(--r-r) border transition-colors duration-300 ${
                      isOpen ? "border-era-primary bg-era-white shadow-[0_10px_30px_var(--c-shadow-soft)]" : "border-era-cute bg-transparent"
                    }`}
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left mob:px-4 mob:py-4"
                    >
                      <span className="text-[18px] leading-[1.35] font-semibold text-era-black">{it.q}</span>
                      <span
                        className={`flex h-8 w-8 flex-none items-center justify-center rounded-full transition-all duration-300 ${
                          isOpen ? "rotate-45 bg-era-primary text-era-on-dark" : "bg-era-secondary text-era-primary-ink"
                        }`}
                      >
                        <Plus size={17} strokeWidth={2.4} />
                      </span>
                    </button>
                    <div
                      className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p
                          className={`px-6 pb-5 text-[16px] leading-[1.6] text-era-gray transition-all duration-500 mob:px-4 ${
                            isOpen ? "translate-y-0 opacity-100 delay-100" : "-translate-y-2 opacity-0"
                          }`}
                        >
                          {it.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
