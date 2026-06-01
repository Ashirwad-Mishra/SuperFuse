import React from 'react';
import type { RestaurantSortKey } from '../services/restaurantService';

interface SortControlProps {
  selectedSort: RestaurantSortKey;
  onSortChange: (value: RestaurantSortKey) => void;
}

const SortControl: React.FC<SortControlProps> = ({ selectedSort, onSortChange }) => {
  return (
    <div className="superfood-filter-block">
      <div className="superfood-filter-title">Sort by</div>
      <select
        className="superfood-filter-select"
        value={selectedSort}
        onChange={(event) => onSortChange(event.target.value as RestaurantSortKey)}
      >
        <option value="recommended">Recommended</option>
        <option value="rating">Rating high to low</option>
        <option value="deliveryTime">Delivery time</option>
        <option value="deliveryFee">Delivery fee</option>
        <option value="distance">Distance</option>
        <option value="minimumOrder">Minimum order</option>
      </select>
    </div>
  );
};

export default SortControl;
