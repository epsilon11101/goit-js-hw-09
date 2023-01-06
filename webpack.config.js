const HtmlWebpackPlugin = require("html-webpack-plugin"),
  MiniCssExtractPlugin = require("mini-css-extract-plugin"),
  CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  entry: {
    index_js: "./src/js/index.js",
    color_js: "./src/js/01-color-switcher.js",
    timer_js: "./src/js/02-timer.js",
    promise_js: "./src/js/03-promises.js",
  },
  output: {
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.html$/i,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/html/index.html",
      filename: "./index.html",
      chunks: ["index_js"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/html/01-color-switcher.html",
      filename: "./01-color-switcher.html",
      chunks: ["color_js"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/html/02-timer.html",
      filename: "./02-timer.html",
      chunks: ["timer_js"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/html/03-promises.html",
      filename: "./03-promises.html",
      chunks: ["promise_js"],
    }),

    new MiniCssExtractPlugin(),
  ],
};
