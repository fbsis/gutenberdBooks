import { useParams } from 'react-router-dom';
import { useBook } from '../hooks/useBook';
import CharacterNetwork from '../components/CharacterNetwork';

interface Quote {
  text: string;
  character: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  chapter: number;
}

interface Character {
  id: string;
  label: string;
}

interface Relation {
  source: string;
  target: string;
}

interface BookData {
  title: string;
  author: string;
  summary: string;
  genres: string[];
  characters: Character[];
  relations: Relation[];
  quotes: Quote[];
}

// All mock data centralized in one object
const bookDetailsData: BookData = {
  title: "Pride and Prejudice",
  author: "Jane Austen",
  summary: "A masterpiece of wit and social observation, Pride and Prejudice follows the turbulent relationship between Elizabeth Bennet, the daughter of a country gentleman, and Fitzwilliam Darcy, a rich aristocratic landowner. Their personalities, pride, and prejudices lead them to misjudge each other repeatedly.",
  genres: ["Romance", "Classic", "Fiction"],
  characters: [
    { id: 'elizabeth', label: 'Elizabeth Bennet' },
    { id: 'darcy', label: 'Mr. Darcy' },
    { id: 'jane', label: 'Jane Bennet' },
    { id: 'bingley', label: 'Mr. Bingley' },
    { id: 'lydia', label: 'Lydia Bennet' },
    { id: 'wickham', label: 'Mr. Wickham' },
    { id: 'collins', label: 'Mr. Collins' },
    { id: 'charlotte', label: 'Charlotte Lucas' },
    { id: 'bennet', label: 'Mrs. Bennet' },
    { id: 'gardiner', label: 'Mrs. Gardiner' }
  ],
  relations: [
    { source: 'elizabeth', target: 'darcy' },
    { source: 'elizabeth', target: 'jane' },
    { source: 'elizabeth', target: 'charlotte' },
    { source: 'elizabeth', target: 'wickham' },
    { source: 'jane', target: 'bingley' },
    { source: 'jane', target: 'elizabeth' },
    { source: 'lydia', target: 'wickham' },
    { source: 'charlotte', target: 'collins' },
    { source: 'elizabeth', target: 'collins' },
    { source: 'elizabeth', target: 'gardiner' },
    { source: 'darcy', target: 'bingley' },
    { source: 'darcy', target: 'wickham' },
    { source: 'bennet', target: 'elizabeth' },
    { source: 'bennet', target: 'jane' },
    { source: 'bennet', target: 'lydia' }
  ],
  quotes: [
    {
      text: "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
      character: 'Narrator',
      sentiment: 'neutral',
      chapter: 1
    },
    {
      text: "I could easily forgive his pride, if he had not mortified mine.",
      character: 'Elizabeth Bennet',
      sentiment: 'negative',
      chapter: 5
    },
    {
      text: "In vain I have struggled. It will not do. My feelings will not be repressed. You must allow me to tell you how ardently I admire and love you.",
      character: 'Mr. Darcy',
      sentiment: 'positive',
      chapter: 34
    }
  ]
};

export const BookDetails = () => {
  const { id } = useParams();
  console.log(id);
  const { bookQuery } = useBook();

  if (bookQuery.isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 mt-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <p className="text-gray-600">Loading book details...</p>
        </div>
      </div>
    );
  }

  if (bookQuery.isError) {
    return (
      <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 mt-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <p className="text-red-600">Error loading book: {bookQuery.error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 mt-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Book Header */}
        <div className="bg-gradient-to-r from-purple-800 to-indigo-800 text-white p-6">
          <h1 className="text-2xl sm:text-3xl font-bold">{bookDetailsData.title}</h1>
          <p className="text-purple-200 mt-2">by {bookDetailsData.author}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {bookDetailsData.genres.map((genre, index) => (
              <span key={index} className="px-3 py-1 bg-purple-700 rounded-full text-sm">
                {genre}
              </span>
            ))}
          </div>
        </div>

        {/* Book Summary */}
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Summary</h2>
          <p className="text-gray-600">{bookDetailsData.summary}</p>
        </div>

        <CharacterNetwork 
          characters={bookDetailsData.characters} 
          relations={bookDetailsData.relations} 
        />

        {/* Key Quotes */}
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Key Quotes</h2>
          <div className="space-y-4">
            {bookDetailsData.quotes.map((quote, index) => (
              <div 
                key={index}
                className={`p-4 rounded-lg ${
                  quote.sentiment === 'positive' ? 'bg-green-50 border-green-200' :
                  quote.sentiment === 'negative' ? 'bg-red-50 border-red-200' :
                  'bg-gray-50 border-gray-200'
                } border`}
              >
                <p className="text-gray-800 italic">"{quote.text}"</p>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">— {quote.character}</span>
                  <span className="text-sm text-gray-500">Chapter {quote.chapter}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails; 