export const OrderStatus = {
  Placed: 'Placed',
  Accepted: 'Accepted',
  Preparing: 'Preparing',
  RiderAssigned: 'Rider Assigned',
  PickedUp: 'Picked Up',
  OnTheWay: 'On the Way',
  Delivered: 'Delivered',
} as const;

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];

export const OrderStatuses: OrderStatus[] = Object.values(OrderStatus);
