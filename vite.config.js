import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'url'
import { viteMockServe } from 'vite-plugin-mock'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteMockServe({
      mockPath: 'src/mock', // mock数据的路径
      enable: true,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: "0.0.0.0",
    port: 9998,
    proxy: {
      "/dev-api": {
        target: "https://shon.aeaeaeae.com/",
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(new RegExp(`^/dev-api`), ""),
      },
    },
  },
})
