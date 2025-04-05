export interface Quote {
  text: string;
  character: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  chapter: number;
}

export interface Character {
  id: string;
  label: string;
}

export interface Relation {
  source: string;
  target: string;
}

export interface BookData {
  title: string;
  author: string;
  summary: string;
  genres: string[];
  characters: Character[];
  relations: Relation[];
  quotes: Quote[];
}

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
  apiKeyValidation(serviceName: string, isValid: boolean, metadata?: LogMetadata): void;
  validateOpenAIKey(apiKey: string): Promise<boolean>;
  validateOpenAIResponse(response: any): boolean;
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

  public validateOpenAIResponse(response: any): boolean {
    try {
      if (!response || typeof response !== 'object') {
        this.error('Invalid OpenAI response format', new Error('Response validation failed'), {
          service: 'OpenAI',
          validationType: 'RESPONSE_VALIDATION'
        });
        return false;
      }

      // Validate required fields and their types
      const requiredFields: (keyof BookData)[] = ['title', 'author', 'summary', 'genres', 'characters', 'relations', 'quotes'];
      for (const field of requiredFields) {
        if (!(field in response)) {
          this.error(`Missing required field: ${field}`, new Error('Response validation failed'), {
            service: 'OpenAI',
            validationType: 'RESPONSE_VALIDATION',
            field
          });
          return false;
        }
      }

      // Validate arrays
      if (!Array.isArray(response.genres) || !Array.isArray(response.characters) || 
          !Array.isArray(response.relations) || !Array.isArray(response.quotes)) {
        this.error('Invalid array fields in response', new Error('Response validation failed'), {
          service: 'OpenAI',
          validationType: 'RESPONSE_VALIDATION'
        });
        return false;
      }

      // Validate character structure
      for (const char of response.characters) {
        if (!char.id || !char.label || typeof char.id !== 'string' || typeof char.label !== 'string') {
          this.error('Invalid character structure', new Error('Response validation failed'), {
            service: 'OpenAI',
            validationType: 'RESPONSE_VALIDATION',
            character: char
          });
          return false;
        }
      }

      // Validate relations structure
      for (const relation of response.relations) {
        if (!relation.source || !relation.target || 
            typeof relation.source !== 'string' || typeof relation.target !== 'string') {
          this.error('Invalid relation structure', new Error('Response validation failed'), {
            service: 'OpenAI',
            validationType: 'RESPONSE_VALIDATION',
            relation
          });
          return false;
        }
      }

      // Validate quotes structure
      for (const quote of response.quotes) {
        if (!quote.text || !quote.character || !quote.sentiment || typeof quote.chapter !== 'number' ||
            !['positive', 'negative', 'neutral'].includes(quote.sentiment)) {
          this.error('Invalid quote structure', new Error('Response validation failed'), {
            service: 'OpenAI',
            validationType: 'RESPONSE_VALIDATION',
            quote
          });
          return false;
        }
      }

      this.info('OpenAI response structure validation passed', {
        service: 'OpenAI',
        validationType: 'RESPONSE_VALIDATION'
      });
      return true;
    } catch (error) {
      this.error('Error validating OpenAI response', error as Error, {
        service: 'OpenAI',
        validationType: 'RESPONSE_VALIDATION'
      });
      return false;
    }
  }

  public async validateOpenAIKey(apiKey: string): Promise<boolean> {
    try {
      if (!apiKey || apiKey.trim() === '') {
        this.error('OpenAI API key is missing or empty', new Error('API key validation failed'), {
          service: 'OpenAI',
          validationType: 'API_KEY_VALIDATION'
        });
        return false;
      }

      if (!apiKey.startsWith('sk-')) {
        this.error('Invalid OpenAI API key format', new Error('API key validation failed'), {
          service: 'OpenAI',
          validationType: 'API_KEY_VALIDATION'
        });
        return false;
      }

      // Basic validation passed
      this.info('OpenAI API key format is valid', {
        service: 'OpenAI',
        validationType: 'API_KEY_VALIDATION'
      });
      return true;
    } catch (error) {
      this.error('Error validating OpenAI API key', error as Error, {
        service: 'OpenAI',
        validationType: 'API_KEY_VALIDATION'
      });
      return false;
    }
  }
} 