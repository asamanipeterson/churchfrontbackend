// src/schemas/event.ts
import { z } from "zod";

export const eventSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  date: z
    .string()
    .regex(/^\d{1,2}$/, "Date must be a number between 1-31"),
  month: z
    .string()
    .regex(
      /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)$/i,
      "Enter a valid month abbreviation (e.g., Jan, Feb, Mar)"
    ),
  time: z
    .string()
    .regex(/^\d{1,2}[:.]\d{2}\s?(am|pm)$/i, "Format: 8.00 pm or 8:00 pm"),
  location: z.string().min(3, "Location too short"),

  // Make image optional, but allow null or undefined (important!)
  image: z
    .custom<File | null | undefined>()
    .optional(),
});

export type EventFormData = z.infer<typeof eventSchema>; 
