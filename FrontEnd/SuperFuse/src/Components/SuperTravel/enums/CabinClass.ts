export const CabinClass = {
  ECONOMY: 'Economy' as const,
  PREMIUM_ECONOMY: 'Premium Economy' as const,
  BUSINESS: 'Business' as const,
  FIRST: 'First' as const,
};

export type CabinClass = (typeof CabinClass)[keyof typeof CabinClass];
