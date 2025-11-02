// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // -------------------------------------------------
  // 1. Development server (React)
  // -------------------------------------------------
  server: {
    host: "::",               // keep your IPv6 binding
    port: 3000,               // <-- React runs on 3000 (you can keep 8080 if you want)
    // Proxy everything under /api and the Sanctum CSRF endpoint
    proxy: {
      "/api": {
        target: "http://localhost:8000", // Laravel
        changeOrigin: true,
        secure: false,
        ws: false,
      },
      "/sanctum/csrf-cookie": {
        target: "http://localhost:8000",
        changeOrigin: true,
        secure: false,
      },
    },
  },

  // -------------------------------------------------
  // 2. Plugins
  // -------------------------------------------------
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),

  // -------------------------------------------------
  // 3. Path alias
  // -------------------------------------------------
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));