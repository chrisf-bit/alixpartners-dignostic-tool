import React from 'react';

interface Props {
  label: string;
  score: number;
  level: string;
}

const getColor = (level: string) => {
  if (level === 'Strength') return 'bg-green-500';
  if (level === 'Developing') return 'bg-yellow-400';
  return 'bg-red-500';
};

const CompetencyBar: React.FC<Props> = ({ label, score, level }) => (
  <div className="mb-2">
    <div className="flex justify-between mb-1">
      <span className="font-semibold">{label}</span>
      <span>{score}% ({level})</span>
    </div>
    <div className="w-full h-4 bg-gray-200 rounded">
      <div
        className={`h-4 rounded ${getColor(level)}`}
        style={{ width: `${score}%` }}
      />
    </div>
  </div>
);

export default CompetencyBar;
