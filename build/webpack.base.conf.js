const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pkg = require('../package.json');
const { config, Host } = require('./config');
const { resolve, subDir } = require('./utils');

const isProd = process.env.NODE_ENV === 'production';

const baseConfig = {
  target: 'web',
  mode: isProd ? 'production' : 'development',
  devtool: isProd ? false : 'source-map',
  entry: {
    main: [resolve('src/index.ts')],
  },
  output: {
    filename: '[name].js',
    path: resolve('dist'),
    library: pkg.name,
    libraryTarget: 'umd',
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      '@': resolve('src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.[t|j]s[x]?$/,
        include: [resolve('src'), resolve('demo')],
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true, // 开启babel编译缓存
              cacheCompression: false, // 缓存文件不要压缩
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        BUILD_ENV: JSON.stringify(process.env.BUILD_ENV),
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        API_PATH: JSON.stringify(config[process.env.BUILD_ENV].API_PATH),
        SUB_DIR: JSON.stringify(config[process.env.BUILD_ENV].SUB_DIR),
        PUBLIC_PATH: JSON.stringify(config[process.env.BUILD_ENV].PUBLIC_PATH),
      },
    }),
  ],
};

module.exports = baseConfig;
