// import { resolve } from 'node:path';
import { viteMockServe } from 'vite-plugin-mock'

export function configMockPlugin(removeConnect: boolean) {
  return viteMockServe({
    mockPath: 'mock', // 指向mock下的文件
    ignore: /^_/, // 忽略下划线开头的文件
    watchFiles: true, // 监听文件内容变更
    localEnabled: true,
    prodEnabled: true,
    logger: true,
    // injectCode相对路径是相对于src/main.ts
    injectCode: `
        import { setupProdMockServer } from '../mock/utils/_mockProdServer';
        
        setupProdMockServer(${removeConnect});
      `,
    // injectFile 把injectCode自动注入src/main.ts里面 不用手写注入代码
    // injectFile: resolve('src/main.ts'),
  })
}
