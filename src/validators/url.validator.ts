import { z } from "zod";

export const createUrlSchema = z.object({
  original_url: z.string().min(3).max(2048),
});
