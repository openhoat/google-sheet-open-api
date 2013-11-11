var config;

config = {
  env: process.env['NODE_ENV'] || 'development',
  apiUrlPrefix: 'api',
  apiVersionUrlPrefix: 'v1',
  listenPort: process.env['NODE_SOCKET_PATH'] || process.env['PORT'] || process.env['VCAP_APP_PORT'] || 3000,
  middlewares: './lib/middlewares',
  errorHandlers: './lib/error-handlers',
  bodyParser: true,
  methodOverride: true,
  favicon: false,
  cookie: { enabled: false },
  session: { enabled: false },
  less: { enabled: false },
  views: { enabled: false },
  static: { enabled: false }
};

module.exports = config;