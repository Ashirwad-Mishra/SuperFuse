import React from 'react';
import type { Movie } from '../interfaces/Movie';

interface MovieDetailsProps {
  movie: Movie;
  onBack: () => void;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie, onBack }) => {
  return (
    <div className="moviebooking-movie-details">
      <button type="button" className="moviebooking-back-button" onClick={onBack}>
        Back to movies
      </button>

      <div className="moviebooking-details-main">
        <div className="moviebooking-details-poster" style={{ backgroundImage: `url(${movie.poster})` }} />
        <div className="moviebooking-details-info">
          <div className="moviebooking-title-row">
            <h2>{movie.title}</h2>
            <span className={`moviebooking-badge moviebooking-details-badge ${movie.isNowShowing ? 'now' : 'soon'}`}>
              {movie.isNowShowing ? 'Now Showing' : 'Coming Soon'}
            </span>
          </div>
          <div className="moviebooking-movie-meta moviebooking-details-meta">
            <span>{movie.genres.join(', ')}</span>
            <span>{movie.languages.join(', ')}</span>
            <span>{movie.certificate}</span>
            <span>{movie.durationMinutes} mins</span>
            <span>{movie.rating.toFixed(1)} star</span>
          </div>
          <p className="moviebooking-description">{movie.description}</p>
          <div className="moviebooking-details-chip-row">
            <div><strong>Director:</strong> {movie.director}</div>
            <div><strong>Cast:</strong> {movie.cast.join(', ')}</div>
          </div>
          <div className="moviebooking-formats">
            {movie.formats.map((format) => (
              <span key={format} className="moviebooking-format-pill">{format}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
