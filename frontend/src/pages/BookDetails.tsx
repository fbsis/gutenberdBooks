import { useParams } from "react-router-dom";
import { useBook } from "../hooks/useBook";
import CharacterNetwork from "../components/CharacterNetwork";
import { BookHeader } from "../components/BookHeader";
import { BookSummary } from "../components/BookSummary";
import { BookLiteraryAnalysis } from "../components/BookLiteraryAnalysis";
import { BookMainCharacters } from "../components/BookMainCharacters";
import { BookQuotes } from "../components/BookQuotes";

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
        <BookHeader
          title={bookDetailsData.title}
          authors={bookDetailsData.authors}
          coverUrl={bookDetailsData.coverUrl}
          year={bookDetailsData.year}
          genres={bookDetailsData.genres}
        />

        <BookSummary summary={bookDetailsData.summary} />

        <BookLiteraryAnalysis
          centralTheme={bookDetailsData.centralTheme}
          centralConflict={bookDetailsData.centralConflict}
          location={bookDetailsData.location}
          enviromentofSetting={bookDetailsData.enviromentofSetting}
          historicalContext={bookDetailsData.historicalContext}
          styleofWriting={bookDetailsData.styleofWriting}
          narrativePointofView={bookDetailsData.narrativePointofView}
          moralofStory={bookDetailsData.moralofStory}
        />

        <BookMainCharacters mainCharacters={bookDetailsData.mainCharacters} />

        <CharacterNetwork
          characters={bookDetailsData.characters}
          relations={bookDetailsData.relations}
        />

        <BookQuotes quotes={bookDetailsData.quotes} />
      </div>
    </div>
  );
};

export default BookDetails;
