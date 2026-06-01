import React from 'react';
import type { MovieBooking as MovieBookingType } from '../interfaces/MovieBooking';

interface BookingConfirmationProps {
  booking: MovieBookingType | null;
  onClose: () => void;
}

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({ booking, onClose }) => {
  if (!booking) {
    return null;
  }

  return (
    <div className="moviebooking-confirmation-overlay">
      <div className="moviebooking-confirmation-card">
        <h2>Booking Confirmed</h2>
        <p>Your tickets are booked successfully.</p>
        <div className="moviebooking-ticket-visual">
          <div className="moviebooking-ticket-qr">QR</div>
          <div>
            <strong>{booking.movie.title}</strong>
            <span>{booking.cinema.name}</span>
          </div>
        </div>
        <div className="moviebooking-confirmation-detail">
          <span>Booking ID</span>
          <strong>{booking.bookingId}</strong>
        </div>
        <div className="moviebooking-confirmation-detail">
          <span>Movie</span>
          <strong>{booking.movie.title}</strong>
        </div>
        <div className="moviebooking-confirmation-detail">
          <span>Cinema</span>
          <strong>{booking.cinema.name}</strong>
        </div>
        <div className="moviebooking-confirmation-detail">
          <span>Showtime</span>
          <strong>{booking.showtime.startsAt}</strong>
        </div>
        <div className="moviebooking-confirmation-detail">
          <span>Seats</span>
          <strong>{booking.selectedSeats.map((seat) => seat.id).join(', ')}</strong>
        </div>
        <div className="moviebooking-confirmation-detail">
          <span>Total Paid</span>
          <strong>Rs {booking.total.toFixed(2)}</strong>
        </div>
        <button type="button" className="moviebooking-primary-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default BookingConfirmation;
