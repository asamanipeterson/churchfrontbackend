// src/schemas/ministry.ts
import { z } from "zod";

export const ministrySchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  // icon: z.enum(["Users", "Globe", "Heart", "BookOpen", "Music"], { ... }), // REMOVED
  image: z.instanceof(File).optional(), 
});

export type MinistryFormData = z.infer<typeof ministrySchema>;