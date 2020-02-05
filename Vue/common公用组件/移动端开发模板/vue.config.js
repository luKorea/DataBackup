module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'components': '@/components',
        'common': '@/common',
        'http': '@/http',
        'views': '@/views'
      }
    },
    devServer: {
      open: true,
      https: false,
      hotOnly: true,
    }
  }
};
