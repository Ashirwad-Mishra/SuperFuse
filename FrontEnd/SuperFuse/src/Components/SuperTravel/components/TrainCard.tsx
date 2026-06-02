import React from 'react';
import type { Train } from '../interfaces/Train';

interface TrainCardProps {
  train: Train;
  selected: boolean;
  onSelect: (item: Train) => void;
}

const TrainCard: React.FC<TrainCardProps> = ({ train, selected, onSelect }) => {
  return (
    <div className="card" style={{ borderColor: selected ? '#4f46e5' : undefined }}>
      <div className="result-grid">
        <img className="result-image" src={train.trainImage} alt={train.trainName} />
        <div className="result-meta">
          <div className="result-row" style={{ justifyContent: 'space-between' }}>
            <div>
              <p className="details-value">{train.trainName}</p>
              <p className="details-label">Train {train.trainNumber}</p>
            </div>
            <span className="badge">₹{train.price}</span>
          </div>
          <div className="result-row" style={{ justifyContent: 'space-between' }}>
            <div>
              <p className="details-value">{train.departureTime}</p>
              <p className="details-label">{train.fromStation}</p>
            </div>
            <div>
              <p className="details-value">{train.arrivalTime}</p>
              <p className="details-label">{train.toStation}</p>
            </div>
            <div>
              <p className="details-value">{Math.floor(train.durationMinutes / 60)}h {train.durationMinutes % 60}m</p>
              <p className="details-label">Duration</p>
            </div>
          </div>
          <div className="result-row">
            <span className="badge">{train.trainType}</span>
            <span className="badge">Classes: {train.classes.join(', ')}</span>
            <span className="badge">{train.availability} seats</span>
          </div>
          <button className="primary" onClick={() => onSelect(train)}>
            {selected ? 'Selected' : 'Select'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrainCard;
