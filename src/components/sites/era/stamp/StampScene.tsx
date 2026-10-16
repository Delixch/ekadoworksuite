import { AbsoluteFill, Audio, Easing, interpolate, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Açılış damgaları (Remotion sahnesi). Kelimeler havadan düşer, cihazların üstüne lastik damga gibi "güm" diye basılır:
 * mürekkep sıçrar, toz halkası açılır, damga biraz ezilip oturur. Sonunda büyük EKADO damgası, sonra hepsi solar.
 * Renkler ve yazı tipi sitenin değişkenlerinden (tema dosyası), sahne DOM'da oynadığı için CSS değişkenleri çalışır.
 */
export const STAMP_W = 1000;
export const STAMP_H = 760;
export const STAMP_FPS = 30;
/** darbe kareleri: 4 kelime + EKADO (sarsıntı ve ses bunlara göre) */
export const IMPACTS = [18, 42, 66, 90, 128];
export const STAMP_FRAMES = 236;
const FALL = 11; // düşüş süresi (kare)
const FADE_FROM = 200;

/** lite: telefon/dokunmatik — mürekkep filtresi yok, gölge küçük, daha az damla (mobilde takılma, Adnan 2026-10-16) */
type Props = { words: string[]; brand: string; claim: string; lang: string; lite?: boolean; sound?: boolean };

const spots = [
  { x: 29, y: 15, r: -8 },
  { x: 73, y: 33, r: 6 },
  { x: 27, y: 83, r: 5 },
  { x: 72, y: 76, r: -6 },
];

function Stamp({ at, x, y, rot, big = false, lite = false, children }: { at: number; x: number; y: number; rot: number; big?: boolean; lite?: boolean; children: React.ReactNode }) {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const start = at - FALL;
  if (f < start) return null;
  // düşüş: yukarıdan ve büyükten, hızlanarak iner
  const fall = interpolate(f, [start, at], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.cubic) });
  const dy = (1 - fall) * -520;
  const sc0 = interpolate(fall, [0, 1], [big ? 3 : 2.4, 1]);
  // darbe: ezilip yaylanarak oturur
  const hit = f >= at ? spring({ frame: f - at, fps, config: { damping: 9, stiffness: 260, mass: 0.6 } }) : 0;
  const squash = f >= at ? 1 + (1 - hit) * 0.16 : 1;
  const sx = f >= at ? squash : sc0;
  const sy = f >= at ? 2 - squash : sc0;
  const op = interpolate(f, [start, start + 3, FADE_FROM, STAMP_FRAMES - 6], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  // mürekkep sıçraması ve toz halkası
  const k = f - at;
  const splash = k >= 0 && k < 16;
  const ring = interpolate(k, [0, 14], [0.6, 1.9], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const ringOp = interpolate(k, [0, 3, 14], [0, 0.55, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const drops = (big ? 14 : 9) - (lite ? 4 : 0);

  return (
    <div style={{ position: "absolute", left: `${x}%`, top: `${y}%`, transform: `translate(-50%, -50%) translateY(${dy}px)`, opacity: op, willChange: "transform, opacity" }}>
      {splash && (
        <>
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: big ? 460 : 300,
              height: big ? 200 : 110,
              borderRadius: "50%",
              border: "3px solid var(--c-primary)",
              transform: `translate(-50%, -50%) scale(${ring})`,
              opacity: ringOp,
            }}
          />
          {Array.from({ length: drops }, (_, i) => {
            const a = (i / drops) * Math.PI * 2 + rot;
            const d = interpolate(k, [0, 12], [10, (big ? 230 : 150) + (i % 3) * 24], { extrapolateRight: "clamp" });
            const s = interpolate(k, [0, 12], [10 - (i % 3) * 2, 0], { extrapolateRight: "clamp" });
            return (
              <i
                key={i}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  width: s,
                  height: s,
                  borderRadius: "50%",
                  background: "var(--c-primary)",
                  transform: `translate(-50%, -50%) translate(${Math.cos(a) * d}px, ${Math.sin(a) * d * 0.55}px)`,
                }}
              />
            );
          })}
        </>
      )}
      {/* hareket dış kutuda, filtre + gölge içte sabit: tarayıcı damgayı bir kez çizer, sonra sadece kaydırır */}
      <div style={{ transform: `rotate(${rot}deg) scale(${sx}, ${sy})`, willChange: "transform" }}>
      <div
        style={{
          filter: lite ? undefined : "url(#stamp-ink)",
          border: `${big ? 7 : 5}px double var(--c-primary)`,
          borderRadius: 10,
          padding: big ? "18px 44px 20px" : "10px 26px 12px",
          background: "color-mix(in oklab, var(--c-surface) 92%, transparent)",
          color: "var(--c-primary)",
          fontFamily: "var(--font-main)",
          fontWeight: 900,
          textTransform: "uppercase",
          letterSpacing: big ? "0.06em" : "0.08em",
          whiteSpace: "nowrap",
          textAlign: "center",
          boxShadow: lite ? "0 8px 16px var(--c-shadow-soft)" : "0 18px 40px var(--c-shadow-soft)",
        }}
      >
        {children}
      </div>
      </div>
    </div>
  );
}

export function StampScene({ words, brand, claim, lang, lite = false, sound = false }: Props) {
  return (
    // lang: büyük harfte Türkçe İ/I doğru çıksın (DE/EN'de normal I)
    <AbsoluteFill lang={lang}>
      {/* lastik damga dokusu: kenarlar hafif titrek, mürekkep yer yer eksik */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
        <filter id="stamp-ink">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="2" result="d" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -0.9 1.45" result="holes" />
          <feComposite in="d" in2="holes" operator="in" />
        </filter>
      </svg>
      {words.map((w, i) => (
        <Stamp key={w} at={IMPACTS[i]} x={spots[i].x} y={spots[i].y} rot={spots[i].r} lite={lite}>
          <span style={{ fontSize: 42 }}>{w}</span>
        </Stamp>
      ))}
      <Stamp at={IMPACTS[4]} x={50} y={48} rot={-4} big lite={lite}>
        <span style={{ display: "block", fontSize: 96, lineHeight: 1 }}>{brand}</span>
        <span style={{ display: "block", marginTop: 8, fontSize: 30, letterSpacing: "0.04em" }}>{claim}</span>
      </Stamp>
      {/* ses sadece çalınacaksa: sessiz açılışta tarayıcı AudioContext uyarısı vermesin */}
      {sound &&
        IMPACTS.map((at) => (
          <Sequence key={at} from={at - 1} durationInFrames={20}>
            <Audio src={staticFile("sounds/stamp.mp3")} volume={0.9} />
          </Sequence>
        ))}
    </AbsoluteFill>
  );
}
