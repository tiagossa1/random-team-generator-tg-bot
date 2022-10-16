import winston, { format } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

import * as dotenv from "dotenv";
dotenv.config();

const timeZoneFormat = () => {
  const LANGUAGE = process.env.LANGUAGE;
  const TIMEZONE = process.env.TIMEZONE;

  if (!LANGUAGE || !TIMEZONE) return new Date().toLocaleString();

  return new Date().toLocaleString(LANGUAGE, {
    timeZone: TIMEZONE,
  });
};

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new DailyRotateFile({
      filename: "logs/log_%DATE%.log",
      datePattern: "YYYY-MM-DD-HH",
      zippedArchive: true,
      maxFiles: "14d",
      maxSize: "20m",
      format: format.combine(
        format.timestamp({ format: timeZoneFormat }),
        format.prettyPrint()
      ),
    }),
    new winston.transports.Console({
      format: format.combine(
        format.timestamp({ format: timeZoneFormat }),
        format.ms(),
        format.errors({ stack: true }),
        format.splat(),
        format.json(),
        format.colorize({ all: true })
      ),
    }),
  ],
});

export default logger;
