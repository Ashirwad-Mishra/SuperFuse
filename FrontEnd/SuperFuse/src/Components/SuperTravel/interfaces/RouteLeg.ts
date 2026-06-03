import { TransportMode } from '../enums/TransportMode';

export interface RouteLeg {
  id: string;
  mode: TransportMode;
  providerId: string;
  providerName: string;
  fromCity: string;
  toCity: string;
  departureTime: string;
  arrivalTime: string;
  durationMinutes: number;
  cost: number;
  stops: number;
  rating: number;
  details: string;
}
