import React, { useState, useEffect } from "react";
import type { Service } from "../interfaces/Service";
import { serviceService } from "../services/serviceService";
import "../styles/ServiceCategory.css";

interface ServiceCategoryProps {
  onSelectService: (service: Service) => void;
  isLoading?: boolean;
}

export const ServiceCategory: React.FC<ServiceCategoryProps> = ({
  onSelectService,
  isLoading: _isLoading = false,
}) => {
  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadServices = async () => {
      setLoading(true);
      try {
        const allServices = await serviceService.getAllServices();
        setServices(allServices);
        setFilteredServices(allServices);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    if (!query.trim()) {
      setFilteredServices(services);
      return;
    }

    const filtered = services.filter((service) =>
      service.name.toLowerCase().includes(query.toLowerCase()) ||
      service.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredServices(filtered);
  };

  if (loading) {
    return (
      <div className="service-category loading-state">
        <div className="spinner"></div>
        <p>Loading services...</p>
      </div>
    );
  }

  return (
    <div className="service-category">
      <div className="category-header">
        <h2>🔧 What service do you need?</h2>
        <p>Select a service to get started</p>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search services..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="search-input"
        />
        <span className="search-icon">🔍</span>
      </div>

      {filteredServices.length > 0 ? (
        <div className="services-grid">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="service-card"
              onClick={() => onSelectService(service)}
            >
              <div className="service-icon">{service.icon}</div>
              <h3>{service.name}</h3>
              <p className="description">{service.description}</p>
              <div className="service-meta">
                <span className="rating">⭐ {service.rating.toFixed(1)}</span>
                <span className="reviews">({service.reviewCount})</span>
              </div>
              <div className="price-range">
                ₹{service.priceRange.min} - ₹{service.priceRange.max}
              </div>
              <div className="duration">{service.estimatedDuration}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-results">
          <p>😅 No services found</p>
          <p className="secondary">Try searching for something else</p>
        </div>
      )}
    </div>
  );
};
