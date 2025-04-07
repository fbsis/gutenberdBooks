import { FC, useEffect, useState } from 'react';

const LOADING_MESSAGES = [
  {
    message: "Turning the pages...",
    subMessage: "Please wait while we fetch your book from our magical library",
    icon: "📚"
  },
  {
    message: "Dusting off the cover...",
    subMessage: "Our librarian is carefully handling your request",
    icon: "🧹"
  },
  {
    message: "Checking the bookmarks...",
    subMessage: "Making sure we don't lose your page",
    icon: "🔖"
  },
  {
    message: "Consulting the wise owl...",
    subMessage: "Our literary expert is reviewing your selection",
    icon: "🦉"
  },
  {
    message: "Brewing some reading tea...",
    subMessage: "The perfect companion for your literary journey",
    icon: "☕"
  },
  {
    message: "Lighting the reading lamp...",
    subMessage: "Setting the perfect ambiance for your story",
    icon: "💡"
  }
];

export const LoadingBook: FC = () => {
  const [currentIndex, setCurrentIndex] = useState(
    Math.floor(Math.random() * LOADING_MESSAGES.length)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * LOADING_MESSAGES.length);
      } while (newIndex === currentIndex); // Ensure we don't show the same message twice in a row
      
      setCurrentIndex(newIndex);
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const currentMessage = LOADING_MESSAGES[currentIndex];

  return (
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 mt-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="animate-bounce text-4xl transition-all duration-500 ease-in-out">
            {currentMessage.icon}
          </div>
          <p className="text-gray-700 font-medium text-lg text-center transition-all duration-500 ease-in-out">
            {currentMessage.message}
          </p>
          <p className="text-gray-500 text-sm italic text-center transition-all duration-500 ease-in-out">
            {currentMessage.subMessage}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingBook; 