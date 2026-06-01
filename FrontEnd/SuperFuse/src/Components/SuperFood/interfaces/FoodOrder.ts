import type { FoodCartItem } from './FoodCartItem';
import type { OrderStatus } from '../enums/OrderStatus';
import type { DeliveryStatus } from './DeliveryStatus';

export interface FoodOrder {
  orderId: string;
  restaurantId: string;
  restaurantName: string;
  items: FoodCartItem[];
  address: string;
  paymentMethod: 'Cash on Delivery' | 'SuperPay' | 'Card';
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  placedAt: string;
  estimatedDeliveryTime: string;
  status: OrderStatus;
  statusSteps: DeliveryStatus[];
}
