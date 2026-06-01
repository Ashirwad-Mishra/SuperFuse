import React from 'react';
import type { MenuItem } from '../interfaces/MenuItem';

interface MenuItemCardProps {
  item: MenuItem;
  quantity: number;
  onAdd: () => void;
  onQuantityChange: (value: number) => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, quantity, onAdd, onQuantityChange }) => {
  const imageUrl =
    item.image ||
    `https://source.unsplash.com/320x240/?${encodeURIComponent(`${item.name} food`)}`;

  return (
    <div className="superfood-menu-item-card">
      <div
        className="superfood-menu-item-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
        aria-label={item.name}
      />
      <div className="superfood-menu-item-details">
        <div className="superfood-menu-item-title">
          <span className={`superfood-dot ${item.isVeg ? 'veg' : 'nonveg'}`} />
          <div>
            <div>{item.name}</div>
            <div className="superfood-menu-item-meta">
              <span>{item.category}</span>
              <span>Rs {item.price}</span>
              <span>{item.rating.toFixed(1)} star</span>
            </div>
          </div>
        </div>
        <div className="superfood-menu-item-description">{item.description}</div>
      </div>
      <div className="superfood-menu-item-actions">
        {item.isAvailable ? (
          quantity > 0 ? (
            <div className="superfood-quantity-stepper">
              <button type="button" onClick={() => onQuantityChange(quantity - 1)}>-</button>
              <span>{quantity}</span>
              <button type="button" onClick={() => onQuantityChange(quantity + 1)}>+</button>
            </div>
          ) : (
            <button type="button" className="superfood-button" onClick={onAdd}>
              Add
            </button>
          )
        ) : (
          <div className="superfood-unavailable">Unavailable</div>
        )}
      </div>
    </div>
  );
};

export default MenuItemCard;
