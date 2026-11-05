import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 1500,
  },
  server: {
    // Proxy /api/* to the local Vercel dev server (vercel dev runs on port 3000).
    // Run `vercel dev` in a separate terminal, then `npm run dev` as usual.
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})
