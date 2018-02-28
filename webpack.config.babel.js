import webpack from 'webpack';
import path from 'path';
import yargs from 'yargs';

let env = yargs.argv.env;

let libraryName = 'preload';
let plugins = [], outputFile;

if (env === 'build') {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      sourceMap: true
    })
  );
  outputFile = libraryName.toLowerCase() + '.min.js';
} else {
  outputFile = libraryName.toLowerCase() + '.js';
}

let config = {
  entry: __dirname + '/src/index.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/dist',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    modules: [path.join(__dirname, 'src'), path.join(__dirname, 'node_modules')],
    extensions: ['.js', '.json']
  },
  plugins: plugins
};

export default config;
