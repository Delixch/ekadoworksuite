"use client";

import { useEffect, useId, useRef, useState, type ButtonHTMLAttributes, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { Globe, Phone } from "lucide-react";
import { siInstagram, siMessenger, siWhatsapp } from "simple-icons";
import type { Channel } from "@/lib/panel/types";

/* ------------------------------- Kart ------------------------------- */

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`punn-panel rounded-(--r-x) p-5 mob:p-4 ${className}`}>{children}</section>;
}

export function CardHead({ title, hint, right }: { title: string; hint?: string; right?: ReactNode }) {
  return (
    <div className="mb-4 flex items-start justify-between gap-3">
      <div className="min-w-0">
        <h3 className="text-[16px] leading-tight font-bold text-era-black">{title}</h3>
        {hint && <p className="mt-0.5 text-[13px] leading-snug text-era-gray">{hint}</p>}
      </div>
      {right}
    </div>
  );
}

/* ------------------------------- Hap ------------------------------- */

export type Tone = "primary" | "success" | "danger" | "accent" | "neutral";
const toneCls: Record<Tone, string> = {
  primary: "bg-era-coolblue text-era-primary-ink",
  success: "bg-[color-mix(in_oklab,var(--c-success)_16%,transparent)] text-era-success",
  danger: "bg-[color-mix(in_oklab,var(--c-danger)_14%,transparent)] text-era-danger",
  accent: "bg-[color-mix(in_oklab,var(--c-accent)_16%,transparent)] text-era-accent",
  neutral: "bg-era-secondary text-era-gray",
};

