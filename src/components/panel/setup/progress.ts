import type { SetupConfig } from "@/lib/panel/types";
import type { StepId } from "./shared";

export const STEP_IDS: StepId[] = ["hotel", "channels", "language", "knowledge", "handoff", "integrations", "publish"];

/** Yayın için zorunlu adımlar (entegrasyonlar önerilir ama zorunlu değil) */
export const REQUIRED: StepId[] = ["hotel", "channels", "language", "knowledge", "handoff"];

const filled = (s: string) => s.trim().length > 0;
const part = (...ok: boolean[]) => ok.filter(Boolean).length / ok.length;

/** Her adımın doluluk oranı (0-1). Yüzde ve tamamlandı işareti bundan türer. */
export function stepFraction(id: StepId, c: SetupConfig): number {
  switch (id) {
    case "hotel": {
      const h = c.hotel;
      return part(filled(h.name), filled(h.address), filled(h.city), filled(h.phone), filled(h.email), filled(h.checkIn), filled(h.checkOut), filled(h.description));
    }
    case "channels":
      return Object.values(c.channels).some((x) => x.connected) ? 1 : 0;
    case "language":
      return part(c.languages.enabled.length > 0, filled(c.persona.name), filled(c.persona.greeting));
    case "knowledge": {
      const p = Object.values(c.knowledge.policies);
      const policy = p.filter(filled).length / p.length;
      return (Number(c.knowledge.rooms.length > 0) + Number(c.knowledge.faqs.length > 0) + policy) / 3;
    }
    case "handoff":
      return part(Object.values(c.handoff.triggers).some(Boolean), c.handoff.hours.days.some(Boolean), filled(c.handoff.notifyTo));
    case "integrations":
      return c.integrations.pms.connected || c.integrations.lock.connected ? 1 : 0;
    case "publish":
      return c.published ? 1 : 0;
  }
}

export const isDone = (id: StepId, c: SetupConfig) => stepFraction(id, c) >= 0.999;

export function totalPercent(c: SetupConfig) {
  return Math.round((STEP_IDS.reduce((a, id) => a + stepFraction(id, c), 0) / STEP_IDS.length) * 100);
}
