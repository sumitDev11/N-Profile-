import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // three.js is lazy-loaded in its own chunk after the page is visible
    chunkSizeWarningLimit: 1200,
  },
});
