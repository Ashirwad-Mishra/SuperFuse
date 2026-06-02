export interface Hotel {
  id: string;
  name: string;
  image: string;
  destination: string;
  location: string;
  starRating: number;
  guestRating: number;
  amenities: string[];
  roomType: string;
  cancellationPolicy: string;
  distanceFromCenterKm: number;
  pricePerNight: number;
  hotelType: string;
  breakfastIncluded: boolean;
  freeCancellation: boolean;
}
