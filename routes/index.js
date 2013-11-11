var util = require('hw-util');

function getRoutes(app, rootUri) {
  var routes, method, items;
  routes = [];
  for (method in app.routes) {
    items = app.routes[method];
    console.log('item :', items);
    items.forEach(function (item) {
      if (!rootUri || (item.path !== rootUri && item.path.indexOf(rootUri) === 0)) {
        routes.push({
          path: item.path,
          method: method
        });
      }
    });
  }
  return routes;
}

exports.init = function (config, app) {
  var sheet = require('./sheet')
    , apiRootUri;
  apiRootUri = util.format('/%s/%s', config.apiUrlPrefix, config.apiVersionUrlPrefix);
  app.get('/', function (req, res) {
    res.send(getRoutes(app));
  });
  app.get(apiRootUri, function (req, res) {
    res.send(getRoutes(app, apiRootUri));
  });
  app.options(apiRootUri + '/sheet', sheet.options);
  app.get(apiRootUri + '/sheet/:gdocKey/:sheetIndex', sheet.get);
  app.post(apiRootUri + '/sheet/:gdocKey/:sheetIndex', sheet.post);
};
