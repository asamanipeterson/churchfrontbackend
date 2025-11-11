// src/lib/ministries.ts
import api from "@/lib/api"; 
import type { MinistryFormData } from "@/schemas/ministry";

export interface Ministry {
  id: string;
  title: string;
  description: string;
  image: string; 
  created_at: string; 
  updated_at: string; 
}

/**
 * Utility to convert MinistryFormData into FormData for API submission.
 */
const buildFormData = (data: MinistryFormData): FormData => {
  const fd = new FormData();
  
  fd.append("title", data.title);
  fd.append("description", data.description);
  
  if (data.image instanceof File) {
    fd.append("image", data.image);
  }
  
  return fd;
};

export const fetchMinistries = async (): Promise<Ministry[]> => {
  const res = await api.get("/ministries");
  return res.data;
};

export const createMinistry = async (data: MinistryFormData): Promise<Ministry> => {
  const res = await api.post("/ministries", buildFormData(data));
  return res.data;
};

export const updateMinistry = async (id: string, data: MinistryFormData): Promise<Ministry> => {
  const fd = buildFormData(data);
  fd.append("_method", "PUT");
  
  const res = await api.post(`/ministries/${id}`, fd);
  return res.data;
};

export const deleteMinistry = async (id: string): Promise<void> => {
  await api.delete(`/ministries/${id}`);
};