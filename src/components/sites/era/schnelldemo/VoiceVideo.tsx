"use client";

import { Maximize, Pause, Play } from "lucide-react";
import { locales } from "@/i18n/useLocale";
import type { useVoiceVideo } from "./voice";

/**
 * Video çerçevesi, modül sayfalarındaki gibi: dil kareleri, oynat/durdur ve tam ekran videonun DIŞINDA, sağ üstte
 * (Adnan 2026-10-15/17: videonun üstünde düğme olmasın). Videoya tıklamak da oynatır/durdurur.
 * Video her zaman sessiz; ses useVoiceVideo'daki ayrı ses dosyasından gelir.
 */
export function VoiceVideo({
  player,
  poster,
  loop,
  labels,
  className = "",
  frameClass = "aspect-video",
  videoClass = "object-cover",
}: {
  player: ReturnType<typeof useVoiceVideo>;
  poster: string;
  loop: boolean;
  labels: { play: string; pause: string; full: string };
  className?: string;
  /** çerçeve oranı (varsayılan 16:9); kırpmak için ör. "aspect-[7/5]" + videoClass ile hizalama */
  frameClass?: string;
  videoClass?: string;
}) {
  const { video, playing, lang, setLang, toggle, full } = player;

  return (
    <div className="flex w-full flex-col gap-2.5">
      <div className="flex items-center justify-end gap-1.5">
        {locales.map(({ code }) => (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={lang === code}
            className={`flex h-7 min-w-7 items-center justify-center rounded-[6px] px-2 text-[11px] font-normal tracking-wider uppercase ring-1 transition-colors ${lang === code ? "bg-era-dark text-era-on-dark ring-era-dark" : "bg-era-white text-era-black ring-era-lightgray hover:ring-era-primary"}`}
          >
            {code}
          </button>
        ))}
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? labels.pause : labels.play}
          className="ml-1 flex h-7 w-7 items-center justify-center rounded-[6px] bg-era-primary text-era-on-dark shadow-[0_4px_12px_var(--c-shadow-soft)] transition hover:brightness-110 active:scale-95"
        >
          {playing ? <Pause size={13} className="fill-current" /> : <Play size={13} className="ml-0.5 fill-current" />}
        </button>
        <button
          type="button"
          onClick={full}
          aria-label={labels.full}
          className="flex h-7 w-7 items-center justify-center rounded-[6px] bg-era-white text-era-black ring-1 ring-era-lightgray transition hover:ring-era-primary active:scale-95"
        >
          <Maximize size={13} />
        </button>
      </div>
      <figure className={`relative m-0 ${frameClass} w-full overflow-hidden rounded-(--r-x) bg-era-device ${className}`}>
        <video
          ref={video}
          muted
          playsInline
          loop={loop}
          preload="metadata"
          poster={poster}
          onClick={toggle}
          aria-label={playing ? labels.pause : labels.play}
          className={`block h-full w-full cursor-pointer ${videoClass} [&:fullscreen]:object-contain`}
        />
      </figure>
    </div>
  );
}
