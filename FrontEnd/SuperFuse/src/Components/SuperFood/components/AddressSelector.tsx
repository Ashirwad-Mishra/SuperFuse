import React from 'react';

interface AddressSelectorProps {
  address: string;
  onChange: (value: string) => void;
}

const AddressSelector: React.FC<AddressSelectorProps> = ({ address, onChange }) => {
  return (
    <div className="superfood-filter-block">
      <label className="superfood-filter-title" htmlFor="delivery-address">
        Delivery address
      </label>
      <textarea
        id="delivery-address"
        className="superfood-address-input"
        value={address}
        onChange={(event) => onChange(event.target.value)}
        rows={3}
        placeholder="Enter delivery address"
      />
    </div>
  );
};

export default AddressSelector;
