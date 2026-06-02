import React, { useState } from "react";
import type { ServiceAddress } from "../interfaces/ServiceAddress";
import { validateAddress } from "../utils/addressValidator";
import "../styles/AddressEntry.css";

interface AddressEntryProps {
  onAddressSubmit: (address: ServiceAddress) => void;
  isLoading: boolean;
  error?: string;
}

export const AddressEntry: React.FC<AddressEntryProps> = ({
  onAddressSubmit,
  isLoading,
  error,
}) => {
  const [address, setAddress] = useState<ServiceAddress>({
    houseNumber: "",
    buildingName: "",
    street: "",
    area: "",
    city: "Bangalore",
    pincode: "",
  });

  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = (field: keyof ServiceAddress, value: string) => {
    setAddress((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (touched[field]) {
      validateField();
    }
  };

  const validateField = () => {
    const validation = validateAddress(address);
    setFormErrors(validation.errors);
  };

  const handleBlur = (field: keyof ServiceAddress) => {
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));
    validateField();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateAddress(address);
    if (!validation.isValid) {
      setFormErrors(validation.errors);
      return;
    }

    onAddressSubmit(address);
  };

  return (
    <div className="address-entry">
      <div className="address-header">
        <h2>📍 Service Address</h2>
        <p>We need your service address to show available time slots</p>
      </div>

      <form onSubmit={handleSubmit} className="address-form">
        <div className="form-group">
          <label htmlFor="houseNumber">House/Flat Number *</label>
          <input
            id="houseNumber"
            type="text"
            placeholder="e.g., 102, Apartment 5"
            value={address.houseNumber}
            onChange={(e) => handleChange("houseNumber", e.target.value)}
            onBlur={() => handleBlur("houseNumber")}
            className={touched.houseNumber ? "touched" : ""}
          />
        </div>

        <div className="form-group">
          <label htmlFor="buildingName">Building/Society Name</label>
          <input
            id="buildingName"
            type="text"
            placeholder="e.g., Shriram Nivas Society (Optional)"
            value={address.buildingName || ""}
            onChange={(e) => handleChange("buildingName", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="street">Street/Address Line *</label>
          <input
            id="street"
            type="text"
            placeholder="e.g., Plot 45, Main Road"
            value={address.street}
            onChange={(e) => handleChange("street", e.target.value)}
            onBlur={() => handleBlur("street")}
            className={touched.street ? "touched" : ""}
          />
        </div>

        <div className="form-group">
          <label htmlFor="area">Area/Locality *</label>
          <input
            id="area"
            type="text"
            placeholder="e.g., Whitefield, Koramangala"
            value={address.area}
            onChange={(e) => handleChange("area", e.target.value)}
            onBlur={() => handleBlur("area")}
            className={touched.area ? "touched" : ""}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="city">City *</label>
            <select
              id="city"
              value={address.city}
              onChange={(e) => handleChange("city", e.target.value)}
              className={touched.city ? "touched" : ""}
            >
              <option value="Bangalore">Bangalore</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Delhi">Delhi</option>
              <option value="Mumbai">Mumbai</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="pincode">Pincode *</label>
            <input
              id="pincode"
              type="text"
              placeholder="6 digits"
              maxLength={6}
              value={address.pincode}
              onChange={(e) => handleChange("pincode", e.target.value.replace(/\D/g, ""))}
              onBlur={() => handleBlur("pincode")}
              className={touched.pincode ? "touched" : ""}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="landmark">Landmark (Optional)</label>
          <input
            id="landmark"
            type="text"
            placeholder="e.g., Near Big Bazaar"
            value={address.landmark || ""}
            onChange={(e) => handleChange("landmark", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="specialInstructions">Special Instructions (Optional)</label>
          <textarea
            id="specialInstructions"
            placeholder="e.g., Doorbell doesn't work, call on arrival"
            value={address.specialInstructions || ""}
            onChange={(e) => handleChange("specialInstructions", e.target.value)}
            rows={3}
          />
        </div>

        {(formErrors.length > 0 || error) && (
          <div className="errors">
            {formErrors.map((err, idx) => (
              <div key={idx} className="error-item">
                ❌ {err}
              </div>
            ))}
            {error && <div className="error-item">❌ {error}</div>}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading || formErrors.length > 0}
          className="btn-primary btn-large"
        >
          {isLoading ? "Checking..." : "Continue"}
        </button>
      </form>
    </div>
  );
};
