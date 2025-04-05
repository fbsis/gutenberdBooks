import { AIService, IAIService } from './ai-service';
import { ICache } from './cache';
import { GutenbergService, IGutenbergService } from './gutenberg-service';
import { Logger } from './logger-service';

export class BookService {
  private cache: ICache;
  private aiService: IAIService;
  private gutenbergService: IGutenbergService;
  private logger: Logger;

  constructor(
    cache: ICache,
    aiService: IAIService,
    gutenbergService: IGutenbergService = new GutenbergService()
  ) {
    this.cache = cache;
    this.aiService = aiService;
    this.gutenbergService = gutenbergService;
    this.logger = Logger.getInstance('BookService');
  }

  async getBookById(id: string) {
    this.logger.info('Getting book by id', { bookId: id });
    
    // Try to get from cache first
    const cachedBook = await this.cache.get(`book:${id}`);
    if (cachedBook) {
      this.logger.info('Book found in cache', { bookId: id });
      return JSON.parse(cachedBook);
    }

    this.logger.info('Book not found in cache, fetching from Gutenberg', { bookId: id });
    // Fetch from Gutenberg
    const gutenbergData = await this.gutenbergService.getBookContent(id);

    this.logger.info('Processing book content with AI', { bookId: id });
    // Use AI to process the content
    const bookMetadata = await this.aiService.extractBookMetadataFromHtml(gutenbergData.metadata);
    this.logger.info('Book metadata', { bookMetadata });

    const bookInfo = await this.aiService.getBookInformation(bookMetadata, gutenbergData.content);
    this.logger.info('Storing book in cache', { bookId: id });
    
    // Store in cache for future requests
    await this.cache.set(`book:${id}`, JSON.stringify(bookInfo));

    this.logger.info('Successfully processed and cached book', { bookId: id });
    return bookInfo;
  }
} 