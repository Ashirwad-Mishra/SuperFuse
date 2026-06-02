import React from 'react';
import { TravelMode } from '../enums/TravelMode';
import type { FlightFilterOptions, TrainFilterOptions, BusFilterOptions, HotelFilterOptions } from '../services/travelService';

interface TravelFilterBarProps {
  mode: TravelMode;
  flightFilters: FlightFilterOptions;
  onFlightFiltersChange: (filters: FlightFilterOptions) => void;
  trainFilters: TrainFilterOptions;
  onTrainFiltersChange: (filters: TrainFilterOptions) => void;
  busFilters: BusFilterOptions;
  onBusFiltersChange: (filters: BusFilterOptions) => void;
  hotelFilters: HotelFilterOptions;
  onHotelFiltersChange: (filters: HotelFilterOptions) => void;
}

const TravelFilterBar: React.FC<TravelFilterBarProps> = ({
  mode,
  flightFilters,
  onFlightFiltersChange,
  trainFilters,
  onTrainFiltersChange,
  busFilters,
  onBusFiltersChange,
  hotelFilters,
  onHotelFiltersChange,
}) => {
  const renderFlightFilters = () => (
    <div className="card card-compact">
      <div className="result-row">
        <div className="input-group">
          <label>Airlines</label>
          <select multiple value={flightFilters.airlines || []} onChange={(event) => {
            const values = Array.from(event.target.selectedOptions, (option) => option.value);
            onFlightFiltersChange({ ...flightFilters, airlines: values });
          }}>
            <option value="SuperAir">SuperAir</option>
            <option value="Indigo Sky">Indigo Sky</option>
            <option value="AirVista">AirVista</option>
            <option value="JetLoop">JetLoop</option>
            <option value="FlyMetro">FlyMetro</option>
          </select>
        </div>
        <div className="input-group">
          <label>Stops</label>
          <select multiple value={flightFilters.stops?.map(String) || []} onChange={(event) => {
            const values = Array.from(event.target.selectedOptions, (option) => Number(option.value));
            onFlightFiltersChange({ ...flightFilters, stops: values });
          }}>
            <option value="0">Non-stop</option>
            <option value="1">1 stop</option>
            <option value="2">2 stops</option>
          </select>
        </div>
        <div className="input-group">
          <label>Refundable</label>
          <select value={flightFilters.refundableOnly ? 'yes' : 'all'} onChange={(event) => onFlightFiltersChange({ ...flightFilters, refundableOnly: event.target.value === 'yes' })}>
            <option value="all">All</option>
            <option value="yes">Refundable only</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderTrainFilters = () => (
    <div className="card card-compact">
      <div className="result-row">
        <div className="input-group">
          <label>Train type</label>
          <select multiple value={trainFilters.trainTypes || []} onChange={(event) => {
            const values = Array.from(event.target.selectedOptions, (option) => option.value);
            onTrainFiltersChange({ ...trainFilters, trainTypes: values });
          }}>
            <option value="Express">Express</option>
            <option value="Superfast">Superfast</option>
            <option value="Intercity">Intercity</option>
            <option value="Premium">Premium</option>
          </select>
        </div>
        <div className="input-group">
          <label>Availability</label>
          <select value={trainFilters.availabilityOnly ? 'yes' : 'all'} onChange={(event) => onTrainFiltersChange({ ...trainFilters, availabilityOnly: event.target.value === 'yes' })}>
            <option value="all">All</option>
            <option value="yes">Available only</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderBusFilters = () => (
    <div className="card card-compact">
      <div className="result-row">
        <div className="input-group">
          <label>AC only</label>
          <select value={busFilters.acOnly ? 'yes' : 'all'} onChange={(event) => onBusFiltersChange({ ...busFilters, acOnly: event.target.value === 'yes' })}>
            <option value="all">All</option>
            <option value="yes">AC only</option>
          </select>
        </div>
        <div className="input-group">
          <label>Sleeper only</label>
          <select value={busFilters.sleeperOnly ? 'yes' : 'all'} onChange={(event) => onBusFiltersChange({ ...busFilters, sleeperOnly: event.target.value === 'yes' })}>
            <option value="all">All</option>
            <option value="yes">Sleeper only</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderHotelFilters = () => (
    <div className="card card-compact">
      <div className="result-row">
        <div className="input-group">
          <label>Guest rating</label>
          <select value={hotelFilters.guestRating4Plus ? '4plus' : 'all'} onChange={(event) => onHotelFiltersChange({ ...hotelFilters, guestRating4Plus: event.target.value === '4plus' })}>
            <option value="all">All</option>
            <option value="4plus">4+ only</option>
          </select>
        </div>
        <div className="input-group">
          <label>Free cancellation</label>
          <select value={hotelFilters.freeCancellation ? 'yes' : 'all'} onChange={(event) => onHotelFiltersChange({ ...hotelFilters, freeCancellation: event.target.value === 'yes' })}>
            <option value="all">All</option>
            <option value="yes">Free cancellation</option>
          </select>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ width: '100%' }}>
      {mode === TravelMode.FLIGHT && renderFlightFilters()}
      {mode === TravelMode.TRAIN && renderTrainFilters()}
      {mode === TravelMode.BUS && renderBusFilters()}
      {mode === TravelMode.HOTEL && renderHotelFilters()}
    </div>
  );
};

export default TravelFilterBar;
