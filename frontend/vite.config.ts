import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from 'path'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  preview: {
    port: 4173,
    host: true,
    allowedHosts: ['mathfacile-frontend-latest.onrender.com'],
  }
});
