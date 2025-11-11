import { z } from "zod";

export const newsSchema = z.object({
  title: z.string().min(3),
  category: z.string().min(3),
  date: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, "Use MM/DD/YYYY"),
  description: z.string().min(4),
  image: z.instanceof(File).optional(),
});

export type NewsFormData = z.infer<typeof newsSchema>;