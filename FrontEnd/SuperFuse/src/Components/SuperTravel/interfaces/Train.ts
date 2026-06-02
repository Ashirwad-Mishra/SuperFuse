export interface Train {
  id: string;
  trainName: string;
  trainNumber: string;
  trainImage: string;
  fromCity: string;
  toCity: string;
  fromStation: string;
  toStation: string;
  departureTime: string;
  arrivalTime: string;
  durationMinutes: number;
  trainType: string;
  classes: string[];
  availability: number;
  price: number;
  rating: number;
}
