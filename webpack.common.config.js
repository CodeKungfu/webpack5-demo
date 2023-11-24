const path = require("path");
const { ProgressPlugin } = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlInlineScriptPlugin = require("html-inline-script-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default;

module.exports = {
  mode: "production",
  output: {},
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  resolve: {
    alias: {
      "@css": path.resolve(__dirname, "./src/css"),
      "@js": path.resolve(__dirname, "./src/js")
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // 针对css文件使用的loader，有先后顺序，数组项越靠后越先执行(从下到上，从右到左)
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [{
          loader: 'url-loader', // url-loader主要可以对小于某个大小的图片进行base64格式的转化处理
          options: {
            limit: 1024 * 1024,
            esModule: false
          }
        }],
        type:'javascript/auto'
      },
      {
        test: /\.html$/,
        loader: 'html-withimg-loader'
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlInlineScriptPlugin(), // inline script
    new ProgressPlugin(), // 展示进度
    new MiniCssExtractPlugin({
      filename: "[name].css",
      ignoreOrder: false,
    }),
    new HTMLInlineCSSWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: "public/favicon.ico",
          to: "favicon.ico",
        },
      ],
    }),
  ],
};
