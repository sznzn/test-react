import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3002', 
        changeOrigin: true,
        secure: false
      }
    }
  }
})
