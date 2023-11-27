const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.config");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const entries = {
    'index01': './src/entries/index01.js',
    'index02': './src/entries/index02.js',
}

const getEntries = () => {
    return Object.entries(entries).map(([page]) => {
        console.log(page, 'page')
        return new HtmlWebpackPlugin({
          title: `webpack5 ${page} demo`,
          chunks: [`${page}`],
          filename: `${page}.html`,
          template: path.resolve(__dirname, `./${page}.html`),
          chunks: ["vendor", page],
          inject: "body", // 将js文件注入到模版的什么位置
          minify: {
            keepClosingSlash: false, // 在单例元素上保留尾部斜杠
            removeStyleLinkTypeAttributes: false,
            useShortDoctype: false,
            minifyCSS: true, // 压缩css
            collapseWhitespace: false, // 移除空格
            removeComments: false, // 移除注释
          },
        });
      });
}
module.exports = merge(common, {
  mode: "production", // 根据环境自行配置
  entry: entries,
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    ...getEntries()
  ],
});