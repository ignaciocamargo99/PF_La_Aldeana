
var app = require('../app');
var http = require('http');

// Get port from environment Express
var port = normalizePort(process.env.PORT || '3001');
app.set('port', port);

// Create http server
var server = http.createServer(app);

//Listen on provided port, on all network interfaces.
server.listen(port);
server.on('listening', onListening);

// Set port number to listen on web server
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) return val;

  if (port >= 0) return port;

  return false;
}

//Event listener for HTTP server "listening" event.
function onListening() {
  // Catch the address server
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}
