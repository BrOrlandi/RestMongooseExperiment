const mongoose = require('mongoose')
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


mongoose.connect('mongodb://10.55.71.203/experiments')

const uri = erm.serve(server, mongoose.model('Customer', new mongoose.Schema({
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