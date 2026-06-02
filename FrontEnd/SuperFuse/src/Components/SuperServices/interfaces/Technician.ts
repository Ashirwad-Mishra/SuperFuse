import { ServiceType } from "../enums/ServiceType";

export interface Technician {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatar?: string;
  rating: number;
  reviewCount: number;
  services: ServiceType[];
  serviceAreas: string[];
  currentBookings: number;
  maxBookingsPerDay: number;
  responseTime?: number;
  isAvailable: boolean;
}
