import React from 'react';
import type { SortKey } from '../services/travelService';

interface TravelSortControlProps {
  sortKey: SortKey;
  onSortChange: (sort: SortKey) => void;
}

const TravelSortControl: React.FC<TravelSortControlProps> = ({ sortKey, onSortChange }) => {
  return (
    <div className="card card-compact" style={{ minWidth: 220 }}>
      <div className="input-group">
        <label>Sort by</label>
        <select value={sortKey} onChange={(event) => onSortChange(event.target.value as SortKey)}>
          <option value="recommended">Recommended</option>
          <option value="cheapest">Cheapest</option>
          <option value="fastest">Fastest</option>
          <option value="earliest">Earliest departure</option>
          <option value="latest">Latest departure</option>
          <option value="bestAvailability">Best availability</option>
          <option value="rating">Rating high to low</option>
          <option value="distance">Distance</option>
          <option value="starRating">Star rating</option>
        </select>
      </div>
    </div>
  );
};

export default TravelSortControl;
