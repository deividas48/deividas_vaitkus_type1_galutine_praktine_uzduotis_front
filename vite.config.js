// vite.config.js
// *Vite will automatically use .env.production when building for production

import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load the correct `.env` file for the mode
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_URL, // Accessed through the loaded environment
          changeOrigin: true,
          // rewrite: (path) => path.replace(/^\/api/, ''), // Optional: Rewrite the path if needed
        },
      },
    },
  };
});
