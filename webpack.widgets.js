/* eslint-disable @typescript-eslint/no-require-imports */
const path = require("path");

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  devtool: process.env.NODE_ENV === "production" ? false : "source-map",

  entry: {
    "cat-global-menu": "./src/widgets/global-menu/embed.ts",
    "cat-account": "./src/widgets/account/embed.ts",
    "cat-dealer-locator": "./src/widgets/dealer-locator/embed.ts",
  },

  output: {
    path: path.resolve(__dirname, "public/widgets"),
    filename: "[name].js",
    // Each bundle is self-contained; no shared chunks
    library: {
      type: "umd",
    },
    globalObject: "typeof self !== 'undefined' ? self : this",
    clean: true,
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-env", { targets: "defaults" }],
              ["@babel/preset-react", { runtime: "automatic" }],
              "@babel/preset-typescript",
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },

  optimization: {
    // Each entry is its own self-contained bundle (React included)
    splitChunks: false,
    runtimeChunk: false,
  },
};
