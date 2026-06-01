import React from 'react';
import type { Showtime } from '../interfaces/Showtime';

interface ShowtimeCardProps {
  showtime: Showtime;
  isSelected: boolean;
  onSelect: (showtime: Showtime) => void;
}

const ShowtimeCard: React.FC<ShowtimeCardProps> = ({ showtime, isSelected, onSelect }) => {
  return (
    <button
      type="button"
      className={`moviebooking-showtime-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(showtime)}
    >
      <div className="moviebooking-showtime-time">{showtime.startsAt}</div>
      <div className="moviebooking-showtime-meta">
        <span>{showtime.format}</span>
        <span>{showtime.screenName}</span>
      </div>
      <div className="moviebooking-showtime-meta">
        <span>Rs {showtime.basePrice}</span>
        <span>{showtime.availableSeats} seats left</span>
      </div>
    </button>
  );
};

export default ShowtimeCard;
