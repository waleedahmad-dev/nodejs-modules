const { createLogger, format, transports } = require('winston');
const path = require('path');

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(
      ({ timestamp, level, message }) =>
        `${timestamp} [${level.toUpperCase()}]: ${message}`
    )
  ),
  transports: [
    new transports.Console(),
    new transports.File({
      // eslint-disable-next-line no-undef
      filename: path.join(__dirname, '../../logs/server.log'),
    }),
  ],
});

// Optional: For morgan HTTP logging
logger.stream = {
  write: (message) => logger.info(message.trim()),
};

module.exports = logger;
