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

  const visited = cookieStore.get("visited")?.value === "true";
  const cachedTotal = cookieStore.get("visit_total")?.value;

  if (visited && cachedTotal) {
    // If user has visited and we have a cached count, use it
    return Response.json({ total: Number(cachedTotal) });
  }

  // Otherwise, get the real count from Redis
  let total = (await redis.get<number>("visit_total")) ?? 0;

  if (!visited) {
    total = await redis.incr("visit_total");
    cookieStore.set("visited", "true", { maxAge: 60 * 60 * 24 }); // 30 days
  }

  // Cache the count for 1 hour
  cookieStore.set("visit_total", String(total), { maxAge: 60 * 60 * 24 });

  return Response.json({ total });
}
