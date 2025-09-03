import React from 'react';
import './Home.css';

// A simple interface for our service cards
interface ServiceCardProps {
  title: string;
  description: string;
  icon: string; // We'll use emoji or icons for simplicity
  link: string;
  color: string; // To add a splash of color to each card
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon, link, color }) => {
  return (
    <a href={link} className="service-card" style={{ borderBottomColor: color }}>
      <div className="service-card-icon" style={{ backgroundColor: color }}>{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
      <span className="service-card-link">Explore &rarr;</span>
    </a>
  );
};


const Home: React.FC = () => {
  const services = [
    { title: 'Super Payment', description: 'Seamless and secure payments for everything.', icon: '💳', link: '/payment', color: '#3498db' },
    { title: 'Super Shop', description: 'Your one-stop shop for millions of products.', icon: '🛍️', link: '/shop', color: '#e74c3c' },
    { title: 'Super Travel', description: 'Book flights, hotels, and experiences.', icon: '✈️', link: '/travel', color: '#9b59b6' },
    { title: 'Super Food', description: 'Order from your favorite local restaurants.', icon: '🍔', link: '/food', color: '#f1c40f' },
    { title: 'Super Services', description: 'Home cleaning, repairs, and more at your fingertips.', icon: '🛠️', link: '/services', color: '#2ecc71' },
    { title: 'Movie Booking', description: 'Get tickets for the latest blockbusters.', icon: '🎬', link: '/movies', color: '#e84393' },
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <header className="home-hero">
        <h1>Welcome to theSuperFuse</h1>
        <p className="hero-subtitle">One app for all your daily needs. Simplified.</p>
      </header>

      {/* Services Grid */}
      <main className="services-grid">
        {services.map(service => (
          <ServiceCard key={service.title} {...service} />
        ))}
      </main>
    </div>
  );
};

export default Home;