// TODO: Find alternative logger when needed

/**
 * Interface for logging operations
 */
export interface Logger {
  log(message: string): void;
  info(message: string): void;
  warn(message: string): void;
  error(message: string): void;
}

export const consoleLogger = {
  log: console.log,
  info: console.info,
  warn: console.warn,
  error: console.error
};
