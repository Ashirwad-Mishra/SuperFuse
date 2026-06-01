import React from 'react';
import type { Cinema } from '../interfaces/Cinema';
import type { Movie } from '../interfaces/Movie';
import type { Showtime } from '../interfaces/Showtime';

interface BookingSummaryProps {
  movie: Movie | null;
  cinema: Cinema | null;
  showtime: Showtime | null;
  selectedSeats: string[];
  totalPrice: number;
  onClearSelection: () => void;
  onCheckout: () => void;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({
  movie,
  cinema,
  showtime,
  selectedSeats,
  totalPrice,
  onClearSelection,
  onCheckout,
}) => {
  return (
    <div className="moviebooking-summary-card">
      <h3>Booking Summary</h3>
      <div className="moviebooking-summary-row">
        <span>Movie</span>
        <strong>{movie?.title ?? 'Choose a movie'}</strong>
      </div>
      <div className="moviebooking-summary-row">
        <span>Cinema</span>
        <strong>{cinema?.name ?? 'Choose a cinema'}</strong>
      </div>
      <div className="moviebooking-summary-row">
        <span>Showtime</span>
        <strong>{showtime?.startsAt ?? 'Choose a showtime'}</strong>
      </div>
      <div className="moviebooking-summary-row">
        <span>Seats</span>
        <strong>{selectedSeats.length > 0 ? selectedSeats.join(', ') : 'No seats selected'}</strong>
      </div>
      <div className="moviebooking-summary-row moviebooking-total-row">
        <span>Total</span>
        <strong>Rs {totalPrice.toFixed(2)}</strong>
      </div>
      <div className="moviebooking-summary-actions">
        <button type="button" className="moviebooking-secondary-button" onClick={onClearSelection}>
          Clear selection
        </button>
        <button
          type="button"
          className="moviebooking-primary-button"
          onClick={onCheckout}
          disabled={!movie || !cinema || !showtime || selectedSeats.length === 0}
        >
          Continue to checkout
        </button>
      </div>
    </div>
  );
};

export default BookingSummary;
