import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().trim().min(1).max(80),
  surname: z.string().trim().min(1).max(80),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().max(40).optional(),
  message: z.string().trim().min(10).max(2000),
  website: z.string().max(0).optional(),
  consent: z.union([z.literal("on"), z.literal(true)]),
}).passthrough();
