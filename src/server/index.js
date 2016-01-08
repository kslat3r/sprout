#!/usr/bin/env node

require('babel/register');

var nconf = require('nconf');

//config

nconf.argv()
  .env()
  .file({
    file: __dirname + '/config/' + (process.env.NODE_ENV || 'development') + '.json'
  });

//lets go

var app = require('./app');
var server = app.listen(app.get('port'));
