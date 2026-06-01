import React from 'react';
import type { FoodCartItem } from '../interfaces/FoodCartItem';
import AddressSelector from './AddressSelector';

interface CheckoutPanelProps {
  isOpen: boolean;
  restaurantName: string | null;
  cartItems: FoodCartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  address: string;
  paymentMethod: 'Cash on Delivery' | 'SuperPay' | 'Card';
  onAddressChange: (value: string) => void;
  onPaymentChange: (value: 'Cash on Delivery' | 'SuperPay' | 'Card') => void;
  onClose: () => void;
  onPlaceOrder: () => void;
}

const CheckoutPanel: React.FC<CheckoutPanelProps> = ({
  isOpen,
  restaurantName,
  cartItems,
  subtotal,
  deliveryFee,
  discount,
  total,
  address,
  paymentMethod,
  onAddressChange,
  onPaymentChange,
  onClose,
  onPlaceOrder,
}) => {
  return (
    <div className={`superfood-checkout-panel ${isOpen ? 'open' : ''}`}>
      <div className="superfood-cart-header">
        <div>
          <h3>Checkout</h3>
          <div className="superfood-cart-restaurant">{restaurantName || 'No restaurant selected'}</div>
        </div>
        <button type="button" className="superfood-close-button" onClick={onClose}>
          Close
        </button>
      </div>
      <div className="superfood-checkout-content">
        <AddressSelector address={address} onChange={onAddressChange} />
        <div className="superfood-filter-block">
          <div className="superfood-filter-title">Payment method</div>
          <div className="superfood-payment-options">
            {(['Cash on Delivery', 'SuperPay', 'Card'] as const).map((method) => (
              <label key={method} className="superfood-payment-option">
                <input
                  type="radio"
                  name="payment-method"
                  checked={paymentMethod === method}
                  onChange={() => onPaymentChange(method)}
                />
                {method}
              </label>
            ))}
          </div>
        </div>
        <div className="superfood-order-summary">
          <h4>Order summary</h4>
          <div className="superfood-cart-row">
            <span>Items</span>
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
          <div className="superfood-order-items">
            {cartItems.map(({ item, quantity }) => (
              <div key={item.id} className="superfood-order-item-row">
                <span>{quantity} x {item.name}</span>
                <span>Rs {item.price * quantity}</span>
              </div>
            ))}
          </div>
        </div>
        <button
          type="button"
          className="superfood-button superfood-place-order"
          onClick={onPlaceOrder}
          disabled={!address.trim() || cartItems.length === 0}
        >
          Place order
        </button>
      </div>
    </div>
  );
};

export default CheckoutPanel;
