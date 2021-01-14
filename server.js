const http = require('http');

const api = require('./routes');

// app.use('/api', api)

const server = http.createServer(api);

server.listen(process.env.PORT || 5000);