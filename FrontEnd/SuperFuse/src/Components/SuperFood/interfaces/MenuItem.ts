export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  category: string;
  price: number;
  isVeg: boolean;
  isAvailable: boolean;
  rating: number;
  image?: string;
  isPopular?: boolean;
}
