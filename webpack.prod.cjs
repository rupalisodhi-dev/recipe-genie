const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/main.tsx",
  devtool: "source-map",
  output: {
    filename: "assets/js/[name].[contenthash].js",
    assetModuleFilename: "assets/media/[hash][ext][query]",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    publicPath: "/"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: { "@": path.resolve(__dirname, "src") }
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        type: "asset/resource"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      inject: 'body',
      minify: true
    }),
    new Dotenv({ systemvars: true }),
    new ForkTsCheckerWebpackPlugin()
  ],
  optimization: {
    splitChunks: { chunks: "all" },
    runtimeChunk: "single"
  }
};
