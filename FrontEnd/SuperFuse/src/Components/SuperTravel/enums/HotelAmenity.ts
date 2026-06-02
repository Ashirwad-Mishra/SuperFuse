export const HotelAmenity = {
  WIFI: 'WiFi' as const,
  POOL: 'Pool' as const,
  PARKING: 'Parking' as const,
  GYM: 'Gym' as const,
  RESTAURANT: 'Restaurant' as const,
  AIRPORT_SHUTTLE: 'Airport Shuttle' as const,
  BREAKFAST: 'Breakfast' as const,
  SPA: 'Spa' as const,
  CONCIERGE: 'Concierge' as const,
  LAUNDRY: 'Laundry' as const,
};

export type HotelAmenity = (typeof HotelAmenity)[keyof typeof HotelAmenity];
