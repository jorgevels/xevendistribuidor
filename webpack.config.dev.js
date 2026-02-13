const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); // Importar CssMinimizerPlugin
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: {
    home: "./src/index.js",
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    chunkFilename: "[name].bundle.js",
    publicPath: "/",
  },

  mode: "development",

  // Habilitar caché en disco
  cache: {
    type: "filesystem", // Guarda la caché en el disco
    cacheDirectory: path.resolve(__dirname, ".webpack_cache"), // Opcional: Directorio de caché
  },

  resolve: {
    extensions: [".tsx", ".js", ".jsx"],
    alias: {
      "@components": path.resolve(__dirname, "src/components/"),
      "@context": path.resolve(__dirname, "src/context/"),
      "@containers": path.resolve(__dirname, "src/containers/"),
      "@routes": path.resolve(__dirname, "src/routes/"),
      "@styles": path.resolve(__dirname, "src/styles/"),
      "@assets": path.resolve(__dirname, "src/assets/"),
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "./index.html",
    }),

    new MiniCssExtractPlugin({
      filename: "assets/[name].css",
    }),

    new Dotenv({
      path: "./.env",
      systemvars: true,
    }),

    new FaviconsWebpackPlugin({
      logo: "./src/assets/images/favicon.png",
      favicons: {
        appName: "Mi Aplicación",
        appDescription: "Descripción breve de tu aplicación",
        background: "#77c043",
        theme_color: "#0D5C63",
        icons: {
          android: true,
          appleIcon: true,
          favicons: true,
          windows: true,
        },
      },
    }),

    new ImageMinimizerPlugin({
      minimizerOptions: {
        plugins: [
          ["optipng", { optimizationLevel: 3 }], // Ajusta el nivel de optimización
        ],
      },
    }),
  ],

  optimization: {
    splitChunks: {
      chunks: "all",
    },
    minimize: false, // Activa la minimización
    minimizer: [
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            "default",
            {
              svgo: false, // Desactiva la optimización de SVG
            },
          ],
        },
      }), // Minimiza CSS
    ],
  },

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
        test: /\.html$/,
        use: {
          loader: "html-loader",
        },
      },
      {
        test: /\.(scss|css|less)$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/i,
        use: {
          loader: "url-loader",
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset",
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: "/node_modules/",
      },
    ],
  },

  devServer: {
    static: {
      directory: path.join(__dirname, "dist"), // Directorio de archivos estáticos
    },
    compress: true, // Habilita compresión gzip
    historyApiFallback: true, // Soporte para rutas SPA
    port: 3000, // Puerto de desarrollo
    hot: true, // Habilita Hot Module Replacement (HMR)
    liveReload: true, // Recarga automática del navegador si no hay HMR
    watchFiles: ["src/**/*", "public/**/*"], // Archivos a observar
  },
};
