module.exports = {
  lintOnSave: false,
  //配置代理跨域
  devServer: {
    proxy: {
      "/api": {
        target: "http://39.98.123.211",
        changeOrigin: true
      },
    },
  },
}