const WebpackAssetsManifest = require('webpack-assets-manifest');

module.exports = {

  plugins: [
    new WebpackAssetsManifest({
      output: 'asset-manifest.json',
      transform: (f) => {
        return f;
      },
    }),
  ],
};
