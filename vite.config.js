import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  optimizeDeps: {
    include: ['three', '@react-three/fiber', 'gsap', '@gsap/react', '@emailjs/browser']
  },

  build: {
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          gsap: ['gsap', '@gsap/react'],
          vendor: ['react', 'react-dom'],
          emailjs: ['@emailjs/browser']
        },
      },
    },
    minify: 'esbuild',
    sourcemap: false,
  },
})
