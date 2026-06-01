import React from 'react';
import type { FoodCartItem } from '../interfaces/FoodCartItem';

interface FoodCartDrawerProps {
  isOpen: boolean;
  cartItems: FoodCartItem[];
  restaurantName: string | null;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  itemCount: number;
  onClose: () => void;
  onRemoveItem: (itemId: string) => void;
  onQuantityChange: (itemId: string, quantity: number) => void;
  onCheckout: () => void;
  onClearCart: () => void;
}

const FoodCartDrawer: React.FC<FoodCartDrawerProps> = ({
  isOpen,
  cartItems,
  restaurantName,
  subtotal,
  deliveryFee,
  discount,
  total,
  itemCount,
  onClose,
  onRemoveItem,
  onQuantityChange,
  onCheckout,
  onClearCart,
}) => {
  return (
    <div className={`superfood-cart-drawer ${isOpen ? 'open' : ''}`}>
      <div className="superfood-cart-header">
        <div>
          <h3>Your cart</h3>
          <div className="superfood-cart-restaurant">{restaurantName || 'No restaurant selected'}</div>
        </div>
        <button type="button" className="superfood-close-button" onClick={onClose}>
          Close
        </button>
      </div>
      {cartItems.length === 0 ? (
        <div className="superfood-empty-state">Your cart is empty. Add an item to get started.</div>
      ) : (
        <>
          <div className="superfood-cart-items">
            {cartItems.map(({ item, quantity }) => (
              <div key={item.id} className="superfood-cart-item">
                <div>
                  <div className="superfood-cart-item-title">{item.name}</div>
                  <div className="superfood-cart-item-meta">
                    <span>Rs {item.price}</span>
                    <span>{item.isVeg ? 'Veg' : 'Non-veg'}</span>
                  </div>
                </div>
                <div className="superfood-cart-item-controls">
                  <button type="button" onClick={() => onQuantityChange(item.id, quantity - 1)}>-</button>
                  <span>{quantity}</span>
                  <button type="button" onClick={() => onQuantityChange(item.id, quantity + 1)}>+</button>
                </div>
                <button type="button" className="superfood-cart-remove" onClick={() => onRemoveItem(item.id)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="superfood-cart-summary">
            <div className="superfood-cart-row">
              <span>Items ({itemCount})</span>
              <span>Rs {subtotal}</span>
            </div>
            <div className="superfood-cart-row">
              <span>Delivery fee</span>
              <span>Rs {deliveryFee}</span>
            </div>
            <div className="superfood-cart-row">
              <span>Discount</span>
              <span>-Rs {discount}</span>
            </div>
            <div className="superfood-cart-total">
              <span>Total</span>
              <span>Rs {total}</span>
            </div>
          </div>
          <button type="button" className="superfood-button superfood-checkout-button" onClick={onCheckout}>
            Checkout
          </button>
          <button type="button" className="superfood-clear-cart-link" onClick={onClearCart}>
            Clear cart
          </button>
        </>
      )}
    </div>
  );
};

export default FoodCartDrawer;
