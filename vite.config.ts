import solid from 'solid-start/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [solid({ ssr: false })],
  base: '/exchanges-latency-test/', // GitHub Pages base path - change to '/' when custom domain is active
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
      },
    },
  },
});
