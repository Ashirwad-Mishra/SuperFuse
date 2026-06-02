import type { TravelBooking } from '../interfaces/TravelBooking';
import { BookingStatus } from '../enums/BookingStatus';

const STORAGE_KEY = 'supertravel_latest_booking';

export const createDraftBooking = (draft: Omit<TravelBooking, 'bookingId' | 'status' | 'createdAt' | 'total'>): TravelBooking => {
  const subtotal = draft.subtotal;
  const taxes = +(subtotal * 0.12).toFixed(0);
  const fees = 250;
  const discount = draft.mode === 'flight' || draft.mode === 'hotel' ? 150 : 100;
  const total = subtotal + taxes + fees - discount;

  return {
    ...draft,
    bookingId: `TRV-${Date.now()}`,
    status: BookingStatus.DRAFT,
    createdAt: new Date().toISOString(),
    taxes,
    fees,
    discount,
    total,
  } as TravelBooking;
};

export const calculateBookingSummary = (booking: TravelBooking): TravelBooking => {
  const subtotal = booking.subtotal;
  const taxes = +(subtotal * 0.12).toFixed(0);
  const fees = 250;
  const discount = booking.mode === 'flight' || booking.mode === 'hotel' ? 150 : 100;
  const total = subtotal + taxes + fees - discount;
  return {
    ...booking,
    taxes,
    fees,
    discount,
    total,
  };
};

export const confirmBooking = (booking: TravelBooking, paymentMethod: string): TravelBooking => {
  const confirmed = {
    ...calculateBookingSummary(booking),
    paymentMethod,
    status: BookingStatus.CONFIRMED,
    createdAt: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(confirmed));
  return confirmed;
};

export const getLatestBooking = (): TravelBooking | null => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return null;
  }
  try {
    return JSON.parse(raw) as TravelBooking;
  } catch {
    return null;
  }
};

export const clearLatestBooking = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};
