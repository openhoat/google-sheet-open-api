var util = require('hw-util');

module.exports = {
  init: function (config, app) {
    console.log('middlewares init');
    util.config = config;
  }
};