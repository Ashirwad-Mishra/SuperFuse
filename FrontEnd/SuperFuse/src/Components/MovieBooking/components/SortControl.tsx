import React from 'react';
import type { MovieSortKey } from '../services/movieService';

interface SortControlProps {
  selectedSort: MovieSortKey;
  onSortChange: (value: MovieSortKey) => void;
}

const SortControl: React.FC<SortControlProps> = ({ selectedSort, onSortChange }) => {
  return (
    <div className="moviebooking-filter-block">
      <label htmlFor="movie-sort" className="moviebooking-filter-title">Sort by</label>
      <select
        id="movie-sort"
        value={selectedSort}
        onChange={(event) => onSortChange(event.target.value as MovieSortKey)}
        className="moviebooking-filter-select"
      >
        <option value="recommended">Recommended</option>
        <option value="rating">Rating high to low</option>
        <option value="title">Title A-Z</option>
        <option value="newest">Newest release</option>
        <option value="duration">Duration</option>
        <option value="price">Lowest ticket price</option>
      </select>
    </div>
  );
};

export default SortControl;
