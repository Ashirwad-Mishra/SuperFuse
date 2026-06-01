import type { Movie } from './Movie';
import type { Cinema } from './Cinema';
import type { Showtime } from './Showtime';
import type { Seat } from './Seat';
import type { BookingStatus } from '../enums/BookingStatus';

export interface MovieBooking {
  bookingId: string;
  movie: Movie;
  cinema: Cinema;
  showtime: Showtime;
  selectedSeats: Seat[];
  buyerName: string;
  buyerPhone: string;
  buyerEmail: string;
  paymentMethod: 'SuperPay' | 'Card' | 'UPI' | 'Wallet';
  subtotal: number;
  convenienceFee: number;
  taxes: number;
  total: number;
  status: BookingStatus;
  placedAt: string;
}
