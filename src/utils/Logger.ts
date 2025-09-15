const isServer = typeof window === "undefined";

interface Logger {
  info: (...args: any[]) => void;
  error: (...args: any[]) => void;
  warn: (...args: any[]) => void;
  debug: (...args: any[]) => void;
}

let logger: Logger;

if (isServer) {
  try {
     const winston = eval('require')("winston");
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
  } catch (error) {
    // Fallback if Winston fails to load
    logger = {
      info: console.log,
      error: console.error,
      warn: console.warn,
      debug: console.debug,
    };
  }
} else {
  // Client-side fallback
  logger = {
    info: console.log,
    error: console.error,
    warn: console.warn,
    debug: console.debug,
  };
}

export default logger;