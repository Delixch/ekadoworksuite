/**
 * Ziyaretçinin seçebileceği renk paletleri. Her ad src/styles/themes/<ad>.css dosyasıdır
 * ve globals.css içinde import edilir. Varsayılan palet: DEFAULT_PALETTE (tek satır).
 */
export const PALETTES = ["sarap", "mavi", "portakal"] as const;
export type Palette = (typeof PALETTES)[number];
// ilk açılışta herkese Portakal (Adnan 2026-10-16)
export const DEFAULT_PALETTE: Palette = "portakal";
