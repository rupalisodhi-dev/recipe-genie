const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/main.tsx",
  devtool: "eval-source-map",
  output: {
    filename: "bundle.[fullhash].js",
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
  devServer: {
    static: {
      directory: path.resolve(__dirname, "public")
    },
    historyApiFallback: true,
    hot: true,
    port: 3000,
    open: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      favicon: false
    }),
    new ReactRefreshWebpackPlugin(),
    new Dotenv({ systemvars: true }),
    new ForkTsCheckerWebpackPlugin()
  ]
};
