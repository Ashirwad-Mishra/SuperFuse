import React from 'react';
import './Navbar.css';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/">theSuperFuse</a>
      </div>
      <ul className="navbar-links">
        <li><a href="/">Home</a></li>
        <li><a href="/payment">Super Payment</a></li>
        <li><a href="/shop">Super Shop</a></li>
        <li><a href="/travel">Super Travel</a></li>
        <li><a href="/food">Super Food</a></li>
        <li><a href="/services">Super Services</a></li>
        <li><a href="/movies">Movie Booking</a></li>
      </ul>

      {/* This section is now much simpler */}
      <div className="navbar-auth-section">
        <a href="/profile" className="profile-link">Profile</a>
      </div>
    </nav>
  );
};

export default Navbar;