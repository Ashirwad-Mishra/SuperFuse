export const CuisineType = {
  NorthIndian: 'North Indian',
  SouthIndian: 'South Indian',
  Chinese: 'Chinese',
  Continental: 'Continental',
  FastFood: 'Fast Food',
  Dessert: 'Dessert',
  Healthy: 'Healthy',
  StreetFood: 'Street Food',
} as const;

export type CuisineType = (typeof CuisineType)[keyof typeof CuisineType];

export const CuisineTypes: CuisineType[] = Object.values(CuisineType);
