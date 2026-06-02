import { flights } from '../data/flights';
import { trains } from '../data/trains';
import { buses } from '../data/buses';
import { hotels } from '../data/hotels';
import type { Flight } from '../interfaces/Flight';
import type { Train } from '../interfaces/Train';
import type { Bus } from '../interfaces/Bus';
import type { Hotel } from '../interfaces/Hotel';

export interface FlightSearchParams {
  fromCity: string;
  toCity: string;
  departureDate: string;
  returnDate?: string;
  passengers: number;
  cabinClass?: string;
}

export interface TrainSearchParams {
  fromCity: string;
  toCity: string;
  travelDate: string;
  passengers: number;
  travelClass?: string;
}

export interface BusSearchParams {
  fromCity: string;
  toCity: string;
  travelDate: string;
  passengers: number;
  busType?: string;
}

export interface HotelSearchParams {
  destination: string;
  checkInDate: string;
  checkOutDate?: string;
  rooms: number;
  guests: number;
}

export interface FlightFilterOptions {
  airlines?: string[];
  stops?: number[];
  priceMin?: number;
  priceMax?: number;
  departureWindows?: string[];
  refundableOnly?: boolean;
  maxDuration?: number;
}

export interface TrainFilterOptions {
  classes?: string[];
  availabilityOnly?: boolean;
  departureWindows?: string[];
  trainTypes?: string[];
  priceMin?: number;
  priceMax?: number;
}

export interface BusFilterOptions {
  acOnly?: boolean;
  sleeperOnly?: boolean;
  pickupWindows?: string[];
  operators?: string[];
  amenities?: string[];
  minRating?: number;
  priceMin?: number;
  priceMax?: number;
}

export interface HotelFilterOptions {
  priceMin?: number;
  priceMax?: number;
  starRatings?: number[];
  guestRating4Plus?: boolean;
  freeCancellation?: boolean;
  breakfastIncluded?: boolean;
  amenities?: string[];
  hotelTypes?: string[];
}

export type SortKey =
  | 'recommended'
  | 'cheapest'
  | 'fastest'
  | 'earliest'
  | 'latest'
  | 'bestAvailability'
  | 'rating'
  | 'distance'
  | 'starRating';

export const searchFlights = (params: FlightSearchParams): Flight[] => {
  const normalizedFrom = params.fromCity.trim().toLowerCase();
  const normalizedTo = params.toCity.trim().toLowerCase();
  return flights.filter((flight) => {
    const matchesRoute =
      flight.fromCity.toLowerCase().includes(normalizedFrom) &&
      flight.toCity.toLowerCase().includes(normalizedTo);
    return matchesRoute;
  });
};

export const filterFlights = (items: Flight[], filters: FlightFilterOptions): Flight[] => {
  return items.filter((flight) => {
    if (filters.airlines && filters.airlines.length && !filters.airlines.includes(flight.airline)) {
      return false;
    }
    if (filters.stops && filters.stops.length && !filters.stops.includes(flight.stops)) {
      return false;
    }
    if (filters.priceMin !== undefined && flight.price < filters.priceMin) {
      return false;
    }
    if (filters.priceMax !== undefined && flight.price > filters.priceMax) {
      return false;
    }
    if (filters.refundableOnly && !flight.refundable) {
      return false;
    }
    if (filters.maxDuration !== undefined && flight.durationMinutes > filters.maxDuration) {
      return false;
    }
    if (filters.departureWindows && filters.departureWindows.length) {
      const hour = Number(flight.departureTime.split(':')[0]);
      const windowMatches = filters.departureWindows.some((window) => {
        if (window === 'morning') return hour >= 5 && hour < 12;
        if (window === 'afternoon') return hour >= 12 && hour < 17;
        if (window === 'evening') return hour >= 17 && hour < 21;
        if (window === 'night') return hour >= 21 || hour < 5;
        return false;
      });
      if (!windowMatches) return false;
    }
    return true;
  });
};

export const sortFlights = (items: Flight[], sortBy: SortKey): Flight[] => {
  const list = [...items];
  switch (sortBy) {
    case 'cheapest':
      return list.sort((a, b) => a.price - b.price);
    case 'fastest':
      return list.sort((a, b) => a.durationMinutes - b.durationMinutes);
    case 'earliest':
      return list.sort((a, b) => Number(a.departureTime.replace(':', '')) - Number(b.departureTime.replace(':', '')));
    case 'latest':
      return list.sort((a, b) => Number(b.departureTime.replace(':', '')) - Number(a.departureTime.replace(':', '')));
    default:
      return list;
  }
};

export const searchTrains = (params: TrainSearchParams): Train[] => {
  const normalizedFrom = params.fromCity.trim().toLowerCase();
  const normalizedTo = params.toCity.trim().toLowerCase();
  return trains.filter(
    (train) =>
      train.fromCity.toLowerCase().includes(normalizedFrom) &&
      train.toCity.toLowerCase().includes(normalizedTo)
  );
};

