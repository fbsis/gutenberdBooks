import { useParams } from "react-router-dom";
import { useBook } from "../hooks/useBook";
import CharacterNetwork from "../components/CharacterNetwork";

interface Quote {
  text: string;
  character: string;
  sentiment: "positive" | "negative" | "neutral";
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
  authors: string[];
  coverUrl: string;
  year: number;
  summary: string;
  genres: string[];
  characters: Character[];
  mainCharacters: Character[];
  relations: Relation[];
  quotes: Quote[];
  centralTheme: string;
  centralConflict: string;
  location: string;
  historicalContext: string;
  enviromentofSetting: string;
  styleofWriting: string;
  narrativePointofView: string;
  moralofStory: string;
}

interface ErrorResponse {
  response?: {
    status: number;
  };
}

export const BookDetails = () => {
  const { id } = useParams();

  const { bookQuery, setCurrentBookId } = useBook();
  const bookDetailsData = bookQuery.data as unknown as BookData;

  setCurrentBookId(id || "");

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
    const is404 = (bookQuery.error as ErrorResponse)?.response?.status === 404;

    if (is404) {
      return (
        <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 mt-8">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="mb-6">
              <h1 className="text-6xl font-bold text-gray-300">404</h1>
              <h2 className="text-2xl font-semibold text-gray-800 mt-4">
                Book not found
              </h2>
              <p className="text-gray-600 mt-2">
                Sorry, we couldn't find the book you're looking for.
              </p>
            </div>
            <a
              href="/"
              className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Back to homepage
            </a>
          </div>
        </div>
      );
    }

    return (
      <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 mt-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <p className="text-red-600">
            Error loading book: {bookQuery.error.message}
          </p>
        </div>
      </div>
    );
  }

  if (!bookDetailsData) {
    return (
      <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 mt-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <p className="text-gray-600">No book details found</p>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 mt-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Book Header */}
        <div className="bg-gradient-to-r from-purple-800 to-indigo-800 text-white p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Book Cover */}
            <div className="w-48 h-64 flex-shrink-0">
              <img
                src={bookDetailsData.coverUrl}
                alt={`Cover of ${bookDetailsData.title}`}
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>

            {/* Book Info */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">
                {bookDetailsData.title}
              </h1>
              <p className="text-purple-200 mt-2">
                by {bookDetailsData.authors.join(", ")}
              </p>
              <p className="text-purple-200 mt-1">
                Published in {bookDetailsData.year}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {bookDetailsData.genres.map((genre, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-purple-700 rounded-full text-sm"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Book Summary */}
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Summary</h2>
          <p className="text-gray-600">{bookDetailsData.summary}</p>
        </div>

        {/* Literary Analysis */}
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Literary Analysis
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-800">Central Theme</h3>
                <p className="text-gray-600">{bookDetailsData.centralTheme}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Central Conflict</h3>
                <p className="text-gray-600">
                  {bookDetailsData.centralConflict}
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Setting</h3>
                <p className="text-gray-600">{bookDetailsData.location}</p>
                <p className="text-gray-600 mt-1">
                  {bookDetailsData.enviromentofSetting}
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-800">
                  Historical Context
                </h3>
                <p className="text-gray-600">
                  {bookDetailsData.historicalContext}
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Writing Style</h3>
                <p className="text-gray-600">
                  {bookDetailsData.styleofWriting}
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Point of View</h3>
                <p className="text-gray-600">
                  {bookDetailsData.narrativePointofView}
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-800">
                  Moral of the Story
                </h3>
                <p className="text-gray-600">{bookDetailsData.moralofStory}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Characters */}
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Main Characters
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {bookDetailsData.mainCharacters.map((character) => (
              <div key={character.id} className="p-3 bg-gray-50 rounded-lg">
                <p className="font-medium text-gray-800">{character.label}</p>
              </div>
            ))}
          </div>
        </div>

        <CharacterNetwork
          characters={bookDetailsData.characters}
          relations={bookDetailsData.relations}
        />

        {/* Key Quotes */}
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Key Quotes (
            <span className="inline-block px-3 py-1 bg-green-50 rounded-full text-sm">
              positive
            </span>
            ,{" "}
            <span className="inline-block px-3 py-1 bg-red-50 rounded-full text-sm">
              negative
            </span>{" "}
            or{" "}
            <span className="inline-block px-3 py-1 bg-gray-50 rounded-full text-sm">
              neutral
            </span>
            )
          </h2>
          <div className="space-y-4">
            {bookDetailsData.quotes.map((quote, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg ${
                  quote.sentiment === "positive"
                    ? "bg-green-50 border-green-200"
                    : quote.sentiment === "negative"
                    ? "bg-red-50 border-red-200"
                    : "bg-gray-50 border-gray-200"
                } border`}
              >
                <p className="text-gray-800 italic">"{quote.text}"</p>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">
                    — {quote.character}
                  </span>
                  <span className="text-sm text-gray-500">
                    Chapter {quote.chapter}
                  </span>
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
