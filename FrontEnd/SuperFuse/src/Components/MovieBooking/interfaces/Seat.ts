import type { SeatStatus } from '../enums/SeatStatus';

export interface Seat {
  id: string;
  row: string;
  number: number;
  type: 'Regular' | 'Premium' | 'Recliner';
  price: number;
  status: SeatStatus;
}
