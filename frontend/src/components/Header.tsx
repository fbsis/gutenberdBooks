const Header = () => {
  return (
    <header className="bg-gradient-to-r from-purple-800 to-indigo-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Project Gutenberg Reader</h1>
            <p className="mt-2 text-purple-200">Explore the world's greatest literature</p>
          </div>
          <nav className="mt-4 md:mt-0">
            <a 
              href="https://www.gutenberg.org/browse/scores/top"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-200 hover:text-white transition-colors"
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