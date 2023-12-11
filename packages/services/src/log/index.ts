/* eslint-disable @typescript-eslint/no-explicit-any */
import log, { type LogLevelNumbers } from "loglevel";

import config from "../config";

const logLevels: Record<string, LogLevelNumbers> = {
	trace: log.levels.TRACE,
	debug: log.levels.DEBUG,
	info: log.levels.INFO,
	warn: log.levels.WARN,
	error: log.levels.ERROR,
	silent: log.levels.SILENT,
};

const logLevel = config.get("logLevel");

log.setLevel(logLevels[logLevel]);

export { log };
