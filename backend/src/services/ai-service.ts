import OpenAI from 'openai';

export interface IAIService {
  getBookInformation(bookId: string, bookContent: string): Promise<{
    title: string;
    author: string;
    year: number;
    description: string;
  }>;
}

export class AIService implements IAIService {
  private client: OpenAI;

  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  }

  async getBookInformation(bookId: string, bookContent: string) {
    const completion = await this.client.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that analyzes book content and provides structured information. Return only JSON format."
        },
        {
          role: "user",
          content: `Analyze this book content and provide information about it. Include title, author, year, and a brief description. Book content: ${bookContent.substring(0, 2000)}...`
        }
      ],
      model: "gpt-3.5-turbo",
      response_format: { type: "json_object" }
    });

    const response = JSON.parse(completion.choices[0].message.content || '{}');
    
    return {
      title: response.title || 'Unknown Title',
      author: response.author || 'Unknown Author',
      year: response.year || 0,
      description: response.description || 'No description available'
    };
  }
}