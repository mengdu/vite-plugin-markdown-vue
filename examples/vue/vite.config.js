import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import markdown from '../../'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [markdown(), vue({
    include: [/\.vue$/, /\.md$/]
  })]
})
