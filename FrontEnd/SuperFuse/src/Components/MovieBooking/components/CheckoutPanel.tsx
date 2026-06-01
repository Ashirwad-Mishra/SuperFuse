import React from 'react';
import type { Cinema } from '../interfaces/Cinema';
import type { Movie } from '../interfaces/Movie';
import type { Showtime } from '../interfaces/Showtime';

interface CheckoutPanelProps {
  movie: Movie | null;
  cinema: Cinema | null;
  showtime: Showtime | null;
  selectedSeats: string[];
  buyerName: string;
  buyerPhone: string;
  buyerEmail: string;
  paymentMethod: MovieBookingPaymentMethod;
  onFieldChange: (field: string, value: string) => void;
  onBook: () => void;
}

export type MovieBookingPaymentMethod = 'SuperPay' | 'Card' | 'UPI' | 'Wallet';

const CheckoutPanel: React.FC<CheckoutPanelProps> = ({
  movie,
  cinema,
  showtime,
  selectedSeats,
  buyerName,
  buyerPhone,
  buyerEmail,
  paymentMethod,
  onFieldChange,
  onBook,
}) => {
  return (
    <div className="moviebooking-checkout-panel">
      <h3>Checkout</h3>
      <div className="moviebooking-checkout-info">
        <div>
          <span>Movie</span>
          <strong>{movie?.title ?? 'Select a movie'}</strong>
        </div>
        <div>
          <span>Cinema</span>
          <strong>{cinema?.name ?? 'Select a cinema'}</strong>
        </div>
        <div>
          <span>Showtime</span>
          <strong>{showtime?.startsAt ?? 'Select a showtime'}</strong>
        </div>
        <div>
          <span>Seats</span>
          <strong>{selectedSeats.length ? selectedSeats.join(', ') : 'Select seats'}</strong>
        </div>
      </div>
      <div className="moviebooking-checkout-form">
        <label>
          Name
          <input
            type="text"
            value={buyerName}
            placeholder="Enter your name"
            onChange={(event) => onFieldChange('buyerName', event.target.value)}
          />
        </label>
        <label>
          Phone
          <input
            type="tel"
            value={buyerPhone}
            placeholder="Enter phone number"
            onChange={(event) => onFieldChange('buyerPhone', event.target.value)}
          />
        </label>
        <label>
          Email
          <input
            type="email"
            value={buyerEmail}
            placeholder="Enter email address"
            onChange={(event) => onFieldChange('buyerEmail', event.target.value)}
          />
        </label>
        <label>
          Payment method
          <select
            value={paymentMethod}
            onChange={(event) => onFieldChange('paymentMethod', event.target.value)}
          >
            <option value="SuperPay">SuperPay</option>
            <option value="Card">Card</option>
            <option value="UPI">UPI</option>
            <option value="Wallet">Wallet</option>
          </select>
        </label>
        <button
          type="button"
          className="moviebooking-primary-button"
          onClick={onBook}
          disabled={!movie || !cinema || !showtime || selectedSeats.length === 0 || !buyerName || !buyerPhone || !buyerEmail}
        >
          Confirm booking
        </button>
      </div>
    </div>
  );
};

export default CheckoutPanel;
