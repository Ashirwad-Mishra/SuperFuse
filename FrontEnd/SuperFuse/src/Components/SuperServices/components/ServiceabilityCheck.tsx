import React from "react";
import "../styles/ServiceabilityCheck.css";

interface ServiceabilityCheckProps {
  serviceName: string;
  area: string;
}

export const ServiceabilityCheck: React.FC<ServiceabilityCheckProps> = ({
  serviceName,
  area,
}) => {
  return (
    <div className="serviceability-check">
      <div className="loading-container">
        <div className="spinner"></div>
        <h2>Checking Availability</h2>
        <p>Checking if {serviceName} is available in {area}...</p>
        <p className="loading-note">Usually takes 2-3 seconds</p>
      </div>
    </div>
  );
};
