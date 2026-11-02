// Lightweight static-file server for Render. Uses Node.js built-ins only.
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const PORT = Number(process.env.PORT || 3000);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.txt': 'text/plain; charset=utf-8'
};

const server = http.createServer((req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { 'Content-Type': 'text/plain; charset=utf-8', 'Allow': 'GET, HEAD' });
    return res.end('Method Not Allowed');
  }

  let pathname;
  try {
    pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  } catch {
    res.writeHead(400);
    return res.end('Bad Request');
  }

  let requested = path.resolve(ROOT, '.' + pathname);
  if (requested !== ROOT && !requested.startsWith(ROOT + path.sep)) {
    res.writeHead(403);
    return res.end('Forbidden');
  }

  fs.stat(requested, (err, stat) => {
    if (!err && stat.isDirectory()) requested = path.join(requested, 'index.html');

    fs.stat(requested, (fileErr, fileStat) => {
      if (fileErr || !fileStat.isFile()) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        return res.end('Not Found');
      }

      const headers = {
        'Content-Type': MIME[path.extname(requested).toLowerCase()] || 'application/octet-stream',
        'Content-Length': fileStat.size,
        'X-Content-Type-Options': 'nosniff',
        'Cache-Control': path.basename(requested) === 'index.html' ? 'no-cache' : 'public, max-age=3600'
      };
      res.writeHead(200, headers);
      if (req.method === 'HEAD') return res.end();
      fs.createReadStream(requested).pipe(res);
    });
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`SaveTrack is listening on port ${PORT}`);
});
