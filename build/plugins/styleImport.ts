// vite.config.ts
import { AndDesignVueResolve, createStyleImportPlugin } from 'vite-plugin-style-import'
/**
 *  自动引入element-plus样式 解决弹窗等样式问题
 */
export function configStyleImportPlugin() {
  return createStyleImportPlugin({
    resolves: [
      AndDesignVueResolve(),
    ],
    // 自定义规则
    libs: [
      {
        libraryName: 'ant-design-vue',
        esModule: true,
        resolveStyle: (name) => {
          return `ant-design-vue/es/${name}/style/index`
        },
      },
    ],
  })
}
