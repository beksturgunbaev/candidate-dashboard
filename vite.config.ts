// Изменяем импорт defineConfig: берем его из vitest/config
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// Теперь TypeScript знает, что свойство "test" здесь абсолютно легально
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["react-window"],
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    include: ["**/*.{test,spec}.{ts,tsx}"],
  },
});
