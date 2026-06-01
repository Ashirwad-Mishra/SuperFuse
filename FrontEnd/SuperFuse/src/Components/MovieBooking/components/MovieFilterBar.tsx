import React from 'react';
import type { MovieGenre } from '../enums/MovieGenre';
import type { MovieLanguage } from '../enums/MovieLanguage';
import type { MovieFormat } from '../enums/MovieFormat';
import { MovieGenres } from '../enums/MovieGenre';
import { MovieLanguages } from '../enums/MovieLanguage';
import { MovieFormats } from '../enums/MovieFormat';
import type { ShowtimePeriod } from '../services/movieService';

interface MovieFilterBarProps {
  genre: MovieGenre | '';
  language: MovieLanguage | '';
  format: MovieFormat | '';
  nowShowingOnly: boolean;
  rating4Plus: boolean;
  period: ShowtimePeriod;
  maxPrice: string;
  onGenreChange: (value: MovieGenre | '') => void;
  onLanguageChange: (value: MovieLanguage | '') => void;
  onFormatChange: (value: MovieFormat | '') => void;
  onNowShowingChange: (value: boolean) => void;
  onRatingChange: (value: boolean) => void;
  onPeriodChange: (value: ShowtimePeriod) => void;
  onMaxPriceChange: (value: string) => void;
}

const MovieFilterBar: React.FC<MovieFilterBarProps> = ({
  genre,
  language,
  format,
  nowShowingOnly,
  rating4Plus,
  period,
  maxPrice,
  onGenreChange,
  onLanguageChange,
  onFormatChange,
  onNowShowingChange,
  onRatingChange,
  onPeriodChange,
  onMaxPriceChange,
}) => {
  return (
    <div className="moviebooking-filter-panel">
      <div className="moviebooking-filter-block">
        <label className="moviebooking-filter-title" htmlFor="filter-genre">Genre</label>
        <select
          id="filter-genre"
          value={genre}
          onChange={(event) => onGenreChange(event.target.value as MovieGenre | '')}
          className="moviebooking-filter-select"
        >
          <option value="">All genres</option>
          {MovieGenres.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </div>

      <div className="moviebooking-filter-block">
        <label className="moviebooking-filter-title" htmlFor="filter-language">Language</label>
        <select
          id="filter-language"
          value={language}
          onChange={(event) => onLanguageChange(event.target.value as MovieLanguage | '')}
          className="moviebooking-filter-select"
        >
          <option value="">All languages</option>
          {MovieLanguages.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </div>

      <div className="moviebooking-filter-block">
        <label className="moviebooking-filter-title" htmlFor="filter-format">Format</label>
        <select
          id="filter-format"
          value={format}
          onChange={(event) => onFormatChange(event.target.value as MovieFormat | '')}
          className="moviebooking-filter-select"
        >
          <option value="">All formats</option>
          {MovieFormats.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </div>

      <div className="moviebooking-filter-block moviebooking-checkbox-group">
        <label className="moviebooking-checkbox-label">
          <input type="checkbox" checked={nowShowingOnly} onChange={(event) => onNowShowingChange(event.target.checked)} />
          Now showing only
        </label>
        <label className="moviebooking-checkbox-label">
          <input type="checkbox" checked={rating4Plus} onChange={(event) => onRatingChange(event.target.checked)} />
          Rating 4.0+
        </label>
      </div>

      <div className="moviebooking-filter-block">
        <label className="moviebooking-filter-title" htmlFor="filter-period">Showtime</label>
        <select
          id="filter-period"
          value={period}
          onChange={(event) => onPeriodChange(event.target.value as ShowtimePeriod)}
          className="moviebooking-filter-select"
        >
          <option value="">Any time</option>
          <option value="morning">Morning</option>
          <option value="afternoon">Afternoon</option>
          <option value="evening">Evening</option>
          <option value="night">Night</option>
        </select>
      </div>

      <div className="moviebooking-filter-block">
        <label className="moviebooking-filter-title" htmlFor="filter-price">Max ticket price</label>
        <input
          id="filter-price"
          type="number"
          min="0"
          value={maxPrice}
          onChange={(event) => onMaxPriceChange(event.target.value)}
          placeholder="Rs max"
          className="moviebooking-filter-select"
        />
      </div>
    </div>
  );
};

export default MovieFilterBar;
