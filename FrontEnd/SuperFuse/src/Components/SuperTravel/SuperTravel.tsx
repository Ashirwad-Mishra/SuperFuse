import React, { useEffect, useMemo, useState } from 'react';
import { TravelMode } from './enums/TravelMode';
import { CabinClass } from './enums/CabinClass';
import { destinations } from './data/destinations';
import { searchFlights, filterFlights, sortFlights, searchTrains, filterTrains, sortTrains, searchBuses, filterBuses, sortBuses, searchHotels, filterHotels, sortHotels } from './services/travelService';
import { createDraftBooking, confirmBooking, getLatestBooking } from './services/travelBookingService';
import type { FlightSearchParams, TrainSearchParams, BusSearchParams, HotelSearchParams, FlightFilterOptions, TrainFilterOptions, BusFilterOptions, HotelFilterOptions, SortKey } from './services/travelService';
import TravelModeTabs from './components/TravelModeTabs';
import TravelSearchPanel from './components/TravelSearchPanel';
import TravelFilterBar from './components/TravelFilterBar';
import TravelSortControl from './components/TravelSortControl';
import FlightResults from './components/FlightResults';
import TrainResults from './components/TrainResults';
import BusResults from './components/BusResults';
import HotelResults from './components/HotelResults';
import BookingSummary from './components/BookingSummary';
import CheckoutPanel from './components/CheckoutPanel';
import BookingConfirmation from './components/BookingConfirmation';
import type { Flight } from './interfaces/Flight';
import type { Train } from './interfaces/Train';
import type { Bus } from './interfaces/Bus';
import type { Hotel } from './interfaces/Hotel';
import type { TravelBooking } from './interfaces/TravelBooking';
import './SuperTravel.css';

const today = new Date().toISOString().split('T')[0];
const defaultFlightSearch: FlightSearchParams = {
  fromCity: 'Mumbai',
  toCity: 'Delhi',
  departureDate: today,
  returnDate: '',
  passengers: 1,
  cabinClass: CabinClass.ECONOMY,
};

const defaultTrainSearch: TrainSearchParams = {
  fromCity: 'Mumbai',
  toCity: 'Delhi',
  travelDate: today,
  passengers: 1,
  travelClass: 'Sleeper',
};

const defaultBusSearch: BusSearchParams = {
  fromCity: 'Mumbai',
  toCity: 'Pune',
  travelDate: today,
  passengers: 1,
  busType: 'AC Sleeper',
};

const defaultHotelSearch: HotelSearchParams = {
  destination: 'Mumbai',
  checkInDate: today,
  checkOutDate: '',
  rooms: 1,
  guests: 1,
};

