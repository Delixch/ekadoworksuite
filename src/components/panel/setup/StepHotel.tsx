"use client";

import { Star } from "lucide-react";
import { setupT } from "@/i18n/panel/setup";
import { usePT } from "@/i18n/panel/use";
import { Field, Input, Textarea } from "../ui";
import { Lead, type StepProps } from "./shared";

export function StepHotel({ cfg, change }: StepProps) {
  const t = usePT(setupT).hotel;
  const h = cfg.hotel;
  const set = <K extends keyof typeof h>(k: K, v: (typeof h)[K]) => change((c) => ({ ...c, hotel: { ...c.hotel, [k]: v } }));

  return (
    <div>
      <Lead>{t.lead}</Lead>
      <div className="grid grid-cols-2 gap-4 mob:grid-cols-1">
        <Field label={t.name} className="col-span-2 mob:col-span-1">
          <Input value={h.name} onChange={(e) => set("name", e.target.value)} />
        </Field>

        <div className="flex flex-col gap-1.5">
          <span className="text-[13px] font-semibold text-era-black">{t.stars}</span>
          <div className="flex h-[46px] items-center gap-1" role="radiogroup" aria-label={t.stars}>
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                role="radio"
                aria-checked={h.stars === n}
                aria-label={`${n}`}
                onClick={() => set("stars", n)}
                className="rounded-md p-1 transition-transform duration-200 hover:scale-125 active:scale-90"
              >
                <Star size={24} strokeWidth={1.8} className={`transition-colors duration-300 ${n <= h.stars ? "fill-era-primary text-era-primary" : "text-era-cute"}`} />
              </button>
            ))}
          </div>
        </div>
        <Field label={t.country}>
          <Input value={h.country} onChange={(e) => set("country", e.target.value)} maxLength={2} className="uppercase" />
        </Field>

        <Field label={t.address} className="col-span-2 mob:col-span-1">
          <Input value={h.address} onChange={(e) => set("address", e.target.value)} />
        </Field>
        <Field label={t.city}>
          <Input value={h.city} onChange={(e) => set("city", e.target.value)} />
        </Field>
        <Field label={t.phone}>
          <Input type="tel" value={h.phone} onChange={(e) => set("phone", e.target.value)} />
        </Field>
        <Field label={t.email}>
          <Input type="email" value={h.email} onChange={(e) => set("email", e.target.value)} />
        </Field>
        <Field label={t.website}>
          <Input value={h.website} onChange={(e) => set("website", e.target.value)} />
        </Field>
        <Field label={t.checkIn}>
          <Input type="time" value={h.checkIn} onChange={(e) => set("checkIn", e.target.value)} />
        </Field>
        <Field label={t.checkOut}>
          <Input type="time" value={h.checkOut} onChange={(e) => set("checkOut", e.target.value)} />
        </Field>
        <Field label={t.description} hint={t.descriptionHint} className="col-span-2 mob:col-span-1">
          <Textarea rows={4} value={h.description} onChange={(e) => set("description", e.target.value)} />
        </Field>
      </div>
    </div>
  );
}
