import type { MovieBooking } from '../interfaces/MovieBooking';
import type { Movie } from '../interfaces/Movie';
import type { Cinema } from '../interfaces/Cinema';
import type { Showtime } from '../interfaces/Showtime';
import type { Seat } from '../interfaces/Seat';
import { BookingStatus } from '../enums/BookingStatus';

const STORAGE_KEY = 'supermovie-latest-booking';

class BookingService {
  private latestBooking: MovieBooking | null = null;

  constructor() {
    this.restore();
  }

  createBooking(
    movie: Movie,
    cinema: Cinema,
    showtime: Showtime,
    selectedSeats: Seat[],
    buyerName: string,
    buyerPhone: string,
    buyerEmail: string,
    paymentMethod: MovieBooking['paymentMethod']
  ): MovieBooking {
    const subtotal = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
    const convenienceFee = 40;
    const taxes = Math.round((subtotal + convenienceFee) * 0.12);
    const total = subtotal + convenienceFee + taxes;
    const bookingId = `MB-${Date.now()}`;
    const booking: MovieBooking = {
      bookingId,
      movie,
      cinema,
      showtime,
      selectedSeats,
      buyerName,
      buyerPhone,
      buyerEmail,
      paymentMethod,
      subtotal,
      convenienceFee,
      taxes,
      total,
      status: BookingStatus.Confirmed,
      placedAt: new Date().toISOString(),
    };
    this.latestBooking = booking;
    this.persist();
    return booking;
  }

  getLatestBooking(): MovieBooking | null {
    return this.latestBooking ? { ...this.latestBooking } : null;
  }

  clearBooking(): void {
    this.latestBooking = null;
    localStorage.removeItem(STORAGE_KEY);
  }

  private persist(): void {
    if (this.latestBooking) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.latestBooking));
    }
  }

  private restore(): void {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        this.latestBooking = JSON.parse(stored) as MovieBooking;
      } catch {
        this.latestBooking = null;
      }
    }
  }
}

export const bookingService = new BookingService();
