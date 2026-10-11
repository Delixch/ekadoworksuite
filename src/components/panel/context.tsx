"use client";

import { createContext, useContext } from "react";
import type { Hotel } from "@/lib/panel/types";

export type PanelTab = "overview" | "inbox" | "setup" | "locks";

export interface PanelCtx {
  hotel: Hotel;
  hotels: Hotel[];
  setHotelId: (id: string) => void;
  tab: PanelTab;
  goTo: (tab: PanelTab) => void;
  aiOn: boolean;
  setAiOn: (v: boolean) => void;
}

export const PanelContext = createContext<PanelCtx | null>(null);

export function usePanel() {
  const c = useContext(PanelContext);
  if (!c) throw new Error("usePanel yalnızca panel içinde kullanılır");
  return c;
}
