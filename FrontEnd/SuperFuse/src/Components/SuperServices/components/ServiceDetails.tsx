import React from "react";
import type { Service } from "../interfaces/Service";
import "../styles/ServiceDetails.css";

interface ServiceDetailsProps {
  service: Service;
  onBookService: () => void;
  onBack: () => void;
}

export const ServiceDetails: React.FC<ServiceDetailsProps> = ({
  service,
  onBookService,
  onBack,
}) => {
  return (
    <div className="service-details">
      <button className="btn-back" onClick={onBack}>
        ← Back
      </button>

      <div className="details-hero">
        <div className="hero-icon">{service.icon}</div>
        <h2>{service.name}</h2>
        <p className="description">{service.description}</p>

        <div className="rating-section">
          <span className="rating">⭐ {service.rating.toFixed(1)}</span>
          <span className="reviews">({service.reviewCount} reviews)</span>
        </div>
      </div>

      <div className="details-content">
        {/* What's Included */}
        <section className="detail-section">
          <h3>✅ What's Included</h3>
          <ul className="included-list">
            {service.whatIncluded.map((item, idx) => (
              <li key={idx}>
                <span className="check">✓</span> {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Pricing & Duration */}
        <section className="detail-section">
          <h3>💰 Pricing & Time</h3>
          <div className="pricing-info">
            <div className="info-card">
              <span className="label">Price Range</span>
              <span className="value">₹{service.priceRange.min} - ₹{service.priceRange.max}</span>
            </div>
            <div className="info-card">
              <span className="label">Estimated Duration</span>
              <span className="value">{service.estimatedDuration}</span>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="detail-section">
          <h3>❓ Frequently Asked Questions</h3>
          <div className="faq-list">
            {service.faq.map((item, idx) => (
              <details key={idx} className="faq-item">
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </div>

      <div className="details-footer">
        <button className="btn-primary btn-large" onClick={onBookService}>
          Book Service
        </button>
      </div>
    </div>
  );
};
