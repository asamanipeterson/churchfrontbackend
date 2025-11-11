// src/schemas/livestream.ts
import { z } from "zod";

export const liveStreamSchema = z.object({
  isLive: z.boolean(),
  title: z.string().min(3, "Title must be at least 3 characters."),
  videoUrl: z.string().url("Video URL must be a valid link.").min(5), // Zod enforces URL format
});

export type LiveStreamFormData = z.infer<typeof liveStreamSchema>;