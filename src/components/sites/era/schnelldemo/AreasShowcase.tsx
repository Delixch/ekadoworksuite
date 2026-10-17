"use client";

import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/i18n/useLocale";
import type { SchnellDemoText } from "@/i18n/schnelldemo";
import { GlowGrid } from "../GlowGrid";
import { useVoiceVideo } from "./voice";
import { VoiceVideo } from "./VoiceVideo";

const pad = (n: number) => String(n + 1).padStart(2, "0");

/**
 * "Bereiche & Ablauf": solda altı alan, sağda seçilenin videosu (dile göre arkadan ses), özellikleri ve akışı.
 * Video 10 sn döner, ses bir kez konuşur, bitince video durur. playSignal her arttığında (alana tıklama, diyagramdan atlama) video oynar.
 */
export function AreasShowcase({
  t,
  locale,
  index,
  playSignal,
  active,
  onSelect,
}: {
  t: SchnellDemoText;
  locale: Locale;
  index: number;
  playSignal: number;
  active: boolean;
  onSelect: (i: number) => void;
}) {
  const area = t.areas[index];
  const player = useVoiceVideo(`/videos/demo/${area.id}.mp4`, `/sounds/demo/${area.id}`, locale, true);
  const { video } = player;

  useEffect(() => {
    if (playSignal && !matchMedia("(prefers-reduced-motion: reduce)").matches) video.current?.play().catch(() => {});
  }, [playSignal, video]);

  useEffect(() => {
    if (!active) video.current?.pause();
  }, [active, video]);

  const labels = { play: t.playVideo, pause: t.pauseVideo, full: t.fullscreen };

  const onKey = (e: React.KeyboardEvent) => {
    const step = ({ ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 } as Record<string, number>)[e.key];
    if (!step) return;
    e.preventDefault();
    const n = (index + step + t.areas.length) % t.areas.length;
    onSelect(n);
    document.getElementById(`demo-area-${n}`)?.focus();
  };

  return (
    <div className="grid grid-cols-[minmax(0,19rem)_minmax(0,1fr)] items-start gap-8 tab:grid-cols-1 tab:gap-5">
      <ul role="tablist" aria-orientation="vertical" aria-label={t.areasLabel} onKeyDown={onKey} className="flex flex-col gap-2.5 tab:-mx-[15px] tab:flex-row tab:overflow-x-auto tab:px-[15px] tab:pb-2">
        {t.areas.map((a, i) => {
          const on = i === index;
          return (
            <li key={a.id} className="tab:flex-none">
              <button
                id={`demo-area-${i}`}
                type="button"
                role="tab"
                aria-selected={on}
                aria-controls="demo-area-detail"
                tabIndex={on ? 0 : -1}
                onClick={() => onSelect(i)}
                className={`grid w-full gap-0.5 rounded-(--r-s1) px-4 py-3 text-left ring-1 transition-all duration-300 tab:w-auto tab:px-4 tab:py-2.5 ${on ? "translate-x-3 bg-era-coolblue ring-era-primary tab:translate-x-0" : "bg-era-white ring-era-lightgray hover:ring-era-primary"}`}
              >
                <span className="font-mono text-[12px] text-era-primary-ink">({pad(i)})</span>
                <b className="text-[18px] leading-tight font-semibold text-era-black tab:whitespace-nowrap">{a.name}</b>
                <small className="text-[15px] leading-snug text-era-gray tab:hidden">{a.short}</small>
              </button>
            </li>
          );
        })}
      </ul>

      <article id="demo-area-detail" role="tabpanel" aria-labelledby={`demo-area-${index}`} aria-live="polite" className="grid min-w-0 gap-6 rounded-(--r-r) bg-era-white p-6 shadow-[0_18px_44px_var(--c-shadow-soft)] ring-1 ring-era-lightgray mob:p-4">
        <div className="mx-auto w-full max-w-[44rem]">
          <VoiceVideo player={player} poster={`/videos/demo/${area.id}.jpg`} loop labels={labels} className="shadow-[0_22px_54px_var(--c-shadow)]" />
        </div>

        <div className="grid min-w-0 gap-3">
          <small className="font-mono text-[12px] tracking-[0.1em] text-era-primary-ink uppercase">
            {pad(index)} · {area.name}
          </small>
          <h3 className="text-[clamp(1.5rem,2.6vw,2.1rem)] leading-[1.15] font-semibold tracking-tight text-balance text-era-black">{area.title}</h3>
          <p className="max-w-[46rem] text-[17px] leading-[1.6] text-era-gray">{area.text}</p>

          <GlowGrid as="ul" className="mt-2 grid grid-cols-2 gap-3 mob:grid-cols-1" pad={6} radius={20}>
            {area.feats.map((f) => (
              <li key={f.title} data-glow className="relative z-[1] grid gap-0.5 rounded-(--r-s1) border-l-[3px] border-era-primary bg-era-secondary/60 px-4 py-3">
                {f.meta && <small className="font-mono text-[11px] tracking-[0.08em] text-era-primary-ink uppercase">{f.meta}</small>}
                <b className="text-[16px] leading-snug font-semibold text-era-black">{f.title}</b>
                <span className="text-[15px] leading-snug text-era-gray">{f.text}</span>
              </li>
            ))}
          </GlowGrid>

          <h4 className="mt-4 text-[19px] font-semibold text-era-primary-ink">{t.flow}</h4>
          <ol className="grid grid-cols-2 gap-x-6 gap-y-4 mob:grid-cols-1">
            {area.flow.map((s, i) => (
              <li key={s.title} className="grid gap-0.5 border-t border-era-cute pt-2.5">
                <span className="flex items-center gap-2 font-mono text-[12px] text-era-primary-ink">
                  {String(i + 1).padStart(2, "0")}
                  {s.meta && <span className="rounded-full bg-era-coolblue px-2 py-0.5 text-[11px] font-semibold tracking-[0.06em] uppercase">{s.meta}</span>}
                </span>
                <b className="text-[16px] font-semibold text-era-black">{s.title}</b>
                <p className="text-[15px] leading-snug text-era-gray">{s.text}</p>
              </li>
            ))}
          </ol>

          <a href="#demo-zugang" className="mt-3 flex h-13 w-fit items-center gap-3 rounded-(--r-s1) bg-era-primary px-7 text-[17px] font-semibold text-era-on-dark no-underline transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110">
            {t.cta} <ArrowRight size={19} />
          </a>
        </div>
      </article>
    </div>
  );
}
