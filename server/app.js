'use strict';

process.env.APP_ENV = process.env.APP_ENV || 'development';

var express = require('express');
var bodyParser = require('body-parser')
var config = require('./config/environment');
var cors = require('cors')

var app = express();
app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var server = require('http').createServer(app);

require('./routes')(app);

server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

exports = module.exports = app;
