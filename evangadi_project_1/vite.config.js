import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/evangadi_project/' : '/',
  plugins: [react()],
  build: {
    // This ensures all assets use relative paths
    assetsDir: 'assets'
  },
  server: {
    // Force HTTPS in development if needed
    https: false
  }
});