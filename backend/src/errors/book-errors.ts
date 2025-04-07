export class BookNotFoundError extends Error {
  constructor(bookId: string) {
    super(`Book with ID ${bookId} was not found in Gutenberg library`);
    this.name = 'BookNotFoundError';
  }
} 