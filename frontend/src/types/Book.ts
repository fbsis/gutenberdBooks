export interface Book {
  id: string;
  title: string;
  author: string;
  language: string;
  downloadCount: number;
  formats: {
    [key: string]: string;
  };
} 