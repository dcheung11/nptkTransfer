/**
 * Why is this here you ask? React Native doesn't use Webpack. True. This file is here to trick
 * IDEA in recognizing module aliases (see the package.json files in some of the subdirs).
 * Nice solution? No. Does it work? Sure.
 * Tracker URL: https://youtrack.jetbrains.com/issue/WEB-23221
 *
 * - TS
 */

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
// const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const walkSync = function(dir, filelist) {
  const files = fs.readdirSync(dir);
  // eslint-disable-next-line no-param-reassign
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(dir + file).isDirectory()) {
      // eslint-disable-next-line no-param-reassign
      filelist = walkSync(`${dir + file}/`, filelist);
    } else if (file === 'package.json') {
      filelist.push([path.resolve(dir), path.resolve(dir + file)]);
    }
  });
  return filelist;
};

const alias = {};
walkSync('app/').forEach(p => {
  // eslint-disable-next-line global-require
  const pkg = require(p[1]);
  // eslint-disable-next-line prefer-destructuring
  alias[pkg.name] = p[0];
});

module.exports = {
  resolve: {
    alias,
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
              localIdentName: '[local]___[hash:base64:5]',
            },
          },
          {
            loader: 'less-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        API_URL: JSON.stringify(process.env.API_URL),
      },
    }),
  ],
};
