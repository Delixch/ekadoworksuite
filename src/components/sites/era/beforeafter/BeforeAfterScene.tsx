import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * "Bugün / Ekado ile" sahnesi (Remotion). Her konu SEG karelik bir bölüm:
 * kâğıt not belirir → üstü çizilir → geriye itilir → Ekado kartı kayarak gelir, onay işareti çıkar, yeni hâl yazılır → solar.
 * Renkler tema değişkenlerinden (sahne DOM'da oynadığı için CSS değişkenleri çalışır).
 */
export const BA_W = 1000;
export const BA_H = 620;
export const BA_FPS = 30;
export const SEG = 165;
/** okunur hâl: kart tamamen yazılmış, solmadan önce (hareketi azalt açıkken bu kare gösterilir) */
export const SETTLED = 140;

export type BeforeAfterProps = { items: [string, string][]; before: string; after: string };

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

function Segment({ was, now, before, after, f }: { was: string; now: string; before: string; after: string; f: number }) {
  const { fps } = useVideoConfig();
  // kâğıt: girer, üstü çizilir, geriye itilir
  const paperIn = interpolate(f, [0, 14], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const strike = interpolate(f, [30, 50], [0, 1], { ...clamp, easing: Easing.inOut(Easing.quad) });
  const push = interpolate(f, [54, 76], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  // Ekado kartı: yaylanarak gelir, onay işareti patlar, metin harf harf yazılır
  const cardIn = f >= 62 ? spring({ frame: f - 62, fps, config: { damping: 14, stiffness: 120, mass: 0.8 } }) : 0;
  const tick = f >= 80 ? spring({ frame: f - 80, fps, config: { damping: 9, stiffness: 220, mass: 0.5 } }) : 0;
  const typed = Math.round(interpolate(f, [84, 124], [0, now.length], clamp));
  const out = interpolate(f, [150, SEG], [1, 0], clamp);

  return (
    <AbsoluteFill style={{ opacity: out }}>
      {/* kâğıt not (bugün) */}
      <div
        style={{
          position: "absolute",
          left: 70,
          top: 70,
          width: 540,
          padding: "34px 38px 40px",
          borderRadius: 6,
          background: "repeating-linear-gradient(180deg, var(--c-surface) 0 43px, var(--c-line) 43px 44px)",
          boxShadow: "0 24px 50px rgba(0,0,0,.35)",
          opacity: paperIn * (1 - push * 0.45),
          transform: `translateY(${(1 - paperIn) * 30 - push * 20}px) translateX(${push * -30}px) rotate(${-3 - push * 4}deg) scale(${1 - push * 0.12})`,
          filter: `saturate(${1 - push * 0.7})`,
          fontFamily: "var(--font-main)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 17, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--c-muted)" }}>
          <span style={{ fontSize: 22, lineHeight: 1 }}>✕</span> {before}
        </div>
        <div style={{ position: "relative", marginTop: 18, fontSize: 31, lineHeight: 1.4, fontStyle: "italic", color: "var(--c-ink)" }}>
          {was}
          {/* üstünü çizen kırmızı çizgi: soldan sağa çekilir */}
          <span style={{ position: "absolute", left: -8, right: -8, top: "48%", height: 3, borderRadius: 2, background: "var(--c-danger)", transform: `rotate(-2deg) scaleX(${strike})`, transformOrigin: "left center" }} />
        </div>
      </div>

      {/* Ekado kartı (yeni hâl) */}
      <div
        style={{
          position: "absolute",
          right: 60,
          top: 290,
          width: 580,
          borderRadius: 22,
          overflow: "hidden",
          background: "var(--c-white)",
          boxShadow: "0 40px 90px rgba(0,0,0,.45), 0 0 0 2px color-mix(in oklab, var(--c-primary) 35%, transparent)",
          opacity: Math.min(1, cardIn * 1.4),
          transform: `translateX(${(1 - cardIn) * 220}px) rotate(${(1 - cardIn) * 6}deg)`,
          fontFamily: "var(--font-main)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 24px", background: "var(--c-primary)", color: "var(--c-on-dark)" }}>
          <span style={{ display: "flex", width: 30, height: 30, alignItems: "center", justifyContent: "center", borderRadius: 7, background: "var(--c-on-dark)", color: "var(--c-primary)", fontWeight: 900, fontSize: 18 }}>E</span>
          <span style={{ fontSize: 17, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase" }}>{after}</span>
        </div>
        <div style={{ display: "flex", gap: 18, padding: "28px 30px 34px" }}>
          <span
            style={{
              flex: "none",
              display: "flex",
              width: 46,
              height: 46,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              background: "var(--c-success)",
              color: "var(--c-white)",
              fontSize: 26,
              fontWeight: 900,
              transform: `scale(${tick})`,
            }}
          >
            ✓
          </span>
          <div style={{ minHeight: 132, fontSize: 29, lineHeight: 1.42, color: "var(--c-ink)" }}>
            {now.slice(0, typed)}
            {typed < now.length && f >= 84 && <span style={{ opacity: Math.floor(f / 6) % 2 ? 0 : 1, color: "var(--c-primary)" }}>|</span>}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}

export function BeforeAfterScene({ items, before, after }: BeforeAfterProps) {
  const frame = useCurrentFrame();
  const i = Math.min(items.length - 1, Math.floor(frame / SEG));
  const [was, now] = items[i];
  return (
    <AbsoluteFill>
      <Segment key={i} was={was} now={now} before={before} after={after} f={frame - i * SEG} />
    </AbsoluteFill>
  );
}
