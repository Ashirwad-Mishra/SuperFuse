import React from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = React.useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={handleChange}
        className="search-bar-input"
      />
      {query && (
        <button onClick={handleClear} className="search-bar-clear-btn">
          ✕
        </button>
      )}
      <span className="search-bar-icon">🔍</span>
    </div>
  );
};

export default SearchBar;
