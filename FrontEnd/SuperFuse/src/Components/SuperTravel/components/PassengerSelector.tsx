import React from 'react';

interface PassengerSelectorProps {
  label: string;
  count: number;
  onChange: (count: number) => void;
}

const PassengerSelector: React.FC<PassengerSelectorProps> = ({ label, count, onChange }) => {
  return (
    <div className="input-group">
      <label>{label}</label>
      <input
        type="number"
        min={1}
        value={count}
        onChange={(event) => onChange(Number(event.target.value) || 1)}
      />
    </div>
  );
};

export default PassengerSelector;
