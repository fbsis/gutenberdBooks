import { FC, useMemo } from 'react';

interface Character {
  label: string;
}

interface Relation {
  source: string;
  target: string;
}

interface CharacterNetworkProps {
  characters: Character[];
  relations: Relation[];
}

// Constants for graph visualization
const GRAPH_CONFIG = {
  // SVG dimensions
  width: 600,
  height: 350,
  
  // Character node dimensions
  nodeWidth: 100,
  nodeHeight: 30,
  nodeFontSize: 12,
  nodeCornerRadius: 4,
  
  // Graph layout
  centerX: 300,
  centerY: 150,
  radius: 150,
  
  // Visual styles
  backgroundColor: '#1F2937',
  nodeStrokeColor: 'white',
  nodeStrokeWidth: 1,
  edgeColor: 'white',
  edgeOpacity: 0.3,
  edgeWidth: 1,
} as const;

export const CharacterNetwork: FC<CharacterNetworkProps> = ({ characters, relations }) => {
  const relationsByCharacter = characters.map(char => {
    const characterRelations = relations.filter(
      rel => rel.source === char.label || rel.target === char.label
    ).map(rel => {
      const relatedChar = characters.find(c => 
        c.label === (rel.source === char.label ? rel.target : rel.source)
      );
      return relatedChar?.label || '';
    });

    return {
      character: char.label,
      relations: [...new Set(characterRelations)] // Remove duplicates
    };
  });

  // Filter characters that have relationships
  const charactersWithRelations = characters.filter(char => 
    relations.some(rel => rel.source === char.label || rel.target === char.label)
  );

  // Calculate positions only for characters with relationships
  const charactersWithPositions = useMemo(() => {
    return charactersWithRelations.map((char, index) => {
      // Calculate angle for even distribution (in radians)
      const angle = (index / charactersWithRelations.length) * 2 * Math.PI;
      
      // Convert polar coordinates to cartesian coordinates
      return {
        ...char,
        x: GRAPH_CONFIG.centerX + GRAPH_CONFIG.radius * Math.cos(angle),
        y: GRAPH_CONFIG.centerY + GRAPH_CONFIG.radius * Math.sin(angle)
      };
    });
  }, [charactersWithRelations]);

  // If there are no relationships, don't render anything
  if (relations.length === 0) {
    return null;
  }

  return (
    <div className="p-6 border-b">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Character Relationships</h2>
      
      {/* SVG Graph */}
      <div className="bg-gray-900 rounded-lg overflow-hidden p-4 mb-8">
        <svg 
          width={GRAPH_CONFIG.width} 
          height={GRAPH_CONFIG.height} 
          className="mx-auto"
        >
          {/* Relationship edges */}
          {relations.map((relation, index) => {
            const source = charactersWithPositions.find(c => c.label === relation.source);
            const target = charactersWithPositions.find(c => c.label === relation.target);
            if (!source || !target) return null;
            
            return (
              <line
                key={index}
                x1={source.x + GRAPH_CONFIG.nodeWidth/2}
                y1={source.y + GRAPH_CONFIG.nodeHeight/2}
                x2={target.x + GRAPH_CONFIG.nodeWidth/2}
                y2={target.y + GRAPH_CONFIG.nodeHeight/2}
                stroke={GRAPH_CONFIG.edgeColor}
                strokeWidth={GRAPH_CONFIG.edgeWidth}
                opacity={GRAPH_CONFIG.edgeOpacity}
              />
            );
          })}

          {/* Character nodes */}
          {charactersWithPositions.map((char) => (
            <g key={char.label}>
              <rect
                x={char.x}
                y={char.y}
                width={GRAPH_CONFIG.nodeWidth}
                height={GRAPH_CONFIG.nodeHeight}
                fill={GRAPH_CONFIG.backgroundColor}
                stroke={GRAPH_CONFIG.nodeStrokeColor}
                strokeWidth={GRAPH_CONFIG.nodeStrokeWidth}
                rx={GRAPH_CONFIG.nodeCornerRadius}
              />
              <text
                x={char.x + GRAPH_CONFIG.nodeWidth/2}
                y={char.y + GRAPH_CONFIG.nodeHeight/2 + 5}
                textAnchor="middle"
                fill={GRAPH_CONFIG.nodeStrokeColor}
                fontSize={GRAPH_CONFIG.nodeFontSize}
                className="font-medium"
              >
                {char.label}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Relationships Table */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Detailed Relationships</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Character
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Related Characters
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {relationsByCharacter
                .filter(item => item.relations.length > 0)
                .map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.character}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="flex flex-wrap gap-2">
                      {item.relations
                        .filter(relation => relation && relation.trim() !== '')
                        .map((relation, idx) => (
                          <span 
                            key={idx}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {relation}
                          </span>
                        ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="mt-4 text-sm text-gray-600">
        The diagram above shows the character network visually, while the table provides a detailed breakdown of each character's relationships.
      </p>
    </div>
  );
};

export default CharacterNetwork; 