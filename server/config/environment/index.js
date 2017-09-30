'use strict';

var path = require('path');
var _ = require('lodash');

// All configurations will extend these options
// ============================================
var all = {
  env: process.env.APP_ENV,
  port: process.env.APP_PORT || 4000,
  ip: process.env.APP_IP || '0.0.0.0'
};

module.exports = _.merge(
  all,
  require('./' + process.env.APP_ENV + '.js') || {});
