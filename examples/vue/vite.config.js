import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import markdown from '../../dist/index.es'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [markdown(), vue({
    include: [/\.vue$/, /\.md$/]
  })]
})
