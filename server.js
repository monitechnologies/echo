var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var store = []
var config = require('./config.json')

var Hipchat = require('node-hipchat');


var HC = new Hipchat(config.hipchat.apikey);

app.use(function(req, res, next) {
    var data = '';
    req.setEncoding('utf8');
    req.on('data', function(chunk) {
        data += chunk;
    });
    req.on('end', function() {
        req.rawBody = data;
        next();
    });
});

app.set('json spaces', 4);
app.use(bodyParser.json());

app.post('/', function(request, response) {

  request.body = JSON.parse(request.rawBody);

  var params = {
    room: config.hipchat.room,
    from: 'ImpalaPay',
    message: '<pre>' + request.body.session_id + '</pre>',
    color: 'red'
  };

  HC.postMessage(params, function(data, err) {

  });

  store.push(request.body)
  response.status(200).send();

});

app.get('/', function(request, response) {

  response.json(store[store.length - 1]['session_id'])

})

var server = app.listen(8181, function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);

});
