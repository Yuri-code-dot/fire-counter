import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export default async function handler(req, res) {
  const { page_id } = req.query;

  if (!page_id) {
    return res.status(400).json({ error: "page_id required" });
  }

  const safeId = page_id.replace(/[^a-zA-Z0-9_\-\.]/g, "").slice(0, 64);

  try {
    const count = (await redis.get(`fire:${safeId}`)) || 0;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json({ page_id: safeId, count: Number(count) });
  } catch (err) {
    res.status(500).json({ error: "Redis error" });
  }
}
