import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: './',
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  server: {
    host: '0.0.0.0',
    port: 7000,
    // 是否开启 https
    https: false,
    open: true,
    proxy: {
      //这里是通过请求/api 来转发到 http://127.0.0.1:88/
      '/api/': 'http://127.0.0.1:80/',
      "/ws/": {
        target: "ws://127.0.0.1:80", //这里是后台ws访问地址
        changeOrigin: true, //允许跨域设置
        ws: true, //websocket代理设置
      }
    }
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/,],
    },
    assetsDir: 'assets',
    rollupOptions: {
      input: './index.html',
      _output: {//不配置
        // 入口文件
        entryFileNames(chunk) {
          return 'assets/js/app-[hash].js';
        },
        // async-chunk
        chunkFileNames() {
          return 'assets/js/[name]-[hash].js';
        },
        // 资源文件
        assetFileNames(chunk) {
          // css
          if (chunk.name?.endsWith('.css')) {
            return 'assets/css/[name]-[hash].[ext]';
          }
          // image
          if (/.(png|jpg|gif|jpeg|webp|svg)$/.test(chunk.name || '')) {
            return 'assets/imgs/[name].[ext]';
          }

          return `assets/other/[name].[ext]`;
        },
      },
    },
  },
  optimizeDeps: {
    include: [
      "@jiaminghi/c-render",
      "@jiaminghi/c-render/lib/plugin/util",
      "@jiaminghi/charts/lib/util/index",
      "@jiaminghi/charts/lib/util",
      "@jiaminghi/charts/lib/extend/index",
      "@jiaminghi/charts",
      "@jiaminghi/color",
    ],
  }
})
