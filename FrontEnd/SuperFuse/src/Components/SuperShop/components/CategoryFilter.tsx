import React from 'react';
import { productService } from '../services/productService';

interface CategoryFilterProps {
  onCategoryChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ onCategoryChange }) => {
  const [selectedCategory, setSelectedCategory] = React.useState('');
  const categories = productService.getCategories();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedCategory(value);
    onCategoryChange(value);
  };

  return (
    <div className="category-filter">
      <label htmlFor="category-select" className="category-filter-label">
        Category:
      </label>
      <select
        id="category-select"
        value={selectedCategory}
        onChange={handleChange}
        className="category-filter-select"
      >
        <option value="">All Categories</option>
        {categories.map(category => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
