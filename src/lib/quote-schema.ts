import { z } from "zod";

export const quoteSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(254),
  store_url: z.string().trim().max(500).refine(value => !value || /^https?:\/\/.+/i.test(value)),
  message: z.string().trim().min(1).max(2000),
  language: z.enum(["en", "fr", "de", "zh"]),
});