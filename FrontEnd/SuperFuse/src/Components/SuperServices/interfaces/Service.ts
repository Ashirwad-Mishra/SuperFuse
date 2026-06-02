import type { ServiceType } from "../enums/ServiceType";

export interface FAQ {
  question: string;
  answer: string;
}

export interface PriceRange {
  min: number;
  max: number;
}

export interface Service {
  id: string;
  name: string;
  categoryId: string;
  categoryName: string;
  description: string;
  icon: string;
  imageUrl: string;
  priceRange: PriceRange;
  estimatedDuration: string;
  rating: number;
  reviewCount: number;
  whatIncluded: string[];
  faq: FAQ[];
  serviceType: ServiceType;
}
