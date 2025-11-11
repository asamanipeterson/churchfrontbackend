// src/lib/auth.ts
import api from "@/lib/api";

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

const TOKEN_KEY = "auth_token";

/**
 * Set auth token in localStorage and on axios instance
 */
export const setAuthToken = (token: string | null) => {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    localStorage.removeItem(TOKEN_KEY);
    delete api.defaults.headers.common["Authorization"];
  }
};

/**
 * Initialize auth from localStorage (call this on app startup)
 */
export const initAuth = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
};

/**
 * Register (returns { token, user } expected from backend)
 * Expects your backend register to return a token (plainTextToken)
 */
export const register = async (data: RegisterData) => {
  // send JSON to /api/register
  const res = await api.post("/register", data);
  const payload = res.data;

  if (payload?.token) {
    setAuthToken(payload.token);
  }

  return payload;
};

/**
 * Login (returns { token, user })
 */
export const login = async (data: LoginData) => {
  const res = await api.post("/login", data);
  const payload = res.data;

  if (payload?.token) {
    setAuthToken(payload.token);
  }

  return payload;
};

/**
 * Logout - revoke token server-side and clear local token
 */
export const logout = async () => {
  try {
    // backend should delete current token for the user
    await api.post("/logout");
  } catch (err) {
    // ignore network errors; still clear local token
    // you may want to handle specific errors
  } finally {
    setAuthToken(null);
  }
};

/**
 * Get current authenticated user
 */
export const getMe = async () => {
  const res = await api.get("/user");
  return res.data;
};

/**
 * Helper to check if user is authenticated locally
 */
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem(TOKEN_KEY);
};

export default {
  initAuth,
  setAuthToken,
  register,
  login,
  logout,
  getMe,
  isAuthenticated,
};
