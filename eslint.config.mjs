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
  // 9x版本 忽略文件这种配置方式 废弃掉eslintignore
  ignores: [
    '*.sh',
    'node_modules',
    '*.md',
    '*.woff',
    '*.ttf',
    '.idea',
    '/public',
    '/docs',
    '.husky',
    '.local',
    '/bin',
    'Dockerfile',
    'stats.html',
  ],
  rules: {
    'regexp/no-unused-capturing-group': 'off',
    'node/prefer-global/process': 'off',
    'jsdoc/check-param-names': 'off',
    'jsdoc/require-returns-description': 'off',
    'ts/ban-ts-comment': 'off',
    'eslint-comments/no-unlimited-disable': 'off',
  },
})
