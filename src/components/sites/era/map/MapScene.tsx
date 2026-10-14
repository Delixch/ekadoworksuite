import { Easing, interpolate, useCurrentFrame } from "remotion";

/** Remotion kompozisyonu: Google Haritalar görünümünde çizilmiş karo. Koordinatlar 400x170'lik tuvale göre. */
export type MapKind = "hq" | "ch";
export type MapSceneProps = { kind: MapKind };

export const MAP_W = 400;
export const MAP_H = 170;
export const MAP_FPS = 30;
/** Araba bir turu bu kadar karede tamamlar; kompozisyon da bu kadar sürer, böylece döngü kesintisiz olur. */
export const MAP_FRAMES = 450;

const C = {
  land: "#f2efe9",
  block: "#e7e2d6",
  park: "#cfe8c3",
  water: "#a8d4f5",
  waterEdge: "#8fc3ec",
  roadCase: "#dcd6c8",
  road: "#ffffff",
  mainCase: "#e9c265",
  main: "#fdeaa5",
  pin: "#ea4335",
  pinDark: "#b31412",
  poiGreen: "#34a853",
  poiOrange: "#f29900",
  poiGrey: "#9aa0a6",
};

type Pt = readonly [number, number];

/** Yol boyunca yürüyen araba: kapalı çokgen rota, köşelerde yumuşak dönüş. */
function along(route: readonly Pt[], t: number) {
  const segs = route.map((p, i) => {
    const q = route[(i + 1) % route.length];
    return { p, q, len: Math.hypot(q[0] - p[0], q[1] - p[1]), ang: (Math.atan2(q[1] - p[1], q[0] - p[0]) * 180) / Math.PI };
  });
  const total = segs.reduce((s, g) => s + g.len, 0);
  let d = ((t % 1) + 1) % 1 * total;
  for (let i = 0; i < segs.length; i++) {
    const g = segs[i];
    if (d <= g.len) {
      const next = segs[(i + 1) % segs.length];
      const k = g.len ? d / g.len : 0;
      let rot = g.ang;
      const turnZone = 14;
      if (g.len - d < turnZone) {
        let diff = next.ang - g.ang;
        while (diff > 180) diff -= 360;
        while (diff < -180) diff += 360;
        rot = g.ang + diff * (1 - (g.len - d) / turnZone) * 0.5;
      } else if (d < turnZone) {
        const prev = segs[(i - 1 + segs.length) % segs.length];
        let diff = g.ang - prev.ang;
        while (diff > 180) diff -= 360;
        while (diff < -180) diff += 360;
        rot = g.ang - diff * (1 - d / turnZone) * 0.5;
      }
      return { x: g.p[0] + (g.q[0] - g.p[0]) * k, y: g.p[1] + (g.q[1] - g.p[1]) * k, rot };
    }
    d -= g.len;
  }
  return { x: route[0][0], y: route[0][1], rot: 0 };
}

function Road({ d, main = false, w = 6 }: { d: string; main?: boolean; w?: number }) {
  return (
    <>
      <path d={d} fill="none" stroke={main ? C.mainCase : C.roadCase} strokeWidth={w + 2.4} strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} fill="none" stroke={main ? C.main : C.road} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />
    </>
  );
}

/** Sokak adı: Google gibi gri yazı, beyaz hale; yolun üzerine ya da boyunca. */
function Label({ x, y, rot = 0, size = 5.2, children, water = false }: { x: number; y: number; rot?: number; size?: number; children: string; water?: boolean }) {
  return (
    <text
      x={x}
      y={y}
      transform={`rotate(${rot} ${x} ${y})`}
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={size}
      fontWeight={water ? 500 : 500}
      fontStyle={water ? "italic" : "normal"}
      letterSpacing={water ? 0.8 : 0.2}
      fill={water ? "#4f86b4" : "#5f6368"}
      stroke={water ? "none" : "#fff"}
      strokeWidth={water ? 0 : 1.6}
      strokeLinejoin="round"
      paintOrder="stroke"
      style={{ fontFamily: "Roboto, 'Helvetica Neue', Arial, sans-serif" }}
    >
      {children}
    </text>
  );
}

function Poi({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r="4.6" fill={color} />
      <circle r="1.7" fill="#fff" />
    </g>
  );
}

function Hq() {
  return (
    <>
      <rect width={MAP_W} height={MAP_H} fill={C.land} />
      {/* park */}
      <rect x="296" y="76" width="62" height="38" rx="7" fill={C.park} />
      {/* binalar */}
      {[[196, 20, 46, 30], [252, 8, 40, 38], [214, 76, 36, 34], [264, 78, 22, 30], [186, 134, 54, 28], [262, 134, 44, 26], [334, 8, 54, 40], [320, 128, 58, 30], [366, 66, 24, 44]].map(([x, y, w, h], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} rx="4" fill={C.block} />
      ))}
      {/* körfez */}
      <path d="M0 0 H150 C120 40 150 70 110 105 C80 135 90 160 60 170 H0 Z" fill={C.water} />
      <path d="M150 0 C120 40 150 70 110 105 C80 135 90 160 60 170" fill="none" stroke={C.waterEdge} strokeWidth="1.4" />
      {/* yollar */}
      <Road d="M160 60 H392 V125 H176" w={5} />
      <Road d="M168 14 H330 M200 44 V0 M300 150 V170" w={3.4} />
      <Road d="M120 170 L330 0" main w={6.5} />
      <Label x={332} y={60} size={5}>Seestrasse</Label>
      <Label x={286} y={125} size={5}>Quaistrasse</Label>
      <Label x={142} y={86} rot={-39} size={4.6} water>Zürichsee</Label>
      <Poi x={228} y={44} color={C.poiOrange} />
      <Poi x={342} y={96} color={C.poiGreen} />
      <Poi x={300} y={142} color={C.poiGrey} />
    </>
  );
}

