export const TransportMode = {
  FLIGHT: 'Flight',
  TRAIN: 'Train',
  BUS: 'Bus',
  FERRY: 'Ferry',
} as const;

export type TransportMode = typeof TransportMode[keyof typeof TransportMode];
