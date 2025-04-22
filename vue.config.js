module.exports = {
  devServer: {
    port: 5000,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true
      }
    }
  },
  
  // Use sensible source map configuration for better performance
  productionSourceMap: false,
  configureWebpack: {
    devtool: 'source-map'
  }
}