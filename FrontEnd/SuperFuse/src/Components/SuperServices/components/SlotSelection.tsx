import React, { useState } from "react";
import type { TimeSlot } from "../interfaces/TimeSlot";
import { getAvailableDates } from "../utils/slotGenerator";
import { AvailabilityLevel } from "../enums/AvailabilityLevel";
import "../styles/SlotSelection.css";

interface SlotSelectionProps {
  slots: TimeSlot[];
  onSlotSelect: (slot: TimeSlot) => void;
  isLoading: boolean;
  error?: string;
}

export const SlotSelection: React.FC<SlotSelectionProps> = ({
  slots,
  onSlotSelect,
  isLoading,
  error,
}) => {
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const availableDates = getAvailableDates(slots);
  const filteredSlots = selectedDate
    ? slots.filter((s) => s.date === selectedDate)
    : slots.slice(0, 6);

  const handleSlotSelect = (slot: TimeSlot) => {
    if (selectedSlotId === slot.id) {
      setSelectedSlotId(null);
    } else {
      setSelectedSlotId(slot.id);
      onSlotSelect(slot);
    }
  };

  const getAvailabilityBadge = (level: AvailabilityLevel) => {
    switch (level) {
      case AvailabilityLevel.HIGH:
        return <span className="badge badge-high">✅ High availability</span>;
      case AvailabilityLevel.MEDIUM:
        return <span className="badge badge-medium">⚠️ Medium availability</span>;
      case AvailabilityLevel.LOW:
        return <span className="badge badge-low">🔴 Last slot available</span>;
      default:
        return <span className="badge badge-unavailable">❌ Unavailable</span>;
    }
  };

  return (
    <div className="slot-selection">
      <div className="slot-header">
        <h2>🗓️ When would you like the service?</h2>
        <p>Select your preferred date and time</p>
      </div>

      {availableDates.length > 0 && (
        <div className="date-selector">
          {availableDates.slice(0, 7).map((date) => (
            <button
              key={date}
              className={`date-btn ${selectedDate === date ? "active" : ""}`}
              onClick={() => setSelectedDate(date)}
            >
              {new Date(date).toLocaleDateString("en-IN", {
                month: "short",
                day: "numeric",
              })}
            </button>
          ))}
        </div>
      )}

      {error && <div className="error-message">❌ {error}</div>}

      {isLoading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading available slots...</p>
        </div>
      ) : filteredSlots.length > 0 ? (
        <div className="slots-grid">
          {filteredSlots.map((slot) => (
            <div
              key={slot.id}
              className={`slot-card ${selectedSlotId === slot.id ? "selected" : ""} ${
                slot.availabilityLevel === AvailabilityLevel.LOW ? "low-availability" : ""
              }`}
              onClick={() => handleSlotSelect(slot)}
            >
              <div className="slot-time">
                <strong>{slot.displayTime}</strong>
              </div>
              <div className="slot-availability">
                {getAvailabilityBadge(slot.availabilityLevel)}
              </div>
              {slot.priceModifier && slot.priceModifier > 1 && (
                <div className="slot-price">
                  <span className="price-modifier">Peak price: +{Math.round((slot.priceModifier - 1) * 100)}%</span>
                </div>
              )}
              {selectedSlotId === slot.id && (
                <div className="slot-selected">✓ Selected</div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="no-slots">
          <p>😅 No slots available for this date</p>
          <p className="secondary">Try selecting a different date</p>
        </div>
      )}

      {selectedSlotId && (
        <div className="slot-summary">
          <h3>Selected Slot</h3>
          <p>{slots.find((s) => s.id === selectedSlotId)?.displayTime}</p>
        </div>
      )}
    </div>
  );
};
