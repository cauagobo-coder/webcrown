
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// Force Tailwind config cache invalidation
export default defineConfig({
  plugins: [react()],
  build: {
    // Split heavy vendor libs into separate chunks for better caching
    // and to avoid downloading unused code (e.g. three.js on mobile)
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-motion': ['framer-motion'],
          'vendor-gsap': ['gsap'],
          'vendor-three': ['three'],
        },
      },
    },
  },
})
