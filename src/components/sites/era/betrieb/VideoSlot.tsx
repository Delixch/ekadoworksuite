"use client";

import { useState } from "react";
import { Clapperboard, Play } from "lucide-react";
import { useLocale } from "@/i18n/useLocale";
import { betriebVideos, pickVideo, posterOf, type BetriebKey, type VideoLang } from "@/lib/betrieb-videos";

const soon = { tr: "Video yakında", en: "Video coming soon", de: "Video folgt" };

/**
 * Bir bölümün videosu: kapak + oynat düğmesi, basınca video yüklenir (önceden indirilmez).
 * İki dil varsa köşede TR / DE seçimi çıkar. Link yoksa "yakında" kutusu görünür.
 */
export function VideoSlot({ id, className = "", rounded = "rounded-(--r-x)" }: { id: BetriebKey; className?: string; rounded?: string }) {
  const { locale } = useLocale();
  const [lang, setLang] = useState<VideoLang | undefined>();
  const [playing, setPlaying] = useState(false);
  const v = pickVideo(id, locale, lang);
  const both = !!betriebVideos[id].de && !!betriebVideos[id].tr;

  if (!v) {
    return (
      <div className={`relative flex aspect-video w-full flex-col items-center justify-center gap-3 overflow-hidden border border-dashed border-era-cute bg-era-secondary/60 text-era-gray ${rounded} ${className}`}>
        <Clapperboard size={30} strokeWidth={1.6} className="text-era-primary-ink" />
        <span className="text-[14px] font-semibold tracking-[0.12em] uppercase">{soon[locale]}</span>
      </div>
    );
  }

  return (
    <div className={`group/v relative aspect-video w-full overflow-hidden bg-era-device shadow-[0_18px_44px_var(--c-shadow)] ${rounded} ${className}`}>
      {playing ? (
        <video key={v.url} src={v.url} poster={posterOf(v.url)} controls autoPlay playsInline className="h-full w-full object-contain" />
      ) : (
        <button type="button" onClick={() => setPlaying(true)} aria-label="Play" className="absolute inset-0 block h-full w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={posterOf(v.url)} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover/v:scale-[1.04]" />
          <span className="absolute inset-0 flex items-center justify-center bg-black/10">
            <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-era-white/95 text-era-primary shadow-lg transition-transform duration-300 group-hover/v:scale-110">
              <span aria-hidden className="absolute inset-0 animate-[era-ring_1.8s_ease-out_infinite] rounded-full bg-era-white/60" />
              <Play size={24} className="relative ml-1 fill-current" />
            </span>
          </span>
        </button>
      )}
      {both && (
        <div className="absolute top-3 right-3 z-[2] flex gap-1 rounded-full bg-black/45 p-1 backdrop-blur-md">
          {(["tr", "de"] as const).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => {
                setLang(l);
                setPlaying(true);
              }}
              className={`rounded-[8px] px-3 py-1 text-[12px] font-medium tracking-wider uppercase transition-colors ${v.lang === l ? "bg-era-white text-era-black" : "text-white/85 hover:text-white"}`}
            >
              {l}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
