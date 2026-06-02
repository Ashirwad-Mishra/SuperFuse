import React from 'react';

interface DateSelectorProps {
  label: string;
  value?: string;
  onChange: (value: string) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({ label, value = '', onChange }) => {
  return (
    <div className="input-group">
      <label>{label}</label>
      <input type="date" value={value} onChange={(event) => onChange(event.target.value)} />
    </div>
  );
};

export default DateSelector;
