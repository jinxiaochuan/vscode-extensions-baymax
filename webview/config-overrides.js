const {
  override,
  overrideDevServer,
  addDecoratorsLegacy,
  addLessLoader,
  addWebpackAlias,
} = require("customize-cra");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const fs = require("fs");
const path = require("path");
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

const PAGE_CATALOGUE = ["antd", "drag"];

const setWebpackOutput =
  (outputConfig = {}) =>
  (config) => {
    Object.assign(config.output, outputConfig);
    return config;
  };

const setWebpackDevServerWriteToDisk = (writeToDisk) => (devServerConfig) => {
  devServerConfig.writeToDisk = writeToDisk;
  return devServerConfig;
};

const setWebpackDevServerRewrites = () => (devServerConfig) => {
  devServerConfig.historyApiFallback.rewrites = PAGE_CATALOGUE.map((page) => ({
    from: new RegExp(`/${page}`),
    to: `/pages/${page}.html`,
  }));
  return devServerConfig;
};

// https://github.com/timarney/react-app-rewired/issues/421
const addManifestPlugin = () => (config) => {
  config.plugins.push(
    new ManifestPlugin({
      fileName: "asset-manifest.json",
      publicPath: "/",
      generate: (seed, files, entrypoints) => {
        const manifestFiles = files.reduce((manifest, file) => {
          manifest[file.name] = file.path;
          return manifest;
        }, seed);

        const entrypointFiles = {};
        Object.keys(entrypoints).forEach((entrypoint) => {
          entrypointFiles[entrypoint] = entrypoints[entrypoint].filter(
            (fileName) => !fileName.endsWith(".map")
          );
        });

        return {
          files: manifestFiles,
          entrypoints: entrypointFiles,
        };
      },
    })
  );
  return config;
};

const removeWebpackPlugin = (webpackPluginName) => (config) => {
  config.plugins = config.plugins.filter(
    (p) => p.constructor.name !== webpackPluginName
  );
  return config;
};

// https://juejin.cn/post/6844903891994148871
const supportMultiPage = () => (config) => {
  const multiEntry = PAGE_CATALOGUE.reduce(
    (pre, cur) => ({
      ...pre,
      [cur]: resolveApp(`src/pages/${cur}/index`),
    }),
    {}
  );

  const multiHtmlPlugins = Object.keys(multiEntry).map((entry) => {
    return new HtmlWebpackPlugin({
      inject: true,
      template: resolveApp("public/index.html"),
      chunks: [entry],
      filename: `pages/${entry}.html`,
      title: entry,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    });
  });

  config.entry = multiEntry;

  config.output.filename = "static/js/[name].bundle.js";

  config.plugins = [...multiHtmlPlugins, ...config.plugins];

  return config;
};

module.exports = {
  webpack: override(
    // support less
    addLessLoader({
      lessOptions: {
        javascriptEnabled: true,
        modifyVars: {
          "@primary-color": "#1989fa", // primary color for all components
        },
      },
    }),

    // set output path
    setWebpackOutput({
      path: resolveApp(process.env.BUILD_PATH),
      publicPath: "http://localhost:3000/",
    }),

    // enable legacy decorators babel plugin
    addDecoratorsLegacy(),

    addWebpackAlias({
      "@/components": path.resolve(__dirname, "src/pages/components"),
    }),

    removeWebpackPlugin("ManifestPlugin"),
    addManifestPlugin(),
    removeWebpackPlugin("HtmlWebpackPlugin"),
    supportMultiPage()
  ),
  devServer: overrideDevServer(
    // set devServer writeToDisk
    setWebpackDevServerWriteToDisk(true),
    setWebpackDevServerRewrites()
  ),
};
