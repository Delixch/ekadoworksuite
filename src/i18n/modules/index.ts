import type { ModuleId } from "@/lib/module-videos";
import type { Locale } from "../useLocale";
import type { ModuleText } from "./common";
import { einkauf } from "./einkauf";
import { finanzen } from "./finanzen";
import { personal } from "./personal";
import { uebersichtBetrieb } from "./uebersicht-betrieb";

/** Modül sayfalarının metinleri; sıra ve adresler common.ts içinde (moduleOrder, moduleHref) */
export const moduleTexts: Record<ModuleId, Record<Locale, ModuleText>> = {
  "uebersicht-betrieb": uebersichtBetrieb,
  einkauf,
  personal,
  finanzen,
};
