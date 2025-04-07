import { Request, Response } from 'express';
import { BookService } from '../services/book-service';
import { Cache } from '../services/cache';
import { AIService } from '../services/ai-service';
import { GutenbergService } from '../services/gutenberg-service';
import { Logger } from '../services/logger-service';
import { BookNotFoundError } from '../errors/book-errors';

export const getBookById = async (req: Request, res: Response) => {
  const logger = Logger.getInstance('BookController');
  
  try {
    const cache = new Cache();
    const aiService = new AIService();
    const gutenbergService = new GutenbergService();
    const bookService = new BookService(cache, aiService, gutenbergService);

    const { id } = req.params;
    logger.info('Fetching book by id', { bookId: id });
    
    const book = await bookService.getBookById(id);
    logger.info('Book fetched successfully', { bookId: id });
    
    return res.json(book);
  } catch (error) {
    if (error instanceof BookNotFoundError) {
      logger.warn('Book not found', { bookId: req.params.id });
      return res.status(404).json({ error: error.message });
    }
    
    logger.error('Error fetching book', error as Error, { bookId: req.params.id });
    return res.status(500).json({ error: 'Internal server error' });
  }
}; 