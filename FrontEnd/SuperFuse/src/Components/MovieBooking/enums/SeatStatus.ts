export const SeatStatus = {
  Available: 'available',
  Selected: 'selected',
  Booked: 'booked',
  Blocked: 'blocked',
} as const;

export type SeatStatus = (typeof SeatStatus)[keyof typeof SeatStatus];
export const SeatStatuses: SeatStatus[] = Object.values(SeatStatus);
