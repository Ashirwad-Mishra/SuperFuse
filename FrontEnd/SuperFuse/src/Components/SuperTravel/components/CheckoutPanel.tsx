import React, { useState } from 'react';
import type { TravelBooking } from '../interfaces/TravelBooking';

interface CheckoutPanelProps {
  booking: TravelBooking;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  passengerNames: string[];
  onContactNameChange: (value: string) => void;
  onContactPhoneChange: (value: string) => void;
  onContactEmailChange: (value: string) => void;
  onPassengerNamesChange: (names: string[]) => void;
  onConfirmBooking: (paymentMethod: string) => void;
}

const CheckoutPanel: React.FC<CheckoutPanelProps> = ({
  booking,
  contactName,
  contactPhone,
  contactEmail,
  passengerNames,
  onContactNameChange,
  onContactPhoneChange,
  onContactEmailChange,
  onPassengerNamesChange,
  onConfirmBooking,
}) => {
  const [paymentMethod, setPaymentMethod] = useState('SuperPay');
  const passengerCount = booking.passengers?.length || booking.guests || 1;
  const passengerInputs = Array.from({ length: passengerCount }, (_, index) => (
    <input
      key={index}
      type="text"
      value={passengerNames[index] || ''}
      placeholder={`Passenger ${index + 1} name`}
      onChange={(event) => {
        const next = [...passengerNames];
        next[index] = event.target.value;
        onPassengerNamesChange(next);
      }}
    />
  ));

  return (
    <div className="card">
      <p className="details-label">Checkout</p>
      <div className="input-group">
        <label>Traveler name</label>
        <input value={contactName} onChange={(event) => onContactNameChange(event.target.value)} placeholder="Your name" />
      </div>
      <div className="input-group">
        <label>Phone number</label>
        <input value={contactPhone} onChange={(event) => onContactPhoneChange(event.target.value)} placeholder="Phone" />
      </div>
      <div className="input-group">
        <label>Email address</label>
        <input value={contactEmail} onChange={(event) => onContactEmailChange(event.target.value)} placeholder="Email" />
      </div>
      <div className="input-group">
        <label>Passenger names</label>
        {passengerInputs}
      </div>
      <div className="input-group">
        <label>Payment method</label>
        <select value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value)}>
          <option value="SuperPay">SuperPay</option>
          <option value="Card">Card</option>
          <option value="UPI">UPI</option>
          <option value="Wallet">Wallet</option>
        </select>
      </div>
      <button className="primary" onClick={() => onConfirmBooking(paymentMethod)}>
        Place booking
      </button>
    </div>
  );
};

export default CheckoutPanel;
