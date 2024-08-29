// svg加载
import svgLoader from 'vite-svg-loader'

export function configSvgLoaderPlugin() {
  return svgLoader({
    defaultImport: 'url', // or 'raw'
    svgo: true,
    svgoConfig: {
      multipass: true,
      plugins: [
        {
          name: 'preset-default',
          params: {
            overrides: {
              removeViewBox: false, // 禁用插件
            },
          },
        },
        {
          name: 'removeAttrs',
          params: {
            attrs: '(width|height|fill)', // 清除svg属性
          },
        },
      ],
    },
  })
}
