var util = require('hw-util');

module.exports = {
  init: function (config, app) {
    app.use(function (err, req, res, next) {
      console.error('err :', util.inspect(err, {depth: null}));
      res.send(err.code || 500, util.format('%s : %s', err.name || 'Error', err.message || err.stack || util.inspect(err, {depth: null})));
    });
    app.use(function (req, res, next) {
      res.send(404, 'Resource not found');
    });
  }
};