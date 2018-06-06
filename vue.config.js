const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");

module.exports = {
  configureWebpack: {
    plugins: [
      new LodashModuleReplacementPlugin({
        collections: true, //Support objects in “Collection” methods.
        flattening: true,
        paths: true
      })
    ]
  }
};
