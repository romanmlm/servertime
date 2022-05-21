import winston from 'winston';
import 'winston-daily-rotate-file';
import path from 'path';
import { config } from './config';

const { combine, colorize, align, printf, timestamp } = winston.format;

const format = combine(
  timestamp({ format: 'YYYY-MM-DD hh:mm:ss.SSS' }),
  align(),
  printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
);
const unhandled = new winston.transports.File({
  filename: path.join(
    config.logger.dirname || '.',
    config.logger.unhandledExceptions.filename
  )
});

export const logger = winston.createLogger({
  level: config.logger.defaultLevel,
  format,
  exceptionHandlers: [unhandled],
  rejectionHandlers: [unhandled],
  transports: [
    new winston.transports.Console({
      format: combine(colorize({ all: true }), format)
    }),
    ...config.logger.transports.map(
      ({ level, dirname, filename }) =>
        new winston.transports.DailyRotateFile({
          level,
          dirname: dirname || config.logger.dirname,
          filename,
          format,
          maxSize: '1kb',
          maxFiles: 30,
          datePattern: 'YYYY-MM-DD'
        })
    )
  ]
});

export const logDebugIfEnabled = (getMessage: () => string) => {
  if (logger.isDebugEnabled()) {
    logger.debug(getMessage());
  }
};

export const logVerboseIfEnabled = (getMessage: () => string) => {
  if (logger.isVerboseEnabled() || logger.isDebugEnabled()) {
    logger.verbose(getMessage());
  }
};
