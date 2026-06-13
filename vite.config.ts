import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["react-window"], // Принудительно включаем в оптимизацию
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
