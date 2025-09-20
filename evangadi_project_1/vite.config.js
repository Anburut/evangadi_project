import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/evangadi_project/',  // Note: Added trailing slash for consistency
  plugins: [react()],
});