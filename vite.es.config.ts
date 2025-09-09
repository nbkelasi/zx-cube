import { resolve } from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// import vueDevTools from 'vite-plugin-vue-devtools'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    dts({
      tsconfigPath: './tsconfig.build.json',
      outDir: 'dist/types'
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    outDir: 'dist/es',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ZXCube',
      fileName: 'zx-cube',
      formats: ['es']
    },
    rollupOptions: {
      external: ['vue', '@fortawesome/fontawesome-svg-core', '@fortawesome/free-solid-svg-icons', '@fortawesome/vue-fontawesome', 'async-validator', '@types/lodash-es', '@popperjs/core', 'lodash-es'],
      output: {
        assetFileNames: 'index.css'
      }
    }
  },
})
