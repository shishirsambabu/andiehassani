import { ImageResponse } from "next/og";

export const alt = "Find the red thread — Andie Hassani Business Coaching";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", overflow: "hidden", background: "#f6f0e8", color: "#0a0a0a", fontFamily: "Arial, sans-serif" }}>
      <div style={{ width: 760, display: "flex", flexDirection: "column", padding: "58px 64px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 18, fontWeight: 700, letterSpacing: 3 }}>
          <span style={{ width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #c5162a", borderRadius: 999, color: "#c5162a", fontFamily: "Georgia, serif", fontStyle: "italic" }}>ah</span>
          <span>ANDIE HASSANI / DECISION STUDIO</span>
        </div>
        <div style={{ marginTop: 72, display: "flex", flexDirection: "column", fontSize: 88, fontWeight: 800, lineHeight: 0.88, letterSpacing: -6, textTransform: "uppercase" }}>
          <span>Find the</span><span style={{ color: "#c5162a" }}>red thread.</span>
        </div>
        <div style={{ marginTop: 28, fontFamily: "Georgia, serif", fontSize: 43, fontStyle: "italic" }}>Build from what is true.</div>
        <div style={{ marginTop: "auto", fontSize: 16, fontWeight: 700, letterSpacing: 2 }}>ALIGNMENT · STRATEGY · ACTION</div>
      </div>
      <div style={{ width: 440, height: "100%", display: "flex", position: "relative", alignItems: "center", justifyContent: "center", background: "#c5162a", borderLeft: "3px solid #0a0a0a" }}>
        <div style={{ width: 280, height: 280, display: "flex", position: "relative", alignItems: "center", justifyContent: "center", border: "2px solid #fffdf9", borderRadius: 999 }}>
          <div style={{ width: 180, height: 180, display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #0a0a0a", borderRadius: 999 }}>
            <div style={{ width: 88, height: 88, borderRadius: 999, background: "#0a0a0a" }} />
          </div>
          <span style={{ position: "absolute", top: -9, padding: "0 10px", background: "#c5162a", color: "#fffdf9", fontSize: 14, fontWeight: 700, letterSpacing: 2 }}>ALIGN</span>
          <span style={{ position: "absolute", right: -38, padding: "0 10px", background: "#c5162a", color: "#fffdf9", fontSize: 14, fontWeight: 700, letterSpacing: 2 }}>STRATEGISE</span>
          <span style={{ position: "absolute", bottom: -9, padding: "0 10px", background: "#c5162a", color: "#fffdf9", fontSize: 14, fontWeight: 700, letterSpacing: 2 }}>ACT</span>
        </div>
        <div style={{ position: "absolute", width: 4, height: "100%", left: 64, background: "#fffdf9" }} />
      </div>
    </div>,
    size,
  );
}
