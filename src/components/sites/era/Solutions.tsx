"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Maximize, Play } from "lucide-react";
import { pickPart, posterOf } from "@/lib/module-videos";
import { useLocale } from "@/i18n/useLocale";
import { Spot } from "./Spot";
import { Heading, Reveal } from "./ui";

/** Kart başına bağlantı: menüdeki modül bağlantıları kartlara iner, "Bilgi al" iletişim penceresini konuyla açar */
const ids = ["isletme", "satinalma", "personel", "finans"];
const hrefs = ["#bize-ulasin", "#bize-ulasin", "#bize-ulasin", "#bize-ulasin"];

/** Kartın üstündeki video: o alanı anlatan tanıtım parçası (modül sayfalarındaki videolar). Kapak + oynat; basınca kartın içinde oynar. */
const coverPart = [1, 7, 2, 8];
/**
 * Videolarda (1920x1080) uygulama ekranı x 175-1745, y 10-893 arasında; yanlar boş siyah, altta altyazı bandı.
 * Kartta sadece ekran görünsün: kutu 16:9, video %120 büyütülüp 160 px sola kaydırılır (x 160-1760, y 0-900 kalır).
 * Tarayıcı denetimleri bu kırpmada kesilirdi; o yüzden yok: videoya tıklamak oynatır/durdurur, dururken oynat düğmesi döner.
 * Videonun altında, sağda küçük kare tam ekran düğmesi (kendi satırı yok, başlığın hizasında): tam ekranda video kırpılmaz ve tarayıcı denetimleri görünür.
 */
