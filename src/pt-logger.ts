import winston from 'winston';
import { Papertrail } from 'winston-papertrail';
//const winston = require('winston');
//const { Papertrail } = require('winston-papertrail');

interface ptLoggerOptions {
  hostname: string,
  program: string,
  level: string,
  remote: string,
  host: string,
  port: string|number,
}

function ptlogger( { hostname, program, level, remote, host, port, }: ptLoggerOptions ) {
  const consoleLogger = new winston.transports.Console({
    level,
    //timestamp() {
    //  return new Date().toString();
    //},
    //colorize: true,
  });

  if (remote.toString().toUpperCase() === 'TRUE') {
    const ptTransport = new Papertrail({
      host,
      port,
      logFormat: (level:string, message:string) => {
        return `[${level}] ${message}`;
      },
      timestamp: true,
      hostname,
      program,
    });
    
    // monkey pach papertrail to remove meta from log() args
    const { log } = ptTransport;
    // eslint-disable-next-line func-names
    ptTransport.log = function(level:string, msg:string, meta:any, callback:any) {
      const cb = callback === undefined ? meta : callback;
      return log.apply(this, [level, msg, cb]);
    };

    // eslint-disable-next-line new-cap
    const logger = new (winston.createLogger as any)({
      transports: [ptTransport, consoleLogger],
    });

    ptTransport.on('error', (err: any) => logger && logger.error(err));
    ptTransport.on('connect', (message: any) => logger && logger.info(message));
  
    return logger;
  }

  // eslint-disable-next-line new-cap
  const logger = new (winston.createLogger as any)({
    transports: [consoleLogger],
  });

  return logger;
}

export default ptlogger;
