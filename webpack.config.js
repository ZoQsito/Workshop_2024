const Encore = require("@symfony/webpack-encore");
const Dotenv = require("dotenv-webpack");

if (!Encore.isRuntimeEnvironmentConfigured()) {
  Encore.configureRuntimeEnvironment(process.env.NODE_ENV || "dev");
}

Encore
  .addPlugin(new Dotenv({ path: "./.env.local" }))
  .setOutputPath("public/build/")
  .setPublicPath("/build/")
  .setManifestKeyPrefix("build/")
  .addEntry("app", "./assets/js/app.js")
  .enableStimulusBridge("./assets/controllers.json")
  .splitEntryChunks()
  .enableSingleRuntimeChunk()
  .cleanupOutputBeforeBuild()
  .enableBuildNotifications()
  .enableSourceMaps(!Encore.isProduction())
  .enableVersioning(Encore.isProduction())
  .configureBabelPresetEnv((config) => {
    config.useBuiltIns = "usage";
    config.corejs = "3.23";
  })
  .enableTypeScriptLoader()
  .enableReactPreset();

module.exports = Encore.getWebpackConfig();
