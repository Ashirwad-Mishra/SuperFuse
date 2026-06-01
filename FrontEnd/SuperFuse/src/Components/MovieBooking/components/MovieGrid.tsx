import React from 'react';
import type { Movie } from '../interfaces/Movie';
import MovieCard from './MovieCard';

interface MovieGridProps {
  movies: Movie[];
  onSelectMovie: (movie: Movie) => void;
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies, onSelectMovie }) => {
  if (!movies.length) {
    return <div className="moviebooking-empty-state">No movies match your search or filters.</div>;
  }

  return (
    <div className="moviebooking-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onSelect={onSelectMovie} />
      ))}
    </div>
  );
};

export default MovieGrid;
