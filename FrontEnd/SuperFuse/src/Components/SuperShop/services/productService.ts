import type { Product } from '../interfaces/Product';
import { products } from '../data/products';

/**
 * Product Service - Handles product-related business logic
 */

export const productService = {
  /**
   * Get all products
   */
  getAllProducts(): Product[] {
    return products;
  },

  /**
   * Get product by ID
   */
  getProductById(id: number): Product | undefined {
    return products.find(product => product.id === id);
  },

  /**
   * Search products by name or description
   */
  searchProducts(query: string): Product[] {
    const lowerQuery = query.toLowerCase();
    return products.filter(product =>
      product.name.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery)
    );
  },

  /**
   * Get products by category
   */
  getProductsByCategory(category: string): Product[] {
    return products.filter(product => product.category === category);
  },

  /**
   * Get unique categories
   */
  getCategories(): string[] {
    const categories = new Set(products.map(p => p.category));
    return Array.from(categories).sort();
  },

  /**
   * Filter products by price range
   */
  filterByPrice(minPrice: number, maxPrice: number): Product[] {
    return products.filter(
      product => product.price >= minPrice && product.price <= maxPrice
    );
  },

  /**
   * Sort products
   */
  sortProducts(
    items: Product[],
    sortBy: 'price-asc' | 'price-desc' | 'rating' | 'name'
  ): Product[] {
    const sorted = [...items];
    switch (sortBy) {
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'rating':
        return sorted.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
      case 'name':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return sorted;
    }
  },

  /**
   * Get price range for all products
   */
  getPriceRange(): { min: number; max: number } {
    if (products.length === 0) return { min: 0, max: 0 };
    const prices = products.map(p => p.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  },
};
