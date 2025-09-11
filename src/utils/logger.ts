const isServer = typeof window === "undefined";

let logger: any;

if (isServer) {
  const winston = require("winston");
  const { createLogger, format, transports } = winston;

  logger = createLogger({
    level: "info",
    format: format.combine(
      format.colorize(),
      format.timestamp(),
      format.printf(
        ({
          timestamp,
          level,
          message,
        }: {
          timestamp: string;
          level: string;
          message: string;
        }) => {
          return `[${timestamp}] ${level}: ${message}`;
        }
      )
    ),
    transports: [
      new transports.Console(), // Logs to the server console
    ],
  });
} else {
  // Client-side fallback
  logger = console;
}

export default logger;
