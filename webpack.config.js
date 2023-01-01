const { resolve, join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

const sourceDir = 'app';
const compileDir = 'build';
const imagesDir = 'images';
const publicDir = 'public';

module.exports = {
  entry: join(__dirname, sourceDir, 'index.js'),
  devtool: 'inline-source-map',
  output: {
    path: resolve(__dirname, compileDir),
    filename: 'js/[name]-[contenthash:8].js',
    assetModuleFilename: join(imagesDir, '[name][ext]'),
    clean: true,
    // publicPath: '/', // Use this absolute path for deploy on your own host
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(svg|ico)$/,
        type: 'asset/resource',
        generator: {
          filename: join(`${imagesDir}/icons`, '[name][ext]'),
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: join('fonts', '[name][ext]'),
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'React template',
      template: `${publicDir}/index.html`,
      inject: 'body',
      favicon: `${publicDir}/images/favicon.ico`,
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name]-[contenthash:8].css',
    }),
  ],
  optimization: {
    minimizer: [
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              [
                'gifsicle',
                {
                  interlaced: true,
                  optimizationLevel: 3,
                },
              ],
              ['pngquant', { quality: [0.5, 0.7], strip: false }],
              ['mozjpeg', { quality: 70 }],
              ['svgo', { name: 'preset-default' }],
            ],
          },
        },
      }),
    ],
  },
  devServer: {
    hot: true,
    port: 3000,
    static: {
      directory: join(__dirname, sourceDir),
    },
    historyApiFallback: true,
  },
};
