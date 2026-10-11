"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, BookOpen, Building2, Languages, Loader2, MessagesSquare, Plug, Rocket, UserCheck, type LucideIcon } from "lucide-react";
import { commonT } from "@/i18n/panel/common";
import { setupT } from "@/i18n/panel/setup";
import { usePT } from "@/i18n/panel/use";
import { getSetup, saveSetup } from "@/lib/panel/api";
import type { SetupConfig } from "@/lib/panel/types";
import { usePanel } from "./context";
import { Btn, Card, Chip, useCountUp } from "./ui";
import { Preview } from "./setup/Preview";
import { STEP_IDS, isDone, totalPercent } from "./setup/progress";
import { CheckMark, type StepId } from "./setup/shared";
import { StepChannels } from "./setup/StepChannels";
import { StepHandoff } from "./setup/StepHandoff";
import { StepHotel } from "./setup/StepHotel";
import { StepIntegrations } from "./setup/StepIntegrations";
import { StepKnowledge } from "./setup/StepKnowledge";
import { StepLanguage } from "./setup/StepLanguage";
import { StepPublish } from "./setup/StepPublish";

const icons: Record<StepId, LucideIcon> = {
  hotel: Building2,
  channels: MessagesSquare,
  language: Languages,
  knowledge: BookOpen,
  handoff: UserCheck,
  integrations: Plug,
  publish: Rocket,
};

const R = 52;
const CIRC = 2 * Math.PI * R;

/** Büyük dairesel ilerleme halkası: sayı ve halka birlikte dolar */
function Ring({ pct, label }: { pct: number; label: string }) {
  const v = useCountUp(pct, 1000);
  return (
    <div className="relative h-32 w-32 flex-none tab:h-[72px] tab:w-[72px]">
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90" aria-hidden>
        <defs>
          <linearGradient id="setup-ring-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" style={{ stopColor: "var(--c-primary)" }} />
            <stop offset="1" style={{ stopColor: "var(--c-accent)" }} />
          </linearGradient>
        </defs>
        <circle cx="60" cy="60" r={R} fill="none" strokeWidth="9" className="stroke-era-lightgray" />
        <circle
          cx="60"
          cy="60"
          r={R}
          fill="none"
          strokeWidth="9"
          strokeLinecap="round"
          stroke="url(#setup-ring-grad)"
          strokeDasharray={CIRC}
          strokeDashoffset={CIRC * (1 - v / 100)}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center leading-none" role="img" aria-label={`${pct}% ${label}`}>
        <span className="text-[28px] font-extrabold text-era-black tabular-nums tab:text-[18px]">{Math.round(v)}%</span>
      </div>
    </div>
  );
}

