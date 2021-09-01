const path = require('path')

module.exports = {
  runtimeCompiler: true,
  productionSourceMap: false,
  parallel: false,
  css: {
    extract: false
  },
  chainWebpack: config => {
    config.entry('app')
      .clear()
      .add('./example/main.js')
      .end()

    if (process.env.IS_LIB) {
      config.externals({ 'vue': 'vue' })
        .end()
    }
  },
  publicPath: './',
  outputDir: path.resolve(__dirname, './docs'),
  assetsDir: 'static'
}
