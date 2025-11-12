// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Configuración de Vite
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // puerto por defecto de tu frontend
  },
});