const CROP = "absolute top-0 left-[-10%] h-[120%] w-[120%] max-w-none object-cover";
function CardVideo({ part }: { part: number }) {
  const { locale } = useLocale();
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  const v = pickPart(part, locale);
  if (!v) return null;
  const play = () => {
    setStarted(true);
    video.current?.play().catch(() => {});
  };
  const full = () => {
    const el = video.current as (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null;
    if (!el) return;
    play();
    if (!el.requestFullscreen) return el.webkitEnterFullscreen?.();
    el.requestFullscreen()
      .then(() => {
        el.controls = true;
        const off = () => {
          if (document.fullscreenElement) return;
          el.controls = false;
          document.removeEventListener("fullscreenchange", off);
        };
        document.addEventListener("fullscreenchange", off);
      })
      .catch(() => {});
  };
  return (
    <div className="relative z-[1]">
      <div className="group/v relative aspect-video overflow-hidden rounded-(--r-s1) bg-era-dark ring-1 ring-era-on-dark/10">
        <video
          ref={video}
          src={v.url}
          poster={posterOf(v.url)}
          preload="none"
          playsInline
          onPlay={(e) => {
            document.querySelectorAll("video").forEach((o) => o !== e.currentTarget && o.pause());
            setPlaying(true);
          }}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
          onClick={(e) => !e.currentTarget.controls && e.currentTarget.pause()}
          className={`${CROP} cursor-pointer`}
        />
        {!playing && (
          <button type="button" onClick={play} aria-label="Play" className="absolute inset-0 block h-full w-full overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {!started && <img src={posterOf(v.url)} alt="" loading="lazy" className={`${CROP} opacity-90 transition duration-700 group-hover/v:scale-105 group-hover/v:opacity-100`} />}
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-era-white/95 text-era-primary shadow-lg transition-transform duration-300 group-hover/v:scale-110">
                <span aria-hidden className="era-ring absolute inset-0 rounded-full bg-era-white/50" />
                <Play size={18} className="relative ml-0.5 fill-current" />
              </span>
            </span>
          </button>
        )}
      </div>
      <button
        type="button"
        onClick={full}
        aria-label="Fullscreen"
        className="absolute top-[calc(100%+10px)] right-0 z-[2] flex h-7 w-7 items-center justify-center rounded-[6px] bg-era-on-dark/10 text-era-on-dark ring-1 ring-era-on-dark/25 transition hover:bg-era-on-dark/20 active:scale-95"
      >
        <Maximize size={13} />
      </button>
    </div>
  );
}

/** Çözümlerimiz (menü ağacındaki 4 çözüm). Bölüm iki temada da koyu kalır. */
export function Solutions() {
  const { t } = useLocale();
  const s = t.solutions;
  // Kartların arkasında gezinen tek ışık katmanı: fare bir karttan ötekine geçince kayarak ona gider.
  const [glow, setGlow] = useState<{ x: number; y: number; w: number; h: number; slide: boolean } | null>(null);
  const wasVisible = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const hideGlow = () => {
    clearTimeout(timer.current);
    wasVisible.current = false;
    setGlow(null);
  };
  // fare: kartın üstündeyken; dokunma: sadece gerçek dokunuşta (kaydırma sayılmaz), birkaç saniye sonra söner
  const showGlow = (el: HTMLElement, touch: boolean) => {
    clearTimeout(timer.current);
    setGlow({ x: el.offsetLeft, y: el.offsetTop, w: el.offsetWidth, h: el.offsetHeight, slide: wasVisible.current });
    wasVisible.current = true;
    if (touch) timer.current = setTimeout(hideGlow, 2800);
  };
  // yerleşim değişince (döndürme, yeniden boyutlandırma) ölçü eskir: gizle
  useEffect(() => {
    const onResize = () => {
      clearTimeout(timer.current);
      wasVisible.current = false;
      setGlow(null);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(timer.current);
    };
  }, []);

  return (
    <section id="cozumler" className="relative bg-era-dark py-[100px] text-era-on-dark tab:py-[60px] mob:py-12 sm2:py-10">
      <div className="mx-auto w-full max-w-[1470px] px-[15px]">
        <div className="flex flex-col gap-14 mob:gap-10">
          <div className="mx-auto flex w-full max-w-[720px] flex-col items-center gap-4 text-center">
            <span className="flex items-center gap-2 rounded-full bg-era-on-dark/12 px-4 py-1.5 text-[13px] font-semibold tracking-[0.12em] text-era-on-dark uppercase">
              <i className="block h-1.5 w-1.5 rounded-full bg-era-accent" /> {s.eyebrow}
            </span>
            <Heading>{s.heading}</Heading>
            <Reveal variant="fade">
              <p className="text-era-silver">{s.lead}</p>
            </Reveal>
          </div>

          <div className="relative grid grid-cols-4 gap-6 tab:grid-cols-2 mob:grid-cols-1" onPointerLeave={(e) => { if (e.pointerType === "mouse") hideGlow(); }}>
            <span
              aria-hidden
              className="pointer-events-none absolute z-0 rounded-[34px] border border-era-on-dark/25 bg-era-on-dark/10"
              style={{
                left: (glow?.x ?? 0) - 12,
                top: (glow?.y ?? 0) - 12,
                width: (glow?.w ?? 0) + 24,
                height: (glow?.h ?? 0) + 24,
                opacity: glow ? 1 : 0,
                transition: glow?.slide
                  ? "left .35s cubic-bezier(.22,1,.36,1), top .35s cubic-bezier(.22,1,.36,1), width .35s cubic-bezier(.22,1,.36,1), height .35s cubic-bezier(.22,1,.36,1), opacity .2s"
                  : "opacity .2s",
              }}
            />
            {s.cards.map((c, i) => (
              <div
                key={c.title}
                className="relative z-[1] h-full"
                onPointerEnter={(e) => { if (e.pointerType === "mouse") showGlow(e.currentTarget, false); }}
                onPointerUp={(e) => { if (e.pointerType !== "mouse") showGlow(e.currentTarget, true); }}
              >
              <Reveal variant="up" delay={i * 110} className="h-full">
                <Spot className="ekado-dark-card flex h-full scroll-mt-28 flex-col gap-5 rounded-(--r-x) p-6">
                  <span id={ids[i]} className="-mt-24 block h-0 pt-24" aria-hidden />
                  <CardVideo part={coverPart[i]} />
                  <div className="relative z-[1] flex flex-1 flex-col gap-2">
                    <h3 className="text-[21px] leading-[1.2] font-medium tracking-[-0.01em]">{c.title}</h3>
                    <p className="text-[15px] leading-[1.55] text-era-silver">{c.text}</p>
                  </div>
                  <a
                    href={hrefs[i]}
                    data-topic={hrefs[i] === "#bize-ulasin" ? i : undefined}
                    className="group/more relative z-[1] mt-1 flex w-fit items-center gap-2 text-[15px] font-semibold text-era-on-dark no-underline"
                  >
                    {s.more}
                    <ArrowRight size={16} className="transition-transform duration-300 group-hover/more:translate-x-1.5" />
                  </a>
                </Spot>
              </Reveal>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
