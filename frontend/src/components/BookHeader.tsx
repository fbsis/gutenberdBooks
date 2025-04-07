interface BookHeaderProps {
  title: string;
  authors: string[];
  coverUrl: string;
  year: number;
  genres: string[];
}

export const BookHeader = ({ title, authors, coverUrl, year, genres }: BookHeaderProps) => {
  return (
    <div className="bg-gradient-to-r from-purple-800 to-indigo-800 text-white p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Book Cover */}
        <div className="w-48 h-64 flex-shrink-0">
          <img
            src={coverUrl}
            alt={`Cover of ${title}`}
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Book Info */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">{title}</h1>
          <p className="text-purple-200 mt-2">by {authors.join(", ")}</p>
          <p className="text-purple-200 mt-1">Published in {year}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {genres.map((genre, index) => (
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
  );
}; 