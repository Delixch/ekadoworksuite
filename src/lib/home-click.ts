import type { MouseEvent } from "react";

/**
 * Ana sayfadayken logoya basınca Next'in kendi "yukarı kaydır"ı bazen atlıyor (özellikle telefonda, sabit üst çubuk yüzünden).
 * Ana sayfadaysak kaydırmayı elle yaparız; başka sayfadaysak normal gezinme çalışır.
 */
export function toTopIfHome(e: MouseEvent) {
  if (window.location.pathname !== "/") return;
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  if (window.location.hash) window.history.replaceState(null, "", "/");
}
