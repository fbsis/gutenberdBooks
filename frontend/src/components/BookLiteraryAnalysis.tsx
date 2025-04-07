interface BookLiteraryAnalysisProps {
  centralTheme: string;
  centralConflict: string;
  location: string;
  enviromentofSetting: string;
  historicalContext: string;
  styleofWriting: string;
  narrativePointofView: string;
  moralofStory: string;
  conclusion: string;
  summaryWithSpoilersAndEnding: string;
}

export const BookLiteraryAnalysis = ({
  centralTheme,
  centralConflict,
  location,
  enviromentofSetting,
  historicalContext,
  styleofWriting,
  narrativePointofView,
  moralofStory,
  conclusion,
  summaryWithSpoilersAndEnding,
}: BookLiteraryAnalysisProps) => {
  return (
    <div className="p-6 border-b">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Literary Analysis
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-gray-800">Central Theme</h3>
            <p className="text-gray-600">{centralTheme}</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-800">Central Conflict</h3>
            <p className="text-gray-600">{centralConflict}</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-800">Setting</h3>
            <p className="text-gray-600">{location}</p>
            <p className="text-gray-600 mt-1">{enviromentofSetting}</p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-gray-800">Historical Context</h3>
            <p className="text-gray-600">{historicalContext}</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-800">Writing Style</h3>
            <p className="text-gray-600">{styleofWriting}</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-800">Point of View</h3>
            <p className="text-gray-600">{narrativePointofView}</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-800">Moral of the Story</h3>
            <p className="text-gray-600">{moralofStory}</p>
          </div>
        </div>
      </div>
      <div>
        <h3 className="font-medium text-gray-800">Conclusion</h3>
        <p className="text-gray-600">{conclusion}</p>
      </div>
      <div>
        <h3 className="font-medium text-gray-800 mt-4">Summary with Spoilers and Ending</h3>
        <p className="text-gray-600">{summaryWithSpoilersAndEnding}</p>
      </div>
    </div>
  );
}; 