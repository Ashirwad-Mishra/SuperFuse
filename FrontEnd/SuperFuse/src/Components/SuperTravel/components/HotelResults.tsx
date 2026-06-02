import React from 'react';
import type { Hotel } from '../interfaces/Hotel';
import HotelCard from './HotelCard';

interface HotelResultsProps {
  items: Hotel[];
  selectedId?: string;
  onSelect: (item: Hotel) => void;
}

const HotelResults: React.FC<HotelResultsProps> = ({ items, selectedId, onSelect }) => {
  if (!items.length) {
    return <div className="card supertravel-empty">No hotels were found for that destination. Try a different city or date range.</div>;
  }

  return (
    <div className="result-group">
      {items.map((hotel) => (
        <HotelCard key={hotel.id} hotel={hotel} selected={selectedId === hotel.id} onSelect={onSelect} />
      ))}
    </div>
  );
};

export default HotelResults;
