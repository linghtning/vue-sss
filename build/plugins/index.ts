import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import type { PluginOption } from 'vite'

import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import { configVueDevToolsPlugin } from './devTools'
// import { configMockPlugin } from './mock'
import { configSvgLoaderPlugin } from './svgLoader'
import { configUnocssPlugin } from './unocss'
import { configVisualizePlugin } from './visualizer'
import { configCompressPlugin } from './compress'
import { configSvgIconsPlugin } from './svgSprite'
import { configStyleImportPlugin } from './styleImport'
import { configAutoImportPlugin } from './autoImport'
import { configAutoComponentPlugin } from './component'

export function createVitePlugin(isBuild: boolean, _: any) {
  // 基础配置
  const plugins: PluginOption[] = [
    vue(),
    vueSetupExtend(),
    vueJsx(),
    configAutoComponentPlugin(),
    configAutoImportPlugin(),
    configVueDevToolsPlugin(),
    configStyleImportPlugin(),
    configSvgLoaderPlugin(),
    configUnocssPlugin(),
    configSvgIconsPlugin(),
  ]

  // 启用mock
  // plugins.push(configMockPlugin(true))

  if (isBuild) {
    plugins.push(
      configVisualizePlugin(),
      configCompressPlugin(),
    )
  }
  return plugins
}
