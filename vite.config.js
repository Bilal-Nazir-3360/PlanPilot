import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined
          if (id.includes('/react/') || id.includes('/react-dom/') || id.includes('/react-router-dom/')) return 'react-vendor'
          if (id.includes('/framer-motion/')) return 'motion'
          if (id.includes('/recharts/')) return 'charts'
          if (id.includes('/@dnd-kit/')) return 'dnd'
          return undefined
        },
      },
    },
  },
})
