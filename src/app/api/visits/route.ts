/* import { cookies } from "next/headers";*/
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function GET() {
  try {
    console.log('Attempting to increment visit counter...');
    const total = await redis.incr("visit_total");
    console.log('Successfully incremented counter to:', total);
    return Response.json({ total });
  } catch (error) {
    console.error('Failed to increment counter:', error);
    // If we don't have permission to increment, try to at least read the value
    try {
      console.log('Attempting to read visit counter...');
      const total = (await redis.get<number>("visit_total"));
      console.log('Successfully read counter:', total);
      return Response.json({ total });
    } catch (error) {
      console.error('Failed to access visit counter:', error);
      return Response.json({ total: 0, error: 'Failed to access visit counter' }, { status: 500 });
    }
  }
}
