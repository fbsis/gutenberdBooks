import { useContext } from 'react';
import { BookContext } from '../contexts/bookContextInstance';

export const useBook = () => {
  const context = useContext(BookContext);
  if (context === undefined) {
    throw new Error('useBook must be used within a BookProvider');
  }
  return context;
}; 