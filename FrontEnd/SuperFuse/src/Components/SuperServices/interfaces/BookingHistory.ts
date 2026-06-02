import { BookingStatus } from "../enums/BookingStatus";

export interface BookingHistory {
  id: string;
  bookingId: string;
  status: BookingStatus;
  changedAt: Date;
  changedBy: string;
  notes?: string;
}
