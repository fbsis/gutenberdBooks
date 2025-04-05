import { Request, Response } from 'express';
import { BookService } from '../services/book-service';
import { Cache } from '../services/cache';
import { AIService } from '../services/ai-service';

export const getBookById = async (req: Request, res: Response) => {
  try {
    const cache = new Cache();
    const aiService = new AIService();
    const bookService = new BookService(cache, aiService);

    const { id } = req.params;
    const book = await bookService.getBookById(id);
    return res.json(book);
  } catch (error) {
    console.error('Error fetching book:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}; 