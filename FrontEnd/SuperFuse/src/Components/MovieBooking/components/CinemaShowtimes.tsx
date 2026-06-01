import React from 'react';
import type { Cinema } from '../interfaces/Cinema';
import type { Showtime } from '../interfaces/Showtime';
import ShowtimeCard from './ShowtimeCard';

interface CinemaShowtimesProps {
  cinemas: Cinema[];
  selectedShowtimeId: string | null;
  onSelectShowtime: (showtime: Showtime, cinema: Cinema) => void;
}

const CinemaShowtimes: React.FC<CinemaShowtimesProps> = ({ cinemas, selectedShowtimeId, onSelectShowtime }) => {
  return (
    <div className="moviebooking-cinema-list">
      {cinemas.map((cinema) => (
        <div key={cinema.id} className="moviebooking-cinema-card">
          <div
            className="moviebooking-cinema-image"
            style={{ backgroundImage: `url(${cinema.image})` }}
            aria-label={`${cinema.name} hall`}
          />
          <div className="moviebooking-cinema-header">
            <div>
              <h4>{cinema.name}</h4>
              <div className="moviebooking-cinema-meta">
                <span>{cinema.location}</span>
                <span>{cinema.distanceKm.toFixed(1)} km</span>
              </div>
            </div>
            <div className="moviebooking-cinema-amenities">
              {cinema.amenities.map((amenity) => (
                <span key={amenity} className="moviebooking-amenity-pill">{amenity}</span>
              ))}
            </div>
          </div>
          <div className="moviebooking-showtime-list">
            {cinema.showtimes.map((showtime) => (
              <ShowtimeCard
                key={showtime.id}
                showtime={showtime}
                isSelected={showtime.id === selectedShowtimeId}
                onSelect={() => onSelectShowtime(showtime, cinema)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CinemaShowtimes;
