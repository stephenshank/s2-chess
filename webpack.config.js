const path = require("path"),
  HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.resolve("frontend", "app.jsx"),
  plugins: [
    new HtmlWebpackPlugin({
      title: "Chess"
    })
  ],
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  devtool: "inline-source-map",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:8100',
      changeOrigin: true
    }
  }
};
