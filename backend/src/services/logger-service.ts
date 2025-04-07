export interface LogMetadata {
  timestamp?: string;
  service?: string;
  correlationId?: string;
  [key: string]: any;
}

export interface ILogger {
  info(message: string, metadata?: LogMetadata): void;
  error(message: string, error?: Error, metadata?: LogMetadata): void;
  warn(message: string, metadata?: LogMetadata): void;
  debug(message: string, metadata?: LogMetadata): void;
}

export class Logger implements ILogger {
  private static instance: Logger;
  private service: string;

  private constructor(service: string = 'default') {
    this.service = service;
  }

  public static getInstance(service?: string): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger(service);
    }
    return Logger.instance;
  }

  private formatMessage(level: string, message: string, metadata?: LogMetadata): any {
    const timestamp = new Date().toISOString();
    return {
      timestamp,
      level,
      service: this.service,
      message,
      ...metadata
    };
  }

  public apiKeyValidation(serviceName: string, isValid: boolean, metadata?: LogMetadata): void {
    const status = isValid ? 'valid' : 'invalid';
    const level = isValid ? 'INFO' : 'ERROR';
    const message = `API Key validation for ${serviceName}: ${status}`;
    
    const logData = this.formatMessage(level, message, {
      ...metadata,
      apiKeyValidation: {
        service: serviceName,
        isValid,
        timestamp: new Date().toISOString()
      }
    });

    if (isValid) {
      console.log(JSON.stringify(logData));
    } else {
      console.error(JSON.stringify(logData));
    }
  }

  public info(message: string, metadata?: LogMetadata): void {
    const logData = this.formatMessage('INFO', message, metadata);
    console.log(JSON.stringify(logData));
  }

  public error(message: string, error?: Error, metadata?: LogMetadata): void {
    const logData = this.formatMessage('ERROR', message, {
      ...metadata,
      error: error ? {
        message: error.message,
        stack: error.stack,
        name: error.name
      } : undefined
    });
    console.error(JSON.stringify(logData));
  }

  public warn(message: string, metadata?: LogMetadata): void {
    const logData = this.formatMessage('WARN', message, metadata);
    console.warn(JSON.stringify(logData));
  }

  public debug(message: string, metadata?: LogMetadata): void {
    const logData = this.formatMessage('DEBUG', message, metadata);
    console.debug(JSON.stringify(logData));
  }
} 