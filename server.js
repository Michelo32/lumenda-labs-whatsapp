const http = require('http');
const url = require('url');

const VERIFY_TOKEN = 'lumenda2024';

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  
  if (req.method === 'GET' && parsedUrl.pathname === '/webhook') {
    const mode = parsedUrl.query['hub.mode'];
    const token = parsedUrl.query['hub.verify_token'];
    const challenge = parsedUrl.query['hub.challenge'];
    
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      res.writeHead(200);
      res.end(challenge);
    } else {
      res.writeHead(403);
      res.end();
    }
  } else if (req.method === 'POST' && parsedUrl.pathname === '/webhook') {
    res.writeHead(200);
    res.end();
  }
});

server.listen(process.env.PORT || 3000);
