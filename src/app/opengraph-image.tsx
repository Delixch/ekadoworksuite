import { ImageResponse } from "next/og";

/** WhatsApp, Facebook, LinkedIn vb. uygulamalarda link atılınca çıkan önizleme resmi (1200x630). */
export const alt = "Punn Digital: otelinizin mesaj ve aramalarını 7/24 cevaplayan Dijital Resepsiyonist";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BLUE = "#0044f0";

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: BLUE, color: "white", padding: 56 }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 600, paddingRight: 36 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
            <span style={{ fontSize: 64, fontWeight: 800, letterSpacing: -2 }}>punn</span>
            <span style={{ fontSize: 22, letterSpacing: 8, opacity: 0.85 }}>DIGITAL</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 66, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>Dijital Resepsiyonist</span>
            <span style={{ fontSize: 30, lineHeight: 1.35, marginTop: 20, opacity: 0.92 }}>
              Otelinizin mesaj ve aramalarını 7/24, 30’dan fazla dilde cevaplar.
            </span>
          </div>
          <div style={{ display: "flex", gap: 12, fontSize: 22, fontWeight: 700 }}>
            {["WhatsApp", "Instagram", "Telefon", "Web chat"].map((c) => (
              <span key={c} style={{ background: "rgba(255,255,255,.18)", borderRadius: 999, padding: "8px 18px" }}>
                {c}
              </span>
            ))}
          </div>
        </div>
        {/* düz çizim: fotoğraf PNG'yi şişirir, WhatsApp ~300 KB üstünü göstermeyebilir */}
        <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center", gap: 18, background: "white", borderRadius: 32, padding: 36 }}>
          {[
            { me: false, t: "Merhaba, iki kişilik odanız var mı?" },
            { me: true, t: "Evet, 3 gece için müsait. Rezervasyon yapayım mı?" },
            { me: false, t: "Hello, do you have a sea view?" },
            { me: true, t: "Yes! Sea view rooms are available." },
          ].map((m) => (
            <div
              key={m.t}
              style={{
                display: "flex",
                alignSelf: m.me ? "flex-end" : "flex-start",
                maxWidth: "86%",
                fontSize: 25,
                lineHeight: 1.3,
                padding: "14px 20px",
                borderRadius: 22,
                background: m.me ? BLUE : "#e8eefc",
                color: m.me ? "white" : "#101a3a",
              }}
            >
              {m.t}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
