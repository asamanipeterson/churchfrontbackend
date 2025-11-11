// src/lib/posts.ts
import api from "@/lib/api";
import type { PostFormData } from "@/schemas/post";

export interface Post {
  id: string;
  title: string; 
  category: string;
  date: string; // YYYY-MM-DD
  author: string;
  description: string; // ADDED: description field
  image?: string;
}

// Convert MM/DD/YYYY from form to YYYY-MM-DD for the API
const toISODate = (display: string): string => {
  if (!display) return "";
  const [m, d, y] = display.split("/");
  return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
};

// Builds FormData for API requests (updated to include description)
const buildFormData = (data: PostFormData): FormData => {
  const fd = new FormData();
  
  // Ensure the date is converted to YYYY-MM-DD for the backend
  const isoDate = toISODate(data.date); 
  
  fd.append("title", data.title);
  fd.append("category", data.category);
  fd.append("date", isoDate);
  fd.append("author", data.author);
  fd.append("description", data.description); // ADDED: append description
  
  if (data.image instanceof File) {
    fd.append("image", data.image);
  }
  return fd;
};

export const createPost = async (data: PostFormData): Promise<Post> => {
  const res = await api.post("/posts", buildFormData(data));
  return res.data;
};

export const updatePost = async (id: string, data: PostFormData): Promise<Post> => {
  const fd = buildFormData(data);
  fd.append("_method", "PUT"); 
  
  const res = await api.post(`/posts/${id}`, fd);
  return res.data;
};

export const deletePost = async (id: string): Promise<void> => {
  await api.delete(`/posts/${id}`);
};

export const fetchPosts = async (): Promise<Post[]> => {
  const res = await api.get("/posts");
  return res.data;
};