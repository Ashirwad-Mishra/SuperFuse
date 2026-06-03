import { buses } from '../data/buses';
import { ferries } from '../data/ferries';
import { flights } from '../data/flights';
import { trains } from '../data/trains';
import type { Bus } from '../interfaces/Bus';
import type { Ferry } from '../interfaces/Ferry';
import type { Flight } from '../interfaces/Flight';
import type { Train } from '../interfaces/Train';
import type { RouteLeg } from '../interfaces/RouteLeg';
import type { TravelRoute } from '../interfaces/TravelRoute';
import { TransportMode } from '../enums/TransportMode';
import { RouteRank } from '../enums/RouteRank';
import { searchRoutePaths } from '../utils/routeGraph';

const normalizeCity = (city: string) => city.trim().toLowerCase();

const buildFlightLeg = (flight: Flight): RouteLeg => ({
  id: flight.id,
  mode: TransportMode.FLIGHT,
  providerId: flight.id,
  providerName: flight.airline,
  fromCity: flight.fromCity,
  toCity: flight.toCity,
  departureTime: flight.departureTime,
  arrivalTime: flight.arrivalTime,
  durationMinutes: flight.durationMinutes,
  cost: flight.price,
  stops: flight.stops,
  rating: flight.rating,
  details: `${flight.flightNumber} • ${flight.cabinClasses.join(', ')}`,
});

const buildTrainLeg = (train: Train): RouteLeg => ({
  id: train.id,
  mode: TransportMode.TRAIN,
  providerId: train.trainNumber,
  providerName: train.trainName,
  fromCity: train.fromCity,
  toCity: train.toCity,
  departureTime: train.departureTime,
  arrivalTime: train.arrivalTime,
  durationMinutes: train.durationMinutes,
  cost: train.price,
  stops: train.classes.length > 2 ? 1 : 0,
  rating: train.rating,
  details: `${train.trainNumber} • ${train.trainType}`,
});

const buildBusLeg = (bus: Bus): RouteLeg => ({
  id: bus.id,
  mode: TransportMode.BUS,
  providerId: bus.id,
  providerName: bus.operatorName,
  fromCity: bus.fromCity,
  toCity: bus.toCity,
  departureTime: bus.departureTime,
  arrivalTime: bus.arrivalTime,
  durationMinutes: bus.durationMinutes,
  cost: bus.price,
  stops: 0,
  rating: bus.rating,
  details: `${bus.busType} • ${bus.amenities.join(', ')}`,
});

const buildFerryLeg = (ferry: Ferry): RouteLeg => ({
  id: ferry.id,
  mode: TransportMode.FERRY,
  providerId: ferry.id,
  providerName: ferry.operatorName,
  fromCity: ferry.fromCity,
  toCity: ferry.toCity,
  departureTime: ferry.departureTime,
  arrivalTime: ferry.arrivalTime,
  durationMinutes: ferry.durationMinutes,
  cost: ferry.price,
  stops: 0,
  rating: ferry.rating,
  details: `${ferry.routeName} • ${ferry.ferryType}`,
});

const getAllLegs = (): RouteLeg[] => [
  ...flights.map(buildFlightLeg),
  ...trains.map(buildTrainLeg),
  ...buses.map(buildBusLeg),
  ...ferries.map(buildFerryLeg),
];

const scoreComfort = (legs: RouteLeg[]): number => {
  const averageRating = legs.reduce((sum, item) => sum + item.rating, 0) / legs.length;
  const modeBonus = legs.every((item) => item.mode === TransportMode.FLIGHT) ? 6 : legs.some((item) => item.mode === TransportMode.BUS) ? -1 : 2;
  return Number((averageRating + modeBonus).toFixed(1));
};

const scoreCarbon = (legs: RouteLeg[]): 'Low' | 'Medium' | 'High' => {
  const flightCount = legs.filter((leg) => leg.mode === TransportMode.FLIGHT).length;
  const busCount = legs.filter((leg) => leg.mode === TransportMode.BUS).length;
  if (flightCount > 0 && busCount === 0) return 'High';
  if (flightCount > 0 && busCount > 0) return 'Medium';
  if (busCount > 0 && legs.every((leg) => leg.mode === TransportMode.BUS)) return 'Low';
  return 'Medium';
};

const normalizeRouteTitle = (legs: RouteLeg[]): string => {
  return legs.map((leg) => `${leg.fromCity} → ${leg.toCity}`).join(' / ');
};

const buildRouteSummary = (legs: RouteLeg[], rank: RouteRank): TravelRoute => {
  const totalCost = legs.reduce((sum, leg) => sum + leg.cost, 0);
  const totalDurationMinutes = legs.reduce((sum, leg) => sum + leg.durationMinutes, 0);
  const transfers = Math.max(0, legs.length - 1);
  const comfortScore = scoreComfort(legs);
  const carbonScore = scoreCarbon(legs);
  const reliability = Number((legs.reduce((sum, leg) => sum + leg.rating, 0) / legs.length).toFixed(0));

  return {
    id: `${legs.map((leg) => leg.id).join('-')}-${rank}`,
    title: `${rank} route · ${normalizeRouteTitle(legs)}`,
    rank,
    legs,
    totalCost,
    totalDurationMinutes,
    transfers,
    comfortScore,
    carbonScore,
    reliability,
  };
};

const sortByCost = (routes: TravelRoute[]): TravelRoute[] => [...routes].sort((a, b) => a.totalCost - b.totalCost);
const sortByDuration = (routes: TravelRoute[]): TravelRoute[] => [...routes].sort((a, b) => a.totalDurationMinutes - b.totalDurationMinutes);
const sortByValue = (routes: TravelRoute[]): TravelRoute[] =>
  [...routes].sort((a, b) =>
    a.totalCost * 0.65 + a.totalDurationMinutes * 2 - a.comfortScore * 50 - a.reliability * 10 - a.transfers * 40 -
    (b.totalCost * 0.65 + b.totalDurationMinutes * 2 - b.comfortScore * 50 - b.reliability * 10 - b.transfers * 40)
  );
const sortByComfort = (routes: TravelRoute[]): TravelRoute[] =>
  [...routes].sort((a, b) => b.comfortScore - a.comfortScore || b.reliability - a.reliability || a.totalCost - b.totalCost);

export interface TravelRouteSearchParams {
  fromCity: string;
  toCity: string;
  travelDate: string;
  passengers: number;
}

export const searchTravelRoutes = (params: TravelRouteSearchParams): TravelRoute[] => {
  const source = params.fromCity.trim();
  const destination = params.toCity.trim();
  if (!source || !destination || normalizeCity(source) === normalizeCity(destination)) {
    return [];
  }

  const allLegs = getAllLegs();
  const routes = searchRoutePaths(source, destination, allLegs, 2);
  const plans = routes.map((legs) => buildRouteSummary(legs, RouteRank.BEST_VALUE));

  const uniquePlans = plans.reduce<TravelRoute[]>((acc, plan) => {
    if (!acc.some((existing) => existing.id === plan.id)) {
      acc.push(plan);
    }
    return acc;
  }, []);

  const cheapest = sortByCost(uniquePlans)[0];
  const fastest = sortByDuration(uniquePlans)[0];
  const bestValue = sortByValue(uniquePlans)[0];
  const mostComfortable = sortByComfort(uniquePlans)[0];

  return [cheapest, fastest, bestValue, mostComfortable].filter((item): item is TravelRoute => Boolean(item));
};
