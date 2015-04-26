var fs = require('fs'),
  https = require('https'),
  express = require('express'),
  app = express(),
  favicon = require('serve-favicon');

https.createServer({
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
  passphrase: 'denis'
}, app).listen(443, function() {
  console.log('Listening on localhost:80');
});

app.listen(80, function() {
  console.log('Listening on 80');
});

app.use(express.static('public'));
app.use(express.static('bower_components'));
app.use(favicon(__dirname + '/favicon.ico'));

app.use(function requireHTTPS(req, res, next) {
  if (!req.secure) {
    return res.redirect('https://' + req.headers.host + req.url);
  }
  next();
});

app.get('/', function (req, res) {
  return res.sendfile('index.html');
});