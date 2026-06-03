import React, { useEffect, useMemo, useState } from 'react';
import { destinations } from './data/destinations';
import { hotels } from './data/hotels';
import type { Hotel } from './interfaces/Hotel';
import type { TravelRoute } from './interfaces/TravelRoute';
import { searchTravelRoutes } from './services/routePlannerService';
import RouteCard from './components/RouteCard';
import './SuperTravel.css';

type Interest = 'Nature' | 'Adventure' | 'Religious' | 'Food' | 'Heritage';

interface TripForm {
  source: string;
  destination: string;
  startDate: string;
  endDate: string;
  travelers: number;
  budget: number;
}

interface Attraction {
  id: string;
  name: string;
  category: Interest;
  duration: string;
  estimatedCost: number;
}

interface RentalOption {
  id: string;
  type: 'Car' | 'Bike' | 'Taxi';
  name: string;
  category: string;
  pricePerDay: number;
  deposit: number;
}

const today = new Date().toISOString().split('T')[0];

const interestOptions: Interest[] = ['Nature', 'Adventure', 'Religious', 'Food', 'Heritage'];

const attractions: Attraction[] = [
  { id: 'vaishno-devi', name: 'Vaishno Devi', category: 'Religious', duration: '1 day', estimatedCost: 1800 },
  { id: 'patnitop', name: 'Patnitop', category: 'Nature', duration: '6 hours', estimatedCost: 1400 },
  { id: 'bahu-fort', name: 'Bahu Fort', category: 'Heritage', duration: '2 hours', estimatedCost: 300 },
  { id: 'mubarak-mandi', name: 'Mubarak Mandi', category: 'Heritage', duration: '2 hours', estimatedCost: 250 },
  { id: 'amar-mahal', name: 'Amar Mahal', category: 'Heritage', duration: '2 hours', estimatedCost: 300 },
  { id: 'raghunath-temple', name: 'Raghunath Temple', category: 'Religious', duration: '1 hour', estimatedCost: 100 },
  { id: 'surinsar-lake', name: 'Surinsar Lake', category: 'Nature', duration: '4 hours', estimatedCost: 900 },
  { id: 'food-walk', name: 'Jammu Food Walk', category: 'Food', duration: '3 hours', estimatedCost: 1200 },
  { id: 'adventure-park', name: 'Patnitop Adventure Park', category: 'Adventure', duration: '4 hours', estimatedCost: 1600 },
];

const rentalOptions: RentalOption[] = [
  { id: 'sedan', type: 'Car', name: 'Self Drive Sedan', category: 'Sedan', pricePerDay: 2200, deposit: 5000 },
  { id: 'suv', type: 'Car', name: 'Mountain Route SUV', category: 'SUV', pricePerDay: 3600, deposit: 8000 },
  { id: 'scooter', type: 'Bike', name: 'City Scooter', category: 'Scooter', pricePerDay: 700, deposit: 2000 },
  { id: 'taxi', type: 'Taxi', name: 'Local Taxi With Driver', category: 'Daily Rental', pricePerDay: 2800, deposit: 0 },
];

const formatCurrency = (value: number): string =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);

const getDayCount = (startDate: string, endDate: string): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end < start) {
    return 1;
  }
  return Math.max(1, Math.round((end.getTime() - start.getTime()) / 86400000) + 1);
};

