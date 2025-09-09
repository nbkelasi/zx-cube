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
    // vueDevTools(),
    dts({
      tsconfigPath: './tsconfig.build.json',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ZXCube',
      fileName: 'index',
    },
    rollupOptions: {
      external: ['vue', '@fortawesome/fontawesome-svg-core', '@fortawesome/free-solid-svg-icons', '@fortawesome/vue-fontawesome'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
        }
      },
    }
  },
})
