import { cookies } from "next/headers";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function GET(request: Request) {
  const cookieStore = await cookies();

  if (cookieStore.get("ignoreVisits")?.value === "true") {
    const total = (await redis.get<number>("visit_total")) ?? 0;
    return Response.json({ total });
  }
  const visited = cookieStore.get("visited")?.value === "true";
  let total = (await redis.get<number>("visit_total")) ?? 0;

  if (!visited) {
    total = await redis.incr("visit_total");
    cookieStore.set("visited", "true", { maxAge: 60 * 60 * 24 * 30 });
  }

  return Response.json({ total });
}
