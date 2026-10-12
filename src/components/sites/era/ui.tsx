"use client";

import { a } from "./assets";
import { useEffect, useRef, useState, type ReactNode } from "react";


export function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen] as const;
}

export type Variant = "up" | "left" | "right" | "scale" | "scale0" | "fade";

export function Reveal({
  children,
  className = "",
  delay = 0,
  variant = "up",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: Variant;
}) {
  const [ref, seen] = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      data-v={variant}
      style={{ transitionDelay: `${delay}ms` }}
      className={`era-reveal ${seen ? "in" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

/** Çizgi: soldan sağa çizilerek gelir */
export function Line({ className = "" }: { className?: string }) {
  const [ref, seen] = useInView<HTMLDivElement>(0.5);
  return <div ref={ref} className={`era-line h-px w-full bg-era-cute ${seen ? "in" : ""} ${className}`} />;
}

/** Başlık: harf harf yukarıdan kayan metin (orijinaldeki SplitText animasyonu) */
export function Heading({
  children,
  className = "",
  as: Tag = "h3",
  wrapClass = "",
}: {
  children: ReactNode;
  className?: string;
  as?: "h2" | "h3" | "h4";
  wrapClass?: string;
}) {
  const [ref, seen] = useInView<HTMLDivElement>();
  const text = String(children);
  const total = [...text].length;
  const step = Math.min(38, 650 / Math.max(total, 1));
  let n = 0;
  const words = text.split(" ");
  return (
    <div ref={ref} className={`era-split overflow-hidden ${seen ? "in" : ""} ${wrapClass}`}>
      <Tag
        aria-label={text}
        className={`text-(length:--h3) leading-[124%] font-medium ${className}`}
      >
        {words.map((w, wi) => (
          <span key={wi} aria-hidden="true">
            <span className="inline-block">
              {[...w].map((ch, ci) => (
                <span
                  key={ci}
                  className="era-letter"
                  style={{ transitionDelay: `${Math.round(n++ * step)}ms` }}
                >
                  {ch}
                </span>
              ))}
            </span>
            {wi < words.length - 1 ? " " : ""}
          </span>
        ))}
      </Tag>
    </div>
  );
}

const btnBase =
  "relative block h-[60px] overflow-hidden rounded-(--r-s1) no-underline transition-transform duration-300 hover:scale-[.94]";

/** Üst menü butonu: siyah, hover'da beyaza döner */
export function PrimaryButton({ children, href = "#" }: { children: ReactNode; href?: string }) {
  return (
    <a href={href} className={`group ${btnBase}`}>
      <span className="relative z-[1] flex h-full items-center rounded-(--r-s1) bg-era-btn px-[27px] text-(length:--t-rx) leading-[124%] font-semibold text-era-on-btn uppercase">
        {children}
      </span>
      <span className="absolute inset-0 flex translate-y-full items-center justify-center rounded-(--r-s1) border border-era-btn bg-era-white text-(length:--t-rx) leading-[124%] font-semibold text-era-black uppercase transition-transform duration-300 group-hover:translate-y-0">
        {children}
      </span>
    </a>
  );
}

/** Mavi buton + ok: hover'da beyaza döner */
export function SecondaryButton({ children, href = "#" }: { children: ReactNode; href?: string }) {
  const inner = (black: boolean) => (
    <>
      <span
        className={`text-(length:--t-rx) leading-[124%] font-semibold uppercase ${black ? "text-era-black" : "text-era-on-dark"}`}
      >
        {children}
      </span>
      <span className="block h-[15px] w-[37px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={a("69944d-arrow-1.svg")} alt="" className={`h-full w-full ${black ? "invert dark:invert-0" : ""}`} />
      </span>
    </>
  );
  return (
    <a href={href} className={`group inline-block ${btnBase}`}>
      <span className="flex h-full items-center justify-center gap-4 rounded-(--r-s1) bg-era-primary px-[27px] py-[18px]">
        {inner(false)}
      </span>
      <span className="absolute inset-0 flex translate-y-full items-center justify-center gap-4 rounded-(--r-s1) border border-era-primary bg-era-white px-[27px] py-[18px] transition-transform duration-300 group-hover:translate-y-0">
        {inner(true)}
      </span>
    </a>
  );
}

/** Kayan-yazı hover efektli link */
export function RollLink({
  href,
  children,
  className = "",
  textClass = "",
  height = 20,
  onClick,
}: {
  href: string;
  children: string;
  className?: string;
  textClass?: string;
  height?: number;
  onClick?: () => void;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      style={{ height }}
      className={`group relative block overflow-hidden no-underline ${className}`}
    >
      <span
        className={`block leading-[120%] transition-transform duration-500 ease-out group-hover:-translate-y-full ${textClass}`}
      >
        {children}
      </span>
      <span
        className={`absolute inset-x-0 top-0 block translate-y-[125%] leading-[120%] transition-transform duration-500 ease-out group-hover:translate-y-0 ${textClass}`}
      >
        {children}
      </span>
    </a>
  );
}

/** Metnin arkasında logo renginde, çok saydam, fırça darbesi gibi kenarları pürüzlü leke (kare/panel değil). */
export function BrushStroke({ flip, tall }: { flip?: boolean; tall?: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 300 80"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute -inset-x-3 -inset-y-3 -z-10 h-[calc(100%+24px)] w-[calc(100%+24px)] ${flip ? "-scale-x-100" : ""}`}
    >
      <defs>
        <filter id="brush-rough" x="-10%" y="-30%" width="120%" height="160%">
          <feTurbulence type="fractalNoise" baseFrequency="0.015 0.35" numOctaves="2" seed="7" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="16" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <path
        filter="url(#brush-rough)"
        fill="var(--c-logo-from)"
        fillOpacity={tall ? 0.11 : 0.16}
        d={tall ? "M8 40 C18 6 80 2 150 5 C222 2 280 8 292 34 C297 56 272 76 200 77 C130 79 50 77 20 70 C6 64 4 48 8 40Z" : "M10 44 C24 18 80 14 150 18 C220 14 276 20 290 38 C294 52 266 62 200 63 C130 66 52 64 22 58 C10 55 7 50 10 44Z"}
      />
    </svg>
  );
}
