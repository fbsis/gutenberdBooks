import axios from 'axios';
import { Book } from '../types/Book';

const api = axios.create({
  baseURL: 'http://localhost:4000/'
});

export const fetchBook = async (bookId: string): Promise<Book> => {
  const response = await api.get(`/books/${bookId}`);
  return response.data;
}; 