// src/lib/events.ts
import api from "@/lib/api";
import type { EventFormData } from "@/schemas/event";

export interface Event {
  id: string;
  title: string;
  date: string;
  month: string;
  time: string; 
  location: string;
  image?: string; 
}

const buildFormData = (data: EventFormData) => {
  const fd = new FormData();
  fd.append("title", data.title);
  fd.append("date", data.date);
  fd.append("month", data.month);
  fd.append("time", data.time);
  fd.append("location", data.location);
  if (data.image) fd.append("image", data.image);
  return fd;
};

export const createEvent = async (data: EventFormData) => {
  // await csrf();
  const res = await api.post("/events", buildFormData(data), {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const updateEvent = async (id: string, data: EventFormData) => {
  const fd = buildFormData(data);
  fd.append("_method", "PUT"); // ← This is the key fix

  const res = await api.post(`/events/${id}`, fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};


export const deleteEvent = async (id: string) => {
  // await csrf();
  await api.delete(`/events/${id}`);
};

export const fetchEvents = async (): Promise<Event[]> => {
  try {
    // await csrf();
  } catch (error) {
    console.warn("CSRF failed, continuing...");
  }
  const res = await api.get("/events");
  return res.data;
}; 