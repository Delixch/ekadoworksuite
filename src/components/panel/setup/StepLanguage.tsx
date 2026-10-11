"use client";

import { Check } from "lucide-react";
import { commonT } from "@/i18n/panel/common";
import { setupT } from "@/i18n/panel/setup";
import { usePT } from "@/i18n/panel/use";
import { Field, Input, Select, Textarea, Toggle } from "../ui";
import { Preview } from "./Preview";
import { Lead, Section, Slider, type StepProps } from "./shared";

export const LANG_CODES = ["tr", "en", "de", "ru", "ja", "ar", "fr", "es", "it", "zh"];

export function StepLanguage({ cfg, change }: StepProps) {
  const t = usePT(setupT).language;
  const c = usePT(commonT);
  const { enabled } = cfg.languages;

  const toggleLang = (code: string) =>
    change((x) => {
      const on = x.languages.enabled.includes(code);
      if (on && x.languages.enabled.length === 1) return x;
      const next = on ? x.languages.enabled.filter((l) => l !== code) : [...x.languages.enabled, code];
      const def = next.includes(x.languages.default) ? x.languages.default : next[0];
      return { ...x, languages: { ...x.languages, enabled: next, default: def } };
    });

  return (
    <div className="flex flex-col gap-6">
      <Lead>{t.lead}</Lead>

      <Section title={t.enabled} hint={t.enabledHint}>
        <div className="flex flex-wrap gap-2">
          {LANG_CODES.map((code) => {
            const on = enabled.includes(code);
            return (
              <button
                key={code}
                type="button"
                aria-pressed={on}
                onClick={() => toggleLang(code)}
                className={`flex h-10 items-center gap-2 rounded-full border px-4 text-[14px] font-semibold transition-all duration-300 active:scale-95 ${
                  on ? "border-era-primary bg-era-primary text-era-on-dark" : "border-era-lightgray bg-era-white text-era-black hover:border-era-primary"
                }`}
              >
                {on && <Check size={14} strokeWidth={3} />}
                {c.langs[code]}
              </button>
            );
          })}
        </div>
        <div className="grid grid-cols-2 items-end gap-4 mob:grid-cols-1">
          <Field label={t.default}>
            <Select value={cfg.languages.default} onChange={(e) => change((x) => ({ ...x, languages: { ...x.languages, default: e.target.value } }))}>
              {enabled.map((code) => (
                <option key={code} value={code}>
                  {c.langs[code]}
                </option>
              ))}
            </Select>
          </Field>
          <div className="flex items-start gap-3 rounded-(--r-s1) bg-era-secondary p-3">
            <Toggle checked={cfg.languages.autoDetect} onChange={(v) => change((x) => ({ ...x, languages: { ...x.languages, autoDetect: v } }))} label={t.autoDetect} />
            <div className="leading-snug">
              <div className="text-[14px] font-semibold text-era-black">{t.autoDetect}</div>
              <div className="text-[12px] text-era-gray">{t.autoDetectHint}</div>
            </div>
          </div>
        </div>
      </Section>

      <Section title={t.persona}>
        <Field label={t.name}>
          <Input value={cfg.persona.name} onChange={(e) => change((x) => ({ ...x, persona: { ...x.persona, name: e.target.value } }))} />
        </Field>
        <div className="flex flex-col gap-1">
          <span className="text-[13px] font-semibold text-era-black">{t.tone}</span>
          <Slider
            value={cfg.persona.tone}
            onChange={(v) => change((x) => ({ ...x, persona: { ...x.persona, tone: v } }))}
            left={t.formal}
            right={t.friendly}
            label={t.tone}
          />
        </div>
        <div className="flex items-start gap-3 rounded-(--r-s1) bg-era-secondary p-3">
          <Toggle checked={cfg.persona.emoji} onChange={(v) => change((x) => ({ ...x, persona: { ...x.persona, emoji: v } }))} label={t.emoji} />
          <div className="leading-snug">
            <div className="text-[14px] font-semibold text-era-black">{t.emoji}</div>
            <div className="text-[12px] text-era-gray">{t.emojiHint}</div>
          </div>
        </div>
        <Field label={t.greeting} hint={t.greetingHint}>
          <Textarea rows={3} value={cfg.persona.greeting} onChange={(e) => change((x) => ({ ...x, persona: { ...x.persona, greeting: e.target.value } }))} />
        </Field>
      </Section>

      {/* dar ekranlarda sağ sütun gizli olduğu için önizleme burada da görünür */}
      <Preview cfg={cfg} className="hidden max-[1279px]:block" />
    </div>
  );
}
