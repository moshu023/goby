module.exports = {
  devServer: {
    open: true,
    host: 'localhost',
    port: 8080,
    https: false,
    // 以上的ip和端口是我们本机的;下面为需要跨域的
    proxy: { // 配置跨域
      '/': {
        target: 'http://10.245.150.34:9999',
        secure: false, // 如果是http接口，需要配置该参数
        ws: true,
        // 允许跨域
        changOrigin: true,
        pathRewrite: {
          '^/axios': ''
        }
      }
    }
  },
  publicPath: './'
}
