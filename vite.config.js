import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/stacked/', // Replace 'stacked' with your actual repository name
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  publicDir: 'public'
})
