import React from 'react';
import type { Flight } from '../interfaces/Flight';
import FlightCard from './FlightCard';

interface FlightResultsProps {
  items: Flight[];
  selectedId?: string;
  onSelect: (flight: Flight) => void;
}

const FlightResults: React.FC<FlightResultsProps> = ({ items, selectedId, onSelect }) => {
  if (!items.length) {
    return <div className="card supertravel-empty">No flights match your search. Try another route or date.</div>;
  }

  return (
    <div className="result-group">
      {items.map((flight) => (
        <FlightCard key={flight.id} flight={flight} selected={selectedId === flight.id} onSelect={onSelect} />
      ))}
    </div>
  );
};

export default FlightResults;
