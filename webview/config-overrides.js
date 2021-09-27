const {
  override,
  overrideDevServer,
  addDecoratorsLegacy,
  addLessLoader,
} = require("customize-cra");
const fs = require("fs");
const path = require("path");
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

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
    addDecoratorsLegacy()
  ),
  devServer: overrideDevServer(
    // set devServer writeToDisk
    setWebpackDevServerWriteToDisk(false)
  ),
};
