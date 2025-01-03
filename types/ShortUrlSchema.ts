import { z } from "zod";

export const ShortUrlSchema = z.object({
  url: z.string().url({ message: "Invalid url" }),
  expiresAt: z.date({ message: "Invalid date"}).optional(),
});
