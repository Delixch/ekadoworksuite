"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/i18n/useLocale";

/**
 * Sessiz video + dile göre arkadan ses (Ekado_V2 Firma bölümündeki düzen).
 * Video oynarken ses de çalar, durunca ses de durur. loop=true: video dönerken ses bir kez konuşur, ses bitince video durur.
 * loop=false (tanıtım filmi): ses videonun zamanını izler, ileri/geri sarınca birlikte kayar.
 * Sesin dili önce sitenin dili; videonun üstündeki dil kareleriyle (modül sayfalarındaki gibi) ayrıca seçilebilir.
 */
export function useVoiceVideo(src: string, audioBase: string, locale: Locale, loop: boolean) {
  const video = useRef<HTMLVideoElement>(null);
  const audio = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [pick, setLang] = useState<Locale | undefined>();
  const lang = pick ?? locale;
  const audioSrc = `${audioBase}/${lang}.m4a`;

  useEffect(() => {
    const a = new Audio();
    a.preload = "auto";
    audio.current = a;
    return () => {
      a.pause();
      a.removeAttribute("src");
      audio.current = null;
    };
  }, []);

  useEffect(() => {
    const v = video.current;
    const a = audio.current;
    if (!v || !a) return;
    const atEnd = () => a.ended || (a.duration > 0 && a.currentTime >= a.duration - 0.15);
    const onPlay = () => {
      setPlaying(true);
      if (loop) {
        if (atEnd()) a.currentTime = 0;
      } else {
        a.currentTime = v.currentTime;
      }
      a.play().catch(() => {});
    };
    const onPause = () => {
      setPlaying(false);
      a.pause();
    };
    const onSeeked = () => {
      if (!loop) a.currentTime = v.currentTime;
    };
    const onAudioEnd = () => {
      if (loop) v.pause();
    };
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    v.addEventListener("ended", onPause);
    v.addEventListener("seeked", onSeeked);
    a.addEventListener("ended", onAudioEnd);
    return () => {
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("ended", onPause);
      v.removeEventListener("seeked", onSeeked);
      a.removeEventListener("ended", onAudioEnd);
    };
  }, [loop]);

  // alan ya da dil değişince: oynuyorsa yeni ses baştan (tanıtımda videonun saniyesinden) devam eder
  useEffect(() => {
    const v = video.current;
    const a = audio.current;
    if (!v || !a) return;
    const was = !v.paused;
    if (!a.src.endsWith(audioSrc)) a.src = audioSrc;
    if (!v.src.endsWith(src)) {
      v.src = src;
      if (was) v.play().catch(() => {});
      return;
    }
    if (was) {
      a.currentTime = loop ? 0 : v.currentTime;
      a.play().catch(() => {});
    }
  }, [src, audioSrc, loop]);

  const toggle = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };
  const play = () => video.current?.play().catch(() => {});
  const pause = () => video.current?.pause();
  // tam ekran: video öğesinin kendisi (iPhone Safari'de webkitEnterFullscreen); ses ayrı çaldığı için tam ekranda da sürer
  const full = () => {
    const v = video.current as (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null;
    if (!v) return;
    if (!v.requestFullscreen) return v.webkitEnterFullscreen?.();
    v.requestFullscreen().catch(() => {});
  };

  return { video, playing, lang, setLang, toggle, play, pause, full };
}
