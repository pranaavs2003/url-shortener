import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// Dataabse connection
const client = postgres(process.env.DATABASE_URL!);
const db = drizzle(client);

export default db;
