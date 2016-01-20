var winston = require('winston');
var nconf = require('nconf');

winston.addColors({
  trace: 'magenta',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  debug: 'cyan',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  error: 'red'
});

winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {
  level: nconf.get('logLevel'),
  prettyPrint: true,
  colorize: true,
  silent: false,
  timestamp: false
});