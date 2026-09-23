import z from "zod";


export const brandSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().max(256).optional(),
  logoUrl: z.string().url().optional(),
  status: z.enum(["active", "inactive"]).default("active"),
});
