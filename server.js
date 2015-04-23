var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var store = []
var config = require('./config.json')

var Hipchat = require('node-hipchat');


var HC = new Hipchat(config.hipchat.apikey);

app.set('json spaces', 4);
app.use(bodyParser.json());

app.post('/', function(request, response) {

  var params = {
    room: config.hipchat.room,
    from: 'ImpalaPay',
    message: '<pre>' + request.body.session_id + '</pre>',
    color: 'red'
  };

  HC.postMessage(params, function(data, err) {

  });

  store.push(request.body.session_id)
  response.status(200).send();

});

app.get('/', function(request, response) {

  response.json(store)

})

var server = app.listen(8181, function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);

});