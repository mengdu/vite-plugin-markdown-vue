import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import pkg from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    minify: true,
    lib: {
      fileName: '[name]',
      entry: 'src/index.js',
      formats: ['cjs', 'es']
    },
    rollupOptions: {
      // input: {
      //   components: 'src/components/index.js',
      //   index: 'src/index.js',
      // },
      external: ['vue', '@vue/compiler-sfc', ...Object.keys(pkg.dependencies)],
      output: {
        globals: {
          vue: 'Vue'
        },
        exports: 'named'
      }
    }
  }
})
