// src/schemas/post.ts
import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(3),
  category: z.string().min(3),
  date: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, "Use MM/DD/YYYY"),
  author: z.string().min(4),
  description: z.string().min(10, "Description must be at least 10 characters long"), // ADDED: description validation
  image: z.instanceof(File).optional(),
});

export type PostFormData = z.infer<typeof postSchema>;