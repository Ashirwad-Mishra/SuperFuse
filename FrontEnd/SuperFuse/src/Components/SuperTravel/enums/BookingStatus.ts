export const BookingStatus = {
  DRAFT: 'draft' as const,
  CONFIRMED: 'confirmed' as const,
  CANCELLED: 'cancelled' as const,
  COMPLETED: 'completed' as const,
};

export type BookingStatus = (typeof BookingStatus)[keyof typeof BookingStatus];
