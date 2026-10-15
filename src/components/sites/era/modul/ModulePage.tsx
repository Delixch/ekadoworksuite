"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowRight, Check, Clapperboard, Eye, Maximize, Pause, Play } from "lucide-react";
import { useLocale } from "@/i18n/useLocale";
import { moduleCommon, moduleHref, moduleOrder, type ModuleCommon, type QaItem } from "@/i18n/modules/common";
import { moduleTexts } from "@/i18n/modules";
import { langsOf, moduleFilms, pickPart, posterOf, type Film, type ModuleId, type VideoLang } from "@/lib/module-videos";
import { Footer } from "../Footer";
import { Navbar } from "../Navbar";
import { Reveal } from "../ui";
import { GlowGrid } from "../GlowGrid";
import { QaIcon } from "../betrieb/icons";

const mmss = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

/** Bir soru ve programdan cevabı. "Videoda izle" soldaki videoyu bu konunun başladığı ana atlatır. */
function Qa({ it, c, at, playing, onWatch, canWatch }: { it: QaItem; c: ModuleCommon; at?: number; playing: boolean; onWatch: () => void; canWatch: boolean }) {
  return (
    <div id={`soru-${it.key}`} className="flex scroll-mt-[110px] flex-col gap-4">
      <Reveal variant="right" className="flex justify-end">
        <p className="max-w-[540px] rounded-[22px] rounded-br-[6px] bg-era-primary px-5 py-3.5 text-[18px] leading-snug font-medium text-era-on-dark shadow-[0_10px_26px_var(--c-shadow-soft)]">{it.question}</p>
      </Reveal>
      <Reveal variant="up" delay={120} className="flex items-start gap-3">
        <span className={`flex h-10 w-10 flex-none items-center justify-center rounded-full ring-4 ring-era-white transition-colors duration-500 ${playing ? "bg-era-primary text-era-on-dark" : "bg-era-coolblue text-era-primary-ink"}`}>
          <QaIcon k={it.key} size={18} />
        </span>
        <div className={`flex w-full flex-col gap-4 rounded-[22px] rounded-tl-[6px] bg-era-white p-5 ring-1 transition-shadow duration-500 ${playing ? "ring-era-primary shadow-[0_14px_36px_var(--c-shadow)]" : "ring-era-lightgray shadow-[0_10px_28px_var(--c-shadow-soft)]"}`}>
          <span className="text-[12px] font-semibold tracking-wider text-era-gray uppercase">Ekado · {it.menu}</span>
          <p className="text-[17px] leading-[1.6] text-era-black">{it.answer}</p>
          <details className="group/d">
            <summary className="flex w-fit cursor-pointer list-none items-center gap-2 text-[14px] font-semibold text-era-primary-ink [&::-webkit-details-marker]:hidden">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-era-secondary text-[14px] leading-none transition-transform group-open/d:rotate-45">+</span>
              {c.more}
            </summary>
            <ul className="mt-3 flex flex-col gap-2">
              {it.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-[15px] leading-snug text-era-gray">
                  <Check size={16} strokeWidth={3} className="mt-0.5 flex-none text-era-primary-ink" />
                  {f}
                </li>
              ))}
            </ul>
          </details>
          {canWatch && (
            <button type="button" onClick={onWatch} className="flex w-fit items-center gap-2 rounded-[8px] bg-era-secondary px-4 py-2 text-[14px] font-semibold text-era-black transition hover:bg-era-primary hover:text-era-on-dark">
              <Play size={14} className="fill-current" />
              {at ? c.watchFrom.replace("{t}", mmss(at)) : c.watch}
            </button>
          )}
        </div>
      </Reveal>
    </div>
  );
}

