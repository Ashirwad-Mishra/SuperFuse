import React from 'react';

interface PriceFilterProps {
  minPrice: number;
  maxPrice: number;
  onPriceChange: (min: number, max: number) => void;
}

const PriceFilter: React.FC<PriceFilterProps> = ({
  minPrice,
  maxPrice,
  onPriceChange,
}) => {
  const [localMin, setLocalMin] = React.useState(minPrice);
  const [localMax, setLocalMax] = React.useState(maxPrice);

  React.useEffect(() => {
    setLocalMin(minPrice);
    setLocalMax(maxPrice);
  }, [minPrice, maxPrice]);

  const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setLocalMin(value);
    if (value <= localMax) {
      onPriceChange(value, localMax);
    }
  };

  const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setLocalMax(value);
    if (value >= localMin) {
      onPriceChange(localMin, value);
    }
  };

  return (
    <div className="price-filter">
      <label className="price-filter-label">Price Range:</label>
      <div className="price-filter-inputs">
        <div className="price-filter-input-group">
          <label htmlFor="min-price">Min:</label>
          <input
            id="min-price"
            type="number"
            value={localMin}
            onChange={handleMinChange}
            className="price-filter-input"
          />
        </div>
        <div className="price-filter-input-group">
          <label htmlFor="max-price">Max:</label>
          <input
            id="max-price"
            type="number"
            value={localMax}
            onChange={handleMaxChange}
            className="price-filter-input"
          />
        </div>
      </div>
      <div className="price-filter-display">
        Rs {localMin.toFixed(0)} - Rs {localMax.toFixed(0)}
      </div>
    </div>
  );
};

export default PriceFilter;
