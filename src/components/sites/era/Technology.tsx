"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, EyeOff, Fingerprint, Gem, Package, Play, Smartphone, Timer, Volume2, VolumeX } from "lucide-react";
import { locales, useLocale, type Locale } from "@/i18n/useLocale";
import { Chaser } from "./Chaser";
import { Spot } from "./Spot";
import { Heading, Reveal } from "./ui";

const featureIcons = [Fingerprint, Smartphone, EyeOff, Timer, Gem];
/** Ürün görseli üzerindeki noktalar (görsele göre yüzde): şifre ekranı, parmak izi, yedek anahtar deliği */
const spots = [
  { x: "64%", y: "13%" },
  { x: "69%", y: "45%" },
  { x: "38%", y: "71%" },
];

/** Video sessiz; ses dosyası seçilen dile göre ayrıca çalınır ve videoyla eşlenir. */
function PromoVideo({ title, soon }: { title: string; soon: string }) {
  const { locale } = useLocale();
  const [ok, setOk] = useState(true);
  const [lang, setLang] = useState<Locale | null>(null);
  const [muted, setMuted] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  const audio = useRef<HTMLAudioElement>(null);
  const cur = lang ?? locale;

  // ses ve video aynı yerde dursun
  const sync = useCallback((force = false) => {
    const v = video.current;
    const a = audio.current;
    if (!v || !a) return;
    if (force || Math.abs(a.currentTime - v.currentTime) > 0.25) a.currentTime = v.currentTime;
  }, []);

  useEffect(() => {
    const v = video.current;
    const a = audio.current;
    if (!v || !a) return;
    const play = () => {
      sync(true);
      a.play().catch(() => {});
    };
    const pause = () => a.pause();
    const seek = () => sync(true);
    const tick = () => sync();
    v.addEventListener("play", play);
    v.addEventListener("playing", play);
    v.addEventListener("pause", pause);
    v.addEventListener("waiting", pause);
    v.addEventListener("seeked", seek);
    v.addEventListener("timeupdate", tick);
    v.addEventListener("ended", pause);
    return () => {
      v.removeEventListener("play", play);
      v.removeEventListener("playing", play);
      v.removeEventListener("pause", pause);
      v.removeEventListener("waiting", pause);
      v.removeEventListener("seeked", seek);
      v.removeEventListener("timeupdate", tick);
      v.removeEventListener("ended", pause);
    };
  }, [sync]);

  // dil değişince yeni ses aynı saniyeden devam etsin
  useEffect(() => {
    const v = video.current;
    const a = audio.current;
    if (!v || !a) return;
    a.load();
    a.currentTime = v.currentTime;
    if (!v.paused) a.play().catch(() => {});
  }, [cur]);

  return (
    <div className="relative aspect-video overflow-hidden rounded-(--r-x) bg-era-dark ring-1 ring-era-line">
      {ok ? (
        <>
          <video
            ref={video}
            className="h-full w-full object-cover"
            src="/videos/akilli-kapi.mp4"
            poster="/sites/punn/lock-product.jpg"
            controls
            muted
            playsInline
            preload="metadata"
            aria-label={title}
            onError={() => setOk(false)}
          />
          <audio ref={audio} src={`/videos/ses-${cur}.mp3`} preload="auto" muted={muted} />
          <div className="absolute top-3 right-3 z-[3] flex items-center gap-1 rounded-full bg-era-dark/70 p-1 backdrop-blur-md mob:top-2 mob:right-2">
            {locales.map((l) => (
              <button
                key={l.code}
                type="button"
                onClick={() => setLang(l.code)}
                aria-pressed={cur === l.code}
                aria-label={l.label}
                className={`rounded-full px-3 py-1 text-[12px] font-bold tracking-wide uppercase transition-colors ${
                  cur === l.code ? "bg-era-btn text-era-on-btn" : "text-era-on-dark/80 hover:text-era-on-dark"
                }`}
              >
                {l.code}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setMuted((m) => !m)}
              aria-label={muted ? "Sesi aç" : "Sesi kapat"}
              className="flex h-7 w-7 items-center justify-center rounded-full text-era-on-dark/80 hover:text-era-on-dark"
            >
              {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
            </button>
          </div>
        </>
      ) : (
        <div className="punn-feature relative flex h-full w-full flex-col items-center justify-center gap-5 text-era-on-dark">
          <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-era-on-dark/15">
            <span className="era-ring absolute inset-0 rounded-full border-2 border-era-on-dark/50" />
            <Play size={32} fill="currentColor" className="ml-1" />
          </span>
          <div className="era-wave flex h-8 items-center gap-[3px] text-era-on-dark/70" aria-hidden>
            {Array.from({ length: 26 }).map((_, k) => (
              <i
                key={k}
                style={{
                  animationDuration: `${0.7 + ((k * 37) % 7) / 10}s`,
                  animationDelay: `-${((k * 53) % 10) / 10}s`,
                  opacity: 0.45 + ((k * 29) % 10) / 20,
                }}
              />
            ))}
          </div>
          <span className="text-[15px] font-semibold tracking-wide opacity-85">{soon}</span>
        </div>
      )}
    </div>
  );
}

export function Technology() {
  const { t } = useLocale();
  const k = t.technology;
  // ışıklı kare sırayla bir sonraki kartın kenarına geçer (en üstten başlar, sondan sonra başa döner)
  const [active, setActive] = useState(0);
  const next = useCallback(() => setActive((v) => (v + 1) % 5), []);

  return (
    <section id="teknolojimiz" className="relative py-[70px] tab:py-[50px] mob:py-10 sm2:py-[35px]">
      <span id="akilli-kilit" aria-hidden className="absolute -top-24 block h-0" />
      <div className="mx-auto w-full max-w-[1470px] px-[15px]">
        <div className="flex flex-col gap-14 mob:gap-10">
          <div className="mx-auto flex w-full max-w-[860px] flex-col items-center gap-4 text-center">
            <span className="flex items-center gap-2 rounded-full bg-era-secondary px-4 py-1.5 text-[13px] font-semibold tracking-[0.12em] text-era-primary-ink uppercase">
              <i className="block h-1.5 w-1.5 rounded-full bg-era-accent" /> {k.eyebrow}
            </span>
            <span className="text-[14px] font-semibold tracking-[0.1em] text-era-gray uppercase">{k.sub}</span>
            <Heading>{k.heading}</Heading>
            <Reveal variant="fade">
              <p className="text-era-gray">{k.lead}</p>
            </Reveal>
          </div>

          <div className="mx-auto grid w-full max-w-[1200px] grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-start gap-12 tab:grid-cols-1">
            {/* özellikler */}
            <div className="flex flex-col gap-3">
              <span className="px-1 text-[13px] font-semibold tracking-[0.12em] text-era-gray uppercase">{k.featuresTitle}</span>
              {k.features.map((f, i) => {
                const Icon = featureIcons[i];
                return (
                  <Reveal key={f.title} variant="up" delay={i * 90}>
                    <Spot className="punn-panel group/f flex gap-4 rounded-(--r-r) px-5 py-4">
                      <Chaser run={active === i} onDone={next} />
                      <span className="relative z-[1] flex h-12 w-12 flex-none items-center justify-center rounded-full bg-era-white text-era-primary-ink ring-1 ring-era-line transition-transform duration-500 group-hover/f:scale-110">
                        <Icon size={22} strokeWidth={1.8} />
                      </span>
                      <div className="relative z-[1] min-w-0">
                        <h3 className="text-[17px] leading-snug font-bold text-era-black">{f.title}</h3>
                        <p className="mt-1 text-[15px] leading-[1.55] text-era-gray">{f.text}</p>
                      </div>
                    </Spot>
                  </Reveal>
                );
              })}
            </div>

            {/* ürün görseli ve noktalar */}
            <div className="flex flex-col gap-5">
              <Reveal variant="scale">
                <div className="punn-panel rounded-(--r-x) p-4">
                  <div className="era-float relative overflow-hidden rounded-[18px] bg-era-on-dark">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/sites/punn/lock-product.jpg" alt={k.sub} className="block h-auto w-full" />
                    {spots.map((s, i) => (
                      <span
                        key={i}
                        className="group/hs absolute -translate-x-1/2 -translate-y-1/2"
                        style={{ left: s.x, top: s.y }}
                      >
                        <span className="relative flex h-5 w-5 items-center justify-center">
                          <span className="era-ring absolute inset-0 rounded-full bg-era-primary/50" style={{ animationDelay: `${i * 0.6}s` }} />
                          <span className="relative block h-3 w-3 rounded-full bg-era-primary ring-2 ring-era-on-dark" />
                        </span>
                        <span
                          className="era-hs-label absolute top-1/2 left-7 -translate-y-1/2 rounded-full bg-era-dark px-3 py-1 text-[12px] font-semibold whitespace-nowrap text-era-on-dark shadow-[0_6px_16px_var(--c-shadow)] group-hover/hs:!animate-none group-hover/hs:!opacity-100"
                          style={{ animationDelay: `${i * 3}s` }}
                        >
                          {k.hotspots[i]}
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal variant="up" delay={120}>
                <div className="punn-panel flex items-center gap-4 rounded-(--r-r) p-3 pr-6">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/sites/punn/lock-app.jpg" alt="" className="h-24 w-24 flex-none rounded-2xl bg-era-on-dark object-cover" />
                  <p className="text-[16px] leading-snug font-semibold text-era-black">{k.appCaption}</p>
                </div>
              </Reveal>
            </div>
          </div>

          {/* paket içeriği ve video */}
          <div className="mx-auto grid w-full max-w-[1200px] grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)] items-stretch gap-6 tab:grid-cols-1">
            <Reveal variant="left" className="h-full">
              <div className="punn-panel flex h-full flex-col gap-5 rounded-(--r-x) p-7">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-era-white text-era-primary-ink ring-1 ring-era-line">
                    <Package size={20} strokeWidth={1.8} />
                  </span>
                  <h3 className="text-[21px] font-bold text-era-black">{k.boxTitle}</h3>
                </div>
                <ul className="flex flex-col gap-3">
                  {k.box.map((b) => (
                    <li key={b} className="flex gap-3 text-[16px] leading-[1.45] text-era-black">
                      <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-era-secondary text-era-success">
                        <Check size={12} strokeWidth={3} />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal variant="right" className="h-full">
              <PromoVideo title={k.videoTitle} soon={k.videoSoon} />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
