import { HttpClient, IHttpClient } from './http-client';
import { Logger } from './logger-service';

export interface IGutenbergService {
  getBookContent(bookId: string): Promise<{
    content: string;
    metadata: any;
  }>;
}

export class GutenbergService implements IGutenbergService {
  private httpClient: IHttpClient;
  private logger: Logger;

  constructor(httpClient: IHttpClient = new HttpClient()) {
    this.httpClient = httpClient;
    this.logger = Logger.getInstance('GutenbergService');
  }

  async getBookContent(bookId: string) {
    try {
      const contentUrl = `https://www.gutenberg.org/files/${bookId}/${bookId}-0.txt`;
      const metadataUrl = `https://www.gutenberg.org/ebooks/${bookId}`;

      this.logger.info('Fetching book content', { bookId, contentUrl });
      const content = await this.httpClient.get<string>(contentUrl);
      this.logger.info('Book content', { content });

      this.logger.info('Fetching book metadata', { bookId, metadataUrl });
      const metadata = await this.httpClient.get(metadataUrl);
      this.logger.info('Book metadata', { metadata });

      this.logger.info('Successfully fetched book data from Gutenberg', { bookId });
      return {
        content,
        metadata
      };
    } catch (error) {
      this.logger.error('Error fetching from Gutenberg', error as Error, { bookId });
      throw new Error('Failed to fetch book from Gutenberg');
    }
  }
} 