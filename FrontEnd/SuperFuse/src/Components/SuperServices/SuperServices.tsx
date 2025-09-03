import React from 'react';
import './SuperServices.css';

// Interface for our service category cards
interface ServiceCategoryProps {
  title: string;
  icon: string; // Using emoji for icons
  description: string;
}

const ServiceCategoryCard: React.FC<ServiceCategoryProps> = ({ title, icon, description }) => {
  return (
    <div className="category-card">
      <div className="category-icon">{icon}</div>
      <h3 className="category-title">{title}</h3>
      <p className="category-description">{description}</p>
      <button className="category-button">Book Now</button>
    </div>
  );
};

const SuperServices: React.FC = () => {
  const serviceCategories = [
    { title: 'Home Cleaning', icon: '🧹', description: 'Professional cleaning for a sparkling home.' },
    { title: 'Appliance Repair', icon: '🔧', description: 'Expert repairs for your home appliances.' },
    { title: 'Plumbing', icon: '💧', description: 'Reliable solutions for all your plumbing needs.' },
    { title: 'Beauty & Wellness', icon: '💅', description: 'Salon services and wellness at your doorstep.' },
    { title: 'Pest Control', icon: '🦟', description: 'Effective solutions to keep pests away.' },
    { title: 'Moving & Packing', icon: '📦', description: 'Hassle-free moving and packing services.' },
  ];

  return (
    <div className="super-services-container">
      <header className="services-hero">
        <h1>On-Demand Home Services</h1>
        <p>Your convenience is our priority. Book trusted professionals with a single tap.</p>
      </header>
      <main className="category-grid">
        {serviceCategories.map(category => (
          <ServiceCategoryCard key={category.title} {...category} />
        ))}
      </main>
    </div>
  );
};

export default SuperServices;
