import React from 'react';
import type { Bus } from '../interfaces/Bus';
import BusCard from './BusCard';

interface BusResultsProps {
  items: Bus[];
  selectedId?: string;
  onSelect: (item: Bus) => void;
}

const BusResults: React.FC<BusResultsProps> = ({ items, selectedId, onSelect }) => {
  if (!items.length) {
    return <div className="card supertravel-empty">No buses match that search yet. Try another route or date.</div>;
  }

  return (
    <div className="result-group">
      {items.map((bus) => (
        <BusCard key={bus.id} bus={bus} selected={selectedId === bus.id} onSelect={onSelect} />
      ))}
    </div>
  );
};

export default BusResults;
