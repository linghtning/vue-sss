// 自动引入element plus组件 自动识别全局组件并点亮属性提示
import AutoImport from 'unplugin-auto-import/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
/**
 *  自动引入组件
 */
export function configAutoImportPlugin() {
  return AutoImport({
    resolvers: [
      AntDesignVueResolver(), // Auto import icon components
    ],
    imports: [
      'vue',
      'vue-router',
      'pinia',
      '@vueuse/core',
      {
        'vue-request': ['useRequest'],
        'dayjs': [['default', 'dayjs']],
      },
    ],
    dts: './types/auto-imports.d.ts',
    // eslint 报错解决：'ref' is not defined
    eslintrc: {
      // 默认 false, true 启用生成。生成一次就可以，避免每次工程启动都生成，一旦生成配置文件之后，最好把 enable 关掉，即改成 false。
      enabled: false,
      // 否则这个文件每次会在重新加载的时候重新生成，这会导致 eslint 有时会找不到这个文件。当需要更新配置文件的时候，再重新打开
      filepath: './.eslintrc-auto-import.json', // 默认就是 ./.eslintrc-auto-import.json
      // globalsPropValue: true // 默认 true
    },
    // dirs: ['src/hooks', 'src/utils', 'src/api/**/*.ts', 'src/enums/**/*.ts'],
  })
}
