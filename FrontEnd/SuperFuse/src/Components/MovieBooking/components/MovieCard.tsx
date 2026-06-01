import React from 'react';
import type { Movie } from '../interfaces/Movie';

interface MovieCardProps {
  movie: Movie;
  isActive?: boolean;
  onSelect: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, isActive = false, onSelect }) => {
  return (
    <button
      type="button"
      className={`moviebooking-movie-card ${isActive ? 'active' : ''}`}
      onClick={() => onSelect(movie)}
    >
      <div className="moviebooking-movie-poster" style={{ backgroundImage: `url(${movie.poster})` }}>
        <span className={`moviebooking-badge ${movie.isNowShowing ? 'now' : 'soon'}`}>
          {movie.isNowShowing ? 'Now Showing' : 'Coming Soon'}
        </span>
      </div>
      <div className="moviebooking-movie-card-body">
        <h3>{movie.title}</h3>
        <div className="moviebooking-movie-meta">
          <span>{movie.genres[0]}</span>
          <span>{movie.languages.join(', ')}</span>
        </div>
        <div className="moviebooking-movie-card-details">
          <span>{movie.durationMinutes} mins</span>
          <span>{movie.certificate}</span>
          <span>{movie.rating.toFixed(1)} star</span>
        </div>
        <div className="moviebooking-formats">
          {movie.formats.map((format) => (
            <span key={format} className="moviebooking-format-pill">{format}</span>
          ))}
        </div>
      </div>
    </button>
  );
};

export default MovieCard;
