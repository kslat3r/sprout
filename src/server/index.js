#!/usr/bin/env node

require('babel/register');

var app = require('./app');

app.set('port', process.env.PORT || 5000);

var server = app.listen(app.get('port'));