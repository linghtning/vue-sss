/**
 * @name configAutoComponentPlugin
 * @description 按需加载，自动引入组件
 */
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

export function configAutoComponentPlugin() {
  return Components({
    // relative paths to the directory to search for components.
    dirs: ['src/components'],
    // search for subdirectories
    deep: true,
    // resolvers for custom components
    resolvers: [AntDesignVueResolver({ importStyle: false })],
    // generate `components.d.ts` global declarations,
    // also accepts a path for custom filename
    // dts: false,
    dts: './types/components.d.ts',
  })
}
