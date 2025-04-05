export const Header = () => {
  return (
    <header className="bg-gradient-to-r from-purple-800 to-indigo-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Project Gutenberg Reader</h1>
            <p className="text-sm sm:text-base mt-1 sm:mt-2 text-purple-200">Explore the world's greatest literature</p>
          </div>
          <nav className="mt-2 sm:mt-0">
            <a 
              href="https://www.gutenberg.org/browse/scores/top"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm sm:text-base text-purple-200 hover:text-white transition-colors"
            >
              Popular Books
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header; 