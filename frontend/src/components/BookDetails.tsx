import { FC } from 'react';

interface Character {
  name: string;
  interactions: number;
  description: string;
}

interface Quote {
  text: string;
  character: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  chapter: number;
}

export const BookDetails: FC = () => {
  const mockCharacters: Character[] = [
    { name: 'Elizabeth Bennet', interactions: 145, description: 'The novel\'s protagonist' },
    { name: 'Mr. Darcy', interactions: 123, description: 'A wealthy gentleman' },
    { name: 'Jane Bennet', interactions: 78, description: 'Elizabeth\'s elder sister' },
    { name: 'Mr. Bingley', interactions: 67, description: 'Darcy\'s wealthy friend' },
  ];

  const mockQuotes: Quote[] = [
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
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 mt-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
   
        {/* Book Header */}
        <div className="bg-gradient-to-r from-purple-800 to-indigo-800 text-white p-6">
          <h1 className="text-2xl sm:text-3xl font-bold">Pride and Prejudice</h1>
          <p className="text-purple-200 mt-2">by Jane Austen</p>
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="px-3 py-1 bg-purple-700 rounded-full text-sm">Romance</span>
            <span className="px-3 py-1 bg-purple-700 rounded-full text-sm">Classic</span>
            <span className="px-3 py-1 bg-purple-700 rounded-full text-sm">Fiction</span>
          </div>
        </div>

        {/* Book Summary */}
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Summary</h2>
          <p className="text-gray-600">
            A masterpiece of wit and social observation, Pride and Prejudice follows the turbulent relationship between Elizabeth Bennet, the daughter of a country gentleman, and Fitzwilliam Darcy, a rich aristocratic landowner. Their personalities, pride, and prejudices lead them to misjudge each other repeatedly.
          </p>
        </div>

        {/* Character Network */}
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Character Interactions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {mockCharacters.map((character) => (
              <div 
                key={character.name}
                className="p-4 rounded-lg border border-gray-200 hover:border-purple-500 transition-colors"
                style={{
                  transform: `scale(${0.8 + (character.interactions / 200)})`
                }}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-800">{character.name}</h3>
                  <span className="text-sm text-purple-600">{character.interactions} interactions</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">{character.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Key Quotes */}
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Key Quotes</h2>
          <div className="space-y-4">
            {mockQuotes.map((quote, index) => (
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