export interface Flight {
  id: string;
  airline: string;
  airlineImage: string;
  flightNumber: string;
  fromCity: string;
  toCity: string;
  fromAirport: string;
  toAirport: string;
  departureTime: string;
  arrivalTime: string;
  durationMinutes: number;
  stops: number;
  cabinClasses: string[];
  baggage: string;
  refundable: boolean;
  price: number;
  rating: number;
}
