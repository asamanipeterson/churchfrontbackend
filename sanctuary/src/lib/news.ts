import api from "@/lib/api";
import type { NewsFormData } from "@/schemas/new";

export interface News {
  id: string;
  category: string;
  title: string;
  date: string;
  description: string;
  image?: string | null;
}

const toISODate = (display: string): string => {
  if (!display) return "";
  const [m, d, y] = display.split("/");
  return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
};

const buildFormData = (data: NewsFormData): FormData => {
  const fd = new FormData();

  fd.append("title", data.title);
  fd.append("category", data.category);
  // This converts the frontend MM/DD/YYYY back to YYYY-MM-DD for the backend
  fd.append("date", toISODate(data.date)); 
  fd.append("description", data.description);

  if (data.image instanceof File) {
    fd.append("image", data.image);
  }

  return fd;
};

export const createNews = async (data: NewsFormData): Promise<News> => {
  const res = await api.post("/news", buildFormData(data));
  return res.data;
};

export const updateNews = async (id: string, data: NewsFormData): Promise<News> => {
  const fd = buildFormData(data);
  // Important for Laravel to treat POST as PUT when using FormData with file uploads
  fd.append("_method", "PUT"); 
  const res = await api.post(`/news/${id}`, fd);
  return res.data;
};

export const deleteNews = async (id: string): Promise<void> => {
  await api.delete(`/news/${id}`);
};

export const fetchNews = async (): Promise<News[]> => {
  const res = await api.get("/news");
  return res.data;
};