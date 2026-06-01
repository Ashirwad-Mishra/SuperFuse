import type { Showtime } from './Showtime';

export interface Cinema {
  id: string;
  name: string;
  location: string;
  image: string;
  distanceKm: number;
  amenities: string[];
  showtimes: Showtime[];
}
