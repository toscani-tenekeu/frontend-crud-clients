import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://toscani-tenekeu.toscanisoft.cm', // Remplace par ton vrai domaine
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