/** Bir video ve anlattığı konuların soru-cevapları. Video solda sabit, sorular sağda akar. */
function FilmBlock({ film, index, total, info, items, c }: { film: Film; index: number; total: number; info: { title: string; text: string }; items: QaItem[]; c: ModuleCommon }) {
  const { locale } = useLocale();
  const [lang, setLang] = useState<VideoLang | undefined>();
  const [playing, setPlaying] = useState(false);
  // dil değişince video yeniden yüklenir; oynuyorduysa yeni dilde baştan oynamaya devam eder
  const [resume, setResume] = useState(false);
  const [now, setNow] = useState<string | null>(null);
  const video = useRef<HTMLVideoElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const pending = useRef(0);
  const v = pickPart(film.part, locale, lang);
  const langs = langsOf(film.part);
  // İngilizce saniye yoksa Almancanınki kullanılır (iki video aynı akışta)
  const startOf = (k: string) => (v ? (film.at[k]?.[v.lang] ?? film.at[k]?.de) : undefined);

  const play = (t: number) => {
    pending.current = t;
    const el = video.current;
    if (el) {
      el.currentTime = t;
      el.play().catch(() => {});
    }
    if (window.innerWidth < 992) box.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const toggle = () => {
    const el = video.current;
    if (!el) return;
    if (el.paused) el.play().catch(() => {});
    else el.pause();
  };
  // tam ekran: video öğesinin kendisi (iPhone Safari'de webkitEnterFullscreen)
  const full = () => {
    const el = video.current as (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null;
    if (!el) return;
    if (!el.requestFullscreen) return el.webkitEnterFullscreen?.();
    // tam ekranda tarayıcının kendi denetimleri (ileri-geri sarma, ses) görünür; çıkınca yine gizlenir
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
  const pickLang = (l: VideoLang) => {
    if (l === v?.lang) return;
    pending.current = 0;
    setResume(playing);
    setPlaying(false);
    setLang(l);
  };

  // Oynarken hangi konunun anlatıldığını bul: başlangıcı geçilmiş son konu
  const onTime = () => {
    const el = video.current;
    if (!el || !v) return;
    let cur: string | null = null;
    for (const k of film.covers) {
      const s = film.at[k]?.[v.lang] ?? film.at[k]?.de;
      if (s != null && el.currentTime >= s) cur = k;
    }
    setNow(cur);
  };

  return (
    <section className="py-16 tab:py-10">
      <div className="mx-auto w-full max-w-[1300px] px-[15px]">
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] gap-12 tab:grid-cols-1 tab:gap-8">
          {/* sol: video ve konu listesi */}
          <div ref={box} className="sticky top-[90px] flex h-fit flex-col gap-5 self-start tab:static tab:scroll-mt-[80px]">
            <div className="flex items-end gap-4">
              <span className="text-[clamp(3.6rem,6vw,5rem)] leading-[0.8] font-light tracking-[-0.05em] text-era-primary tabular-nums">{String(index + 1).padStart(2, "0")}</span>
              <div className="flex flex-col gap-1">
                <span className="text-[13px] font-semibold tracking-[0.12em] text-era-gray uppercase tabular-nums">
                  {c.film} {index + 1} / {total}
                </span>
                <h2 className="text-[clamp(1.6rem,2.8vw,2.2rem)] leading-tight font-semibold tracking-[-0.02em] text-era-black">{info.title}</h2>
              </div>
            </div>
            <p className="text-[16px] leading-[1.6] text-era-gray">{info.text}</p>

            {v ? (
              <div className="flex flex-col gap-2.5">
                {/* dil kareleri ve oynat/durdur: videonun dışında, üstünde (Adnan 2026-10-15: videonun üstünde düğme olmasın) */}
                <div className="flex items-center justify-end gap-1.5">
                  {langs.length > 1 &&
                    langs.map((l) => (
                      <button
                        key={l}
                        type="button"
                        onClick={() => pickLang(l)}
                        aria-pressed={v.lang === l}
                        className={`flex h-7 min-w-7 items-center justify-center rounded-[6px] px-2 text-[11px] font-normal tracking-wider uppercase ring-1 transition-colors ${v.lang === l ? "bg-era-dark text-era-on-dark ring-era-dark" : "bg-era-white text-era-black ring-era-lightgray hover:ring-era-primary"}`}
                      >
                        {l}
                      </button>
                    ))}
                  <button
                    type="button"
                    onClick={toggle}
                    aria-label={playing ? "Pause" : "Play"}
                    className="ml-1 flex h-7 w-7 items-center justify-center rounded-[6px] bg-era-primary text-era-on-dark shadow-[0_4px_12px_var(--c-shadow-soft)] transition hover:brightness-110 active:scale-95"
                  >
                    {playing ? <Pause size={13} className="fill-current" /> : <Play size={13} className="ml-0.5 fill-current" />}
                  </button>
                  <button
                    type="button"
                    onClick={full}
                    aria-label="Fullscreen"
                    className="flex h-7 w-7 items-center justify-center rounded-[6px] bg-era-white text-era-black ring-1 ring-era-lightgray transition hover:ring-era-primary active:scale-95"
                  >
                    <Maximize size={13} />
                  </button>
                </div>
                {/* videolarda (1920x1080) uygulama ekranı x 175-1745 arasında; kutu 1600x1080 oranında, object-cover iki yandan 160 px kırpar (boş siyah kenar gider, ok/altyazı içeride kalır) */}
                <div className="relative aspect-[1600/1080] w-full overflow-hidden rounded-(--r-x) bg-era-device shadow-[0_22px_54px_var(--c-shadow)]">
                  <video
                    ref={video}
                    key={v.url}
                    src={v.url}
                    poster={posterOf(v.url)}
                    preload="metadata"
                    autoPlay={resume}
                    playsInline
                    onLoadedMetadata={(e) => {
                      if (pending.current) e.currentTarget.currentTime = pending.current;
                    }}
                    onTimeUpdate={onTime}
                    onPlay={(e) => {
                      // biri başlayınca sayfadaki diğer videolar susar
                      document.querySelectorAll("video").forEach((o) => o !== e.currentTarget && o.pause());
                      setPlaying(true);
                    }}
                    onPause={() => setPlaying(false)}
                    onEnded={() => setPlaying(false)}
                    onClick={(e) => !e.currentTarget.controls && toggle()}
                    className="h-full w-full cursor-pointer object-cover [&:fullscreen]:object-contain"
                  />
                </div>
              </div>
            ) : (
              <div className="flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-(--r-x) border border-dashed border-era-cute bg-era-secondary/60 px-6 text-center text-era-gray">
                <Clapperboard size={30} strokeWidth={1.6} className="text-era-primary-ink" />
                <span className="text-[14px] font-semibold tracking-[0.12em] uppercase">{c.soon}</span>
                {film.part == null && <span className="max-w-[360px] text-[14px] leading-snug">{c.noVideo}</span>}
              </div>
            )}

            {items.length > 1 && (
              <div className="flex flex-col gap-2">
                <span className="text-[12px] font-semibold tracking-[0.12em] text-era-gray uppercase">{c.topics}</span>
                <ul className="flex flex-wrap gap-2">
                  {items.map((it) => {
                                      const on = now === it.key;
                    return (
                      <li key={it.key}>
                        <a
                          href={`#soru-${it.key}`}
                          className={`flex items-center gap-2 rounded-[8px] px-3 py-1.5 text-[14px] font-medium no-underline ring-1 transition-colors duration-300 ${on ? "bg-era-primary text-era-on-dark ring-era-primary" : "bg-era-white text-era-black ring-era-lightgray hover:bg-era-secondary"}`}
                        >
                          <QaIcon k={it.key} size={15} />
                          <span className="max-w-[260px] truncate">{it.question}</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>

          {/* sağ: soru-cevaplar */}
          <div className="flex flex-col gap-12 tab:gap-9">
            {items.map((it) => (
              <Qa key={it.key} it={it} c={c} at={startOf(it.key)} playing={now === it.key} canWatch={!!v} onWatch={() => play(startOf(it.key) ?? 0)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Modül sayfası (/modul/<id>): soru-cevap, her soru bir videoya ve o videonun saniyesine bağlı.
 * Videolar: src/lib/module-videos.ts, metinler: src/i18n/modules/<id>.ts
 */
export function ModulePage({ id }: { id: ModuleId }) {
  const { locale, t: site } = useLocale();
  const c = moduleCommon[locale];
  const t = moduleTexts[id][locale];
  const films = moduleFilms[id];

  return (
    <div className="overflow-x-clip">
      <Navbar />
      <main>
        <section className="relative bg-[radial-gradient(60%_45%_at_80%_0%,var(--c-sky),transparent)] pt-[130px] pb-8 tab:pt-[100px]">
          <div className="mx-auto flex w-full max-w-[1300px] flex-col items-start gap-6 px-[15px]">
            <span className="era-in-up flex w-fit items-center gap-2 rounded-full bg-era-secondary px-4 py-1.5 text-[13px] font-semibold tracking-[0.12em] text-era-primary-ink uppercase">
              <i className="block h-1.5 w-1.5 rounded-full bg-era-accent" /> {c.module} · {c.ask}
            </span>
            <h1 className="era-in-up text-[clamp(2.6rem,6vw,5rem)] leading-[1.02] font-semibold tracking-[-0.035em] text-balance text-era-black" style={{ animationDelay: ".08s" }}>
              {t.heading}
            </h1>
            <p className="era-in-up max-w-[780px] text-[clamp(1.1rem,1.6vw,1.3rem)] leading-[1.6] text-era-gray" style={{ animationDelay: ".16s" }}>
              {t.lead}
            </p>
            <div className="era-in-up flex max-w-[820px] items-start gap-4 rounded-(--r-x) bg-era-white p-5 ring-1 ring-era-lightgray shadow-[0_12px_32px_var(--c-shadow-soft)]" style={{ animationDelay: ".24s" }}>
              <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-era-coolblue text-era-primary-ink">
                <Eye size={20} />
              </span>
              <div className="flex flex-col gap-1">
                <strong className="text-[18px] font-semibold text-era-black">{c.pictureTitle}</strong>
                <p className="text-[16px] leading-[1.6] text-era-gray">{c.pictureText}</p>
              </div>
            </div>
          </div>
        </section>

        {films.map((f, i) => (
          <FilmBlock
            key={i}
            film={f}
            index={i}
            total={films.length}
            info={t.films[i]}
            items={f.covers.map((k) => t.items.find((it) => it.key === k)).filter((it): it is QaItem => !!it)}
            c={c}
          />
        ))}

        {/* diğer modüller */}
        <section className="py-10">
          <div className="mx-auto flex w-full max-w-[1300px] flex-col gap-5 px-[15px]">
            <span className="text-[13px] font-semibold tracking-[0.12em] text-era-gray uppercase">{c.others}</span>
            <GlowGrid as="ul" className="grid grid-cols-4 gap-4 tab:grid-cols-1">
              <li data-glow className="relative z-[1]">
                <Link href="/moduler" className="group/m flex h-full items-center justify-between gap-4 rounded-(--r-x) bg-era-coolblue p-6 text-[19px] font-semibold text-era-primary-ink no-underline ring-1 ring-era-lightgray transition hover:-translate-y-0.5 hover:ring-era-primary">
                  {site.nav.solutionItems[0]}
                  <ArrowRight size={20} className="flex-none transition-transform group-hover/m:translate-x-1" />
                </Link>
              </li>
              {moduleOrder
                .filter((m) => m !== id)
                .map((m) => (
                  <li key={m} data-glow className="relative z-[1]">
                    <Link href={moduleHref(m)} className="group/m flex h-full items-center justify-between gap-4 rounded-(--r-x) bg-era-white p-6 text-[19px] font-semibold text-era-black no-underline ring-1 ring-era-lightgray transition hover:-translate-y-0.5 hover:ring-era-primary">
                      {moduleTexts[m][locale].title}
                      <ArrowRight size={20} className="flex-none text-era-primary-ink transition-transform group-hover/m:translate-x-1" />
                    </Link>
                  </li>
                ))}
            </GlowGrid>
          </div>
        </section>

        <section className="py-16 tab:py-10">
          <div className="mx-auto flex w-full max-w-[1270px] flex-col items-start gap-5 rounded-(--r-mx) bg-era-primary p-12 text-era-on-dark mob:mx-[15px] mob:w-auto mob:p-7">
            <h2 className="text-[clamp(1.8rem,3.4vw,2.8rem)] leading-tight font-semibold tracking-[-0.02em]">{c.ctaHeading}</h2>
            <p className="max-w-[620px] text-[18px] leading-[1.6] opacity-85">{c.ctaText}</p>
            <Link href="/#bize-ulasin" className="flex h-12 items-center gap-2 rounded-(--r-s1) bg-era-white px-6 text-[17px] font-semibold text-era-black no-underline transition hover:-translate-y-0.5">
              {c.ctaButton} <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
