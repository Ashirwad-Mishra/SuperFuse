import React from 'react';
import type { Train } from '../interfaces/Train';
import TrainCard from './TrainCard';

interface TrainResultsProps {
  items: Train[];
  selectedId?: string;
  onSelect: (item: Train) => void;
}

const TrainResults: React.FC<TrainResultsProps> = ({ items, selectedId, onSelect }) => {
  if (!items.length) {
    return <div className="card supertravel-empty">No trains found for this route. Change the date or route and try again.</div>;
  }

  return (
    <div className="result-group">
      {items.map((train) => (
        <TrainCard key={train.id} train={train} selected={selectedId === train.id} onSelect={onSelect} />
      ))}
    </div>
  );
};

export default TrainResults;
