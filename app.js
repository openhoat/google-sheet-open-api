var http = require('http')
  , fs = require('fs')
  , HwExpress = require('hw-express')
  , hwExpress, config, app, listen, isUnixSocket, server;

hwExpress = new HwExpress();

config = hwExpress.config;
app = hwExpress.app;

listen = config['listenPort'];
isUnixSocket = typeof config['listenPort'] === 'string'; // Check unix socket mode (nginx reverse proxy)

if (isUnixSocket && fs.existsSync(listen)) {
  fs.unlinkSync(listen);
}
server = http.createServer(app);

server.listen(listen, function () {
  if (isUnixSocket) {
    fs.chmodSync(listen, '660');
  }
  console.log('Node server listening to %s %s', isUnixSocket ? 'unix socket' : 'port', listen);
});