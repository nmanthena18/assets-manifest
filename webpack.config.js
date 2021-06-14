const WebpackAssetsManifest = require('webpack-assets-manifest');

module.exports = {
  plugins: [
    new WebpackAssetsManifest({
      output: 'assets-manifest.json',
      transform: (f) => {
        // eslint-disable-next-line no-console
        console.log('** ', JSON.stringify(f));
        return f;
      },
    }),
  ],
};
