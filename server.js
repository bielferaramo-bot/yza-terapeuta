const http = require('http');
const fs = require('fs');
const path = require('path');

const PREFERRED_PORTS = [8080, 8000, 5000, 4000, 8888, 0];
const BASE_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath === '/' || reqPath === '') {
    reqPath = '/index.html';
  }

  const safePath = path.normalize(reqPath).replace(/^(\.\.[\/\\])+/, '');
  const filePath = path.join(BASE_DIR, safePath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*'
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

function tryListen(index = 0) {
  const port = PREFERRED_PORTS[index];
  
  function onError(err) {
    if (err.code === 'EADDRINUSE' && index < PREFERRED_PORTS.length - 1) {
      server.removeListener('error', onError);
      tryListen(index + 1);
    } else {
      console.error('Failed to start server:', err);
    }
  }

  server.once('error', onError);
  server.listen(port, '0.0.0.0', () => {
    const actualPort = server.address().port;
    console.log(`SERVER_READY_PORT:${actualPort}`);
    console.log(`Server running at http://localhost:${actualPort}/`);
  });
}

tryListen();
