import type { CartItem } from '../interfaces/CartItem';
import type { Product } from '../interfaces/Product';

/**
 * Cart Service - Handles cart state and operations
 */

class CartServiceClass {
  private cart: CartItem[] = [];
  private listeners: Set<() => void> = new Set();

  /**
   * Add product to cart
   */
  addToCart(product: Product, quantity: number = 1): void {
    const existingItem = this.cart.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cart.push({
        product,
        quantity,
        addedAt: new Date(),
      });
    }

    this.notifyListeners();
  }

  /**
   * Remove product from cart
   */
  removeFromCart(productId: number): void {
    this.cart = this.cart.filter(item => item.product.id !== productId);
    this.notifyListeners();
  }

  /**
   * Update quantity
   */
  updateQuantity(productId: number, quantity: number): void {
    const item = this.cart.find(item => item.product.id === productId);
    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        item.quantity = quantity;
        this.notifyListeners();
      }
    }
  }

  /**
   * Get all cart items
   */
  getCart(): CartItem[] {
    return this.cart;
  }

  /**
   * Get cart total price
   */
  getCartTotal(): number {
    return this.cart.reduce((total, item) => {
      const itemPrice = item.product.price;
      const discount = item.product.discount ?? 0;
      const priceAfterDiscount = itemPrice * (1 - discount / 100);
      return total + priceAfterDiscount * item.quantity;
    }, 0);
  }

  /**
   * Get cart item count
   */
  getCartItemCount(): number {
    return this.cart.reduce((count, item) => count + item.quantity, 0);
  }

  /**
   * Clear cart
   */
  clearCart(): void {
    this.cart = [];
    this.notifyListeners();
  }

  /**
   * Check if product is in cart
   */
  isInCart(productId: number): boolean {
    return this.cart.some(item => item.product.id === productId);
  }

  /**
   * Subscribe to cart changes
   */
  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  /**
   * Notify all listeners of cart changes
   */
  private notifyListeners(): void {
    this.listeners.forEach(listener => listener());
  }
}

export const cartService = new CartServiceClass();
