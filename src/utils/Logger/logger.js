const isServer = typeof window === "undefined";

if (isServer) {
  const { createLogger, format, transports } = require("winston");

  const customLogger = createLogger({
    level: "info",
    format: format.combine(
      format.colorize(),
      format.timestamp(),
      format.printf(({ timestamp, level, message }) => {
        return `[${timestamp}] ${level}: ${message}`;
      })
    ),
    transports: [
      new transports.Console(), // Logs to the server console
      new transports.File({ filename: "app.log" }),
    ],
  });

  module.exports = customLogger;
}
