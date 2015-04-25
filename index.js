var fs = require('fs'),
  https = require('https'),
  express = require('express'),
  app = express();

https.createServer({
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
  passphrase: 'denis'
}, app).listen(3000, function() {
  console.log('Listening on localhost:3000');
});

var index = fs.readFileSync('index.html');

app.use(express.static('public'));

app.get('/', function (req, res) {
  return res.end(index);
});