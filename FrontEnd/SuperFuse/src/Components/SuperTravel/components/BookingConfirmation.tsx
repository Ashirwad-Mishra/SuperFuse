import React from 'react';
import type { TravelBooking } from '../interfaces/TravelBooking';
import { TravelMode } from '../enums/TravelMode';

interface BookingConfirmationProps {
  booking: TravelBooking;
}

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({ booking }) => {
  const provider = 'airline' in booking.selectedItem
    ? booking.selectedItem.airline
    : 'operatorName' in booking.selectedItem
      ? booking.selectedItem.operatorName
      : 'trainName' in booking.selectedItem
        ? booking.selectedItem.trainName
        : 'name' in booking.selectedItem
          ? (booking.selectedItem as any).name
          : '';
  const route = booking.mode === TravelMode.HOTEL ? booking.destination : `${booking.fromCity} → ${booking.toCity}`;
  return (
    <div className="card">
      <p className="details-label">Booking confirmed</p>
      <h2 style={{ marginTop: 10 }}>{booking.bookingId}</h2>
      <div className="result-row" style={{ justifyContent: 'space-between', margin: '14px 0' }}>
        <span className="badge">{booking.status.toUpperCase()}</span>
        <span className="details-value">Paid ₹{booking.total}</span>
      </div>
      <div style={{ display: 'grid', gap: 10 }}>
        <div className="details-row">
          <span className="details-label">Mode</span>
          <span className="details-value">{booking.mode}</span>
        </div>
        <div className="details-row">
          <span className="details-label">Provider</span>
          <span className="details-value">{provider}</span>
        </div>
        <div className="details-row">
          <span className="details-label">Route</span>
          <span className="details-value">{route}</span>
        </div>
        <div className="details-row">
          <span className="details-label">Dates</span>
          <span className="details-value">{booking.startDate}{booking.endDate ? ` — ${booking.endDate}` : ''}</span>
        </div>
        <div className="details-row">
          <span className="details-label">Contact</span>
          <span className="details-value">{booking.contactName} · {booking.contactPhone}</span>
        </div>
        <div className="details-row">
          <span className="details-label">Payment</span>
          <span className="details-value">{booking.paymentMethod}</span>
        </div>
      </div>
      <div className="card" style={{ marginTop: 18, padding: 16, background: '#eef2ff' }}>
        <div style={{ display: 'grid', gap: 8 }}>
          <span className="details-label">QR voucher</span>
          <div style={{ height: 120, background: '#c7d2fe', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3730a3' }}>
            Ticket voucher
          </div>
        </div>
      </div>
      <div className="result-row" style={{ gap: 10, marginTop: 16 }}>
        <button className="secondary" onClick={() => window.location.reload()} style={{ flex: 1 }}>
          Book another trip
        </button>
        <button className="secondary" onClick={() => alert('Viewing itinerary is not yet implemented in mock mode')} style={{ flex: 1 }}>
          View itinerary
        </button>
        <button className="primary" onClick={() => alert('Mock download started')} style={{ flex: 1 }}>
          Download ticket
        </button>
      </div>
    </div>
  );
};

export default BookingConfirmation;
