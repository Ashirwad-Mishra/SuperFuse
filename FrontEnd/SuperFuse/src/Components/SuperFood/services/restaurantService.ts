import { restaurants } from '../data/restaurants';
import type { Restaurant } from '../interfaces/Restaurant';
import type { MenuItem } from '../interfaces/MenuItem';
import type { CuisineType } from '../enums/CuisineType';

export type RestaurantSortKey =
  | 'recommended'
  | 'rating'
  | 'deliveryTime'
  | 'deliveryFee'
  | 'distance'
  | 'minimumOrder';

class RestaurantService {
  getAllRestaurants(): Restaurant[] {
    return [...restaurants];
  }

  getRestaurantById(id: string): Restaurant | undefined {
    return restaurants.find((restaurant) => restaurant.id === id);
  }

  searchRestaurants(query: string): Restaurant[] {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return this.getAllRestaurants();
    }

    return restaurants.filter((restaurant) => this.matchesSearch(restaurant, normalized));
  }

  filterRestaurants(
    source: Restaurant[],
    cuisineFilter: CuisineType | '',
    onlyVeg: boolean,
    onlyOpen: boolean,
    fastDelivery: boolean,
    hasOffers: boolean,
    minRating: number,
    maxPrice?: number
  ): Restaurant[] {
    return source.filter((restaurant) => {
      if (cuisineFilter && !restaurant.cuisineTypes.includes(cuisineFilter)) {
        return false;
      }
      if (onlyVeg && !this.isVegetarianRestaurant(restaurant)) {
        return false;
      }
      if (onlyOpen && !restaurant.isOpen) {
        return false;
      }
      if (fastDelivery && restaurant.deliverySpeed !== 'fast') {
        return false;
      }
      if (hasOffers && !restaurant.hasOffers) {
        return false;
      }
      if (minRating && restaurant.rating < minRating) {
        return false;
      }
      if (maxPrice && restaurant.deliveryFee > maxPrice) {
        return false;
      }
      return true;
    });
  }

  sortRestaurants(source: Restaurant[], sortKey: RestaurantSortKey): Restaurant[] {
    const copy = [...source];
    switch (sortKey) {
      case 'rating':
        return copy.sort((a, b) => b.rating - a.rating);
      case 'deliveryTime':
        return copy.sort((a, b) => a.deliveryTimeMax - b.deliveryTimeMax);
      case 'deliveryFee':
        return copy.sort((a, b) => a.deliveryFee - b.deliveryFee);
      case 'distance':
        return copy.sort((a, b) => a.distanceKm - b.distanceKm);
      case 'minimumOrder':
        return copy.sort((a, b) => a.minimumOrder - b.minimumOrder);
      case 'recommended':
      default:
        return copy.sort((a, b) => {
          const scoreA = a.rating * 10 - a.deliveryTimeMax + (a.hasOffers ? 5 : 0);
          const scoreB = b.rating * 10 - b.deliveryTimeMax + (b.hasOffers ? 5 : 0);
          return scoreB - scoreA;
        });
    }
  }

  getRestaurantMenuItems(restaurant: Restaurant): MenuItem[] {
    return [...restaurant.menu];
  }

  private matchesSearch(restaurant: Restaurant, query: string): boolean {
    if (restaurant.name.toLowerCase().includes(query)) {
      return true;
    }
    if (restaurant.description.toLowerCase().includes(query)) {
      return true;
    }
    if (restaurant.cuisineTypes.some((cuisine) => cuisine.toLowerCase().includes(query))) {
      return true;
    }
    if (restaurant.menu.some((item) => this.menuItemMatches(item, query))) {
      return true;
    }
    return false;
  }

  private isVegetarianRestaurant(restaurant: Restaurant): boolean {
    return Boolean(
      restaurant.isVeg ||
        restaurant.tags.some((tag) => tag.toLowerCase() === 'pure veg') ||
        restaurant.menu.every((item) => item.isVeg)
    );
  }

  private menuItemMatches(item: MenuItem, query: string): boolean {
    if (item.name.toLowerCase().includes(query)) {
      return true;
    }
    if (item.description.toLowerCase().includes(query)) {
      return true;
    }
    if (item.category.toLowerCase().includes(query)) {
      return true;
    }
    return false;
  }
}

export const restaurantService = new RestaurantService();
