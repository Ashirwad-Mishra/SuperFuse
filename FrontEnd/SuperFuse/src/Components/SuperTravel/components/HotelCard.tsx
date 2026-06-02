import React from 'react';
import type { Hotel } from '../interfaces/Hotel';

interface HotelCardProps {
  hotel: Hotel;
  selected: boolean;
  onSelect: (item: Hotel) => void;
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel, selected, onSelect }) => {
  return (
    <div className="card" style={{ borderColor: selected ? '#4f46e5' : undefined }}>
      <div className="result-grid">
        <img className="result-image" src={hotel.image} alt={hotel.name} />
        <div className="result-meta">
          <div className="result-row" style={{ justifyContent: 'space-between' }}>
            <div>
              <p className="details-value">{hotel.name}</p>
              <p className="details-label">{hotel.location} · {hotel.destination}</p>
            </div>
            <span className="badge">₹{hotel.pricePerNight} / night</span>
          </div>
          <div className="result-row" style={{ justifyContent: 'space-between' }}>
            <span className="badge">{hotel.starRating}★</span>
            <span className="badge">Guest rating {hotel.guestRating}</span>
            <span className="badge">{hotel.distanceFromCenterKm} km from center</span>
          </div>
          <div className="result-row" style={{ flexWrap: 'wrap' }}>
            {hotel.amenities.map((amenity) => (
              <span key={amenity} className="badge">{amenity}</span>
            ))}
          </div>
          <div className="result-row" style={{ justifyContent: 'space-between', marginTop: 10 }}>
            <span className="details-label">{hotel.cancellationPolicy}</span>
            <button className="primary" onClick={() => onSelect(hotel)}>
              {selected ? 'Selected' : 'Select'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
