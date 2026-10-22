import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Relative asset URLs work on GitHub Pages, including project subpaths
  // such as https://username.github.io/repository-name/.
  base: './',
  server: {
    watch: {
      ignored: ['**/.chrome-test-profile/**', '**/.tmp-viewport-checks/**'],
    },
  },
});
