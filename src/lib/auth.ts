// src/lib/auth.ts
import api, { csrf } from "@/lib/api";

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export const login = async (data: LoginData) => {
  await csrf();
  const res = await api.post("/login", data);
  return res.data;
};



export const register = async (data: RegisterData) => {
  await csrf();
  console.log("Data sent to API:", data);  // Add this
  const res = await api.post("/register", data);
  return res.data;
};

export const logout = async () => {
  await csrf();
  await api.post("/logout");
};