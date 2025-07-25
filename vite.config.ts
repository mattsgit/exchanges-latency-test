import solid from 'solid-start/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [solid({ ssr: false })],
  base: '/', // Custom domain uses root path
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
      },
    },
  },
});
