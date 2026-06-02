import React from 'react';
import { TravelMode } from '../enums/TravelMode';
import type { Destination } from '../interfaces/Destination';
import type { FlightSearchParams, TrainSearchParams, BusSearchParams, HotelSearchParams } from '../services/travelService';
import DestinationSearch from './DestinationSearch';
import DateSelector from './DateSelector';
import PassengerSelector from './PassengerSelector';

interface TravelSearchPanelProps {
  mode: TravelMode;
  destinations: Destination[];
  flightSearch: FlightSearchParams;
  onFlightSearchChange: (params: FlightSearchParams) => void;
  trainSearch: TrainSearchParams;
  onTrainSearchChange: (params: TrainSearchParams) => void;
  busSearch: BusSearchParams;
  onBusSearchChange: (params: BusSearchParams) => void;
  hotelSearch: HotelSearchParams;
  onHotelSearchChange: (params: HotelSearchParams) => void;
  passengerNames: string[];
  onPassengerNamesChange: (names: string[]) => void;
}

const TravelSearchPanel: React.FC<TravelSearchPanelProps> = ({
  mode,
  destinations,
  flightSearch,
  onFlightSearchChange,
  trainSearch,
  onTrainSearchChange,
  busSearch,
  onBusSearchChange,
  hotelSearch,
  onHotelSearchChange,
  passengerNames,
  onPassengerNamesChange,
}) => {
  const destinationOptions = destinations;

  const renderFlightSearch = () => (
    <>
      <div className="search-row">
        <DestinationSearch label="From" value={flightSearch.fromCity} destinations={destinationOptions} onChange={(value) => onFlightSearchChange({ ...flightSearch, fromCity: value })} />
        <DestinationSearch label="To" value={flightSearch.toCity} destinations={destinationOptions} onChange={(value) => onFlightSearchChange({ ...flightSearch, toCity: value })} />
      </div>
      <div className="search-row">
        <DateSelector label="Departure" value={flightSearch.departureDate} onChange={(value) => onFlightSearchChange({ ...flightSearch, departureDate: value })} />
        <DateSelector label="Return" value={flightSearch.returnDate} onChange={(value) => onFlightSearchChange({ ...flightSearch, returnDate: value })} />
      </div>
      <div className="search-row">
        <PassengerSelector label="Passengers" count={flightSearch.passengers} onChange={(count) => onFlightSearchChange({ ...flightSearch, passengers: count })} />
        <div className="input-group">
          <label>Cabin class</label>
          <select value={flightSearch.cabinClass} onChange={(event) => onFlightSearchChange({ ...flightSearch, cabinClass: event.target.value })}>
            <option value="Economy">Economy</option>
            <option value="Premium Economy">Premium Economy</option>
            <option value="Business">Business</option>
            <option value="First">First</option>
          </select>
        </div>
      </div>
    </>
  );

  const renderTrainSearch = () => (
    <>
      <div className="search-row">
        <DestinationSearch label="From" value={trainSearch.fromCity} destinations={destinationOptions} onChange={(value) => onTrainSearchChange({ ...trainSearch, fromCity: value })} />
        <DestinationSearch label="To" value={trainSearch.toCity} destinations={destinationOptions} onChange={(value) => onTrainSearchChange({ ...trainSearch, toCity: value })} />
      </div>
      <div className="search-row">
        <DateSelector label="Travel Date" value={trainSearch.travelDate} onChange={(value) => onTrainSearchChange({ ...trainSearch, travelDate: value })} />
        <PassengerSelector label="Passengers" count={trainSearch.passengers} onChange={(count) => onTrainSearchChange({ ...trainSearch, passengers: count })} />
      </div>
      <div className="search-row">
        <div className="input-group">
          <label>Class</label>
          <select value={trainSearch.travelClass} onChange={(event) => onTrainSearchChange({ ...trainSearch, travelClass: event.target.value })}>
            <option value="Sleeper">Sleeper</option>
            <option value="AC 3 Tier">AC 3 Tier</option>
            <option value="AC 2 Tier">AC 2 Tier</option>
            <option value="AC Chair Car">AC Chair Car</option>
            <option value="Executive">Executive</option>
          </select>
        </div>
      </div>
    </>
  );

  const renderBusSearch = () => (
    <>
      <div className="search-row">
        <DestinationSearch label="From" value={busSearch.fromCity} destinations={destinationOptions} onChange={(value) => onBusSearchChange({ ...busSearch, fromCity: value })} />
        <DestinationSearch label="To" value={busSearch.toCity} destinations={destinationOptions} onChange={(value) => onBusSearchChange({ ...busSearch, toCity: value })} />
      </div>
      <div className="search-row">
        <DateSelector label="Travel Date" value={busSearch.travelDate} onChange={(value) => onBusSearchChange({ ...busSearch, travelDate: value })} />
        <PassengerSelector label="Passengers" count={busSearch.passengers} onChange={(count) => onBusSearchChange({ ...busSearch, passengers: count })} />
      </div>
      <div className="search-row">
        <div className="input-group">
          <label>Bus type</label>
          <select value={busSearch.busType} onChange={(event) => onBusSearchChange({ ...busSearch, busType: event.target.value })}>
            <option value="AC Sleeper">AC Sleeper</option>
            <option value="Volvo AC">Volvo AC</option>
            <option value="AC Seater">AC Seater</option>
            <option value="Sleeper AC">Sleeper AC</option>
            <option value="Non-AC">Non-AC</option>
          </select>
        </div>
      </div>
    </>
  );

  const renderHotelSearch = () => (
    <>
      <div className="search-row">
        <DestinationSearch label="Destination" value={hotelSearch.destination} destinations={destinationOptions} onChange={(value) => onHotelSearchChange({ ...hotelSearch, destination: value })} />
      </div>
      <div className="search-row">
        <DateSelector label="Check-in" value={hotelSearch.checkInDate} onChange={(value) => onHotelSearchChange({ ...hotelSearch, checkInDate: value })} />
        <DateSelector label="Check-out" value={hotelSearch.checkOutDate} onChange={(value) => onHotelSearchChange({ ...hotelSearch, checkOutDate: value })} />
      </div>
      <div className="search-row">
        <div className="input-group">
          <label>Rooms</label>
          <input type="number" min={1} value={hotelSearch.rooms} onChange={(event) => onHotelSearchChange({ ...hotelSearch, rooms: Number(event.target.value) || 1 })} />
        </div>
        <PassengerSelector label="Guests" count={hotelSearch.guests} onChange={(count) => onHotelSearchChange({ ...hotelSearch, guests: count })} />
      </div>
    </>
  );

  const renderPassengerFields = () => (
    <div className="passenger-list card-compact">
      <label>Passenger names</label>
      {Array.from({ length: mode === TravelMode.FLIGHT ? flightSearch.passengers : mode === TravelMode.TRAIN ? trainSearch.passengers : mode === TravelMode.BUS ? busSearch.passengers : hotelSearch.guests }, (_, index) => (
        <input
          key={index}
          type="text"
          placeholder={`Passenger ${index + 1}`}
          value={passengerNames[index] || ''}
          onChange={(event) => {
            const next = [...passengerNames];
            next[index] = event.target.value;
            onPassengerNamesChange(next);
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="card" style={{ marginBottom: 18 }}>
      {mode === TravelMode.FLIGHT && renderFlightSearch()}
      {mode === TravelMode.TRAIN && renderTrainSearch()}
      {mode === TravelMode.BUS && renderBusSearch()}
      {mode === TravelMode.HOTEL && renderHotelSearch()}
      {renderPassengerFields()}
    </div>
  );
};

export default TravelSearchPanel;
