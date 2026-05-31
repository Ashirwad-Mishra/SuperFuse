import type { ProductCategory } from '../enums/ProductCategory';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: ProductCategory;
  rating?: number;
  stock?: number;
  discount?: number;
}
