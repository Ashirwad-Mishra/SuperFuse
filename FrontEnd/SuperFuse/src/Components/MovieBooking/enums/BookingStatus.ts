export const BookingStatus = {
  Confirmed: 'Confirmed',
  Completed: 'Completed',
  Cancelled: 'Cancelled',
} as const;

export type BookingStatus = (typeof BookingStatus)[keyof typeof BookingStatus];
export const BookingStatuses: BookingStatus[] = Object.values(BookingStatus);
