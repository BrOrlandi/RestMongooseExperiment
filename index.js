const express = require('express')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const erm = require('express-restify-mongoose')
const app = express()
const router = express.Router()

app.use(bodyParser.json())
app.use(methodOverride())

mongoose.connect('mongodb://10.55.71.203/experiments')

const uri = erm.serve(router, mongoose.model('Customer', new mongoose.Schema({
  name: { type: String, required: true },
  comment: { type: String }
})),{
  prefix: "api",
  version: "",
  restify: true
}
);
console.log(uri);

app.use(router)

app.listen(3000, () => {
  console.log('Server listening on port 3000')
})