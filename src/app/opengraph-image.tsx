import { ImageResponse } from "next/og";

/** WhatsApp, Facebook, LinkedIn vb. uygulamalarda link atılınca çıkan önizleme resmi (1200x630). */
export const alt = "Ekado WorkSuite: Personel, işletme ve muhasebe tek yazılımda";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const NAVY = "#1c2b3a";
const BLUE = "#2b5ab0";
const SOFT = "#7aa7ff";

const modules = [
  { name: "Stempeluhr", note: "Puantaj, vardiya planı" },
  { name: "Lohn", note: "Bordro, Lohnausweis" },
  { name: "HACCP", note: "Sıcaklık ve hijyen kayıtları" },
  { name: "Buchhaltung", note: "Kasa, banka, faturalar" },
];

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: NAVY, color: "white", padding: 56 }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 600, paddingRight: 36 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
            <span style={{ fontSize: 58, fontWeight: 800, letterSpacing: 6 }}>EKADO</span>
            <span style={{ fontSize: 22, letterSpacing: 6, color: SOFT }}>WORKSUITE</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 66, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>Tek yazılımda işletme yönetimi</span>
            <span style={{ fontSize: 30, lineHeight: 1.35, marginTop: 20, opacity: 0.9 }}>
              Personel, bordro, HACCP, sipariş ve muhasebe. Restoranlar ve küçük işletmeler için.
            </span>
          </div>
          <div style={{ display: "flex", gap: 12, fontSize: 22, fontWeight: 700 }}>
            {["DE", "TR", "EN", "FR", "IT"].map((c) => (
              <span key={c} style={{ background: "rgba(255,255,255,.14)", borderRadius: 999, padding: "8px 18px" }}>
                {c}
              </span>
            ))}
          </div>
        </div>
        {/* düz çizim: fotoğraf PNG'yi şişirir, WhatsApp ~300 KB üstünü göstermeyebilir */}
        <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center", gap: 16, background: "white", borderRadius: 32, padding: 36 }}>
          {modules.map((m) => (
            <div key={m.name} style={{ display: "flex", alignItems: "center", gap: 20, padding: "16px 22px", borderRadius: 20, background: "#eef2fa" }}>
              <div style={{ display: "flex", width: 14, height: 14, borderRadius: 7, background: BLUE }} />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: 30, fontWeight: 800, color: NAVY }}>{m.name}</span>
                <span style={{ fontSize: 22, color: "#5f6875" }}>{m.note}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
