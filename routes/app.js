var express = require('express');
var bodyParser = require('body-parser');
var Classes = require('./Classes');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use('/api', Classes);

module.exports = app;