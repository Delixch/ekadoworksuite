"use client";

import { a } from "./assets";
import { useEffect, useState } from "react";
import { Line, useInView } from "./ui";
import { ScrubText } from "./Scrub";

const stats = [
  { to: 99.9, decimals: 1, suffix: "%", label: "Call Connection Rate" },
  { to: 300, decimals: 0, suffix: "ms", label: "Average Response Time" },
  { to: 97, decimals: 0, suffix: "%", label: "Speech Accuracy" },
];

function Counter({ to, decimals, suffix }: { to: number; decimals: number; suffix: string }) {
  const [ref, seen] = useInView<HTMLDivElement>(0.4);
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!seen) return;
    const start = performance.now();
    const dur = 1800;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setV(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, to]);
  return (
    <div ref={ref} className="flex h-[76px] items-start overflow-hidden mob:h-[50px] sm2:h-[47px]">
      <span className="text-(length:--h2) leading-[140%] font-semibold tabular-nums">
        {v.toFixed(decimals)}
        {suffix}
      </span>
    </div>
  );
}

function Stats({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex gap-[100px] mob:grid mob:grid-flow-col mob:grid-cols-3 mob:place-items-center mob:justify-between mob:gap-10 sm2:flex sm2:flex-col sm2:items-start sm2:gap-[15px] ${className}`}
    >
      {stats.map((s) => (
        <div key={s.label} className="flex flex-col gap-[15px] mob:gap-2.5">
          <Counter {...s} />
          <p className="text-(length:--t-rx) mob:text-[16px] leading-[148%] text-era-gray">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

const text =
  "An intelligent Voice AI Agent that understands, responds. Automate calls, support, sales, and workflows with natural human-like conversations.";

export function About() {
  return (
    <section className="relative py-[70px] tab:py-[50px] mob:py-10 sm2:py-[35px]">
      <div className="mx-auto w-full max-w-[1470px] px-[15px]">
        {/* masaüstü */}
        <div id="About" className="flex flex-col gap-12 tab:hidden">
          <Line />
          <div className="flex h-[138vh] flex-col items-stretch xl2:h-[135vh]">
            <div className="relative z-[1] mb-40 flex flex-col items-start justify-between gap-12">
              <div className="flex w-full items-stretch justify-end gap-2.5">
                <div className="flex w-full max-w-[67%] justify-end gap-[60px]">
                  <div className="flex w-full max-w-[861px] flex-col gap-[60px]">
                    <ScrubText as="h2" text={text} className="max-w-[861px] text-(length:--h4) leading-[140%] font-medium" />
                    <Stats />
                  </div>
                </div>
              </div>
            </div>
            <div className="sticky top-[25.9px] h-[42rem] w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={a("699c20-rectangle-52-1-.webp")}
                alt=""
                className="h-full w-full object-fill"
              />
            </div>
          </div>
        </div>

        {/* tablet / mobil */}
        <div className="hidden flex-col gap-12 tab:flex mob:gap-[30px] sm2:gap-[25px]">
          <Line />
          <div className="flex justify-between gap-5 tab:flex-col tab:gap-[50px] mob:gap-10 sm2:gap-[25px]">
            <div className="h-full w-[500px] max-w-full overflow-hidden rounded-(--r-m) mob:w-[400px] sm2:w-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={a("699548-eacfb29ca5638d6c2d2b5a6d4e331d9a-rectangle-30.webp")}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex w-full flex-col gap-[30px] mob:gap-10">
              <ScrubText as="h3" text={text} className="text-(length:--h4) leading-[140%] font-medium" />
              <Stats />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
