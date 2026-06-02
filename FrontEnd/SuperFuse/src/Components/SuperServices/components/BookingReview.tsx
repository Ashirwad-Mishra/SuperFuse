import React, { useState } from "react";
import type { Service } from "../interfaces/Service";
import type { ServiceAddress } from "../interfaces/ServiceAddress";
import type { TimeSlot } from "../interfaces/TimeSlot";
import { calculatePrice } from "../utils/priceCalculator";
import "../styles/BookingReview.css";

interface BookingReviewProps {
  service: Service;
  address: ServiceAddress;
  slot: TimeSlot;
  onConfirm: (additionalNotes: string) => void;
  onEdit: (field: "address" | "slot") => void;
  isLoading: boolean;
  error?: string;
}

export const BookingReview: React.FC<BookingReviewProps> = ({
  service,
  address,
  slot,
  onConfirm,
  onEdit,
  isLoading,
  error,
}) => {
  const [termsAccepted, setTermsAccepted] = useState(false);

  const pricing = calculatePrice(
    service.priceRange.min,
    slot.priceModifier || 1.0
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (termsAccepted) {
      onConfirm("");
    }
  };

  return (
    <div className="booking-review">
      <h2>📋 Review Your Booking</h2>

      <div className="review-sections">
        {/* Service Summary */}
        <div className="review-section">
          <div className="section-header">
            <h3>Service</h3>
          </div>
          <div className="section-content">
            <div className="info-row">
              <span className="label">Service Name</span>
              <span className="value">{service.name}</span>
            </div>
            <div className="info-row">
              <span className="label">Duration</span>
              <span className="value">{service.estimatedDuration}</span>
            </div>
          </div>
        </div>

        {/* Address Section */}
        <div className="review-section">
          <div className="section-header">
            <h3>Service Address</h3>
            <button
              type="button"
              className="btn-link"
              onClick={() => onEdit("address")}
            >
              Edit
            </button>
          </div>
          <div className="section-content">
            <div className="address-text">
              {address.houseNumber}, {address.buildingName && `${address.buildingName}, `}
              {address.street}, {address.area}, {address.city} - {address.pincode}
            </div>
            {address.landmark && (
              <div className="landmark">
                📍 Landmark: {address.landmark}
              </div>
            )}
          </div>
        </div>

        {/* Slot Section */}
        <div className="review-section">
          <div className="section-header">
            <h3>Scheduled Date & Time</h3>
            <button
              type="button"
              className="btn-link"
              onClick={() => onEdit("slot")}
            >
              Change
            </button>
          </div>
          <div className="section-content">
            <div className="slot-info">
              <strong>{slot.displayDate}</strong>
              <strong>{slot.displayTime}</strong>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="review-section pricing-section">
          <h3>Pricing Breakdown</h3>
          <div className="pricing-breakdown">
            <div className="price-row">
              <span>Service Charge</span>
              <span className="amount">₹{pricing.service}</span>
            </div>
            <div className="price-row">
              <span>Taxes (18%)</span>
              <span className="amount">₹{pricing.tax}</span>
            </div>
            <div className="price-row total">
              <span>Total</span>
              <span className="amount">₹{pricing.total}</span>
            </div>
            <p className="price-note">Payment after service completion</p>
          </div>
        </div>
      </div>

      {error && <div className="error-message">❌ {error}</div>}

      <form onSubmit={handleSubmit} className="confirmation-form">
        <div className="checkbox-group">
          <input
            id="terms"
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
          />
          <label htmlFor="terms">
            I agree to the terms and cancellation policy
          </label>
          <a href="#" className="terms-link">
            View details
          </a>
        </div>

        <button
          type="submit"
          disabled={!termsAccepted || isLoading}
          className="btn-primary btn-large"
        >
          {isLoading ? "Processing..." : "Confirm Booking"}
        </button>
      </form>
    </div>
  );
};
