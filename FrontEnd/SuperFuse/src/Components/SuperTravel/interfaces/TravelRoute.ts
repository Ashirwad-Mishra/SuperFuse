import type { RouteLeg } from './RouteLeg';
import { RouteRank } from '../enums/RouteRank';

export interface TravelRoute {
  id: string;
  title: string;
  rank: RouteRank;
  legs: RouteLeg[];
  totalCost: number;
  totalDurationMinutes: number;
  transfers: number;
  comfortScore: number;
  carbonScore: 'Low' | 'Medium' | 'High';
  reliability: number;
}
