const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");
// const path = require("path");


module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "zuri",
    projectName: "zuri-plugin-noticeboard",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object

    // output: {
    //   path: path.join(__dirname, '..', 'dist') // string (default)
    // },
  });
};
