import { AIService, IAIService } from './ai-service';
import { ICache } from './cache';
import { GutenbergService, IGutenbergService } from './gutenberg-service';
import { Logger } from './logger-service';
import { BookNotFoundError } from '../errors/book-errors';

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

  // Cache TTL calculation:
  // 60 seconds * 60 minutes * 24 hours = 86400 seconds (24 hours)
  private readonly CACHE_TTL_SECONDS = 60 * 60 * 24;

  async getBookById(id: string) {
    try {
      this.logger.info('Getting book by id', { bookId: id });
      
      const cachedBook = await this.retrieveBookFromCacheOrNull(id);
      if (cachedBook) {
        return cachedBook;
      }

      return await this.downloadAndEnrichBook(id);
    } catch (error) {
      return this.handlerBookError(error, id);
    }
  }

  private async retrieveBookFromCacheOrNull(id: string): Promise<any | null> {
    const cachedBook = await this.cache.get(`book:${id}`);
    if (!cachedBook) return null;

    if (cachedBook === 'NOT_FOUND') {
      this.logger.info('Book previously marked as not found in cache', { bookId: id });
      throw new BookNotFoundError(`Book with id ${id} not found`);
    }

    this.logger.info('Book found in cache', { bookId: id });
    return JSON.parse(cachedBook);
  }

  private async downloadAndEnrichBook(id: string): Promise<any> {
    try {
      this.logger.info('Book not found in cache, fetching from Gutenberg', { bookId: id });
      
      const gutenbergData = await this.gutenbergService.getBookContent(id);
      const enrichedBook = await this.enrichBookContentWithAIAnalysis(gutenbergData);
      
      await this.persistBookInCache(id, enrichedBook);
      
      return enrichedBook;
    } catch (error) {
      if (error instanceof BookNotFoundError) {
        await this.persistNotFoundStatusInCache(id);
      }
      throw error;
    }
  }

  private async enrichBookContentWithAIAnalysis(gutenbergData: any): Promise<any> {
    this.logger.info('Processing book content with AI');
    
    const bookMetadata = await this.aiService.extractBookMetadataFromHtml(gutenbergData.metadata);
    this.logger.info('Book metadata', { bookMetadata });

    return await this.aiService.getBookInformation(bookMetadata, gutenbergData.content);
  }

  private async persistBookInCache(id: string, bookInfo: any): Promise<void> {
    this.logger.info('Storing book in cache', { bookId: id });
    await this.cache.set(`book:${id}`, JSON.stringify(bookInfo), this.CACHE_TTL_SECONDS);
    this.logger.info('Successfully processed and cached book', { bookId: id });
  }

  private async persistNotFoundStatusInCache(id: string): Promise<void> {
    this.logger.info('Caching book not found status', { bookId: id });
    await this.cache.set(`book:${id}`, 'NOT_FOUND', this.CACHE_TTL_SECONDS);
  }

  private handlerBookError(error: unknown, id: string): never {
    if (error instanceof BookNotFoundError) {
      throw error;
    }
    this.logger.error('Error in BookService', error as Error, { bookId: id });
    throw new Error('Failed to process book');
  }
} 