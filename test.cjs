require('dotenv').config();

const logger = require('@jestaubach/pt-logger').configure({
  hostname: process.env.PAPERTRAIL_HOSTNAME,
  program: process.env.APPNAME,
  level: process.env.LOG_LEVEL,
  remote: process.env.REMOTE_LOGGING,
  host: process.env.PAPERTRAIL_URL,
  port: process.env.PAPERTRAIL_PORT
});

logger && logger.info(`send a message`);