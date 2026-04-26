import { eq } from "drizzle-orm";
import db from "../db";
import { urlTable } from "../db/schema";
import { redis } from "../db/redis/redis";
import { SHORT_CODE_TTL_HOURS } from "../common/constants/redis.constant";

export const fetchUrl = async (shortCode: string) => {
  const cacheKey = `code:${shortCode}`;

  // Check Redis
  const cached = await redis.get(cacheKey);
  if (cached) return cached;

  // Check DB
  const result = await db
    .select()
    .from(urlTable)
    .where(eq(urlTable.short_code, shortCode));

  if (!result.length) {
    throw new Error("URL not found");
  }

  const originalUrl = result[0].original_url;

  // Cache it
  await redis.set(cacheKey, originalUrl, {
    ex: 60 * 60 * SHORT_CODE_TTL_HOURS,
  });

  return originalUrl;
};
