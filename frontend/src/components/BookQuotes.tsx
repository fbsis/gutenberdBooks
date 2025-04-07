interface Quote {
  text: string;
  character: string;
  sentiment: "positive" | "negative" | "neutral";
  chapter: number;
}

interface BookQuotesProps {
  quotes: Quote[];
}

export const BookQuotes = ({ quotes }: BookQuotesProps) => {
  return (
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
        {quotes.map((quote, index) => (
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
  );
}; 