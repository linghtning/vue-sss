import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

// 读取mock文件夹下面所有的ts文件
const modules: Record<string, any> = import.meta.glob('../../mock/**/*.ts', { eager: true })

const mockModules: any = []

Object.entries(modules).forEach(([key, value]) => {
  // 如果包含/_ 不处理 否则添加到mockModules中
  // eslint-disable-next-line ts/no-unused-expressions
  key.includes('/_') || (value.default && mockModules.push(...value.default))
})

// 生产环境使用
export function setupProdMockServer(removeConnect: boolean) {
  // 如果是star模式 线上删除isConnected位true的接口
  // 如果是prodtion 模式不删除任何接口
  createProdMockServer(
    removeConnect ? mockModules.filter((item: any) => !item.isConnected) : mockModules,
  )
}
