import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    // Raise the chunk-size warning threshold — three.js is intentionally large.
    chunkSizeWarningLimit: 1500,

    rollupOptions: {
      output: {
        // Split the heaviest third-party libs into their own immutable chunks.
        // Browsers that have already cached "vendor-three" won't re-download it
        // when the app logic changes.
        manualChunks: {
          // Three.js + React-Three-Fiber in one chunk (~750 KB gzipped)
          'vendor-three': ['three', '@react-three/fiber'],
          // GSAP in its own chunk — shared across all component imports
          'vendor-gsap': ['gsap', '@gsap/react'],
          // React runtime
          'vendor-react': ['react', 'react-dom'],
        },
      },
    },

    // Minify with esbuild (default & fastest) — no change needed, just document.
    minify: 'esbuild',

    // Generate source maps only for production debugging; omit for slightly
    // smaller deploys (comment-out the line below to re-enable).
    sourcemap: false,
  },
})
