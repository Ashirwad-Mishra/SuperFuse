import React from 'react';

interface FoodSearchBarProps {
  query: string;
  onSearch: (value: string) => void;
}

const FoodSearchBar: React.FC<FoodSearchBarProps> = ({ query, onSearch }) => {
  return (
    <div className="superfood-search-bar">
      <input
        aria-label="Search restaurants or items"
        value={query}
        onChange={(event) => onSearch(event.target.value)}
        placeholder="Search restaurants, cuisines or dishes"
        className="superfood-search-input"
      />
    </div>
  );
};

export default FoodSearchBar;
