import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl';
import autoprefixer from 'autoprefixer'
import postcssNesting from 'postcss-nesting';

export default defineConfig({
  plugins: [react(), basicSsl()],
  base: "./",
  css: {
    postcss: {
      plugins: [
        autoprefixer({}),
        postcssNesting
      ],
    }
  },
});
