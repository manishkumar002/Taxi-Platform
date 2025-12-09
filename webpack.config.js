const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  // Other webpack configuration...
  plugins: [
    // Copy sitemap.xml from the public directory to the build directory
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public/sitemap.xml', to: 'build/sitemap.xml' },
      ],
    }),
  ],
};
