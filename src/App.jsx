import { useState } from "react";

const TIERS = [
  { min: 0,        label: "Ghost Flame",  color: "#ffb3d9" },
  { min: 100,      label: "Ice Flame",    color: "#80c4ff" },
  { min: 500,      label: "Mystic Flame", color: "#c084fc" },
  { min: 2000,     label: "Plasma Flame", color: "#67e8f9" },
  { min: 10000,    label: "Venom Flame",  color: "#86efac" },
  { min: 50000,    label: "Solar Flame",  color: "#fde047" },
  { min: 200000,   label: "Inferno",      color: "#fb923c" },
  { min: 1000000,  label: "Demon Flame",  color: "#f87171" },
  { min: 10000000, label: "GOD FLAME 🔱", color: "#ffff00" },
];

export default function App() {
  const [pageId, setPageId] = useState("YuRiVeRTi");
  const baseUrl = window.location.origin;
  const badgeUrl = `${baseUrl}/api/counter/${pageId}`;
  const markdown = `![Fire Counter](${badgeUrl})`;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#050508",
      color: "#fff",
      fontFamily: "'Courier New', monospace",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "60px 20px",
    }}>
      {/* Header */}
      <div style={{ fontSize: 48, marginBottom: 8 }}>🔥</div>
      <h1 style={{
        fontSize: 36,
        fontWeight: 900,
        background: "linear-gradient(90deg, #ffb3d9, #80c4ff, #c084fc, #fde047, #f87171)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        marginBottom: 8,
        textAlign: "center",
      }}>Fire Counter</h1>
      <p style={{ color: "#ffffff50", fontSize: 14, letterSpacing: 2, marginBottom: 48 }}>
        ANIMATED VISITOR BADGES FOR GITHUB
      </p>

      {/* Live preview */}
      <div style={{
        background: "#0d0d12",
        border: "1px solid #ffffff15",
        borderRadius: 16,
        padding: 32,
        width: "100%",
        maxWidth: 560,
        marginBottom: 32,
      }}>
        <div style={{ color: "#ffffff40", fontSize: 11, letterSpacing: 3, marginBottom: 16 }}>LIVE PREVIEW</div>
        <img
          src={badgeUrl}
          alt="fire counter badge"
          style={{ display: "block", marginBottom: 20, borderRadius: 8 }}
          key={badgeUrl}
        />

        <div style={{ color: "#ffffff40", fontSize: 11, letterSpacing: 3, marginBottom: 8 }}>YOUR PAGE ID</div>
        <input
          value={pageId}
          onChange={e => setPageId(e.target.value.replace(/[^a-zA-Z0-9_\-\.]/g, "").slice(0, 64))}
          style={{
            background: "#ffffff08",
            border: "1px solid #ffffff20",
            borderRadius: 8,
            color: "#fff",
            padding: "10px 14px",
            fontSize: 14,
            outline: "none",
            width: "100%",
            fontFamily: "inherit",
            marginBottom: 20,
          }}
          placeholder="your-github-username"
        />

        <div style={{ color: "#ffffff40", fontSize: 11, letterSpacing: 3, marginBottom: 8 }}>MARKDOWN CODE</div>
        <div style={{
          background: "#ffffff06",
          border: "1px solid #ffffff10",
          borderRadius: 8,
          padding: "12px 14px",
          fontSize: 12,
          color: "#c084fc",
          wordBreak: "break-all",
          cursor: "pointer",
          userSelect: "all",
        }}
          onClick={() => navigator.clipboard?.writeText(markdown)}
          title="Click to copy"
        >
          {markdown}
        </div>
        <div style={{ color: "#ffffff25", fontSize: 10, marginTop: 6 }}>click to copy</div>
      </div>

      {/* Tiers */}
      <div style={{
        background: "#0d0d12",
        border: "1px solid #ffffff15",
        borderRadius: 16,
        padding: 32,
        width: "100%",
        maxWidth: 560,
        marginBottom: 32,
      }}>
        <div style={{ color: "#ffffff40", fontSize: 11, letterSpacing: 3, marginBottom: 20 }}>FLAME TIERS</div>
        {TIERS.map((t, i) => (
          <div key={i} style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 12,
          }}>
            <div style={{
              width: 10, height: 10, borderRadius: "50%",
              background: t.color,
              boxShadow: `0 0 8px ${t.color}`,
              flexShrink: 0,
            }} />
            <div style={{ color: t.color, fontSize: 13, fontWeight: "bold", width: 140 }}>{t.label}</div>
            <div style={{ color: "#ffffff30", fontSize: 11 }}>
              {t.min.toLocaleString()}+ visitors
            </div>
          </div>
        ))}
      </div>

      {/* Stats API */}
      <div style={{
        background: "#0d0d12",
        border: "1px solid #ffffff15",
        borderRadius: 16,
        padding: 32,
        width: "100%",
        maxWidth: 560,
      }}>
        <div style={{ color: "#ffffff40", fontSize: 11, letterSpacing: 3, marginBottom: 12 }}>STATS API</div>
        <div style={{ color: "#ffffff60", fontSize: 12, lineHeight: 1.8 }}>
          <div>🔥 Badge (increments): <span style={{ color: "#c084fc" }}>/api/counter/[page_id]</span></div>
          <div>📊 Stats only: <span style={{ color: "#c084fc" }}>/api/stats/[page_id]</span></div>
        </div>
      </div>

      <div style={{ color: "#ffffff12", fontSize: 10, marginTop: 40, letterSpacing: 2 }}>
        BUILT BY YURIVERTI · POWERED BY UPSTASH + VERCEL
      </div>
    </div>
  );
}
