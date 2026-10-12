"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, ChevronLeft, ChevronRight, EyeOff, Fingerprint, Gem, Package, Play, Smartphone, Timer, Volume2, VolumeX } from "lucide-react";
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
  // Sert atlama sesi keser (özellikle mobilde): küçük sapma çalma hızıyla, yalnız büyük sapma atlamayla giderilir.
  const sync = useCallback((force = false) => {
    const v = video.current;
    const a = audio.current;
    if (!v || !a) return;
    const drift = a.currentTime - v.currentTime;
    if (force || Math.abs(drift) > 1) {
      a.currentTime = v.currentTime;
      a.playbackRate = 1;
    } else if (Math.abs(drift) > 0.15) {
      a.playbackRate = drift > 0 ? 0.95 : 1.05;
    } else if (a.playbackRate !== 1) {
      a.playbackRate = 1;
    }
  }, []);

  useEffect(() => {
    const v = video.current;
    const a = audio.current;
    if (!v || !a) return;
    const play = () => {
      // "playing" her takılmadan sonra da gelir; ses zaten doğru yerdeyse dokunma
      if (a.paused) sync(Math.abs(a.currentTime - v.currentTime) > 0.3);
      else sync();
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

  // ses aç-kapa düğmesi hem konuşmayı hem videonun müziğini/efektlerini kapatır
  useEffect(() => {
    if (video.current) video.current.muted = muted;
  }, [muted]);

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
    <div className="flex flex-col gap-3">
      {ok && (
        <div className="flex justify-end">
        <div className="flex items-center gap-1 rounded-full bg-era-dark p-1">
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
        </div>
      )}
      <div className="relative aspect-video overflow-hidden rounded-(--r-x) bg-era-dark ring-1 ring-era-line">
      {ok ? (
        <>
          <video
            ref={video}
            className="h-full w-full object-cover"
            src="/videos/akilli-kapi.mp4"
            poster="/videos/akilli-kapi-kapak.jpg"
            controls
            playsInline
            preload="metadata"
            aria-label={title}
            onError={() => setOk(false)}
          />
          <audio ref={audio} src={`/videos/ses-${cur}.mp3`} preload="auto" muted={muted} />
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
    </div>
  );
}

/** Galeri: ürünün dört görseli (küçük, ileri-geri). Noktalar yalnızca ilk görselde. */
const slides = ["/sites/punn/lock-product.jpg", "/sites/punn/lock-options.jpg", "/sites/punn/lock-security.jpg", "/sites/punn/lock-app.jpg"];

function Gallery({ captions, hotspotLabels, alt }: { captions: string[]; hotspotLabels: string[]; alt: string }) {
  const [idx, setIdx] = useState(0);
  const go = useCallback((d: number) => setIdx((v) => (v + d + slides.length) % slides.length), []);
  return (
    <div className="punn-panel flex flex-col gap-3 rounded-(--r-x) p-3">
      <div className="relative overflow-hidden rounded-[18px] bg-era-on-dark">
        <div className="flex transition-transform duration-500 ease-[cubic-bezier(.22,.61,.36,1)]" style={{ transform: `translateX(-${idx * 100}%)` }}>
          {slides.map((src, n) => (
            <div key={src} className="flex aspect-square w-full flex-none items-center justify-center">
              {n === 0 ? (
                <div className="relative w-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt={captions[n] ?? alt} className="block h-auto w-full" />
                  {spots.map((sp, i) => (
                    <span key={i} className="group/hs absolute -translate-x-1/2 -translate-y-1/2" style={{ left: sp.x, top: sp.y }}>
                      <span className="relative flex h-5 w-5 items-center justify-center">
                        <span className="era-ring absolute inset-0 rounded-full bg-era-primary/50" style={{ animationDelay: `${i * 0.6}s` }} />
                        <span className="relative block h-3 w-3 rounded-full bg-era-primary ring-2 ring-era-on-dark" />
                      </span>
                      <span
                        className="era-hs-label absolute top-1/2 left-7 -translate-y-1/2 rounded-full bg-era-dark px-3 py-1 text-[12px] font-semibold whitespace-nowrap text-era-on-dark shadow-[0_6px_16px_var(--c-shadow)] group-hover/hs:!animate-none group-hover/hs:!opacity-100"
                        style={{ animationDelay: `${i * 3}s` }}
                      >
                        {hotspotLabels[i]}
                      </span>
                    </span>
                  ))}
                </div>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={src} alt={captions[n] ?? alt} className="block h-full w-full object-cover" />
              )}
            </div>
          ))}
        </div>
        {[-1, 1].map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => go(d)}
            aria-label={d < 0 ? "←" : "→"}
            className={`absolute top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-era-dark/75 text-era-on-dark backdrop-blur-sm transition hover:scale-110 hover:bg-era-primary active:scale-95 ${d < 0 ? "left-2.5" : "right-2.5"}`}
          >
            {d < 0 ? <ChevronLeft size={22} /> : <ChevronRight size={22} />}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-3 px-1">
        <div className="flex gap-2">
          {slides.map((src, n) => (
            <button
              key={src}
              type="button"
              onClick={() => setIdx(n)}
              aria-label={captions[n]}
              aria-current={idx === n}
              className={`h-12 w-12 flex-none overflow-hidden rounded-xl bg-era-on-dark ring-2 transition duration-300 ${idx === n ? "ring-era-primary" : "opacity-60 ring-transparent hover:opacity-100"}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
        <p key={idx} className="min-w-0 flex-1 text-right text-[14px] leading-tight font-semibold text-era-black [animation:era-pop-in_.4s_both]">
          {captions[idx]}
        </p>
      </div>
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
    <section id="akilli-kilit" className="relative py-[70px] tab:py-[50px] mob:py-10 sm2:py-[35px]">
      <span aria-hidden className="absolute -top-24 block h-0" />
      <div className="mx-auto w-full max-w-[1470px] px-[15px]">
        <div className="flex flex-col gap-10 mob:gap-8">
          <div className="mx-auto flex w-full max-w-[860px] flex-col items-center gap-4 text-center">
            <span className="flex items-center gap-2 rounded-full bg-era-secondary px-4 py-1.5 text-[13px] font-semibold tracking-[0.12em] text-era-primary-ink uppercase">
              <i className="block h-1.5 w-1.5 rounded-full bg-era-accent" /> {k.eyebrow}
            </span>
            <span className="text-[14px] font-semibold tracking-[0.1em] text-era-gray uppercase">{k.sub}</span>
            <Heading>{k.heading}</Heading>
            <Reveal variant="fade" className="w-full">
              <p className="mx-auto w-fit max-w-full border-x-2 border-era-primary px-5 text-era-gray mob:px-4">{k.lead}</p>
            </Reveal>
          </div>

          {/* video en üstte */}
          <Reveal variant="scale" className="mx-auto w-full max-w-[760px]">
            <PromoVideo title={k.videoTitle} soon={k.videoSoon} />
          </Reveal>

          {/* sol: küçük galeri, sağ: öne çıkan özellikler (dar kartlar) */}
          <div className="mx-auto grid w-full max-w-[1060px] grid-cols-[minmax(0,.95fr)_minmax(0,1fr)] items-start gap-8 tab:max-w-[560px] tab:grid-cols-1">
            <Reveal variant="left">
              <Gallery captions={k.gallery} hotspotLabels={k.hotspots} alt={k.sub} />
            </Reveal>

            <div className="flex flex-col gap-2.5">
              <span className="px-1 text-[13px] font-semibold tracking-[0.12em] text-era-gray uppercase">{k.featuresTitle}</span>
              {k.features.map((f, i) => {
                const Icon = featureIcons[i];
                return (
                  <Reveal key={f.title} variant="up" delay={i * 90}>
                    <Spot className="punn-panel group/f flex gap-3.5 rounded-(--r-r) px-4 py-3">
                      <Chaser run={active === i} onDone={next} />
                      <span className="relative z-[1] flex h-10 w-10 flex-none items-center justify-center rounded-full bg-era-white text-era-primary-ink ring-1 ring-era-line transition-transform duration-500 group-hover/f:scale-110">
                        <Icon size={19} strokeWidth={1.8} />
                      </span>
                      <div className="relative z-[1] min-w-0">
                        <h3 className="text-[15.5px] leading-snug font-bold text-era-black">{f.title}</h3>
                        <p className="mt-0.5 text-[13.5px] leading-[1.5] text-era-gray">{f.text}</p>
                      </div>
                    </Spot>
                  </Reveal>
                );
              })}
            </div>
          </div>

          {/* paket içeriği: ince şerit */}
          <Reveal variant="up" className="mx-auto w-full max-w-[1060px]">
            <div className="punn-panel flex flex-wrap items-center gap-x-8 gap-y-3 rounded-(--r-r) px-5 py-4 mob:flex-col mob:items-start">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-era-white text-era-primary-ink ring-1 ring-era-line">
                  <Package size={19} strokeWidth={1.8} />
                </span>
                <h3 className="text-[17px] font-bold text-era-black">{k.boxTitle}</h3>
              </div>
              <ul className="flex flex-1 flex-wrap gap-x-6 gap-y-2 mob:flex-col">
                {k.box.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-[14.5px] text-era-black">
                    <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-era-secondary text-era-success">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
