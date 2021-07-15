
// Set port number to listen on web server
function normalizePort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) return val;
    if (port >= 0) return port;
    return false;
}

// 404 not found
function error404(req, res) {
    res.status(404);
    res.type('txt').send('Error 404 Not found. The route doesn\'t exists');
}

// 500 internal error
function error500(req, res) {
    res.status(500);
    res.type('txt').send('Error 500 Internal server error.');
}

module.exports = { normalizePort, error404, error500 };