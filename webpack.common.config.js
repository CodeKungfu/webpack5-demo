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
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 1024 * 1024,
            esModule: false
          }
        }]
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
