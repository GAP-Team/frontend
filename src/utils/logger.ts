const isServer = typeof window === "undefined";

if (isServer) {
  const { createLogger, format, transports } = require("winston");

  const customLogger = createLogger({
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

  module.exports = customLogger;
}
