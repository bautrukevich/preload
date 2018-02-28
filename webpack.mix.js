let mix = require('laravel-mix');
let path = require('path');
let LiveReloadPlugin = require('webpack-livereload-plugin');
let webpack = require('webpack');

mix.webpackConfig({
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'node_modules'),
      '@src': path.resolve(__dirname, 'src')
    }
  },
  plugins: [
    new LiveReloadPlugin()
  ]
});

// mix.copy('./src/fonts', './public/fonts');
mix.copy('./src/static/content', './content');

mix.postCss('src/app.css', 'css', [
  require('postcss-import')({addDependencyTo: webpack}),
  require('postcss-url')(),
  require('postcss-cssnext')(),
  require('postcss-nested')(),
  // add your "plugins" here
  // ...
  // and if you want to compress,
  // just use css-loader option that already use cssnano under the hood
  require('postcss-browser-reporter')(),
  require('postcss-reporter')(),
  require('postcss-custom-properties')()
]).js('src/app.js', 'js');

mix.autoload({
  jquery: ['$', 'window.jQuery']
});

mix.browserSync({
  proxy: false,
  server: {
    baseDir: './'
  }
});
