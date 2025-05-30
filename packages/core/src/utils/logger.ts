// TODO: Find alternative logger when needed

/**
 * Interface for logging operations
 */
export interface Logger {
  log(message: string, data?: any): void;
  info(message: string, data?: any): void;
  warn(message: string, data?: any): void;
  error(message: string, error?: Error | any): void;
  debug(message: string, data?: any): void;
}

export const consoleLogger: Logger = {
  log: (message, data) => console.log(message, data ?? ''),
  info: (message, data) => console.info(message, data ?? ''),
  warn: (message, data) => console.warn(message, data ?? ''),
  error: (message, error) => {
    if (error instanceof Error) {
      console.error(`${message}: ${error.message}`, error);
    } else {
      console.error(message, error ?? '');
    }
  },
  debug: (message, data) => console.debug(message, data ?? '')
};
