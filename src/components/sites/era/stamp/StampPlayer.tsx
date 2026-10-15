"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { Player, type PlayerRef } from "@remotion/player";
import { RotateCcw, Volume2 } from "lucide-react";
import { useLocale } from "@/i18n/useLocale";
import { stamp } from "@/i18n/stamp";
import { IMPACTS, STAMP_FPS, STAMP_FRAMES, STAMP_H, STAMP_W, StampScene } from "./StampScene";

/**
 * Açılış damgalarını Remotion Player ile cihazların üstünde oynatır (bir kez, sayfa açılınca).
 * Her darbede `shake` öğesi (laptop + telefon) kısa süre sarsılır.
 * Ses: tarayıcılar dokunmadan sesi engeller; ziyaretçi sayfada daha önce bir yere dokunduysa sesli, yoksa sessiz başlar.
 * "Sesli izle" düğmesi damgaları sesli olarak baştan oynatır. "Hareketi azalt" açıksa hiç oynamaz.
 * Ziyaret başına bir kez (Adnan 2026-10-15): sessionStorage "ekado_stamp_seen"; sitede gezip dönünce tekrar oynamaz, düğme kalır.
 */
const SEEN = "ekado_stamp_seen";
const readSeen = () => {
  try {
    return sessionStorage.getItem(SEEN) === "1";
  } catch {
    return false;
  }
};
const markSeen = () => {
  try {
    sessionStorage.setItem(SEEN, "1");
  } catch {}
};
export default function StampPlayer({ shake }: { shake: RefObject<HTMLDivElement | null> }) {
  const { locale } = useLocale();
  const t = stamp[locale];
  const player = useRef<PlayerRef>(null);
  // sadece tarayıcıda yüklenir (ssr: false), window var
  const [reduce] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  // bu ziyarette gösterildiyse kendiliğinden oynamaz
  const [seen] = useState(readSeen);
  const [done, setDone] = useState(seen);
  const [withSound, setWithSound] = useState(false);

  useEffect(() => {
    const p = player.current;
    if (!p) return;
    if (!seen) markSeen();
    const active = (navigator as Navigator & { userActivation?: { hasBeenActive: boolean } }).userActivation?.hasBeenActive;
    if (active) p.unmute();
    const onFrame = (e: { detail: { frame: number } }) => {
      const el = shake.current;
      if (!el) return;
      const f = e.detail.frame;
      const hit = IMPACTS.findLast((a) => f >= a && f < a + 9);
      if (hit == null) {
        el.style.transform = "";
        return;
      }
      const k = f - hit;
      const amp = (hit === IMPACTS[4] ? 9 : 5) * (1 - k / 9);
      el.style.transform = `translate(${Math.sin(k * 2.7) * amp}px, ${Math.cos(k * 3.3) * amp * 0.8}px)`;
    };
    const onEnded = () => {
      if (shake.current) shake.current.style.transform = "";
      setDone(true);
    };
    p.addEventListener("frameupdate", onFrame);
    p.addEventListener("ended", onEnded);
    return () => {
      p.removeEventListener("frameupdate", onFrame);
      p.removeEventListener("ended", onEnded);
    };
  }, [shake, reduce, seen]);

  if (reduce) return null;

  const again = (sound: boolean) => {
    const p = player.current;
    if (!p) return;
    if (sound) p.unmute();
    setWithSound(sound);
    setDone(false);
    p.seekTo(0);
    p.play();
  };

  return (
    <>
      <div aria-hidden className={`pointer-events-none absolute inset-0 z-[5] transition-opacity duration-500 ${done ? "opacity-0" : "opacity-100"}`}>
        <Player
          ref={player}
          component={StampScene}
          inputProps={{ words: t.words, brand: t.brand, claim: t.claim, lang: locale }}
          compositionWidth={STAMP_W}
          compositionHeight={STAMP_H}
          durationInFrames={STAMP_FRAMES}
          fps={STAMP_FPS}
          autoPlay={!seen}
          initiallyMuted
          controls={false}
          clickToPlay={false}
          doubleClickToFullscreen={false}
          spaceKeyToPlayOrPause={false}
          acknowledgeRemotionLicense
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <button
        type="button"
        onClick={() => again(true)}
        className="absolute -top-2 right-2 z-[6] flex items-center gap-2 rounded-[8px] bg-era-white/90 px-3 py-1.5 text-[13px] font-semibold text-era-primary-ink shadow-[0_8px_20px_var(--c-shadow-soft)] ring-1 ring-era-lightgray backdrop-blur-md transition hover:bg-era-white"
      >
        {done && withSound ? <RotateCcw size={14} /> : <Volume2 size={14} />}
        {done && withSound ? t.replay : t.sound}
      </button>
    </>
  );
}
