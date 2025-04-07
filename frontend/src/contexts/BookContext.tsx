import { ReactNode, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchBook } from '../services/bookApi';
import { BookContext } from './bookContextInstance';

export const BookProvider = ({ children }: { children: ReactNode }) => {
  const [currentBookId, setCurrentBookId] = useState<string | null>(null);

  const bookQuery = useQuery({
    queryKey: ['book', currentBookId],
    queryFn: () => currentBookId ? fetchBook(currentBookId) : null,
    enabled: !!currentBookId,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    retry: false,
  });

  return (
    <BookContext.Provider 
      value={{ currentBookId, setCurrentBookId, bookQuery }}
    >
      {children}
    </BookContext.Provider>
  );
}; 