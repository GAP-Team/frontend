import pino, { Logger } from "pino";
import logLevelData from "@/utils/Logger/log-level";

const logLevels = new Map<string, string>(Object.entries(logLevelData));

export function getLogLevel(logger: string): string {
    return logLevels.get(logger) || logLevels.get("*") || "info";
}

export function getLogger(name: string): Logger {
    return pino({ name, level: getLogLevel(name) });
}