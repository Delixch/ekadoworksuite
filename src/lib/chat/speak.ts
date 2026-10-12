import type { ChatLang } from "./knowledge";

const BCP: Record<ChatLang, string> = { tr: "tr-TR", en: "en-US", de: "de-DE" };

/** Tarayıcıdaki sesler arasından en doğal olanı seçer: nöral/"Natural" (Edge), Google, Apple "Enhanced/Premium" öne gelir. */
function pickVoice(lang: ChatLang): SpeechSynthesisVoice | undefined {
  const voices = window.speechSynthesis.getVoices().filter((v) => v.lang.toLowerCase().replace("_", "-").startsWith(lang));
  const rank = (v: SpeechSynthesisVoice) => {
    const n = v.name.toLowerCase();
    let s = 0;
    if (/natural|neural|online/.test(n)) s += 6;
    if (/google/.test(n)) s += 4;
    if (/premium|enhanced|siri/.test(n)) s += 4;
    if (v.lang.toLowerCase().replace("_", "-") === BCP[lang].toLowerCase()) s += 2;
    if (/compact|espeak/.test(n)) s -= 4;
    return s;
  };
  return voices.sort((a, b) => rank(b) - rank(a))[0];
}

export const canSpeak = () => typeof window !== "undefined" && "speechSynthesis" in window;

export function stopSpeaking() {
  if (canSpeak()) window.speechSynthesis.cancel();
}

/** Cevabı cümle cümle okur (uzun metinde Chrome'un ortada susma hatasını önler). Biraz yavaş: anlaşılır olsun. */
export function speak(text: string, lang: ChatLang) {
  if (!canSpeak()) return;
  const synth = window.speechSynthesis;
  synth.cancel();
  const clean = text.replace(/[€•–—]/g, " ").replace(/\s+/g, " ").trim();
  const parts = clean.match(/[^.!?;:]+[.!?;:]?/g) ?? [clean];
  const voice = pickVoice(lang);
  for (const part of parts) {
    const s = part.trim();
    if (!s) continue;
    const u = new SpeechSynthesisUtterance(s);
    u.lang = BCP[lang];
    if (voice) u.voice = voice;
    u.rate = 0.95;
    u.pitch = 1;
    synth.speak(u);
  }
}
