import React from "react";
import type { ServiceBooking } from "../interfaces/ServiceBooking";
import "../styles/BookingConfirmation.css";

interface BookingConfirmationProps {
  booking: ServiceBooking;
  onViewDetails: () => void;
  onDone: () => void;
}

export const BookingConfirmation: React.FC<BookingConfirmationProps> = ({
  booking,
  onViewDetails,
  onDone,
}) => {
  return (
    <div className="booking-confirmation">
      <div className="confirmation-success">
        <div className="success-icon">✅</div>
        <h2>Booking Confirmed!</h2>
        <p className="confirmation-message">
          Your technician will contact you 30 minutes before arrival
        </p>
      </div>

      <div className="booking-info-card">
        <div className="reference-section">
          <label>Reference Number</label>
          <div className="reference-number">{booking.referenceNumber}</div>
          <button className="btn-copy" title="Copy reference number">
            📋 Copy
          </button>
        </div>

        <div className="divider"></div>

        <div className="booking-summary">
          <div className="summary-row">
            <span className="label">Service</span>
            <span className="value">{booking.serviceName}</span>
          </div>
          <div className="summary-row">
            <span className="label">Date & Time</span>
            <span className="value">
              {booking.selectedSlot.displayDate}, {booking.selectedSlot.displayTime}
            </span>
          </div>
          <div className="summary-row">
            <span className="label">Address</span>
            <span className="value address">
              {booking.address.houseNumber}, {booking.address.street}, {booking.address.area}
            </span>
          </div>
          <div className="summary-row">
            <span className="label">Estimated Cost</span>
            <span className="value amount">₹{booking.estimatedAmount}</span>
          </div>
        </div>

        <div className="divider"></div>

        <div className="next-steps">
          <h3>📌 What happens next?</h3>
          <ol>
            <li>Technician will be assigned within 24 hours</li>
            <li>You'll receive SMS with technician details</li>
            <li>Technician will call 30 minutes before arrival</li>
            <li>Service completion and payment</li>
          </ol>
        </div>
      </div>

      <div className="confirmation-actions">
        <button className="btn-secondary btn-large" onClick={onViewDetails}>
          View Booking Details
        </button>
        <button className="btn-primary btn-large" onClick={onDone}>
          Done
        </button>
      </div>

      <div className="share-section">
        <p>Need help? Contact Support: 1800-SUPER-FUSE</p>
      </div>
    </div>
  );
};
