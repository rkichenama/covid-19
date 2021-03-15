// const webpack = require('webpack');
const { resolve, join } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const pkg = require('./package.json');
const WorkboxPlugin = require('workbox-webpack-plugin');
const webpack = require('webpack');

let manifest = [];

module.exports = {
  devServer: {
    contentBase: join(__dirname, 'dist'),
    compress: true,
    port: 9000
  },
  entry: {
    script: resolve(__dirname, 'src/index.tsx'),
  },
  output: {
    chunkFilename: '[name].js',
    filename: '[name].js',
    path: resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true
            },
          },
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
            },
          }
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images',
            }
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.mjs' ],
  },
  plugins: [
    // new webpack.DefinePlugin({
    //   __VERSION__: JSON.stringify(pkg.version)
    // }),
    new HtmlWebpackPlugin({
      meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
      },
      template: './index.html',
      title: `Covid-19 (${pkg.version})`,
      minify: { collapseWhitespace: false, removeComments: false },
      // inject: true
    }),
    // new WorkboxPlugin.GenerateSW({
    //   // these options encourage the ServiceWorkers to get in there fast
    //   // and not allow any straggling "old" SWs to hang around
    //   clientsClaim: true,
    //   skipWaiting: true,
    // }),
    new WorkboxPlugin.InjectManifest({
      swSrc: './src/worker.ts',
      swDest: 'service-worker.js',
      include: [
        'img/*.png'
      ]
      // manifestTransform: (entry) => {manifest.push(entry); return entry;}
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false,
    }),
    new CopyPlugin({
      patterns: [
        './img/**/*.png',
        './manifest.json'
      ],
    }),
    // { apply(compiler) {
    //   console.log(manifest)
    // }}
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      minChunks: 1,
      maxAsyncRequests: 6,
      maxInitialRequests: 4,
      automaticNameDelimiter: '~',
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  stats: {
    all: undefined,
    assets: true,
    assetsSort: '!size',
    builtAt: false,
    cached: false,
    cachedAssets: false,
    children: false,
    chunkGroups: false,
    chunkModules: false,
    chunkOrigins: false,
    chunks: false,
    chunksSort: 'size',
    depth: false,
    entrypoints: true,
    env: false,
    errorDetails: true,
    errors: true,
    modules: false,
    modulesSort: 'size',
    moduleTrace: false,
    performance: false,
    providedExports: false,
    reasons: false,
    source: false,
    timings: false,
    usedExports: false,
    version: true,
    warnings: false,
  },
};