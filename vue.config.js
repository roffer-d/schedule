"use strict";
const path = require("path");
const port = process.env.port || process.env.npm_config_port || 8888; // dev port

module.exports = {
  publicPath: "/",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    disableHostCheck: process.env.NODE_ENV === "development" ? true : false,
    proxy: {
      "/app": {
        target: "http://10.206.20.48:18000",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          // "^/place": "/place"
        }
      }
    },
    overlay: {
      overlay: {
        warnings: false,
        errors: true
      }
    }
  },
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [path.resolve(__dirname, "./src/styles/theme.less")]
    }
  },
  css: {
    extract: process.env.NODE_ENV === "development" ? false : true
  },
  chainWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      config.optimization.minimize(true);
      config.optimization.splitChunks({
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/](vue|vue-router|vant)[\\/]/,
            name: "vendor",
            chunks: "initial",
            priority: -10
          }
        }
      });
    }
  }
};