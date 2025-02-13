import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer'

export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  plugins: [vue()],
  server: {
    port: 3001, // Reemplaza 3000 con el puerto que deseas utilizar
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})