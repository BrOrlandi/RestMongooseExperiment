const mongoose = require('mongoose');
// Use native promises
mongoose.Promise = global.Promise;

const erm = require('express-restify-mongoose');

const restify = require('restify');
const plugins = require('restify-plugins');

const server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
});

server.use(plugins.acceptParser(server.acceptable));
server.use(plugins.queryParser());
server.use(plugins.bodyParser());
server.use(restify.CORS());

var port = process.env.NODE_PORT || 8080;

server.get(/\/swagger\/?.*/, restify.serveStatic({
    directory: __dirname,
    default: 'index.html'
}));

// See line 41 on swagger/index.html
server.get(/\/swagger.yml\//, restify.serveStatic({
  directory: '.',
  file: 'swagger.yml'
}));


mongoose.connect('mongodb://localhost/experiments');

const uri = erm.serve(server, mongoose.model('Persons', new mongoose.Schema({
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

server.listen(port, function () {
  console.log('%s listening at %s', server.name, server.url);
});