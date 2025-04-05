import { AIService, IAIService } from './ai-service';
import { ICache } from './cache';
import { GutenbergService, IGutenbergService } from './gutenberg-service';

export class BookService {
  private cache: ICache;
  private aiService: IAIService;
  private gutenbergService: IGutenbergService;

  constructor(
    cache: ICache,
    aiService: IAIService,
    gutenbergService: IGutenbergService = new GutenbergService()
  ) {
    this.cache = cache;
    this.aiService = aiService;
    this.gutenbergService = gutenbergService;
  }

  async getBookById(id: string) {
    // Try to get from cache first
    const cachedBook = await this.cache.get(`book:${id}`);
    if (cachedBook) {
      return JSON.parse(cachedBook);
    }

    // Fetch from Gutenberg
    const gutenbergData = await this.gutenbergService.getBookContent(id);

    // Use AI to process the content
    const bookInfo = await this.aiService.getBookInformation(id, gutenbergData.content);

    // Store in cache for future requests
    await this.cache.set(`book:${id}`, JSON.stringify(bookInfo));

    return bookInfo;
  }
} 