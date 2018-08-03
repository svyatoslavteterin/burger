module.exports = {
  assetsDir: 'src/assets',

  css: {
    sourceMap: true
  },
  configureWebpack: {
    devtool: 'source-map'
  },
  baseUrl: undefined,
  outputDir: 'dist',
  runtimeCompiler: true,
  productionSourceMap: false,
  parallel: undefined
}