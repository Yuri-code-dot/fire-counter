# 🔥 Fire Counter

Animated visitor badges for GitHub READMEs. Fire color changes based on visitor count — 9 tiers from Ghost Flame to GOD FLAME.

## Deploy in 5 minutes

### 1. Upstash Redis
1. Go to [upstash.com](https://upstash.com) → create free account
2. Create a Redis database
3. Copy `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`

### 2. Deploy to Vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push this repo to GitHub
2. Import to Vercel
3. Add environment variables:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`
4. Deploy!

### 3. Embed in your README
```markdown
![Fire Counter](https://your-app.vercel.app/api/counter/YOUR-USERNAME)
```

## Flame Tiers

| Visitors | Flame |
|----------|-------|
| 0+ | 👻 Ghost Flame (white/pink) |
| 100+ | 🧊 Ice Flame (blue) |
| 500+ | 🔮 Mystic Flame (purple) |
| 2K+ | ⚡ Plasma Flame (cyan) |
| 10K+ | ☠️ Venom Flame (green) |
| 50K+ | ☀️ Solar Flame (yellow) |
| 200K+ | 🔥 Inferno (orange) |
| 1M+ | 😈 Demon Flame (red) |
| 10M+ | 🔱 GOD FLAME |

## API

- `GET /api/counter/[page_id]` — returns SVG badge + increments count
- `GET /api/stats/[page_id]` — returns JSON with count (no increment)

## Built by
[YuRiVeRTi](https://github.com/YuRiVeRTi)
