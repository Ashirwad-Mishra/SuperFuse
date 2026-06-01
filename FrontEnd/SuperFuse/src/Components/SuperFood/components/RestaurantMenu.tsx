import React, { useMemo } from 'react';
import type { Restaurant } from '../interfaces/Restaurant';
import type { FoodCartItem } from '../interfaces/FoodCartItem';
import type { MenuItem } from '../interfaces/MenuItem';
import MenuItemCard from './MenuItemCard';

interface RestaurantMenuProps {
  restaurant: Restaurant;
  cartItems: FoodCartItem[];
  onBack: () => void;
  onAddItem: (item: Restaurant['menu'][number]) => void;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onClearCart: () => void;
}

const RestaurantMenu: React.FC<RestaurantMenuProps> = ({
  restaurant,
  cartItems,
  onBack,
  onAddItem,
  onUpdateQuantity,
  onClearCart,
}) => {
  const itemsByCategory = useMemo(() => {
    return restaurant.menu.reduce<Record<string, MenuItem[]>>((groups, item) => {
      const category = item.category || 'Other';
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(item);
      return groups;
    }, {});
  }, [restaurant.menu]);

  const currentCartMap = useMemo(() => {
    return cartItems.reduce<Record<string, number>>((map, cartItem) => {
      map[cartItem.item.id] = cartItem.quantity;
      return map;
    }, {});
  }, [cartItems]);

  return (
    <div className="superfood-restaurant-menu">
      <button type="button" className="superfood-back-button" onClick={onBack}>
        Back to restaurants
      </button>
      <div className="superfood-restaurant-header">
        <div>
          <h2>{restaurant.name}</h2>
          <p className="superfood-restaurant-description">{restaurant.description}</p>
          <div className="superfood-restaurant-detail-row">
            <span>{restaurant.cuisineTypes.join(', ')}</span>
            <span>{restaurant.rating.toFixed(1)} star</span>
            <span>Rs {restaurant.deliveryFee} delivery</span>
            <span>{restaurant.isOpen ? 'Open' : 'Closed'}</span>
          </div>
          <div className="superfood-restaurant-tags">
            {restaurant.tags.map((tag) => (
              <span key={tag} className="superfood-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="superfood-restaurant-summary">
          <div>Min order Rs {restaurant.minimumOrder}</div>
          <div>{restaurant.deliveryTimeMin}-{restaurant.deliveryTimeMax} mins</div>
        </div>
      </div>
      {Object.entries(itemsByCategory).map(([category, items]) => (
        <section key={category} className="superfood-menu-section">
          <h3>{category}</h3>
          <div className="superfood-menu-list">
            {items.map((item) => (
              <MenuItemCard
                key={item.id}
                item={item}
                quantity={currentCartMap[item.id] ?? 0}
                onAdd={() => onAddItem(item)}
                onQuantityChange={(value) => onUpdateQuantity(item.id, value)}
              />
            ))}
          </div>
        </section>
      ))}
      <div className="superfood-menu-footer">
        <button type="button" className="superfood-clear-cart" onClick={onClearCart}>
          Clear cart and restart selection
        </button>
      </div>
    </div>
  );
};

export default RestaurantMenu;
