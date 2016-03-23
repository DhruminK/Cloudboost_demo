var express = require('express');
var bodyParser = require('body-parser');
var Classes = require('./routes/Classes');
var Users = require('./routes/user');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use('/api/Classes', Classes);
app.use('/api/Users', Users);

module.exports = app;