function SetupInner({ hotelId }: { hotelId: string }) {
  const t = usePT(setupT);
  const c = usePT(commonT);
  const [cfg, setCfg] = useState<SetupConfig | null>(null);
  const [step, setStep] = useState<StepId>("hotel");
  const [saveState, setSaveState] = useState<"saved" | "saving">("saved");
  const latest = useRef<SetupConfig | null>(null);
  const dirty = useRef(false);
  const alive = useRef(true);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  /* ---- kaydetme: her değişiklikten ~600 ms sonra tek seferde ---- */
  const flush = useCallback(() => {
    if (!dirty.current || !latest.current) return;
    dirty.current = false;
    // BAĞLANTI NOKTASI: api.ts > saveSetup (veritabanı yazımı burada başlar)
    saveSetup(hotelId, latest.current).then(() => {
      if (alive.current && !dirty.current) setSaveState("saved");
    });
  }, [hotelId]);

  const change = useCallback(
    (fn: (x: SetupConfig) => SetupConfig) => {
      setCfg((prev) => {
        if (!prev) return prev;
        const next = fn(prev);
        latest.current = next;
        return next;
      });
      dirty.current = true;
      setSaveState("saving");
      clearTimeout(timer.current);
      timer.current = setTimeout(flush, 600);
    },
    [flush]
  );

  // BAĞLANTI NOKTASI: api.ts > getSetup (otel değişince bileşen yeniden kurulur, ayarlar yeniden okunur)
  useEffect(() => {
    alive.current = true;
    getSetup(hotelId).then((x) => {
      if (!alive.current) return;
      latest.current = x;
      setCfg(x);
    });
    return () => {
      alive.current = false;
      clearTimeout(timer.current);
      flush(); // ekrandan çıkarken bekleyen değişiklik kaybolmasın
    };
  }, [hotelId, flush]);

  if (!cfg) {
    return (
      <div className="flex h-64 items-center justify-center gap-2 text-era-gray">
        <Loader2 size={18} className="animate-spin" /> {c.loading}
      </div>
    );
  }

  const pct = totalPercent(cfg);
  const idx = STEP_IDS.indexOf(step);
  const Icon = icons[step];
  const stepProps = { cfg, change };

  return (
    <div className="flex flex-col gap-4">
      {/* durum satırı */}
      <div className="flex flex-wrap items-center justify-end gap-2">
        {cfg.published && <Chip tone="success">{t.publish.live}</Chip>}
        <Chip tone={saveState === "saved" ? "neutral" : "primary"} className="min-w-[116px] justify-center">
          {saveState === "saved" ? (
            <>
              <CheckMark size={12} key="ok" /> {c.saved}
            </>
          ) : (
            <>
              <Loader2 size={12} className="animate-spin" /> {c.saving}
            </>
          )}
        </Chip>
      </div>

      <div className="grid grid-cols-[250px_minmax(0,1fr)_320px] items-start gap-5 max-[1279px]:grid-cols-[230px_minmax(0,1fr)] max-[991px]:grid-cols-1">
        {/* sol: halka + adımlar */}
        <div className="min-[992px]:sticky min-[992px]:top-24">
        <Card className="flex flex-col gap-5 tab:gap-3">
          <div className="flex flex-col items-center gap-2 tab:flex-row tab:gap-4">
            <Ring pct={pct} label={t.complete} />
            <div className="text-center leading-tight tab:text-left">
              <div className="text-[15px] font-bold text-era-black">{t.progress}</div>
              <div className="text-[13px] text-era-gray">
                {STEP_IDS.filter((id) => isDone(id, cfg)).length}/{STEP_IDS.length} {t.complete}
              </div>
            </div>
          </div>

          <nav aria-label={t.progress} className="setup-strip flex flex-col gap-1 tab:-mx-1 tab:flex-row tab:gap-2 tab:overflow-x-auto tab:px-1 tab:pb-1">
            {STEP_IDS.map((id, i) => {
              const on = id === step;
              const done = isDone(id, cfg);
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setStep(id)}
                  aria-current={on ? "step" : undefined}
                  className={`group flex flex-none items-center gap-3 rounded-(--r-s1) px-2.5 py-2 text-left transition-colors duration-300 tab:min-w-[150px] mob:min-w-[44px] mob:px-2 ${
                    on ? "bg-era-coolblue" : "hover:bg-era-secondary"
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 flex-none items-center justify-center rounded-full text-[13px] font-bold transition-all duration-500 ${
                      done ? "bg-era-success text-era-on-dark" : on ? "bg-era-primary text-era-on-dark" : "bg-era-secondary text-era-gray ring-1 ring-era-lightgray"
                    }`}
                  >
                    {done ? <CheckMark size={15} key={`d${id}`} /> : i + 1}
                  </span>
                  <span className="min-w-0 leading-tight mob:hidden">
                    <span className={`block truncate text-[14px] font-semibold ${on ? "text-era-primary-ink" : "text-era-black"}`}>{t.stepTitles[id]}</span>
                    <span className="block truncate text-[12px] text-era-gray tab:hidden">{t.stepHints[id]}</span>
                  </span>
                </button>
              );
            })}
          </nav>
        </Card>
        </div>

        {/* orta: adım formu */}
        <Card className="min-w-0">
          <div className="mb-6 flex items-center gap-3">
            <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-era-coolblue text-era-primary-ink">
              <Icon size={22} strokeWidth={1.8} />
            </span>
            <div className="min-w-0 leading-tight">
              <div className="text-[12px] font-semibold tracking-[0.12em] text-era-gray uppercase">
                {idx + 1} / {STEP_IDS.length}
              </div>
              <h2 className="truncate text-[22px] font-extrabold tracking-tight text-era-black">{t.stepTitles[step]}</h2>
            </div>
          </div>

          <div key={step} className="setup-step">
            {step === "hotel" && <StepHotel {...stepProps} />}
            {step === "channels" && <StepChannels {...stepProps} />}
            {step === "language" && <StepLanguage {...stepProps} />}
            {step === "knowledge" && <StepKnowledge {...stepProps} />}
            {step === "handoff" && <StepHandoff {...stepProps} />}
            {step === "integrations" && <StepIntegrations {...stepProps} />}
            {step === "publish" && <StepPublish {...stepProps} goStep={setStep} />}
          </div>

          <div className="mt-8 flex items-center justify-between gap-3 border-t border-era-line pt-5">
            <Btn variant="ghost" onClick={() => setStep(STEP_IDS[idx - 1])} disabled={idx === 0}>
              <ArrowLeft size={16} /> {t.back}
            </Btn>
            {idx < STEP_IDS.length - 1 && (
              <Btn onClick={() => setStep(STEP_IDS[idx + 1])}>
                {t.next} <ArrowRight size={16} />
              </Btn>
            )}
          </div>
        </Card>

        {/* sağ: canlı önizleme (geniş ekran) */}
        <div className="sticky top-24 max-[1279px]:hidden">
          <Card>
            <Preview cfg={cfg} />
          </Card>
        </div>
      </div>
    </div>
  );
}

/** Kurulum ekranı. Otel değişince bileşen yeniden kurulur ve o otelin ayarları okunur. */
export function Setup() {
  const { hotel } = usePanel();
  return <SetupInner key={hotel.id} hotelId={hotel.id} />;
}
