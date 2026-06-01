import React from 'react';
import type { CuisineType } from '../enums/CuisineType';
import { CuisineTypes } from '../enums/CuisineType';

interface CuisineFilterProps {
  selectedCuisine: CuisineType | '';
  onSelectCuisine: (value: CuisineType | '') => void;
}

const CUISINES: CuisineType[] = CuisineTypes;

const CuisineFilter: React.FC<CuisineFilterProps> = ({ selectedCuisine, onSelectCuisine }) => {
  return (
    <div className="superfood-filter-block">
      <div className="superfood-filter-title">Cuisine</div>
      <select
        className="superfood-filter-select"
        value={selectedCuisine}
        onChange={(event) => onSelectCuisine(event.target.value as CuisineType | '')}
      >
        <option value="">All cuisines</option>
        {CUISINES.map((cuisine) => (
          <option key={cuisine} value={cuisine}>
            {cuisine}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CuisineFilter;
