import { eq } from "drizzle-orm";
import db from "../db";
import { urlTable } from "../db/schema";
import { generateShortUrl } from "../common/utils/generate-short-url";
import { redis } from "../db/redis/redis";
import { normalizeUrl } from "../common/utils/normalize-url";
import { SHORT_CODE_TTL_HOURS } from "../common/constants/redis.constant";

export const createUrl = async (data: any) => {
  const originalUrl = normalizeUrl(data?.original_url || "");

  // Cache check
  const cacheKey = `url:${originalUrl}`;
  const cached = await redis.get(cacheKey);
  if (cached) return cached;

  // Generate code
  const shortCode = generateShortUrl(originalUrl);

  try {
    // Insert (safe)
    await db
      .insert(urlTable)
      .values({
        original_url: originalUrl,
        short_code: shortCode,
      })
      .onConflictDoNothing();
  } catch (err) {
    throw err;
  }

  // Always fetch (source of truth)
  const result = await db
    .select()
    .from(urlTable)
    .where(eq(urlTable.original_url, originalUrl));

  const finalCode = result[0].short_code;

  // Cache it
  await redis.set(cacheKey, finalCode, {
    ex: 60 * 60 * SHORT_CODE_TTL_HOURS,
  });

  return finalCode;
};
