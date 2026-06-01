import type { OrderStatus } from '../enums/OrderStatus';

export interface DeliveryStatus {
  status: OrderStatus;
  label: string;
  active: boolean;
  timestamp?: string;
}
