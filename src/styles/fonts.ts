/*
 * YAZI TİPİ: sitedeki tek yazı tipi tanımı burası.
 * Değiştirmek için sadece import ve çağrı satırındaki adı değiştir. Örnek:
 *
 *   import { Plus_Jakarta_Sans } from "next/font/google";
 *   export const appFont = Plus_Jakarta_Sans({ variable: "--font-app", subsets: ["latin", "latin-ext"] });
 *
 * "latin-ext" Türkçe karakterler (ş, ğ, ı, İ) için gereklidir, silme.
 */
import { Manrope } from "next/font/google";

export const appFont = Manrope({
  variable: "--font-app",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});
