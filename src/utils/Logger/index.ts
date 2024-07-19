<<<<<<< HEAD
/*import pino, { Logger } from "pino";
=======
import pino, { Logger } from "pino";
>>>>>>> ed70b46b9f9e707849cb8ec5132e40385418b1ae
import logLevelData from "@/utils/Logger/log-level";

const logLevels = new Map<string, string>(Object.entries(logLevelData));

export function getLogLevel(logger: string): string {
    return logLevels.get(logger) || logLevels.get("*") || "info";
}

export function getLogger(name: string): Logger {
    return pino({ name, level: getLogLevel(name) });
}*/

import pino from 'pino';

const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
});

export default logger;