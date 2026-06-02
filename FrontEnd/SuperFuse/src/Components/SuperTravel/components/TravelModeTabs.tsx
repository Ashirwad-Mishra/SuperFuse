import React from 'react';
import { TravelMode } from '../enums/TravelMode';

interface TravelModeTabsProps {
  mode: TravelMode;
  onModeChange: (mode: TravelMode) => void;
}

const options = [
  { value: TravelMode.FLIGHT, label: 'Flights' },
  { value: TravelMode.TRAIN, label: 'Trains' },
  { value: TravelMode.BUS, label: 'Buses' },
  { value: TravelMode.HOTEL, label: 'Hotels' },
];

const TravelModeTabs: React.FC<TravelModeTabsProps> = ({ mode, onModeChange }) => {
  return (
    <div className="card result-grid" style={{ alignItems: 'center', marginBottom: 16 }}>
      {options.map((option) => (
        <button
          key={option.value}
          className={option.value === mode ? 'primary' : 'secondary'}
          onClick={() => onModeChange(option.value)}
          style={{ flex: 1, minWidth: 90 }}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default TravelModeTabs;
