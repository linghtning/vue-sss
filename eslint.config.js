import antfu from '@antfu/eslint-config'

export default antfu({
  // 使用prettier 格式化css html 等
  formatters: true,
  // unocss 检测&格式化 暂时注释 等配置了unocss再开放为true
  // unocss: true,
  // vue的eslint配置
  vue: true,
  // 保存删除未引入的代码
  // isInEditor: false,
})
