// src/lib/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "/api",           // Proxied to Laravel via Vite
  withCredentials: true,     // Required for Sanctum cookies
});

// Fetch CSRF cookie from Sanctum
export const csrf = () => 
  axios.get("/sanctum/csrf-cookie", { withCredentials: true });

export default api;