import type { MenuItem } from './MenuItem';
import type { CuisineType } from '../enums/CuisineType';

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  cuisineTypes: CuisineType[];
  rating: number;
  reviewCount: number;
  deliveryTimeMin: number;
  deliveryTimeMax: number;
  deliveryFee: number;
  minimumOrder: number;
  distanceKm: number;
  image: string;
  isOpen: boolean;
  tags: string[];
  offerText?: string;
  isVeg?: boolean;
  hasOffers?: boolean;
  deliverySpeed?: 'fast' | 'standard';
  menu: MenuItem[];
}
