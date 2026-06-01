import React from 'react';
import type { FoodOrder } from '../interfaces/FoodOrder';

interface DeliveryTrackerProps {
  order: FoodOrder;
  onClose: () => void;
}

const DeliveryTracker: React.FC<DeliveryTrackerProps> = ({ order, onClose }) => {
  return (
    <div className="superfood-delivery-tracker">
      <div className="superfood-cart-header">
        <div>
          <h3>Delivery tracker</h3>
          <div className="superfood-cart-restaurant">{order.restaurantName}</div>
        </div>
        <button type="button" className="superfood-close-button" onClick={onClose}>
          Close
        </button>
      </div>
      <div className="superfood-tracker-summary">
        <div className="superfood-tracker-row">
          <span>Status</span>
          <strong>{order.status}</strong>
        </div>
        <div className="superfood-tracker-row">
          <span>Estimated delivery</span>
          <strong>{order.estimatedDeliveryTime}</strong>
        </div>
        <div className="superfood-tracker-row">
          <span>Delivery address</span>
          <span>{order.address}</span>
        </div>
        <div className="superfood-tracker-row">
          <span>Order total</span>
          <span>Rs {order.total}</span>
        </div>
      </div>
      <div className="superfood-tracker-steps">
        {order.statusSteps.map((step) => (
          <div key={step.status} className={`superfood-tracker-step ${step.active ? 'active' : ''}`}>
            <div className="superfood-tracker-step-label">{step.label}</div>
            <div className="superfood-tracker-step-time">{step.timestamp || 'Pending'}</div>
          </div>
        ))}
      </div>
      <div className="superfood-order-items">
        <h4>Items in order</h4>
        {order.items.map(({ item, quantity }) => (
          <div key={item.id} className="superfood-order-item-row">
            <span>{quantity} x {item.name}</span>
            <span>Rs {item.price * quantity}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeliveryTracker;
