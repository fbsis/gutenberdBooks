interface BookSummaryProps {
  summary: string;
}

export const BookSummary = ({ summary }: BookSummaryProps) => {
  return (
    <div className="p-6 border-b">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Summary</h2>
      <p className="text-gray-600">{summary}</p>
    </div>
  );
}; 