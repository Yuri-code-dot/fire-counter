import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// Color tiers based on count
function getTierColor(count) {
  if (count < 100)     return { bg: "#1a0a1a", fire: "#ffb3d9", glow: "#ff80c0", text: "#ffffff" };
  if (count < 500)     return { bg: "#0a0f1a", fire: "#80c4ff", glow: "#40a0ff", text: "#ffffff" };
  if (count < 2000)    return { bg: "#120a1a", fire: "#c084fc", glow: "#9333ea", text: "#ffffff" };
  if (count < 10000)   return { bg: "#0a1a1a", fire: "#67e8f9", glow: "#22d3ee", text: "#ffffff" };
  if (count < 50000)   return { bg: "#0a1a0a", fire: "#86efac", glow: "#4ade80", text: "#ffffff" };
  if (count < 200000)  return { bg: "#1a1a0a", fire: "#fde047", glow: "#facc15", text: "#000000" };
  if (count < 1000000) return { bg: "#1a0f0a", fire: "#fb923c", glow: "#f97316", text: "#ffffff" };
  if (count < 10000000)return { bg: "#1a0a0a", fire: "#f87171", glow: "#ef4444", text: "#ffffff" };
  return                      { bg: "#0a0000", fire: "#ffff00", glow: "#ff4400", text: "#ffffff" };
}

function getTierLabel(count) {
  if (count < 100)      return "Ghost Flame";
  if (count < 500)      return "Ice Flame";
  if (count < 2000)     return "Mystic Flame";
  if (count < 10000)    return "Plasma Flame";
  if (count < 50000)    return "Venom Flame";
  if (count < 200000)   return "Solar Flame";
  if (count < 1000000)  return "Inferno";
  if (count < 10000000) return "Demon Flame";
  return "GOD FLAME";
}

function formatNumber(n) {
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
  if (n >= 1_000_000)     return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1_000)         return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  return String(n);
}

function generateSVG(count) {
  const { bg, fire, glow, text } = getTierColor(count);
  const label = getTierLabel(count);
  const formatted = formatNumber(count);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="220" height="56" viewBox="0 0 220 56">
  <defs>
    <filter id="glow">
      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
      <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${bg};stop-opacity:1"/>
      <stop offset="100%" style="stop-color:${bg}cc;stop-opacity:1"/>
    </linearGradient>
    <style>
      @keyframes flicker {
        0%,100% { opacity:1; transform:scaleY(1); }
        25% { opacity:0.85; transform:scaleY(0.96); }
        50% { opacity:0.95; transform:scaleY(1.03); }
        75% { opacity:0.9; transform:scaleY(0.98); }
      }
      @keyframes pulse {
        0%,100% { opacity:1; }
        50% { opacity:0.7; }
      }
      .flame { animation: flicker 0.8s ease-in-out infinite; transform-origin: 24px 42px; }
      .glow-text { animation: pulse 2s ease-in-out infinite; }
    </style>
  </defs>

  <!-- Background -->
  <rect width="220" height="56" rx="10" fill="url(#bg)" stroke="${fire}40" stroke-width="1"/>

  <!-- Flame SVG shape -->
  <g class="flame" filter="url(#glow)">
    <path d="M24 42 C18 36 14 28 20 20 C22 26 26 24 24 18 C28 22 32 28 28 34 C32 28 34 20 30 14 C36 20 38 32 32 40 C34 34 38 32 36 38 C38 32 40 28 38 22 C44 30 42 40 36 46 C32 50 16 50 24 42Z"
          fill="${fire}" opacity="0.95"/>
    <path d="M24 42 C20 38 18 32 22 26 C23 30 26 28 25 24 C28 27 30 32 27 37 C30 32 32 27 30 22 C34 28 33 36 29 41Z"
          fill="white" opacity="0.35"/>
  </g>

  <!-- Divider -->
  <line x1="52" y1="10" x2="52" y2="46" stroke="${fire}40" stroke-width="1"/>

  <!-- Label -->
  <text x="64" y="20" font-family="monospace" font-size="9" fill="${fire}cc" letter-spacing="1" class="glow-text">${label.toUpperCase()}</text>

  <!-- Count number -->
  <text x="64" y="42" font-family="monospace" font-size="22" font-weight="900" fill="${text}" filter="url(#glow)" letter-spacing="-0.5">${formatted}</text>

  <!-- visitors label -->
  <text x="64" y="52" font-family="monospace" font-size="7" fill="${fire}80" letter-spacing="2">VISITORS</text>

  <!-- Glow orb bottom right -->
  <circle cx="205" cy="48" r="20" fill="${glow}" opacity="0.06"/>
</svg>`;
}

export default async function handler(req, res) {
  const { page_id } = req.query;

  if (!page_id) {
    return res.status(400).json({ error: "page_id required" });
  }

  // Sanitize page_id
  const safeId = page_id.replace(/[^a-zA-Z0-9_\-\.]/g, "").slice(0, 64);

  try {
    const count = await redis.incr(`fire:${safeId}`);
    const svg = generateSVG(count);

    res.setHeader("Content-Type", "image/svg+xml");
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).send(svg);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Redis error" });
  }
}
