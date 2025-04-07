import { FC } from 'react';
import { Link } from 'react-router-dom';

const NOT_FOUND_MESSAGES = [
  "Looks like this book got lost in our magical library!",
  "Even our wise owl couldn't find this one...",
  "This book seems to have vanished into thin air!",
  "Perhaps it's hiding in the restricted section?",
  "Maybe it's been borrowed by a mischievous bookworm!"
];

export const NotFoundBook: FC = () => {
  // Get a random message
  const randomMessage = NOT_FOUND_MESSAGES[Math.floor(Math.random() * NOT_FOUND_MESSAGES.length)];

  return (
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 mt-8">
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-8">
          {/* Book emoji with page animation */}
          <div className="text-7xl mb-6 animate-[wiggle_1s_ease-in-out_infinite]">
            📖
          </div>
          
          {/* 404 with book-themed styling */}
          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent mb-4">
            404
          </h1>
          
          {/* Fun message */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Book Not Found
          </h2>
          
          {/* Random humorous submessage */}
          <p className="text-gray-600 text-lg mb-2">
            {randomMessage}
          </p>
          
          {/* Additional fun context */}
          <p className="text-gray-500 text-sm italic">
            Our librarians are searching every shelf, but it seems this book is playing hide and seek!
          </p>
        </div>

        {/* Styled back button */}
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg hover:from-purple-700 hover:to-blue-600 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          <span className="mr-2">🏠</span>
          Return to Library
        </Link>
      </div>

      {/* Add custom keyframes for the book wiggle animation */}
      <style>
        {`
          @keyframes wiggle {
            0%, 100% { transform: rotate(-3deg); }
            50% { transform: rotate(3deg); }
          }
        `}
      </style>
    </div>
  );
};

export default NotFoundBook; 