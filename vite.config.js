import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // This build target ensures Vite uses modern JS features
  // that support import.meta.env
  build: {
    target: 'esnext'
  }
})