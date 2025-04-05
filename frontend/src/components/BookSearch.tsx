import { useState } from 'react';
import { useBook } from '../hooks/useBook';

const BookSearch = () => {
  const [bookId, setBookId] = useState('');
  const { setCurrentBookId, bookQuery } = useBook();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentBookId(bookId);
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 px-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Search Book by ID</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label 
              htmlFor="bookId" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Enter Gutenberg Book ID
            </label>
            <div className="relative">
              <input
                type="text"
                id="bookId"
                value={bookId}
                onChange={(e) => setBookId(e.target.value)}
                placeholder="e.g., 1661"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors text-black"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg 
                  className="h-5 w-5 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                  />
                </svg>
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Find the book ID on Project Gutenberg's website
            </p>
          </div>
          <button
            type="submit"
            disabled={bookQuery.isFetching}
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors disabled:bg-purple-400"
          >
            {bookQuery.isFetching ? 'Searching...' : 'Search Book'}
          </button>
        </form>

        {bookQuery.isError && (
          <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg">
            Error: {bookQuery.error.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookSearch; 