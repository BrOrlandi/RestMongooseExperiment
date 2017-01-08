const mongoose = require('mongoose')
// Use native promises
mongoose.Promise = global.Promise;

const erm = require('express-restify-mongoose')

var restify = require('restify');
var plugins = require('restify-plugins');

const server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
});

server.use(plugins.acceptParser(server.acceptable));
server.use(plugins.queryParser());
server.use(plugins.bodyParser());


mongoose.connect('mongodb://localhost/experiments');

const uri = erm.serve(server, mongoose.model('Person', new mongoose.Schema({
  name: { type: String, required: true },
  comment: { type: String }
})),{
  prefix: "api",
  version: "",
  restify: true
}
);
console.log(uri);

server.get('/echo/:name', function (req, res, next) {
  res.send(req.params);
  return next();
});

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});