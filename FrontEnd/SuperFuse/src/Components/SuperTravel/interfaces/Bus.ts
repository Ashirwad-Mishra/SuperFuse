export interface Bus {
  id: string;
  operatorName: string;
  busImage: string;
  fromCity: string;
  toCity: string;
  pickupPoint: string;
  dropPoint: string;
  departureTime: string;
  arrivalTime: string;
  durationMinutes: number;
  busType: string;
  amenities: string[];
  availableSeats: number;
  rating: number;
  price: number;
}
