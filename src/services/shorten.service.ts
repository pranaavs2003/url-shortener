import { eq } from "drizzle-orm";
import db from "../db";
import { urlTable } from "../db/schema";
import { generateShortUrl } from "../common/utils/generate-short-url";
import { redis } from "../db/redis/redis";

export const createUrl = async (data: any) => {
  try {
    const originalUrl = data.original_url;

    // Check if URL is in cache
    const chachedValue = await redis.get(originalUrl);
    if (chachedValue) return chachedValue;

    // Check if URL already exists
    const checkUrl = await db
      .select()
      .from(urlTable)
      .where(eq(urlTable.original_url, originalUrl));

    const doesUrlExist = checkUrl.length > 0;

    if (doesUrlExist) {
      // If URL already there in DB, send the fetched value
      await redis.set(data.original_url, checkUrl[0].short_code);
      return checkUrl[0].short_code;
    } else {
      // If not add URL to the DB
      const shortCode = generateShortUrl(originalUrl);
      await db.insert(urlTable).values({
        original_url: originalUrl,
        short_code: shortCode,
      });
      await redis.set(data.original_url, shortCode);
      return shortCode;
    }
  } catch (err) {
    throw err;
  }
};
