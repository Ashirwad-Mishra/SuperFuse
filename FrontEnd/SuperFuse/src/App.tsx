import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your main components
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import SuperServices from './Components/SuperServices/SuperServices';
import Profile from './Components/profile/profile';

// --- Placeholder Components ---
const SuperPayment = () => <div style={{textAlign: 'center', padding: '50px'}}><h1>Super Payment Page</h1></div>;
const SuperShop = () => <div style={{textAlign: 'center', padding: '50px'}}><h1>Super Shop Page</h1></div>;
const SuperTravel = () => <div style={{textAlign: 'center', padding: '50px'}}><h1>Super Travel Page</h1></div>;
const SuperFood = () => <div style={{textAlign: 'center', padding: '50px'}}><h1>Super Food Page</h1></div>;
const MovieBooking = () => <div style={{textAlign: 'center', padding: '50px'}}><h1>Movie Booking Page</h1></div>;

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if a token exists in localStorage when the app loads
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          {/* Main pages */}
          <Route path="/" element={<Home />} />
          <Route path="/payment" element={<SuperPayment />} />
          <Route path="/shop" element={<SuperShop />} />
          <Route path="/travel" element={<SuperTravel />} />
          <Route path="/food" element={<SuperFood />} />
          <Route path="/services" element={<SuperServices />} />
          <Route path="/movies" element={<MovieBooking />} />
          
          {/* The Profile route now receives the function to update login state */}
          <Route 
            path="/profile" 
            element={<Profile isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;