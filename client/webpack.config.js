const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const NodeExternals = require("webpack-node-externals");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const { checkForEnvFile } = require("./get-globals.js");

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

checkForEnvFile();

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: "all",
    },
  };

  if (isProd) {
    config.minimizer = [
      new CssMinimizerWebpackPlugin(),
      new TerserWebpackPlugin(),
    ];
  }

  return config;
};

const ServerConfig = {
  entry: "./server/index.tsx",
  target: "node",
  externals: isDev ? [NodeExternals()] : [],
  mode: isDev ? "development" : "production",
  output: {
    path: path.join(__dirname, "build/server"),
    filename: "index.js",
    publicPath: "/",
  },
  resolve: {
    alias: {
      "@styles": path.resolve(__dirname, "src", "styles"),
      "@assets": path.resolve(__dirname, "src", "assets"),
    },
    extensions: [".js", ".jsx", ".tsx", ".ts"],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:8].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
        },
      },
      {
        test: /\.(png|jpg|gif|jpeg|ico)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "media",
            emitFile: false,
          },
        },
      },
      {
        test: /\.svg$/,
        use: {
          loader: "@svgr/webpack",
          options: {
            name: "[name].[ext]",
            outputPath: "media",
            emitFile: false,
          },
        },
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        type: "asset/resource",
        generator: {
          emit: false,
        },
      },
      {
        test: /\.xml$/,
        use: ["xml-loader"],
      },
      {
        test: /\.csv$/,
        use: ["csv-loader"],
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              emit: false,
            },
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: isDev,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: isDev,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: isDev,
            },
          },
        ],
      },
    ],
  },
};

const ClientConfig = {
  entry: path.join(__dirname, "src", "index.tsx"),
  output: {
    path: path.join(__dirname, "build/client"),
    filename: isDev ? "js/[name].js" : "js/[name].[contenthash:8].js",
    publicPath: "/",
  },
  devtool: isDev ? "source-map" : false,
  mode: isDev ? "development" : "production",
  plugins: [
    ...(isDev
      ? [
          new CopyWebpackPlugin({
            patterns: [
              {
                from: path.resolve(__dirname, "src", "public", "favicon.ico"),
              },
              {
                from: path.resolve(__dirname, "src", "public", "robots.txt"),
              },
            ],
          }),
        ]
      : []),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "public", "index_template.ejs"),
      filename: "start-page.html",
      alwaysWriteToDisk: true,
      // templateParameters: {
      //   globals: JSON?.stringify(globals) || {},
      // },
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:8].css",
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
        },
      },
      {
        test: /\.(png|jpg|gif|jpeg|ico)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "media",
          },
        },
      },
      {
        test: /\.svg$/,
        use: {
          loader: "@svgr/webpack",
          options: {
            name: "[name].[ext]",
            outputPath: "media",
          },
        },
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        type: "asset/resource",
        generator: {
          filename: "./fonts/[name][ext]",
        },
      },
      {
        test: /\.xml$/,
        use: ["xml-loader"],
      },
      {
        test: /\.csv$/,
        use: ["csv-loader"],
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: isDev,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: isDev,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: isDev,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".tsx", ".ts"],
    alias: {
      "@styles": path.resolve(__dirname, "src", "styles"),
      "@assets": path.resolve(__dirname, "src", "assets"),
    },
  },
  optimization: optimization(),
};

module.exports = [ClientConfig, ServerConfig];
