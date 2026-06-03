export interface Ferry {
  id: string;
  operatorName: string;
  ferryImage: string;
  fromCity: string;
  toCity: string;
  departureTime: string;
  arrivalTime: string;
  durationMinutes: number;
  ferryType: string;
  amenities: string[];
  price: number;
  rating: number;
  routeName: string;
}