const SuperTravel: React.FC = () => {
  const [trip, setTrip] = useState<TripForm>({
    source: 'London',
    destination: 'New York',
    startDate: today,
    endDate: today,
    travelers: 2,
    budget: 250000,
  });
  const [selectedInterests, setSelectedInterests] = useState<Interest[]>(['Religious', 'Heritage']);
  const [selectedAttractionIds, setSelectedAttractionIds] = useState<string[]>([
    'vaishno-devi',
    'bahu-fort',
    'raghunath-temple',
  ]);
  const [selectedRouteId, setSelectedRouteId] = useState<string>('');
  const [selectedHotelId, setSelectedHotelId] = useState<string>('hotel-1');
  const [selectedRentalId, setSelectedRentalId] = useState<string>('taxi');

  const dayCount = useMemo(() => getDayCount(trip.startDate, trip.endDate), [trip.startDate, trip.endDate]);

  const destinationSuggestions = useMemo(
    () => destinations.map((destination) => destination.city),
    []
  );

  const filteredAttractions = useMemo(() => {
    if (selectedInterests.length === 0) {
      return attractions;
    }
    return attractions.filter((place) => selectedInterests.includes(place.category));
  }, [selectedInterests]);

  const selectedAttractions = useMemo(
    () => attractions.filter((place) => selectedAttractionIds.includes(place.id)),
    [selectedAttractionIds]
  );

  const routePlans = useMemo<TravelRoute[]>(() => {
    return searchTravelRoutes({
      fromCity: trip.source,
      toCity: trip.destination,
      travelDate: trip.startDate,
      passengers: trip.travelers,
    });
  }, [trip.source, trip.destination, trip.startDate, trip.travelers]);

  useEffect(() => {
    if (routePlans.length && !routePlans.some((route) => route.id === selectedRouteId)) {
      setSelectedRouteId(routePlans[0].id);
    }
  }, [routePlans, selectedRouteId]);

  const selectedRoute = routePlans.find((route) => route.id === selectedRouteId) ?? routePlans[0] ?? null;
  const hotelChoices: Hotel[] = hotels.filter((hotel) => hotel.destination.toLowerCase() === trip.destination.trim().toLowerCase());
  const availableHotels = hotelChoices.length ? hotelChoices : hotels.slice(0, 4);
  const selectedHotel = availableHotels.find((hotel) => hotel.id === selectedHotelId) ?? availableHotels[0];
  const selectedRental = rentalOptions.find((rental) => rental.id === selectedRentalId) ?? rentalOptions[0];

  const budget = useMemo(() => {
    const transportation = selectedRoute ? selectedRoute.totalCost * trip.travelers : 0;
    const hotelsTotal = selectedHotel ? selectedHotel.pricePerNight * Math.max(1, dayCount - 1) : 0;
    const rentalsTotal = selectedRental.pricePerDay * Math.min(dayCount, 3);
    const activities = selectedAttractions.reduce((sum, attraction) => sum + attraction.estimatedCost, 0);
    const food = 900 * trip.travelers * dayCount;
    const total = transportation + hotelsTotal + rentalsTotal + activities + food;
    return { transportation, hotels: hotelsTotal, rentals: rentalsTotal, activities, food, total };
  }, [dayCount, selectedAttractions, selectedHotel, selectedRental, selectedRoute, trip.travelers]);

  const itinerary = useMemo(() => {
    const fallback = attractions.slice(0, dayCount);
    const places = selectedAttractions.length ? selectedAttractions : fallback;
    return Array.from({ length: dayCount }, (_, index) => {
      if (index === 0) {
        const travelSteps = selectedRoute?.legs.map((leg) => `${leg.mode}: ${leg.fromCity} → ${leg.toCity} (${leg.departureTime}–${leg.arrivalTime})`) ?? [`Travel from ${trip.source} to ${trip.destination}`];
        return {
          day: 1,
          title: 'Travel And Arrival',
          items: [...travelSteps, 'Hotel check-in', 'Evening orientation walk'],
        };
      }

      const attraction = places[(index - 1) % places.length];
      return {
        day: index + 1,
        title: `Explore ${attraction.name}`,
        items: [
          attraction.name,
          'Local lunch or snack experience',
          index === dayCount - 1 ? 'Pack for departure' : 'Sunset stroll and market visit',
        ],
      };
    });
  }, [dayCount, selectedAttractions, selectedRoute, trip.destination, trip.source]);

  const toggleInterest = (interest: Interest): void => {
    setSelectedInterests((current) =>
      current.includes(interest)
        ? current.filter((item) => item !== interest)
        : [...current, interest]
    );
  };

  const toggleAttraction = (id: string): void => {
    setSelectedAttractionIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  };

  const updateTrip = <K extends keyof TripForm>(field: K, value: TripForm[K]): void => {
    setTrip((current) => ({ ...current, [field]: value }));
  };

  return (
    <main className="supertravel-page">
      <section className="supertravel-hero">
        <div className="supertravel-hero-copy">
          <p className="supertravel-eyebrow">SuperTravel</p>
          <h1>Plan the whole trip, not just the ticket.</h1>
          <p>
            Build a route from source to destination, compare transport, choose stays and rentals,
            generate an itinerary, and keep the trip budget in one dashboard.
          </p>
        </div>
        <div className="supertravel-hero-card">
          <span>Trip readiness</span>
          <strong>{budget.total <= trip.budget ? 'Within Budget' : 'Over Budget'}</strong>
          <p>{formatCurrency(budget.total)} estimated for {trip.travelers} travelers</p>
        </div>
      </section>

      <section className="supertravel-planner">
        <div className="supertravel-panel trip-input-panel">
          <div className="section-heading">
            <span>01</span>
            <div>
              <h2>Trip Planner</h2>
              <p>Start with route, dates, travelers, budget, and travel interests.</p>
            </div>
          </div>

          <div className="trip-form-grid">
            <label>
              Source
              <input
                list="supertravel-cities"
                value={trip.source}
                onChange={(event) => updateTrip('source', event.target.value)}
              />
            </label>
            <label>
              Destination
              <input
                list="supertravel-cities"
                value={trip.destination}
                onChange={(event) => updateTrip('destination', event.target.value)}
              />
            </label>
            <label>
              Start date
              <input
                type="date"
                value={trip.startDate}
                onChange={(event) => updateTrip('startDate', event.target.value)}
              />
            </label>
            <label>
              End date
              <input
                type="date"
                value={trip.endDate}
                onChange={(event) => updateTrip('endDate', event.target.value)}
              />
            </label>
            <label>
              Travelers
              <input
                type="number"
                min={1}
                max={12}
                value={trip.travelers}
                onChange={(event) => updateTrip('travelers', Number(event.target.value))}
              />
            </label>
            <label>
              Budget
              <input
                type="number"
                min={0}
                step={500}
                value={trip.budget}
                onChange={(event) => updateTrip('budget', Number(event.target.value))}
              />
            </label>
          </div>

          <datalist id="supertravel-cities">
            {destinationSuggestions.map((city) => (
              <option key={city} value={city} />
            ))}
          </datalist>

          <div className="interest-row">
            {interestOptions.map((interest) => (
              <button
                type="button"
                key={interest}
                className={selectedInterests.includes(interest) ? 'chip selected' : 'chip'}
                onClick={() => toggleInterest(interest)}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>

        <div className="supertravel-panel">
          <div className="section-heading">
            <span>02</span>
            <div>
              <h2>Tourist Attraction Discovery</h2>
              <p>Select places manually or let the planner use interests to guide the itinerary.</p>
            </div>
          </div>
          <div className="attraction-grid">
            {filteredAttractions.map((place) => (
              <button
                type="button"
                key={place.id}
                className={selectedAttractionIds.includes(place.id) ? 'attraction-card active' : 'attraction-card'}
                onClick={() => toggleAttraction(place.id)}
              >
                <strong>{place.name}</strong>
                <span>{place.category} · {place.duration}</span>
                <small>{formatCurrency(place.estimatedCost)} estimated</small>
              </button>
            ))}
          </div>
        </div>

        <div className="supertravel-panel">
          <div className="section-heading">
            <span>03</span>
            <div>
              <h2>Transportation And Multi-Modal Routes</h2>
              <p>Route ranking weighs cost, duration, comfort, reliability, and user preferences.</p>
            </div>
          </div>
          <div className="route-grid">
            {routePlans.length ? (
              routePlans.map((route) => (
                <RouteCard
                  key={route.id}
                  route={route}
                  selected={route.id === selectedRoute?.id}
                  onSelect={setSelectedRouteId}
                />
              ))
            ) : (
              <div className="no-results">
                <p>No route options found for this route.</p>
                <p>Try changing the source, destination, or travel date.</p>
              </div>
            )}
          </div>
        </div>

        <div className="supertravel-two-column">
          <section className="supertravel-panel">
            <div className="section-heading">
              <span>04</span>
              <div>
                <h2>Hotel Discovery</h2>
                <p>Compare stays by rating, distance, amenities, cancellation, and nightly price.</p>
              </div>
            </div>
            <div className="hotel-list">
              {hotelChoices.map((hotel) => (
                <button
                  type="button"
                  key={hotel.id}
                  className={hotel.id === selectedHotelId ? 'hotel-row selected' : 'hotel-row'}
                  onClick={() => setSelectedHotelId(hotel.id)}
                >
                  <img src={hotel.image} alt={hotel.name} />
                  <span>
                    <strong>{hotel.name}</strong>
                    <small>{hotel.starRating} star · {hotel.distanceFromCenterKm} km from center</small>
                    <small>{hotel.amenities.slice(0, 3).join(', ')}</small>
                  </span>
                  <b>{formatCurrency(hotel.pricePerNight)}/night</b>
                </button>
              ))}
            </div>
          </section>

          <section className="supertravel-panel">
            <div className="section-heading">
              <span>05</span>
              <div>
                <h2>Rental Services</h2>
                <p>Choose local cars, bikes, or taxi rentals for the destination.</p>
              </div>
            </div>
            <div className="rental-grid">
              {rentalOptions.map((rental) => (
                <button
                  type="button"
                  key={rental.id}
                  className={rental.id === selectedRentalId ? 'rental-card selected' : 'rental-card'}
                  onClick={() => setSelectedRentalId(rental.id)}
                >
                  <strong>{rental.name}</strong>
                  <span>{rental.type} · {rental.category}</span>
                  <small>{formatCurrency(rental.pricePerDay)}/day</small>
                  <small>Deposit {formatCurrency(rental.deposit)}</small>
                </button>
              ))}
            </div>
          </section>
        </div>

        <div className="supertravel-two-column">
          <section className="supertravel-panel">
            <div className="section-heading">
              <span>06</span>
              <div>
                <h2>AI Itinerary Generator</h2>
                <p>Generated from selected interests, places, duration, and route timing.</p>
              </div>
            </div>
            <div className="itinerary-list">
              {itinerary.map((day) => (
                <article key={day.day} className="itinerary-day">
                  <strong>Day {day.day}: {day.title}</strong>
                  <ul>
                    {day.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="supertravel-panel">
            <div className="section-heading">
              <span>07</span>
              <div>
                <h2>Budget Planner</h2>
                <p>Estimate total trip cost before payment and booking review.</p>
              </div>
            </div>
            <div className="budget-table">
              <div><span>Transportation</span><strong>{formatCurrency(budget.transportation)}</strong></div>
              <div><span>Hotels</span><strong>{formatCurrency(budget.hotels)}</strong></div>
              <div><span>Food</span><strong>{formatCurrency(budget.food)}</strong></div>
              <div><span>Rentals</span><strong>{formatCurrency(budget.rentals)}</strong></div>
              <div><span>Activities</span><strong>{formatCurrency(budget.activities)}</strong></div>
              <div className="total"><span>Total</span><strong>{formatCurrency(budget.total)}</strong></div>
              <div className={budget.total <= trip.budget ? 'budget-status good' : 'budget-status warning'}>
                {budget.total <= trip.budget
                  ? `${formatCurrency(trip.budget - budget.total)} under budget`
                  : `${formatCurrency(budget.total - trip.budget)} over budget`}
              </div>
            </div>
          </section>
        </div>

        <section className="supertravel-panel dashboard-panel">
          <div className="section-heading">
            <span>08</span>
            <div>
              <h2>Trip Dashboard</h2>
              <p>Single place for transport tickets, hotel reservations, rentals, documents, weather, maps, and expenses.</p>
            </div>
          </div>
          <div className="dashboard-grid">
            <div><span>Route</span><strong>{selectedRoute.title}</strong></div>
            <div><span>Stay</span><strong>{selectedHotel?.name ?? 'No hotel selected'}</strong></div>
            <div><span>Rental</span><strong>{selectedRental.name}</strong></div>
            <div><span>Places</span><strong>{selectedAttractions.length} selected</strong></div>
            <div><span>Documents</span><strong>ID, tickets, license</strong></div>
            <div><span>Emergency</span><strong>Local contacts ready</strong></div>
          </div>
          <div className="booking-review-strip">
            <div>
              <strong>Ready for booking review</strong>
              <span>Next production step: lock transport seats, hotel room, rental inventory, then proceed to payment.</span>
            </div>
            <button type="button">Review Trip</button>
          </div>
        </section>
      </section>
    </main>
  );
};

export default SuperTravel;
