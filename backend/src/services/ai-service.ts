import 'dotenv/config';
import OpenAI from 'openai';
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";
import { Logger } from './logger-service';

// Zod Schemas
const Character = z.object({
  id: z.string(),
  label: z.string()
});

const Relation = z.object({
  source: z.string(),
  target: z.string()
});

const Quote = z.object({
  text: z.string(),
  character: z.string(),
  sentiment: z.enum(['positive', 'negative', 'neutral']),
  chapter: z.number()
});

const BookData = z.object({
  title: z.string(),
  coverUrl: z.string(),
  authors: z.array(z.string()),
  year: z.number(),
  summary: z.string(),
  genres: z.array(z.string()),
  mainCharacters: z.array(Character),
  centralTheme: z.string(),
  centralConflict: z.string(),
  location: z.string(),
  historicalContext: z.string(),
  enviromentofSetting: z.string(),
  styleofWriting: z.string(),
  narrativePointofView: z.enum(['first person', 'third person']),
  moralofStory: z.string(),
  characters: z.array(Character),
  relations: z.array(Relation),
  quotes: z.array(Quote),
});

const BookMetadata = z.object({
  title: z.string(),
  authors: z.array(z.string()),
  coverUrl: z.string()
});

// OpenAI Configuration
const AI_CONFIG = {
  MODEL: "gpt-4o-mini" as const,
  INITIAL_CONTENT_LENGTH: 1000,
  MAX_CONTENT_LENGTH: 5000,
  RESPONSE_KEY: "book" as const,
  METADATA_KEY: "metadata" as const
} as const;

// System Messages
const SYSTEM_MESSAGES = {
  BOOK_ANALYSIS: `You are a literary analysis AI that provides structured information about books. 
    Analyze the provided text and extract key information including summary, characters to extract relationships, relationships, interactions, and notable quotes.` as const,
  BOOK_REQUEST: (metadata: BookMetadataType, content: string) => 
    `Analyze this book content and provide detailed information about it. Include all the requested fields. Book metadata: ${JSON.stringify(metadata)}. Book content: ${content.substring(AI_CONFIG.INITIAL_CONTENT_LENGTH, AI_CONFIG.MAX_CONTENT_LENGTH)}.` as const,
  HTML_METADATA_ANALYSIS: `You are an AI specialized in extracting basic book metadata from HTML content.
    Focus on finding only the title and author from the HTML content.
    Look for this information in <title>, <meta> tags, headers, and structured data.` as const,
  HTML_METADATA_REQUEST: (html: string) =>
    `Extract only the book title and author from this HTML content. HTML content: ${html.substring(0, AI_CONFIG.MAX_CONTENT_LENGTH)}...` as const
} as const;

export type BookDataType = z.infer<typeof BookData>;
export type BookMetadataType = z.infer<typeof BookMetadata>;

export interface IAIService {
  getBookInformation(bookMetadata: BookMetadataType, bookContent: string): Promise<BookDataType>;
  extractBookMetadataFromHtml(html: string): Promise<BookMetadataType>;
}

export class AIService implements IAIService {
  private client: OpenAI;
  private logger = Logger.getInstance('AIService');

  constructor() {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not set in environment variables');
    }
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }


  async extractBookMetadataFromHtml(html: string): Promise<BookMetadataType> {
    try {
      const completion = await this.client.beta.chat.completions.parse({
        messages: [
          {
            role: "system",
            content: SYSTEM_MESSAGES.HTML_METADATA_ANALYSIS
          },
          {
            role: "user",
            content: SYSTEM_MESSAGES.HTML_METADATA_REQUEST(html)
          }
        ],
        model: AI_CONFIG.MODEL,
        response_format: zodResponseFormat(BookMetadata, "Metadata"),
      });

      this.logger.info('HTML metadata completion', { completion });

      const parsedData = completion.choices[0].message.parsed as BookMetadataType | null;
      if (!parsedData) {
        this.logger.error('Failed to parse HTML metadata');
        throw new Error('Failed to parse HTML metadata');
      }

      return parsedData;
    } catch (error) {
      this.logger.error('Error extracting metadata from HTML', error as Error);
      throw error;
    }
  }

  async getBookInformation(bookMetadata: BookMetadataType, bookContent: string): Promise<BookDataType> {
    this.logger.info('Getting book information', { bookMetadata });
    this.logger.info('systemMessage to be sent', { systemMessage: SYSTEM_MESSAGES.BOOK_REQUEST(bookMetadata, bookContent) });
    
    try {
      const completion = await this.client.beta.chat.completions.parse({
        messages: [
        {
          role: "system",
          content: SYSTEM_MESSAGES.BOOK_ANALYSIS
        },
        {
          role: "user",
          content: SYSTEM_MESSAGES.BOOK_REQUEST(bookMetadata, bookContent)
        }
      ],
      model: AI_CONFIG.MODEL,
      response_format: zodResponseFormat(BookData, "bookDetails"),
    });
    this.logger.info('Book data completion', { completion });

    const parsedData = completion.choices[0].message.parsed as BookDataType | null;
    if (!parsedData) {
      this.logger.error('Failed to parse book data');
      throw new Error('Failed to parse book data');
    }
    return parsedData;
    } catch (error) {
      this.logger.error('Error getting book information', error as Error);
      throw error;
    }
  }


}