import React from 'react';
import type { Flight } from '../interfaces/Flight';

interface FlightCardProps {
  flight: Flight;
  selected: boolean;
  onSelect: (item: Flight) => void;
}

const FlightCard: React.FC<FlightCardProps> = ({ flight, selected, onSelect }) => {
  const stopText = flight.stops === 0 ? 'Non-stop' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`;
  const departureDate = flight.departureTime;
  const arrivalDate = flight.arrivalTime;
  return (
    <div className="card" style={{ borderColor: selected ? '#4f46e5' : undefined }}>
      <div className="result-grid">
        <img className="result-image" src={flight.airlineImage} alt={flight.airline} />
        <div className="result-meta">
          <div className="result-row" style={{ justifyContent: 'space-between' }}>
            <div>
              <p className="details-value">{flight.airline} · {flight.flightNumber}</p>
              <p className="details-label">{flight.fromAirport} → {flight.toAirport}</p>
            </div>
            <span className="badge">{flight.price ? `₹${flight.price}` : ''}</span>
          </div>
          <div className="result-row" style={{ justifyContent: 'space-between' }}>
            <div>
              <p className="details-value">{departureDate}</p>
              <p className="details-label">Departure</p>
            </div>
            <div>
              <p className="details-value">{arrivalDate}</p>
              <p className="details-label">Arrival</p>
            </div>
            <div>
              <p className="details-value">{Math.floor(flight.durationMinutes / 60)}h {flight.durationMinutes % 60}m</p>
              <p className="details-label">Duration</p>
            </div>
          </div>
          <div className="result-row">
            <span className="badge">{stopText}</span>
            <span className="badge">{flight.cabinClasses.join(', ')}</span>
            <span className="badge">{flight.baggage}</span>
            <span className="badge">{flight.refundable ? 'Refundable' : 'Non-refundable'}</span>
          </div>
          <button className="primary" onClick={() => onSelect(flight)}>
            {selected ? 'Selected' : 'Select'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;
