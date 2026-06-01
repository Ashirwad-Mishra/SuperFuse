import React, { useMemo } from 'react';
import type { Seat } from '../interfaces/Seat';
import { SeatStatus } from '../enums/SeatStatus';

interface SeatMapProps {
  seats: Seat[];
  selectedSeatIds: string[];
  onToggleSeat: (seat: Seat) => void;
  maxSelection: number;
}

const SeatMap: React.FC<SeatMapProps> = ({ seats, selectedSeatIds, onToggleSeat, maxSelection }) => {
  const rows = useMemo(() => {
    return seats.reduce<Record<string, Seat[]>>((map, seat) => {
      if (!map[seat.row]) {
        map[seat.row] = [];
      }
      map[seat.row].push(seat);
      return map;
    }, {});
  }, [seats]);

  return (
    <div className="moviebooking-seat-map-section">
      <div className="moviebooking-seat-map-info">
        <div className="moviebooking-screen-label">SCREEN</div>
      </div>
      <div className="moviebooking-seat-map">
        {Object.entries(rows).map(([row, rowSeats]) => (
          <div key={row} className="moviebooking-seat-row">
            <div className="moviebooking-seat-row-label">{row}</div>
            {rowSeats.map((seat) => {
              const isSelected = selectedSeatIds.includes(seat.id);
              const disabled = seat.status !== SeatStatus.Available && !isSelected;
              return (
                <button
                  key={seat.id}
                  type="button"
                  disabled={disabled}
                  className={`moviebooking-seat ${seat.status} ${isSelected ? 'selected' : ''}`}
                  onClick={() => onToggleSeat(seat)}
                >
                  {seat.number}
                </button>
              );
            })}
          </div>
        ))}
      </div>
      <div className="moviebooking-seat-key">
        <span><span className="moviebooking-seat-key-dot available" /> Available</span>
        <span><span className="moviebooking-seat-key-dot selected" /> Selected</span>
        <span><span className="moviebooking-seat-key-dot booked" /> Booked</span>
        <span><span className="moviebooking-seat-key-dot blocked" /> Blocked</span>
      </div>
      <div className="moviebooking-seat-hint">Selected seats limited to {maxSelection}. Booked and blocked seats cannot be selected.</div>
    </div>
  );
};

export default SeatMap;
