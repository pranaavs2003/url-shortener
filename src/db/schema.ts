import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const urlTable = pgTable("urls", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  original_url: varchar({ length: 2048 }).notNull(),
  short_code: varchar({ length: 10 }).notNull().unique(),
  created_at: timestamp().defaultNow().notNull(),
  click_count: integer().default(0).notNull(),
});
