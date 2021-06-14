const WebpackAssetsManifest = require('webpack-assets-manifest');

module.exports = {

  plugins: [
    new WebpackAssetsManifest({
      output: 'assets-manifest.json',
      transform: (f) => {
        return f;
      },
    }),
  ],
};
