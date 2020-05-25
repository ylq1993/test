const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// App directory
const appDirectory = fs.realpathSync(process.cwd());

// Gets absolute path of file within app directory
const resolveAppPath = (relativePath) =>
  path.resolve(appDirectory, relativePath);

// Host
const host = process.env.HOST || "localhost";

// Required for babel-preset-react-app
process.env.NODE_ENV = "development";

module.exports = {
  // Environment mode
  mode: "development",

  // Entry point of app
  entry: {
    index: "./src/index",
    gpy: "./src/demo/gpy",
    idCard: "./src/demo/idCard",
  },

  output: {
    // Development filename output
    filename: "[name].js",
    path: resolveAppPath("build"),
    library: "PortalModule",
    libraryTarget: "umd",
  },

  devServer: {
    // Serve index.html as the base
    contentBase: resolveAppPath("public"),

    // Enable compression
    compress: true,

    // Enable hot reloading
    hot: true,

    host,

    port: 3000,

    // Public path is root of content base
    publicPath: "/",
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: resolveAppPath("src"),
        loader: "babel-loader",
        options: {
          presets: [
            // Preset includes JSX, TypeScript, and some ESnext features
            require.resolve("babel-preset-react-app"),
          ],
          plugins: [
            [
              "babel-plugin-import",
              {
                libraryName: "@alifd/next",
                style: true,
              },
            ],
          ],
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "首页",
      inject: true,
      template: resolveAppPath("public/index.html"),
      chunks: ["index"],
      filename: "index.html",
    }),
    new HtmlWebpackPlugin({
      title: "高拍仪",
      inject: true,
      template: resolveAppPath("public/index.html"),
      chunks: ["gpy"],
      filename: "gpy.html",
    }),
    new HtmlWebpackPlugin({
      title: "读卡器",
      inject: true,
      template: resolveAppPath("public/index.html"),
      chunks: ["idCard"],
      filename: "idCard.html",
    }),
  ],
};
