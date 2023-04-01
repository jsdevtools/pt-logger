import winston from 'winston';
import { Papertrail } from 'winston-papertrail';

interface ptLoggerOptions {
  hostname: string,
  program: string,
  level: string,
  remote: string,
  host: string,
  port: string|number,
}

function configure( { hostname, program, level, remote, host, port, }: ptLoggerOptions ) {
  const consoleLogger = new winston.transports.Console({
    level,
  });

  // eslint-disable-next-line new-cap
  const logger = new (winston.createLogger as any)({
    transports: [consoleLogger],
    exitOnError: false,
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

    ptTransport.on('error', (err: any) => {
      logger && logger.error(`ptTransport error: ${err}`);
    });

    ptTransport.on('connect', (message: any) => {
      logger.add(ptTransport);
      logger && logger.info(message);
    });
  }

  return logger;
}

export default configure;
