import React from 'react';
import type { Restaurant } from '../interfaces/Restaurant';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onSelect: (restaurant: Restaurant) => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, onSelect }) => {
  return (
    <button
      type="button"
      className="superfood-restaurant-card"
      onClick={() => onSelect(restaurant)}
    >
      <div className="superfood-restaurant-image" style={{ backgroundImage: `url(${restaurant.image})` }}>
        <span className={`superfood-status ${restaurant.isOpen ? 'open' : 'closed'}`}>
          {restaurant.isOpen ? 'Open' : 'Closed'}
        </span>
      </div>
      <div className="superfood-restaurant-content">
        <div className="superfood-restaurant-name">{restaurant.name}</div>
        <div className="superfood-restaurant-meta">
          <span>{restaurant.cuisineTypes.join(', ')}</span>
          <span>{restaurant.rating.toFixed(1)} star</span>
        </div>
        <div className="superfood-restaurant-details">
          <span>{restaurant.deliveryTimeMin}-{restaurant.deliveryTimeMax} mins</span>
          <span>Rs {restaurant.deliveryFee} delivery</span>
        </div>
        <div className="superfood-restaurant-details">
          <span>Min Rs {restaurant.minimumOrder}</span>
          <span>{restaurant.distanceKm.toFixed(1)} km</span>
        </div>
        <div className="superfood-restaurant-tags">
          {restaurant.tags.map((tag) => (
            <span key={tag} className="superfood-tag">
              {tag}
            </span>
          ))}
        </div>
        {restaurant.offerText ? (
          <div className="superfood-restaurant-offer">{restaurant.offerText}</div>
        ) : null}
      </div>
    </button>
  );
};

export default RestaurantCard;
