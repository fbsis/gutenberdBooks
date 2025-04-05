import { HttpClient, IHttpClient } from './http-client';

export interface IGutenbergService {
  getBookContent(bookId: string): Promise<{
    content: string;
    metadata: any;
  }>;
}

export class GutenbergService implements IGutenbergService {
  private httpClient: IHttpClient;

  constructor(httpClient: IHttpClient = new HttpClient()) {
    this.httpClient = httpClient;
  }

  async getBookContent(bookId: string) {
    try {
      const contentUrl = `https://www.gutenberg.org/files/${bookId}/${bookId}-0.txt`;
      const metadataUrl = `https://www.gutenberg.org/ebooks/${bookId}`;

      // Get book content
      const content = await this.httpClient.get<string>(contentUrl);

      // Get metadata
      const metadata = await this.httpClient.get(metadataUrl);

      return {
        content,
        metadata
      };
    } catch (error) {
      console.error('Error fetching from Gutenberg:', error);
      throw new Error('Failed to fetch book from Gutenberg');
    }
  }
} 