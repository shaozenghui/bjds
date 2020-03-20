const path = require('path')
const resolve = dir => path.join(__dirname, dir)
const webpack = require('webpack')
module.exports = {
  // 基本路径
  publicPath: process.env.VUE_APP_BASEURL,
  // 静态文件目录
  assetsDir: 'static',
  lintOnSave: false,
  // 文件名添加hash值
  filenameHashing: true,
  // 生产环境不打包map文件
  productionSourceMap: process.env.NODE_ENV === 'development' ? true : false,
  // 配置 webpack-dev-server 代理
  devServer: {
    open: true,
    port: 4001,
    proxy: {
      '/api': {
        target: 'http://172.28.11.217:8080/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  chainWebpack: config => {
    // 文件别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('_c', resolve('src/components'))
      .set('_v', resolve('src/views'))
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
    // 引入  es6 转化 插件
    config.entry('main').add('babel-polyfill')
  },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      })
    ]
  }

}
