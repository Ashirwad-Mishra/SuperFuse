import React from 'react';

interface MovieSearchBarProps {
  query: string;
  onSearch: (value: string) => void;
}

const MovieSearchBar: React.FC<MovieSearchBarProps> = ({ query, onSearch }) => {
  return (
    <div className="moviebooking-search-bar">
      <input
        type="search"
        value={query}
        onChange={(event) => onSearch(event.target.value)}
        placeholder="Search movies, genres, languages, cast, cinemas"
        className="moviebooking-search-input"
        aria-label="Search movies"
      />
    </div>
  );
};

export default MovieSearchBar;
