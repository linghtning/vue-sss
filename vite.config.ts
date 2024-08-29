import { URL, fileURLToPath } from 'node:url'
import { defineConfig, loadEnv } from 'vite'

// // dotenv 加载.env 配置文件 用于扩散到根目录配置项中包括 commonjs
// import dotenv from 'dotenv'
// dotenv.config()

// 插件拆出去 用于区分开发和打包加载不同插件类型
import { configViteBuild } from './build/build'
import { createVitePlugin } from './build/plugins'
import usePostCss from './build/postcss'
import useProxy from './build/proxy'
import { wrapperEnv } from './build/utils'

export default defineConfig(({ command, mode }) => {
  const isBuild = command === 'build'

  // 提取环境文件
  const root = process.cwd()
  const env = loadEnv(mode, root)
  const viteEnv: any = wrapperEnv(env)
  return {
    base: viteEnv.VITE_PUBLIC_PATH,
    plugins: createVitePlugin(isBuild, viteEnv),
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    build: configViteBuild(),
    optimizeDeps: {
      entries: ['src/**/*.{ts,tsx,vue}'],
      // @iconify/iconify: The dependency is dynamically and virtually loaded by @purge-icons/generated, so it needs to be specified explicitly
      include: [
        // 'vue',
        // '@vue/runtime-core',
        // 'vue-router',
        // 'pinia',
        // 'axios',
        // 'echarts/core',
        // 'echarts/charts',
        // 'echarts/components',
        // 'echarts/renderers',
        // 'lodash-es',
        // 'vue-request',
        // 'dayjs',
        // 'element-plus/es/components/date-picker/style/css',
        // 'element-plus/es/components/pagination/style/css',
        // 'element-plus/es/components/form/style/css',
        // 'element-plus/es/components/input/style/css',
        // 'element-plus/es/components/form-item/style/css',
        // 'element-plus/es/components/select/style/css',
        // 'element-plus/es/components/option/style/css',
        // 'element-plus/es/components/tooltip/style/css',
        // 'swiper/vue',
      ],
    },
    server: {
      // host: '0.0.0.0',
      hmr: true,
      cors: true,
      port: viteEnv.VITE_PORT,
      proxy: viteEnv.VITE_PROXY_OPEN ? useProxy(viteEnv.VITE_PROXY) : {},
    },
    css: {
      preprocessorOptions: {
        // 全局样式变量预注入
        scss: {
          additionalData: `@use "./src/styles/variables.scss" as *;
                           @use "./src/styles/mixin.scss" as *;`,
          javascriptEnabled: true,
        },
      },
      postcss: usePostCss(),
    },
  }
})
