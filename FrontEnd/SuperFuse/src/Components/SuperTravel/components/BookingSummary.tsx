import React from 'react';
import { TravelMode } from '../enums/TravelMode';
import type { TravelBooking } from '../interfaces/TravelBooking';

interface BookingSummaryProps {
  mode: TravelMode;
  booking: TravelBooking | null;
  passengerCount: number;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({ mode, booking, passengerCount }) => {
  if (!booking) {
    return (
      <div className="card">
        <p className="details-label">Booking summary</p>
        <h2 style={{ marginTop: 10 }}>Select a travel option to preview summary</h2>
      </div>
    );
  }

  const provider = 'airline' in booking.selectedItem
    ? booking.selectedItem.airline
    : 'operatorName' in booking.selectedItem
      ? booking.selectedItem.operatorName
      : 'trainName' in booking.selectedItem
        ? booking.selectedItem.trainName
        : 'name' in booking.selectedItem
          ? booking.selectedItem.name
          : '';
  const route = booking.mode === TravelMode.HOTEL ? booking.destination : `${booking.fromCity} → ${booking.toCity}`;

  return (
    <div className="card">
      <p className="details-label">Booking summary</p>
      <h2 style={{ marginTop: 10, marginBottom: 6 }}>{route}</h2>
      <p className="details-value">{mode === TravelMode.HOTEL ? 'Hotel stay' : mode === TravelMode.FLIGHT ? 'Flight' : mode === TravelMode.TRAIN ? 'Train' : 'Bus'}</p>
      <div style={{ display: 'grid', gap: 10, marginTop: 16 }}>
        <div className="details-row">
          <span className="details-label">Provider</span>
          <span className="details-value">{provider}</span>
        </div>
        <div className="details-row">
          <span className="details-label">Dates</span>
          <span className="details-value">{booking.startDate}{booking.endDate ? ` — ${booking.endDate}` : ''}</span>
        </div>
        <div className="details-row">
          <span className="details-label">Passengers / guests</span>
          <span className="details-value">{passengerCount}</span>
        </div>
        <div className="details-row">
          <span className="details-label">Base price</span>
          <span className="details-value">₹{booking.subtotal}</span>
        </div>
        <div className="details-row">
          <span className="details-label">Taxes</span>
          <span className="details-value">₹{booking.taxes}</span>
        </div>
        <div className="details-row">
          <span className="details-label">Fees</span>
          <span className="details-value">₹{booking.fees}</span>
        </div>
        <div className="details-row">
          <span className="details-label">Discount</span>
          <span className="details-value">- ₹{booking.discount}</span>
        </div>
      </div>
      <div className="result-row" style={{ justifyContent: 'space-between', marginTop: 18 }}>
        <div>
          <p className="details-label">Grand total</p>
          <p className="details-value" style={{ fontSize: '1.5rem' }}>₹{booking.total}</p>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
