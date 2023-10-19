const { argv } = require('yargs');
const Dotenv = require('dotenv-webpack');
const TerserPlugin = require("terser-webpack-plugin");
const glob = require('glob');
const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const isDev = !!argv.developer;
const isProd = !isDev;
const isCheck = !!argv.check;

const paths = {
  entry: "./src/assets/entry/**/index.{ts,tsx}", // директория ts файлов сайта
};

const plugins = [
  new Dotenv()
];

if (isDev || isCheck) {
  plugins.push(
    new ESLintPlugin({
      extensions: 'ts'
    })
  )
}

if (isCheck) {
  plugins.push(
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
        mode: "write-references",
      },
    }),
  )
}

const config = {
  mode: isProd ? "production" : "development",
  entry: glob.sync(paths.entry).reduce((acc, filename) => {
    const entry = path.dirname(filename).split('/').pop();
    acc[entry] = filename;
    return acc
  }, {}),
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  output: {
    publicPath: '/',
    filename: "assets/js/[name].min.js",
    chunkFilename: 'assets/js/[name]-[chunkhash:8].chunk.js',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: [/node_modules/, /node_modules\/(?!(swiper|ssr-window|dom7)\/).*/, /\.test\.jsx?$/],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    useBuiltIns: 'entry',
                    corejs: 3,
                    targets: 'last 3 version, ie >= 11'
                  }
                ],
                ["@babel/preset-react", { runtime: "automatic" }],
                "@babel/preset-typescript"
              ]
            }
          }
        ]
      },
      {
        test: /\.(glsl|vs|fs|vert|frag)$/,
        exclude: /node_modules/,
        use: [
          'raw-loader',
          'glslify-loader',
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto"
      }
    ]
  },
  resolve: {
    fallback: { 'path': require.resolve('path-browserify') },
    extensions: ['.ts', '.js', '.tsx', '.jsx', '.mjs'],
    alias: {
      '@': path.resolve(__dirname, 'src/views'),
    }
  },
  target: "web",
  optimization: {
    minimize: isProd,
    minimizer: [
      new TerserPlugin({
        test: /\.min\.js$/,
        parallel: true,
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
  plugins
};

module.exports = config;
