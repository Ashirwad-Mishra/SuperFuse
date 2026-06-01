import React from 'react';
import type { CartItem } from '../interfaces/CartItem';

interface CartDrawerProps {
  isOpen: boolean;
  cartItems: CartItem[];
  cartTotal: number;
  itemCount: number;
  onClose: () => void;
  onRemoveItem: (productId: number) => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onCheckout: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  cartItems,
  cartTotal,
  itemCount,
  onClose,
  onRemoveItem,
  onUpdateQuantity,
  onCheckout,
}) => {
  return (
    <>
      <div
        className={`cart-drawer-overlay ${isOpen ? 'open' : ''}`}
        onClick={onClose}
      />
      <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
        <div className="cart-drawer-header">
          <h2>Shopping Cart</h2>
          <button className="cart-drawer-close-btn" onClick={onClose}>
            Close
          </button>
        </div>

        <div className="cart-drawer-content">
          {cartItems.length === 0 ? (
            <div className="cart-empty-message">
              <p>Your cart is empty</p>
            </div>
          ) : (
            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div key={item.product.id} className="cart-item">
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="cart-item-image"
                  />
                  <div className="cart-item-details">
                    <h4>{item.product.name}</h4>
                    <p>Rs {item.product.price.toFixed(2)}</p>
                  </div>
                  <div className="cart-item-quantity">
                    <button
                      onClick={() =>
                        onUpdateQuantity(item.product.id, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        onUpdateQuantity(item.product.id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="cart-item-remove-btn"
                    onClick={() => onRemoveItem(item.product.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-summary">
              <div className="cart-summary-row">
                <span>Subtotal:</span>
                <span>Rs {cartTotal.toFixed(2)}</span>
              </div>
              <div className="cart-summary-row">
                <span>Items:</span>
                <span>{itemCount}</span>
              </div>
            </div>
            <button className="cart-checkout-btn" onClick={onCheckout}>
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
