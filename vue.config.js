const path = require('path');

module.exports = {
  lintOnSave: false,
  chainWebpack: (config) => {
    const dir = path.resolve(__dirname, 'src/assets/icons');

    config.module
      .rule('svg-sprite')
      .test(/\.svg$/)
      .include.add(dir)
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({ extract: false })
      .end()
      .use('svgo-loader')
      .loader('svgo-loader')
      .tap((options) => ({ ...options, plugins: [{ removeAttrs: { attrs: 'fill' } }] }))
      .end();
    config.plugin('svg-sprite').use(require('svg-sprite-loader/plugin'), [{ plainSprite: true }]);
    config.plugin('html').tap((args) => {
      args[0].title = 'account';
      return args;
    });
    config.module.rule('svg').exclude.add(dir);
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/account-website/' : '/',
};
