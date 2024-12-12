import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/minio': {
        target: 'https://pbi.minio.johnsonis.me',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/minio/, ''),
      },
    },
  },
});
