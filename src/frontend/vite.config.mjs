/* eslint-disable no-undef */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: resolve(__dirname),
  build: {
    lib: {
      entry: resolve(__dirname, 'index.html'),
      formats: ['es'],
    },
  },
  server: {
    open: false,
  },
  define: {
    'process.env': JSON.stringify(process.env),
  },
});
