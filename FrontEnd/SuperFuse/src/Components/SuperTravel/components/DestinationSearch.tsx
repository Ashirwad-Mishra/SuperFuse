import React from 'react';
import type { Destination } from '../interfaces/Destination';

interface DestinationSearchProps {
  label: string;
  value: string;
  destinations: Destination[];
  onChange: (value: string) => void;
}

const DestinationSearch: React.FC<DestinationSearchProps> = ({ label, value, destinations, onChange }) => {
  return (
    <div className="input-group">
      <label>{label}</label>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {destinations.map((destination) => (
          <option key={destination.id} value={destination.city}>
            {destination.city}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DestinationSearch;
