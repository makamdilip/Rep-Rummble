import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/' : '/Rep-Rummble/',
  plugins: [react()],
  define: {
    'import.meta.env.VITE_API_URL': JSON.stringify(
      mode === 'production'
        ? process.env.VITE_API_URL || 'https://your-api.onrender.com'
        : ''
    ),
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
      },
    },
  },
}))
