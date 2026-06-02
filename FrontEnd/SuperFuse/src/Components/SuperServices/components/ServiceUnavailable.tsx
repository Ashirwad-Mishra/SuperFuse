import React, { useState } from "react";
import "../styles/ServiceUnavailable.css";

interface ServiceUnavailableProps {
  serviceName: string;
  area: string;
  onNotifyMe: (email: string, phone: string) => void;
  onTryDifferentAddress: () => void;
  onBrowseServices: () => void;
  isLoading?: boolean;
}

export const ServiceUnavailable: React.FC<ServiceUnavailableProps> = ({
  serviceName,
  area,
  onNotifyMe,
  onTryDifferentAddress,
  onBrowseServices,
  isLoading = false,
}) => {
  const [showNotifyForm, setShowNotifyForm] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && phone) {
      onNotifyMe(email, phone);
      setShowNotifyForm(false);
    }
  };

  return (
    <div className="service-unavailable">
      <div className="unavailable-icon">🚫</div>
      <h2>Service Not Available</h2>
      <p className="unavailable-message">
        We're not serving {serviceName} in {area} yet
      </p>
      <p className="unavailable-subtext">
        But you can be among the first to know when we start!
      </p>

      {!showNotifyForm ? (
        <div className="unavailable-actions">
          <button
            className="btn-primary btn-large"
            onClick={() => setShowNotifyForm(true)}
          >
            🔔 Notify Me
          </button>
          <button
            className="btn-secondary btn-large"
            onClick={onTryDifferentAddress}
          >
            Try Different Address
          </button>
          <button
            className="btn-tertiary btn-large"
            onClick={onBrowseServices}
          >
            Browse Other Services
          </button>
        </div>
      ) : (
        <form onSubmit={handleNotifySubmit} className="notify-form">
          <h3>Get Notified When Available</h3>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              type="tel"
              placeholder="10-digit phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
              maxLength={10}
              required
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setShowNotifyForm(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={isLoading || !email || !phone}
            >
              {isLoading ? "Submitting..." : "Notify Me"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
