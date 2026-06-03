export const RouteRank = {
  CHEAPEST: 'Cheapest',
  FASTEST: 'Fastest',
  BEST_VALUE: 'Best Value',
  MOST_COMFORTABLE: 'Most Comfortable',
} as const;

export type RouteRank = typeof RouteRank[keyof typeof RouteRank];
