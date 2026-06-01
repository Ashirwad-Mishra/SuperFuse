import type { FoodOrder } from '../interfaces/FoodOrder';
import type { FoodCartItem } from '../interfaces/FoodCartItem';
import type { OrderStatus } from '../enums/OrderStatus';
import { OrderStatus as OrderStatusValues } from '../enums/OrderStatus';

const ORDER_KEY = 'superfood-order';

const STATUS_SEQUENCE: OrderStatus[] = [
  OrderStatusValues.Placed,
  OrderStatusValues.Accepted,
  OrderStatusValues.Preparing,
  OrderStatusValues.RiderAssigned,
  OrderStatusValues.PickedUp,
  OrderStatusValues.OnTheWay,
  OrderStatusValues.Delivered,
];

const STATUS_LABELS: Record<OrderStatus, string> = {
  Placed: 'Order placed',
  Accepted: 'Restaurant accepted order',
  Preparing: 'Food is preparing',
  'Rider Assigned': 'Rider assigned',
  'Picked Up': 'Picked up',
  'On the Way': 'On the way',
  Delivered: 'Delivered',
};

class OrderService {
  private currentOrder: FoodOrder | null = null;
  private listeners: Set<() => void> = new Set();
  private timers: number[] = [];

  constructor() {
    this.restoreOrder();
  }

  private restoreOrder(): void {
    try {
      const stored = localStorage.getItem(ORDER_KEY);
      if (stored) {
        this.currentOrder = JSON.parse(stored) as FoodOrder;
      }
    } catch {
      this.currentOrder = null;
    }
  }

  private persistOrder(): void {
    if (this.currentOrder) {
      localStorage.setItem(ORDER_KEY, JSON.stringify(this.currentOrder));
    } else {
      localStorage.removeItem(ORDER_KEY);
    }
  }

  private notify(): void {
    this.persistOrder();
    this.listeners.forEach((listener) => listener());
  }

  getOrder(): FoodOrder | null {
    return this.currentOrder ? { ...this.currentOrder } : null;
  }

  createOrder(
    restaurantId: string,
    restaurantName: string,
    items: FoodCartItem[],
    address: string,
    paymentMethod: FoodOrder['paymentMethod'],
    deliveryFee: number
  ): void {
    const subtotal = items.reduce((sum, entry) => sum + entry.item.price * entry.quantity, 0);
    const discount = subtotal >= 500 ? 50 : 0;
    const total = subtotal + deliveryFee - discount;
    const placedAt = new Date().toISOString();
    const estimatedDeliveryTime = this.buildEstimatedDeliveryTime(35);
    const statusSteps = STATUS_SEQUENCE.map((status, index) => ({
      status,
      label: STATUS_LABELS[status],
      active: index === 0,
      timestamp: index === 0 ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : undefined,
    }));

    this.currentOrder = {
      orderId: `SF-${Date.now()}`,
      restaurantId,
      restaurantName,
      items,
      address,
      paymentMethod,
      subtotal,
      deliveryFee,
      discount,
      total,
      placedAt,
      estimatedDeliveryTime,
      status: OrderStatusValues.Placed,
      statusSteps,
    };

    this.notify();
    this.scheduleStatusUpdates();
  }

  resetOrder(): void {
    this.clearTimers();
    this.currentOrder = null;
    this.notify();
  }

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private scheduleStatusUpdates(): void {
    this.clearTimers();
    if (!this.currentOrder) {
      return;
    }

    const delays = [3000, 3000, 4000, 3000, 3000, 4000];
    let stepIndex = 1;
    for (const delay of delays) {
      const timer = window.setTimeout(() => {
        this.advanceOrderStatus(stepIndex);
        stepIndex += 1;
      }, delay * stepIndex);
      this.timers.push(timer);
    }
  }

  private clearTimers(): void {
    this.timers.forEach((timer) => window.clearTimeout(timer));
    this.timers = [];
  }

  private advanceOrderStatus(nextStepIndex: number): void {
    if (!this.currentOrder || nextStepIndex >= STATUS_SEQUENCE.length) {
      return;
    }
    const nextStatus = STATUS_SEQUENCE[nextStepIndex];
    this.currentOrder.status = nextStatus;
    this.currentOrder.statusSteps = this.currentOrder.statusSteps.map((step, index) => {
      if (index === nextStepIndex) {
        return {
          ...step,
          active: true,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
      }
      return step;
    });
    this.notify();
  }

  private buildEstimatedDeliveryTime(minutesFromNow: number): string {
    const future = new Date(Date.now() + minutesFromNow * 60000);
    return future.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}

export const orderService = new OrderService();
