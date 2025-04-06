/**
 * Logger utility to handle console logs in a lint-friendly way
 * This allows proper error logging while avoiding ESLint warnings
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error'

// eslint-disable-next-line no-console
const logToConsole = (level: LogLevel, message: string, ...args: unknown[]): void => {
  if (process.env.NODE_ENV === 'development') {
    switch (level) {
      case 'debug':
        // eslint-disable-next-line no-console
        console.log(`[DEBUG] ${message}`, ...args)
        break
      case 'info':
        // eslint-disable-next-line no-console
        console.log(message, ...args)
        break
      case 'warn':
        // eslint-disable-next-line no-console
        console.warn(message, ...args)
        break
      case 'error':
        // eslint-disable-next-line no-console
        console.error(message, ...args)
        break
    }
  }

  // In production, you could send this to an error tracking service like Sentry
}

export const logger = {
  debug: (message: string, ...args: unknown[]) => logToConsole('debug', message, ...args),
  info: (message: string, ...args: unknown[]) => logToConsole('info', message, ...args),
  warn: (message: string, ...args: unknown[]) => logToConsole('warn', message, ...args),
  error: (message: string, ...args: unknown[]) => logToConsole('error', message, ...args)
}
