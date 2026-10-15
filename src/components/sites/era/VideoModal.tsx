"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Play, X } from "lucide-react";
import { useLocale } from "@/i18n/useLocale";
import { video } from "@/i18n/video";

/**
 * Tanıtım videosu penceresi (buzlu cam, Bize Ulaşın ile aynı animasyon).
 * Açmak için: window.dispatchEvent(new CustomEvent("ekado:video")) ya da <VideoButton />.
 * Seçili dile göre /videos/resepsiyon-{dil}.mp4 oynar; kapanınca durur, yalnız açılınca indirilir.
 */
export function VideoModal() {
  const { locale } = useLocale();
  const c = video[locale];
  const [open, setOpen] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [ok, setOk] = useState(true);
  const player = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const show = () => {
      setOk(true);
      setLeaving(false);
      setOpen(true);
    };
    window.addEventListener("ekado:video", show);
    return () => window.removeEventListener("ekado:video", show);
  }, []);

  const close = useCallback(() => {
    player.current?.pause();
    setLeaving(true);
    window.setTimeout(() => {
      setOpen(false);
      setLeaving(false);
    }, 260);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", esc);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", esc);
    };
  }, [open, close]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={c.title}
      className={`fixed inset-0 z-[120] flex items-center justify-center overflow-y-auto bg-era-dark/30 p-3 backdrop-blur-xl backdrop-saturate-150 mob:items-end mob:p-0 ${leaving ? "era-contact-bg-out" : "era-contact-bg-in"}`}
      onMouseDown={(e) => e.target === e.currentTarget && close()}
    >
      <div
        className={`relative w-full max-w-[920px] rounded-[28px] bg-era-white/70 p-4 shadow-[0_30px_80px_var(--c-shadow)] ring-1 ring-white/50 backdrop-blur-2xl mob:max-w-none mob:rounded-b-none mob:p-3 ${leaving ? "era-contact-card-out" : "era-contact-card-in"}`}
      >
        <div className="flex items-center justify-between gap-3 px-2 pb-3">
          <h2 className="text-[17px] font-medium text-era-black">{c.title}</h2>
          <button
            type="button"
            onClick={close}
            aria-label={c.close}
            className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-era-white/80 text-era-black ring-1 ring-era-line transition hover:scale-105 active:scale-95"
          >
            <X size={18} />
          </button>
        </div>
        <div className="relative aspect-video overflow-hidden rounded-[18px] bg-era-dark ring-1 ring-era-line">
          {ok ? (
            <video
              key={locale}
              ref={player}
              className="h-full w-full object-cover"
              src={`/videos/resepsiyon-${locale}.mp4`}
              poster={`/videos/resepsiyon-${locale}-kapak.jpg`}
              controls
              autoPlay
              playsInline
              preload="auto"
              aria-label={c.title}
              onError={() => setOk(false)}
            />
          ) : (
            <p className="flex h-full items-center justify-center text-era-on-dark/80">{c.fallback}</p>
          )}
        </div>
      </div>
    </div>
  );
}

/** Videoyu açan buton. Ana sayfada büyük (kapak resimli), panelde küçük. */
export function VideoButton({ variant = "pill", className = "" }: { variant?: "pill" | "small"; className?: string }) {
  const { locale } = useLocale();
  const c = video[locale];
  const open = () => window.dispatchEvent(new CustomEvent("ekado:video"));
  if (variant === "small") {
    return (
      <button
        type="button"
        onClick={open}
        className={`flex h-10 items-center gap-2 rounded-[8px] border border-era-lightgray bg-era-white px-4 text-[13px] font-semibold text-era-black transition hover:-translate-y-0.5 active:scale-[.98] ${className}`}
      >
        <Play size={14} className="fill-era-primary text-era-primary" /> {c.how}
      </button>
    );
  }
  return (
    <button
      type="button"
      onClick={open}
      className={`group/vid flex items-center gap-3 rounded-full bg-era-white py-2 pr-6 pl-2 text-[16px] font-semibold text-era-black ring-1 ring-era-line transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_var(--c-shadow)] active:scale-[.98] ${className}`}
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-era-primary text-era-on-btn transition-transform duration-300 group-hover/vid:scale-110">
        <Play size={16} className="ml-0.5 fill-current" />
      </span>
      {c.watch}
    </button>
  );
}
