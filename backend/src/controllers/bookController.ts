import { Request, Response } from 'express';

interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
}

// Mock data for testing
const mockBook: Book = {
  id: "1",
  title: "Dom Casmurro",
  author: "Machado de Assis",
  year: 1899
};

export const getBookById = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  // For now, we'll just return the mock data regardless of the ID
  return res.json(mockBook);
}; 