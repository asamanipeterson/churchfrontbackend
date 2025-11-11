// src/lib/livestream.ts
import api from "@/lib/api"; 
import type { LiveStreamFormData } from "@/schemas/livestream";

export interface LiveStreamSettings extends LiveStreamFormData {
  id: number;
}

export const fetchStreamSettings = async (): Promise<LiveStreamSettings> => {
  const res = await api.get("/livestream");
  return res.data;
};

export const updateStreamSettings = async (data: LiveStreamFormData): Promise<LiveStreamSettings> => {
  const res = await api.put("/livestream", data);
  return res.data;
};