interface Character {
  id: string;
  label: string;
}

interface BookMainCharactersProps {
  mainCharacters: Character[];
}

export const BookMainCharacters = ({ mainCharacters }: BookMainCharactersProps) => {
  return (
    <div className="p-6 border-b">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Main Characters
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {mainCharacters.map((character) => (
          <div key={character.id} className="p-3 bg-gray-50 rounded-lg">
            <p className="font-medium text-gray-800">{character.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}; 