function Ch() {
  return (
    <>
      <rect width={MAP_W} height={MAP_H} fill={C.land} />
      {/* park */}
      <rect x="100" y="62" width="134" height="40" rx="8" fill={C.park} />
      {/* binalar: ızgaranın hücreleri */}
      {[
        [8, 8, 76, 36], [102, 8, 62, 36], [172, 8, 62, 36], [254, 8, 58, 36], [330, 8, 62, 36],
        [8, 62, 76, 40], [254, 62, 58, 40], [330, 62, 62, 40],
        [102, 112, 62, 38], [172, 112, 62, 38], [254, 112, 58, 38], [330, 112, 62, 38],
        [8, 112, 76, 50], [102, 166, 130, 10], [254, 166, 58, 10], [330, 166, 62, 10],
      ].map(([x, y, w, h], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} rx="4" fill={C.block} />
      ))}
      {/* nehir */}
      <path d="M-10 120 C80 100 130 152 210 130 C290 108 330 62 410 72" fill="none" stroke={C.waterEdge} strokeWidth="23.5" strokeLinecap="round" />
      <path d="M-10 120 C80 100 130 152 210 130 C290 108 330 62 410 72" fill="none" stroke={C.water} strokeWidth="21" strokeLinecap="round" />
      {/* yollar (köprüler nehrin üstünden geçer) */}
      <Road d="M0 52 H400" main w={6.5} />
      <Road d="M92 0 V170 M244 0 V170 M320 0 V170" w={5} />
      <Road d="M244 158 H320" w={4.4} />
      <Road d="M0 104 H92 M320 20 H400" w={3.2} />
      <Label x={168} y={52} size={5.4}>Langstrasse</Label>
      <Label x={92} y={82} rot={-90} size={5}>Hohlstrasse</Label>
      <Label x={244} y={36} rot={-90} size={5}>Ankerstrasse</Label>
      <Label x={320} y={112} rot={-90} size={5}>Zwinglistrasse</Label>
      <Label x={46} y={104} size={4.4}>Kanonengasse</Label>
      <Label x={150} y={142} rot={5} size={4.6} water>Sihl</Label>
      <Poi x={176} y={82} color={C.poiGreen} />
      <Poi x={288} y={26} color={C.poiOrange} />
      <Poi x={46} y={82} color={C.poiGrey} />
    </>
  );
}

const ROUTES: Record<MapKind, readonly Pt[]> = {
  hq: [[256, 60], [392, 60], [392, 125], [176, 125]],
  ch: [[92, 52], [244, 52], [244, 158], [320, 158], [320, 52]],
};

export function MapScene({ kind }: MapSceneProps) {
  const frame = useCurrentFrame();
  const car = along(ROUTES[kind], frame / MAP_FRAMES);
  // nabız halkaları: 90 karede bir tekrarlar (450 / 90 = 5 tam döngü)
  const pulse = (offset: number) => {
    const p = ((frame + offset) % 90) / 90;
    return {
      r: interpolate(p, [0, 1], [5, 26], { easing: Easing.out(Easing.quad) }),
      o: interpolate(p, [0, 1], [0.38, 0]),
    };
  };
  const a = pulse(0);
  const b = pulse(45);
  // iğne çok hafif süzülür
  const bob = Math.sin((frame / MAP_FRAMES) * Math.PI * 2 * 5) * 1.1;

  return (
    <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} width="100%" height="100%" style={{ display: "block" }}>
      {kind === "hq" ? <Hq /> : <Ch />}

      {/* araba */}
      <g transform={`translate(${car.x.toFixed(2)} ${car.y.toFixed(2)}) rotate(${car.rot.toFixed(2)}) scale(1.15)`}>
        <ellipse cx="0" cy="5.2" rx="10" ry="2.3" fill="#000" opacity=".14" />
        <rect x="-9.5" y="-4.6" width="19" height="9.2" rx="3.2" fill="#1a73e8" />
        <rect x="-7.5" y="-3.4" width="4" height="6.8" rx="1.2" fill="#fff" opacity=".35" />
        <rect x="-0.5" y="-3.4" width="5.2" height="6.8" rx="1.6" fill="#fff" opacity=".85" />
        <circle cx="8.4" cy="-2.7" r="1.1" fill="#ffd35a" />
        <circle cx="8.4" cy="2.7" r="1.1" fill="#ffd35a" />
      </g>

      {/* iğne: Google Haritalar kırmızısı */}
      <g transform="translate(236 78)">
        <circle r={a.r} fill={C.pin} opacity={a.o} />
        <circle r={b.r} fill={C.pin} opacity={b.o} />
        <ellipse cx="0" cy="1" rx="5" ry="1.8" fill="#000" opacity=".22" />
        <g transform={`translate(0 ${bob.toFixed(2)})`}>
          <path d="M0 0 C-11 -12 -13 -27 0 -31 C13 -27 11 -12 0 0 Z" transform="translate(0 2)" fill={C.pin} />
          <circle cy="-19.5" r="4.4" fill={C.pinDark} />
          <circle cy="-19.5" r="2.2" fill="#fff" />
        </g>
      </g>
    </svg>
  );
}
