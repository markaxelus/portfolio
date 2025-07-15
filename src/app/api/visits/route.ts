import { cookies } from "next/headers";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function GET() {
  const cookieStore = await cookies();

  if (cookieStore.get("ignoreVisits")?.value === "true") {
    const total = (await redis.get<number>("visit_total")) ?? 0;
    return Response.json({ total });
  }

  const cachedTotal = cookieStore.get("visit_total")?.value;
  const lastCounted = cookieStore.get("last_counted")?.value;

  if (cachedTotal) {
    // If we have a cached count, use it
    return Response.json({ total: Number(cachedTotal) });
  }

  // Check if user was counted within last 10 minutes
  const now = Date.now();
  const tenMinutesAgo = now - (10 * 60 * 1000);
  
  if (lastCounted && Number(lastCounted) > tenMinutesAgo) {
    // User was counted recently, just get current total without incrementing
    const total = (await redis.get<number>("visit_total")) ?? 0;
    return Response.json({ total });
  }

  // Otherwise, get the real count from Redis and increment
  let total = (await redis.get<number>("visit_total")) ?? 0;
  total = await redis.incr("visit_total");
  
  // Mark this user as counted for the next 10 minutes
  cookieStore.set("last_counted", String(now), { maxAge: 60 * 10 });

  // Cache the count for 10 minutes
  cookieStore.set("visit_total", String(total), { maxAge: 60 * 10 });

  return Response.json({ total });
}
