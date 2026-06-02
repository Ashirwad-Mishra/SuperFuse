export const TravelMode = {
  FLIGHT: 'flight' as const,
  TRAIN: 'train' as const,
  BUS: 'bus' as const,
  HOTEL: 'hotel' as const,
};

export type TravelMode = (typeof TravelMode)[keyof typeof TravelMode];