const SuperTravel: React.FC = () => {
  const [mode, setMode] = useState<TravelMode>(TravelMode.FLIGHT);
  const [flightSearch, setFlightSearch] = useState(defaultFlightSearch);
  const [trainSearch, setTrainSearch] = useState(defaultTrainSearch);
  const [busSearch, setBusSearch] = useState(defaultBusSearch);
  const [hotelSearch, setHotelSearch] = useState(defaultHotelSearch);
  const [flightFilters, setFlightFilters] = useState<FlightFilterOptions>({});
  const [trainFilters, setTrainFilters] = useState<TrainFilterOptions>({});
  const [busFilters, setBusFilters] = useState<BusFilterOptions>({});
  const [hotelFilters, setHotelFilters] = useState<HotelFilterOptions>({});
  const [sortKey, setSortKey] = useState<SortKey>('recommended');
  const [selectedItem, setSelectedItem] = useState<Flight | Train | Bus | Hotel | null>(null);
  const [booking, setBooking] = useState<TravelBooking | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<TravelBooking | null>(null);
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [passengerNames, setPassengerNames] = useState<string[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const saved = getLatestBooking();
    if (saved) {
      setConfirmedBooking(saved);
      setShowConfirmation(true);
    }
  }, []);

  useEffect(() => {
    setSelectedItem(null);
    setBooking(null);
    setShowConfirmation(false);
  }, [mode]);

  useEffect(() => {
    if (selectedItem) {
      const newBooking = createDraftBooking({
        mode,
        selectedItem,
        fromCity: 'fromCity' in selectedItem ? selectedItem.fromCity : undefined,
        toCity: 'toCity' in selectedItem ? selectedItem.toCity : undefined,
        destination: 'destination' in selectedItem ? selectedItem.destination : undefined,
        startDate: mode === TravelMode.HOTEL ? hotelSearch.checkInDate : mode === TravelMode.TRAIN ? trainSearch.travelDate : mode === TravelMode.BUS ? busSearch.travelDate : flightSearch.departureDate,
        endDate: mode === TravelMode.HOTEL ? hotelSearch.checkOutDate || hotelSearch.checkInDate : mode === TravelMode.FLIGHT ? flightSearch.returnDate || flightSearch.departureDate : undefined,
        passengers: mode === TravelMode.HOTEL ? undefined : mode === TravelMode.FLIGHT ? Array.from({ length: flightSearch.passengers }, (_, index) => ({ id: `${index + 1}`, name: passengerNames[index] || `Passenger ${index + 1}` })) : mode === TravelMode.TRAIN ? Array.from({ length: trainSearch.passengers }, (_, index) => ({ id: `${index + 1}`, name: passengerNames[index] || `Passenger ${index + 1}` })) : mode === TravelMode.BUS ? Array.from({ length: busSearch.passengers }, (_, index) => ({ id: `${index + 1}`, name: passengerNames[index] || `Passenger ${index + 1}` })) : undefined,
        rooms: mode === TravelMode.HOTEL ? hotelSearch.rooms : undefined,
        guests: mode === TravelMode.HOTEL ? hotelSearch.guests : undefined,
        subtotal: 'price' in selectedItem ? selectedItem.price : 'pricePerNight' in selectedItem ? selectedItem.pricePerNight * hotelSearch.rooms : 0,
        taxes: 0,
        fees: 0,
        discount: 0,
        paymentMethod: '',
      });
      setBooking(newBooking);
    }
  }, [selectedItem, mode, flightSearch, trainSearch, busSearch, hotelSearch, passengerNames]);

  const flightResults = useMemo(() => {
    const results = searchFlights(flightSearch);
    const filtered = filterFlights(results, flightFilters);
    return sortFlights(filtered, sortKey);
  }, [flightSearch, flightFilters, sortKey]);

  const trainResults = useMemo(() => {
    const results = searchTrains(trainSearch);
    const filtered = filterTrains(results, trainFilters);
    return sortTrains(filtered, sortKey);
  }, [trainSearch, trainFilters, sortKey]);

  const busResults = useMemo(() => {
    const results = searchBuses(busSearch);
    const filtered = filterBuses(results, busFilters);
    return sortBuses(filtered, sortKey);
  }, [busSearch, busFilters, sortKey]);

  const hotelResults = useMemo(() => {
    const results = searchHotels(hotelSearch);
    const filtered = filterHotels(results, hotelFilters);
    return sortHotels(filtered, sortKey);
  }, [hotelSearch, hotelFilters, sortKey]);

  const onSelectItem = (item: Flight | Train | Bus | Hotel) => {
    setSelectedItem(item);
    setShowConfirmation(false);
  };

  const onConfirmBooking = (method: string) => {
    if (!booking) return;
    const bookingWithContact = {
      ...booking,
      contactName,
      contactPhone,
      contactEmail,
    };
    const confirmed = confirmBooking(bookingWithContact, method);
    setConfirmedBooking(confirmed);
    setShowConfirmation(true);
  };

  const passengerCount = mode === TravelMode.FLIGHT ? flightSearch.passengers : mode === TravelMode.TRAIN ? trainSearch.passengers : mode === TravelMode.BUS ? busSearch.passengers : hotelSearch.guests;

  return (
    <div className="supertravel-shell">
      <div className="supertravel-inner">
        <div className="supertravel-panel">
          <div className="supertravel-header">
            <div>
              <p className="supertravel-eyebrow">SuperTravel</p>
              <h1>Search and book flights, trains, buses, and hotels</h1>
            </div>
          </div>

          <TravelModeTabs mode={mode} onModeChange={setMode} />

          <TravelSearchPanel
            mode={mode}
            destinations={destinations}
            flightSearch={flightSearch}
            onFlightSearchChange={setFlightSearch}
            trainSearch={trainSearch}
            onTrainSearchChange={setTrainSearch}
            busSearch={busSearch}
            onBusSearchChange={setBusSearch}
            hotelSearch={hotelSearch}
            onHotelSearchChange={setHotelSearch}
            passengerNames={passengerNames}
            onPassengerNamesChange={setPassengerNames}
          />

          <div className="supertravel-controls">
            <TravelFilterBar
              mode={mode}
              flightFilters={flightFilters}
              onFlightFiltersChange={setFlightFilters}
              trainFilters={trainFilters}
              onTrainFiltersChange={setTrainFilters}
              busFilters={busFilters}
              onBusFiltersChange={setBusFilters}
              hotelFilters={hotelFilters}
              onHotelFiltersChange={setHotelFilters}
            />
            <TravelSortControl sortKey={sortKey} onSortChange={setSortKey} />
          </div>

          <div className="supertravel-results-grid">
            <div className="supertravel-results-list">
              {mode === TravelMode.FLIGHT && (
                <FlightResults items={flightResults} selectedId={selectedItem?.id} onSelect={onSelectItem} />
              )}
              {mode === TravelMode.TRAIN && (
                <TrainResults items={trainResults} selectedId={selectedItem?.id} onSelect={onSelectItem} />
              )}
              {mode === TravelMode.BUS && (
                <BusResults items={busResults} selectedId={selectedItem?.id} onSelect={onSelectItem} />
              )}
              {mode === TravelMode.HOTEL && (
                <HotelResults items={hotelResults} selectedId={selectedItem?.id} onSelect={onSelectItem} />
              )}
            </div>
            <div className="supertravel-summary-column">
              <BookingSummary
                mode={mode}
                booking={booking}
                passengerCount={passengerCount}
              />
              {booking && !showConfirmation && (
                <CheckoutPanel
                  booking={booking}
                  contactName={contactName}
                  contactPhone={contactPhone}
                  contactEmail={contactEmail}
                  passengerNames={passengerNames}
                  onContactNameChange={setContactName}
                  onContactPhoneChange={setContactPhone}
                  onContactEmailChange={setContactEmail}
                  onPassengerNamesChange={setPassengerNames}
                  onConfirmBooking={onConfirmBooking}
                />
              )}
              {showConfirmation && confirmedBooking && (
                <BookingConfirmation booking={confirmedBooking} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperTravel;
