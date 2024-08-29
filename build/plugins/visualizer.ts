import { visualizer } from 'rollup-plugin-visualizer'

/**
 *  打包分析
 */
export function configVisualizePlugin() {
  return visualizer({
    open: true, // 注意这里要设置为true，否则无效
    gzipSize: true,
    brotliSize: true,
  })
}
