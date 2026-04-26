import { eq } from "drizzle-orm";
import db from "../db";
import { urlTable } from "../db/schema";
import { generateShortUrl } from "../common/utils/generate-short-url";

export const createUrl = async (data: any) => {
  try {
    const originalUrl = data.original_url;

    // Check if URL is in cache

    // Check if URL already exists
    const checkUrl = await db
      .select()
      .from(urlTable)
      .where(eq(urlTable.original_url, originalUrl));

    const doesUrlExist = checkUrl.length > 0;

    if (doesUrlExist) {
      console.log("Fetched");
      // If URL already there in DB, send the fetched value
      return checkUrl[0].short_code;
    } else {
      console.log("Added");
      // If not add URL to the DB
      const shortCode = generateShortUrl(originalUrl);
      await db.insert(urlTable).values({
        original_url: originalUrl,
        short_code: shortCode,
      });
      return shortCode;
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};
