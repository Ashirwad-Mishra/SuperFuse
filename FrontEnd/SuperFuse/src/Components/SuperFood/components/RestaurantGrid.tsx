import React from 'react';
import type { Restaurant } from '../interfaces/Restaurant';
import RestaurantCard from './RestaurantCard';

interface RestaurantGridProps {
  restaurants: Restaurant[];
  onSelectRestaurant: (restaurant: Restaurant) => void;
}

const RestaurantGrid: React.FC<RestaurantGridProps> = ({ restaurants, onSelectRestaurant }) => {
  if (!restaurants.length) {
    return <div className="superfood-empty-state">No restaurants match your search or filter. Try adjusting your keywords.</div>;
  }

  return (
    <div className="superfood-grid">
      {restaurants.map((restaurant) => (
        <RestaurantCard
          key={restaurant.id}
          restaurant={restaurant}
          onSelect={onSelectRestaurant}
        />
      ))}
    </div>
  );
};

export default RestaurantGrid;
