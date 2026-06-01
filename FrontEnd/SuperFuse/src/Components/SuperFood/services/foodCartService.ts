import type { MenuItem } from '../interfaces/MenuItem';
import type { FoodCartItem } from '../interfaces/FoodCartItem';

const CART_KEY = 'superfood-cart';

type AddItemResult = {
  success: boolean;
  conflict: boolean;
  message?: string;
};

class FoodCartService {
  private cart: FoodCartItem[] = [];
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.loadCart();
  }

  private loadCart(): void {
    try {
      const stored = localStorage.getItem(CART_KEY);
      if (stored) {
        this.cart = JSON.parse(stored) as FoodCartItem[];
      }
    } catch {
      this.cart = [];
    }
  }

  private saveCart(): void {
    localStorage.setItem(CART_KEY, JSON.stringify(this.cart));
  }

  private notify(): void {
    this.saveCart();
    this.listeners.forEach((listener) => listener());
  }

  getCart(): FoodCartItem[] {
    return [...this.cart];
  }

  getCartRestaurantId(): string | null {
    return this.cart.length ? this.cart[0].item.restaurantId : null;
  }

  getCartItemCount(): number {
    return this.cart.reduce((count, entry) => count + entry.quantity, 0);
  }

  getSubtotal(): number {
    return this.cart.reduce((sum, entry) => sum + entry.item.price * entry.quantity, 0);
  }

  addItem(item: MenuItem, quantity = 1): AddItemResult {
    const currentRestaurantId = this.getCartRestaurantId();
    if (currentRestaurantId && currentRestaurantId !== item.restaurantId) {
      return {
        success: false,
        conflict: true,
        message: 'Your cart already has items from another restaurant.',
      };
    }

    const existing = this.cart.find((entry) => entry.item.id === item.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.cart.push({ item, quantity });
    }
    this.notify();
    return { success: true, conflict: false };
  }

  updateQuantity(itemId: string, quantity: number): void {
    const existing = this.cart.find((entry) => entry.item.id === itemId);
    if (!existing) {
      return;
    }
    if (quantity <= 0) {
      this.cart = this.cart.filter((entry) => entry.item.id !== itemId);
    } else {
      existing.quantity = quantity;
    }
    this.notify();
  }

  removeItem(itemId: string): void {
    this.cart = this.cart.filter((entry) => entry.item.id !== itemId);
    this.notify();
  }

  clearCart(): void {
    this.cart = [];
    this.notify();
  }

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
}

export const foodCartService = new FoodCartService();
