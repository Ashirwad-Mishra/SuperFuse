import React from 'react';
import type { Bus } from '../interfaces/Bus';

interface BusCardProps {
  bus: Bus;
  selected: boolean;
  onSelect: (item: Bus) => void;
}

const BusCard: React.FC<BusCardProps> = ({ bus, selected, onSelect }) => {
  return (
    <div className="card" style={{ borderColor: selected ? '#4f46e5' : undefined }}>
      <div className="result-grid">
        <img className="result-image" src={bus.busImage} alt={bus.operatorName} />
        <div className="result-meta">
          <div className="result-row" style={{ justifyContent: 'space-between' }}>
            <div>
              <p className="details-value">{bus.operatorName}</p>
              <p className="details-label">{bus.busType}</p>
            </div>
            <span className="badge">₹{bus.price}</span>
          </div>
          <div className="result-row" style={{ justifyContent: 'space-between' }}>
            <div>
              <p className="details-value">{bus.departureTime}</p>
              <p className="details-label">{bus.pickupPoint}</p>
            </div>
            <div>
              <p className="details-value">{bus.arrivalTime}</p>
              <p className="details-label">{bus.dropPoint}</p>
            </div>
            <div>
              <p className="details-value">{Math.floor(bus.durationMinutes / 60)}h {bus.durationMinutes % 60}m</p>
              <p className="details-label">Duration</p>
            </div>
          </div>
          <div className="result-row">
            <span className="badge">Rating {bus.rating}</span>
            <span className="badge">{bus.availableSeats} seats left</span>
          </div>
          <div className="result-row" style={{ flexWrap: 'wrap' }}>
            {bus.amenities.map((amenity) => (
              <span key={amenity} className="badge">{amenity}</span>
            ))}
          </div>
          <button className="primary" onClick={() => onSelect(bus)}>
            {selected ? 'Selected' : 'Select'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusCard;
