var express = require('express');
var bodyParser = require('body-parser');
var Classes = require('./routes/Classes');
var Users = require('./routes/user');
var Streams = require('./routes/streams');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use('/api/Classes', Classes);
app.use('/api/Users', Users);
app.use('/api/Streams', Streams);

module.exports = app;