export function Chip({ tone = "neutral", children, className = "" }: { tone?: Tone; children: ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[12px] leading-5 font-semibold whitespace-nowrap ${toneCls[tone]} ${className}`}>
      {children}
    </span>
  );
}

/** Canlı nokta: nabız atan küçük daire */
export function LiveDot({ tone = "success" }: { tone?: "success" | "danger" | "primary" }) {
  const c = tone === "success" ? "bg-era-success" : tone === "danger" ? "bg-era-danger" : "bg-era-primary";
  return (
    <span className="relative flex h-2.5 w-2.5 flex-none">
      <span className={`era-ring absolute inset-0 rounded-full ${c} opacity-60`} />
      <span className={`relative h-2.5 w-2.5 rounded-full ${c}`} />
    </span>
  );
}

/* ------------------------------- Düğmeler ------------------------------- */

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "soft" | "ghost" | "danger"; size?: "sm" | "md" };
export function Btn({ variant = "primary", size = "md", className = "", ...p }: BtnProps) {
  const v = {
    primary: "relative overflow-hidden bg-era-primary text-era-on-dark hover:brightness-110 before:pointer-events-none before:absolute before:inset-y-0 before:-left-1/2 before:w-1/2 before:-skew-x-[18deg] before:bg-era-on-dark/25 before:blur-[2px] before:transition-transform before:duration-700 hover:before:translate-x-[320%]",
    soft: "bg-era-coolblue text-era-primary-ink hover:brightness-95",
    ghost: "border border-era-lightgray bg-era-white text-era-black hover:bg-era-secondary",
    danger: "bg-[color-mix(in_oklab,var(--c-danger)_14%,transparent)] text-era-danger hover:brightness-95",
  }[variant];
  const s = size === "sm" ? "h-9 px-3.5 text-[13px]" : "h-11 px-5 text-[14px]";
  return (
    <button
      type="button"
      {...p}
      className={`inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition duration-200 active:scale-[.97] disabled:pointer-events-none disabled:opacity-50 ${v} ${s} ${className}`}
    />
  );
}

export function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label?: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 flex-none rounded-full transition-colors duration-300 ${checked ? "bg-era-primary" : "bg-era-cute"}`}
    >
      <span className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-era-on-dark shadow transition-transform duration-300 ${checked ? "translate-x-5" : ""}`} />
    </button>
  );
}

/* ------------------------------- Form ------------------------------- */

const inputCls =
  "w-full rounded-(--r-s1) border border-era-lightgray bg-era-white px-3.5 py-2.5 text-[15px] text-era-black placeholder:text-era-matte outline-none transition focus:border-era-primary focus:ring-4 focus:ring-[color-mix(in_oklab,var(--c-primary)_16%,transparent)]";

export function Field({ label, hint, children, className = "" }: { label: string; hint?: string; children: ReactNode; className?: string }) {
  return (
    <label className={`flex min-w-0 flex-col gap-1.5 ${className}`}>
      <span className="text-[13px] font-semibold text-era-black">{label}</span>
      {children}
      {hint && <span className="text-[12px] leading-snug text-era-gray">{hint}</span>}
    </label>
  );
}
export const Input = (p: InputHTMLAttributes<HTMLInputElement>) => <input {...p} className={`${inputCls} ${p.className ?? ""}`} />;
export const Textarea = (p: TextareaHTMLAttributes<HTMLTextAreaElement>) => <textarea rows={3} {...p} className={`${inputCls} resize-y leading-snug ${p.className ?? ""}`} />;
export const Select = (p: SelectHTMLAttributes<HTMLSelectElement>) => <select {...p} className={`${inputCls} ${p.className ?? ""}`} />;

/* ------------------------------- Sayı sayacı ------------------------------- */

/** Değer değişince eski sayıdan yenisine akıcı geçer (hareket azaltma açıksa anında). */
export function useCountUp(target: number, ms = 900) {
  const [v, setV] = useState(0);
  const from = useRef(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      from.current = target;
      const id = requestAnimationFrame(() => setV(target));
      return () => cancelAnimationFrame(id);
    }
    const start = performance.now();
    const a = from.current;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / ms);
      const e = 1 - Math.pow(1 - p, 3);
      const cur = a + (target - a) * e;
      setV(cur);
      from.current = cur;
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, ms]);
  return v;
}

/* ------------------------------- Marka ikonları ------------------------------- */

export function ChannelIcon({ channel, size = 18 }: { channel: Channel; size?: number }) {
  const gid = useId();
  if (channel === "phone") return <Phone size={size} className="text-era-primary-ink" strokeWidth={2} />;
  if (channel === "web") return <Globe size={size} className="text-era-accent" strokeWidth={2} />;
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden>
      {channel === "instagram" && (
        <defs>
          <linearGradient id={gid} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="var(--c-ig-1)" />
            <stop offset=".5" stopColor="var(--c-ig-2)" />
            <stop offset="1" stopColor="var(--c-ig-3)" />
          </linearGradient>
        </defs>
      )}
      <path
        d={channel === "whatsapp" ? siWhatsapp.path : channel === "instagram" ? siInstagram.path : siMessenger.path}
        fill={channel === "whatsapp" ? "var(--c-whatsapp)" : channel === "instagram" ? `url(#${gid})` : "var(--c-messenger)"}
      />
    </svg>
  );
}

/* ------------------------------- Avatar ------------------------------- */

const avatarBg = [
  "bg-[color-mix(in_oklab,var(--c-primary)_22%,var(--c-surface))] text-era-primary-ink",
  "bg-[color-mix(in_oklab,var(--c-accent)_24%,var(--c-surface))] text-era-black",
  "bg-[color-mix(in_oklab,var(--c-success)_22%,var(--c-surface))] text-era-black",
  "bg-[color-mix(in_oklab,var(--c-ig-2)_20%,var(--c-surface))] text-era-black",
];
export function Avatar({ name, size = 40, className = "" }: { name: string; size?: number; className?: string }) {
  const initials = name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
  const idx = [...name].reduce((a, c) => a + c.charCodeAt(0), 0) % avatarBg.length;
  return (
    <span
      className={`flex flex-none items-center justify-center rounded-full font-bold ${avatarBg[idx]} ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.36 }}
    >
      {initials}
    </span>
  );
}

export function Spinner({ size = 16 }: { size?: number }) {
  return (
    <span
      className="inline-block animate-spin rounded-full border-2 border-current border-t-transparent"
      style={{ width: size, height: size }}
      aria-hidden
    />
  );
}