export const filterTrains = (items: Train[], filters: TrainFilterOptions): Train[] => {
  return items.filter((train) => {
    if (filters.classes && filters.classes.length && !filters.classes.some((item) => train.classes.includes(item))) {
      return false;
    }
    if (filters.availabilityOnly && train.availability <= 0) {
      return false;
    }
    if (filters.trainTypes && filters.trainTypes.length && !filters.trainTypes.includes(train.trainType)) {
      return false;
    }
    if (filters.priceMin !== undefined && train.price < filters.priceMin) {
      return false;
    }
    if (filters.priceMax !== undefined && train.price > filters.priceMax) {
      return false;
    }
    if (filters.departureWindows && filters.departureWindows.length) {
      const hour = Number(train.departureTime.split(':')[0]);
      const windowMatches = filters.departureWindows.some((window) => {
        if (window === 'morning') return hour >= 5 && hour < 12;
        if (window === 'afternoon') return hour >= 12 && hour < 17;
        if (window === 'evening') return hour >= 17 && hour < 21;
        if (window === 'night') return hour >= 21 || hour < 5;
        return false;
      });
      if (!windowMatches) return false;
    }
    return true;
  });
};

export const sortTrains = (items: Train[], sortBy: SortKey): Train[] => {
  const list = [...items];
  switch (sortBy) {
    case 'cheapest':
      return list.sort((a, b) => a.price - b.price);
    case 'fastest':
      return list.sort((a, b) => a.durationMinutes - b.durationMinutes);
    case 'earliest':
      return list.sort((a, b) => Number(a.departureTime.replace(':', '')) - Number(b.departureTime.replace(':', '')));
    case 'bestAvailability':
      return list.sort((a, b) => b.availability - a.availability);
    default:
      return list;
  }
};

export const searchBuses = (params: BusSearchParams): Bus[] => {
  const normalizedFrom = params.fromCity.trim().toLowerCase();
  const normalizedTo = params.toCity.trim().toLowerCase();
  return buses.filter(
    (bus) =>
      bus.fromCity.toLowerCase().includes(normalizedFrom) &&
      bus.toCity.toLowerCase().includes(normalizedTo)
  );
};

export const filterBuses = (items: Bus[], filters: BusFilterOptions): Bus[] => {
  return items.filter((bus) => {
    if (filters.acOnly && !bus.busType.toLowerCase().includes('ac')) {
      return false;
    }
    if (filters.sleeperOnly && !bus.busType.toLowerCase().includes('sleeper')) {
      return false;
    }
    if (filters.operators && filters.operators.length && !filters.operators.includes(bus.operatorName)) {
      return false;
    }
    if (filters.amenities && filters.amenities.length && !filters.amenities.every((amenity) => bus.amenities.includes(amenity))) {
      return false;
    }
    if (filters.minRating !== undefined && bus.rating < filters.minRating) {
      return false;
    }
    if (filters.priceMin !== undefined && bus.price < filters.priceMin) {
      return false;
    }
    if (filters.priceMax !== undefined && bus.price > filters.priceMax) {
      return false;
    }
    if (filters.pickupWindows && filters.pickupWindows.length) {
      const hour = Number(bus.departureTime.split(':')[0]);
      const windowMatches = filters.pickupWindows.some((window) => {
        if (window === 'morning') return hour >= 5 && hour < 12;
        if (window === 'afternoon') return hour >= 12 && hour < 17;
        if (window === 'evening') return hour >= 17 && hour < 21;
        if (window === 'night') return hour >= 21 || hour < 5;
        return false;
      });
      if (!windowMatches) return false;
    }
    return true;
  });
};

export const sortBuses = (items: Bus[], sortBy: SortKey): Bus[] => {
  const list = [...items];
  switch (sortBy) {
    case 'cheapest':
      return list.sort((a, b) => a.price - b.price);
    case 'fastest':
      return list.sort((a, b) => a.durationMinutes - b.durationMinutes);
    case 'rating':
      return list.sort((a, b) => b.rating - a.rating);
    case 'earliest':
      return list.sort((a, b) => Number(a.departureTime.replace(':', '')) - Number(b.departureTime.replace(':', '')));
    default:
      return list;
  }
};

export const searchHotels = (params: HotelSearchParams): Hotel[] => {
  const normalizedDestination = params.destination.trim().toLowerCase();
  return hotels.filter((hotel) => hotel.destination.toLowerCase().includes(normalizedDestination));
};

export const filterHotels = (items: Hotel[], filters: HotelFilterOptions): Hotel[] => {
  return items.filter((hotel) => {
    if (filters.starRatings && filters.starRatings.length && !filters.starRatings.includes(hotel.starRating)) {
      return false;
    }
    if (filters.guestRating4Plus && hotel.guestRating < 4) {
      return false;
    }
    if (filters.freeCancellation && !hotel.freeCancellation) {
      return false;
    }
    if (filters.breakfastIncluded && !hotel.breakfastIncluded) {
      return false;
    }
    if (filters.priceMin !== undefined && hotel.pricePerNight < filters.priceMin) {
      return false;
    }
    if (filters.priceMax !== undefined && hotel.pricePerNight > filters.priceMax) {
      return false;
    }
    if (filters.amenities && filters.amenities.length && !filters.amenities.every((amenity) => hotel.amenities.includes(amenity))) {
      return false;
    }
    if (filters.hotelTypes && filters.hotelTypes.length && !filters.hotelTypes.includes(hotel.hotelType)) {
      return false;
    }
    return true;
  });
};

export const sortHotels = (items: Hotel[], sortBy: SortKey): Hotel[] => {
  const list = [...items];
  switch (sortBy) {
    case 'cheapest':
      return list.sort((a, b) => a.pricePerNight - b.pricePerNight);
    case 'rating':
      return list.sort((a, b) => b.guestRating - a.guestRating);
    case 'distance':
      return list.sort((a, b) => a.distanceFromCenterKm - b.distanceFromCenterKm);
    case 'starRating':
      return list.sort((a, b) => b.starRating - a.starRating);
    default:
      return list;
  }
};
