"use client";

import type { ReactNode } from "react";
import type { SetupConfig } from "@/lib/panel/types";
import "./setup.css";

export type StepId = "hotel" | "channels" | "language" | "knowledge" | "handoff" | "integrations" | "publish";

/** Her adım formu: güncel ayarlar + değiştirme fonksiyonu (kaydetme üst bileşende) */
export interface StepProps {
  cfg: SetupConfig;
  change: (fn: (c: SetupConfig) => SetupConfig) => void;
}

/** Çizilerek beliren onay işareti */
export function CheckMark({ size = 18, className = "" }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M5 12.5l4.5 4.5L19 7.5" className="setup-draw" />
    </svg>
  );
}

export function Lead({ children }: { children: ReactNode }) {
  return <p className="mb-5 max-w-[640px] text-[15px] leading-relaxed text-era-gray">{children}</p>;
}

export function Section({ title, hint, children, right }: { title: string; hint?: string; children: ReactNode; right?: ReactNode }) {
  return (
    <div className="flex flex-col gap-3 border-t border-era-line pt-5 first:border-t-0 first:pt-0">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h4 className="text-[15px] font-bold text-era-black">{title}</h4>
          {hint && <p className="mt-0.5 text-[13px] leading-snug text-era-gray">{hint}</p>}
        </div>
        {right}
      </div>
      {children}
    </div>
  );
}

/** Kaydırıcı: anlık değer balonu ve iki uç etiketi */
export function Slider({
  value,
  onChange,
  min = 0,
  max = 100,
  left,
  right,
  suffix = "",
  label,
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  left?: string;
  right?: string;
  suffix?: string;
  label: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="flex flex-col gap-2">
      <div className="relative h-7">
        <span
          className="absolute -top-0.5 -translate-x-1/2 rounded-full bg-era-primary px-2.5 py-0.5 text-[12px] font-bold text-era-on-dark transition-[left] duration-150"
          style={{ left: `calc(${pct}% + ${(0.5 - pct / 100) * 18}px)` }}
        >
          {value}
          {suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        aria-label={label}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-era-lightgray accent-era-primary"
      />
      {(left || right) && (
        <div className="flex justify-between text-[12px] font-semibold text-era-gray">
          <span>{left}</span>
          <span>{right}</span>
        </div>
      )}
    </div>
  );
}

/** Ton değerinden üslup kademesi: 0 resmi, 1 dengeli, 2 samimi */
export function toneTier(tone: number): 0 | 1 | 2 {
  return tone < 34 ? 0 : tone < 67 ? 1 : 2;
}
