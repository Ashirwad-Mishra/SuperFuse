import type { MovieFormat } from '../enums/MovieFormat';
import type { Seat } from './Seat';

export interface Showtime {
  id: string;
  movieId: string;
  cinemaId: string;
  screenName: string;
  startsAt: string;
  format: MovieFormat;
  basePrice: number;
  availableSeats: number;
  seats: Seat[];
}
