const path = require('path');

const isProd = process.env.NODE_ENV === 'production';

const resolve = dir => {
  return path.resolve(__dirname, '..', dir);
};

module.exports = {
  resolve,
  isProd,
  getEntries,
};
