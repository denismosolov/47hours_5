var fs = require('fs'),
  https = require('https'),
  express = require('express'),
  app = express();

https.createServer({
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
  passphrase: 'denis'
}, app).listen(443, function() {
  console.log('Listening on localhost:3000');
});

app.use(express.static('public'));
app.use(express.static('bower_components'));

app.get('/', function (req, res) {
  return res.sendfile('index.html');
});