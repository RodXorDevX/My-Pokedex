import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    port: process.env.PORT || 3000,
    host: true,
    strictPort: true,
  },
  preview: {
    host: true,
    port: process.env.PORT || 3000,
    strictPort: true,
    allowedHosts: [
      'my-pokedex-2w1u.onrender.com',
      'localhost',
      '127.0.0.1',
    ],
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
  },
});