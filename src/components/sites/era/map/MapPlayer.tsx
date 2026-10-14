"use client";

import { useEffect, useRef } from "react";
import { Player, type PlayerRef } from "@remotion/player";
import { MAP_FPS, MAP_FRAMES, MAP_H, MAP_W, MapScene, type MapKind } from "./MapScene";

/**
 * Harita karosunu Remotion Player ile oynatır. Ekranda değilken ve "hareketi azalt" açıkken durur.
 * Kapsayıcıyı doldurur (cover): geniş kartta yukarı aşağı biraz kırpılır, dar ekranda ortalanır.
 */
export default function MapPlayer({ kind }: { kind: MapKind }) {
  const box = useRef<HTMLDivElement>(null);
  const player = useRef<PlayerRef>(null);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      player.current?.pause();
      player.current?.seekTo(40);
      return;
    }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) player.current?.play();
      else player.current?.pause();
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={box} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 aspect-[400/170] w-full min-w-[400px] -translate-x-1/2 -translate-y-1/2">
        <Player
          ref={player}
          component={MapScene}
          inputProps={{ kind }}
          compositionWidth={MAP_W * 2}
          compositionHeight={MAP_H * 2}
          durationInFrames={MAP_FRAMES}
          fps={MAP_FPS}
          loop
          autoPlay
          controls={false}
          clickToPlay={false}
          doubleClickToFullscreen={false}
          spaceKeyToPlayOrPause={false}
          acknowledgeRemotionLicense
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
}
