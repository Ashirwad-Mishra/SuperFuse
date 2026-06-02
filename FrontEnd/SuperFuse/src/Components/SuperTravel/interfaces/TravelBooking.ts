import { TravelMode } from '../enums/TravelMode';
import { BookingStatus } from '../enums/BookingStatus';
import type { Flight } from './Flight';
import type { Train } from './Train';
import type { Bus } from './Bus';
import type { Hotel } from './Hotel';
import type { Passenger } from './Passenger';

export interface TravelBooking {
  bookingId: string;
  mode: TravelMode;
  selectedItem: Flight | Train | Bus | Hotel;
  fromCity?: string;
  toCity?: string;
  destination?: string;
  startDate: string;
  endDate?: string;
  passengers?: Passenger[];
  rooms?: number;
  guests?: number;
  subtotal: number;
  taxes: number;
  fees: number;
  discount: number;
  total: number;
  paymentMethod: string;
  status: BookingStatus;
  createdAt: string;
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
}
