import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import type { PluginOption } from 'vite'

import { configAutoImportPlugin } from './autoImport'
import { configAutoComponentPlugin } from './component'
import { configVueDevToolsPlugin } from './devTools'
import { configMockPlugin } from './mock'
import { configStyleImportPlugin } from './styleImport'
import { configSvgLoaderPlugin } from './svgLoader'
import { configUnocssPlugin } from './unocss'
import { configVisualizePlugin } from './visualizer'
import { configCompressPlugin } from './compress'

export function createVitePlugin(isBuild: boolean, _: any) {
  const plugins: PluginOption[] = [
    vue(),
    vueJsx(),
    configAutoImportPlugin(),
    configAutoComponentPlugin(),
    configVueDevToolsPlugin(),
    configStyleImportPlugin(),
    configSvgLoaderPlugin(),
    configUnocssPlugin(),
  ]

  // 启用mock
  plugins.push(configMockPlugin(true))

  if (isBuild) {
    plugins.push(
      configVisualizePlugin(),
      configCompressPlugin(),
    )
  }
  return plugins
}
