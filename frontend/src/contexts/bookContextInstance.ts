import { createContext } from 'react';
import { UseQueryResult } from '@tanstack/react-query';
import { Book } from '../types/Book';

interface BookContextType {
  currentBookId: string | null;
  setCurrentBookId: (id: string) => void;
  bookQuery: UseQueryResult<Book | null, Error>;
}

export const BookContext = createContext<BookContextType | undefined>(undefined); 