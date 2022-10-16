import winston, { format } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import getEnvironmentVariables from "./environment.js";

const { language, timeZone, isProduction } = getEnvironmentVariables();

const timeZoneFormat = () => {
  return new Date().toLocaleString(language, {
    timeZone: timeZone,
  });
};

const logger = winston.createLogger({
  level: isProduction ? "info" : "debug",
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
