"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Player, type PlayerRef } from "@remotion/player";
import { BA_FPS, BA_H, BA_W, BeforeAfterScene, SEG, SETTLED } from "./BeforeAfterScene";

/**
 * "Bugün / Ekado ile" sahnesini oynatır; soldaki konu listesi bunu yönetir.
 * Ekranda değilken durur. "Hareketi azalt" açıkken oynamaz, seçilen konunun yazılmış hâlini gösterir.
 */
export default function BeforeAfterPlayer({
  items,
  before,
  after,
  pick,
  onActive,
}: {
  items: [string, string][];
  before: string;
  after: string;
  /** dışarıdan seçilen konu (tıklayınca artar: { i, n }) */
  pick: { i: number; n: number };
  onActive: (i: number, progress: number) => void;
}) {
  const box = useRef<HTMLDivElement>(null);
  const player = useRef<PlayerRef>(null);
  const [reduce] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const props = useMemo(() => ({ items, before, after }), [items, before, after]);
  const active = useRef(onActive);
  useEffect(() => {
    active.current = onActive;
  }, [onActive]);

  useEffect(() => {
    const p = player.current;
    const el = box.current;
    if (!p || !el) return;
    const onFrame = (e: { detail: { frame: number } }) => {
      const f = e.detail.frame;
      active.current(Math.min(items.length - 1, Math.floor(f / SEG)), (f % SEG) / SEG);
    };
    p.addEventListener("frameupdate", onFrame);
    if (reduce) {
      p.seekTo(SETTLED);
      return () => p.removeEventListener("frameupdate", onFrame);
    }
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? p.play() : p.pause()), { threshold: 0.3 });
    io.observe(el);
    return () => {
      io.disconnect();
      p.removeEventListener("frameupdate", onFrame);
    };
  }, [items.length, reduce]);

  // konu seçilince o konunun başına (hareketi azalt açıksa yazılmış hâline) atla
  useEffect(() => {
    if (!pick.n) return;
    const p = player.current;
    if (!p) return;
    p.seekTo(pick.i * SEG + (reduce ? SETTLED : 0));
    if (!reduce) p.play();
  }, [pick, reduce]);

  return (
    <div ref={box} aria-hidden className="absolute inset-0">
      <Player
        ref={player}
        component={BeforeAfterScene}
        inputProps={props}
        compositionWidth={BA_W}
        compositionHeight={BA_H}
        durationInFrames={SEG * items.length}
        fps={BA_FPS}
        loop
        controls={false}
        clickToPlay={false}
        doubleClickToFullscreen={false}
        spaceKeyToPlayOrPause={false}
        acknowledgeRemotionLicense
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
