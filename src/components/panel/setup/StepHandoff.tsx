"use client";

import { setupT } from "@/i18n/panel/setup";
import { usePT } from "@/i18n/panel/use";
import type { HandoffTrigger } from "@/lib/panel/types";
import { Field, Input, Select, Toggle } from "../ui";
import { Lead, Section, Slider, type StepProps } from "./shared";

const triggerKeys: HandoffTrigger[] = ["complaint", "payment", "negotiation", "medical", "lowConfidence", "vip"];

export function StepHandoff({ cfg, change }: StepProps) {
  const t = usePT(setupT).handoff;
  const h = cfg.handoff;
  const patch = (p: Partial<typeof h>) => change((c) => ({ ...c, handoff: { ...c.handoff, ...p } }));

  return (
    <div className="flex flex-col gap-6">
      <Lead>{t.lead}</Lead>

      <Section title={t.triggers}>
        <ul className="grid grid-cols-2 gap-3 mob:grid-cols-1">
          {triggerKeys.map((k) => (
            <li
              key={k}
              className={`flex items-start gap-3 rounded-(--r-s1) border p-3 transition-colors duration-300 ${
                h.triggers[k] ? "border-era-primary bg-era-coolblue/50" : "border-era-lightgray bg-era-white"
              }`}
            >
              <Toggle checked={h.triggers[k]} onChange={(v) => patch({ triggers: { ...h.triggers, [k]: v } })} label={t.trigger[k][0]} />
              <div className="min-w-0 leading-snug">
                <div className="text-[14px] font-semibold text-era-black">{t.trigger[k][0]}</div>
                <div className="text-[12px] text-era-gray">{t.trigger[k][1]}</div>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section title={t.confidence} hint={t.confidenceHint}>
        <Slider value={h.confidence} onChange={(v) => patch({ confidence: v })} min={30} max={95} suffix="%" label={t.confidence} />
      </Section>

      <Section title={t.hours} hint={t.outsideHours}>
        <div className="grid grid-cols-2 gap-4">
          <Field label={t.from}>
            <Input type="time" value={h.hours.from} onChange={(e) => patch({ hours: { ...h.hours, from: e.target.value } })} />
          </Field>
          <Field label={t.to}>
            <Input type="time" value={h.hours.to} onChange={(e) => patch({ hours: { ...h.hours, to: e.target.value } })} />
          </Field>
        </div>
        <div className="flex flex-wrap gap-2">
          {t.days.map((d, i) => {
            const on = h.hours.days[i];
            return (
              <button
                key={d}
                type="button"
                aria-pressed={on}
                onClick={() => patch({ hours: { ...h.hours, days: h.hours.days.map((v, j) => (j === i ? !v : v)) } })}
                className={`h-10 min-w-12 rounded-full border px-3 text-[13px] font-bold transition-all duration-300 active:scale-90 ${
                  on ? "border-era-primary bg-era-primary text-era-on-dark" : "border-era-lightgray bg-era-white text-era-gray"
                }`}
              >
                {d}
              </button>
            );
          })}
        </div>
      </Section>

      <Section title={t.notify}>
        <div className="grid grid-cols-2 gap-4 mob:grid-cols-1">
          <Field label={t.notify}>
            <Select value={h.notifyVia} onChange={(e) => patch({ notifyVia: e.target.value as typeof h.notifyVia })}>
              {(Object.keys(t.notifyVia) as (keyof typeof t.notifyVia)[]).map((v) => (
                <option key={v} value={v}>
                  {t.notifyVia[v]}
                </option>
              ))}
            </Select>
          </Field>
          <Field label={t.notifyTo}>
            <Input value={h.notifyTo} onChange={(e) => patch({ notifyTo: e.target.value })} />
          </Field>
        </div>
      </Section>
    </div>
  );
}
