import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/stacked/', // This matches your repository name 'ryan-mai/stacked'
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  publicDir: 'public'
})
