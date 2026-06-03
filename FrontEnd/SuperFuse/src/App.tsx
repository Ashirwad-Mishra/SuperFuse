import React, { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './Components/Navbar/Navbar';

const Home = lazy(() => import('./Components/Home/Home'));
const SuperServices = lazy(() => import('./Components/SuperServices/SuperServices'));
const Profile = lazy(() => import('./Components/profile/profile'));
const ProductServices = lazy(() => import('./Components/SuperShop/ProductServies/productServices'));
const SuperFood = lazy(() => import('./Components/SuperFood/SuperFood'));
const MovieBooking = lazy(() => import('./Components/MovieBooking/MovieBooking'));
const SuperTravel = lazy(() => import('./Components/SuperTravel/SuperTravel'));

const SuperPayment = () => <div style={{textAlign: 'center', padding: '50px'}}><h1>Super Payment Page</h1></div>;
const RouteLoader = () => (
  <div style={{ textAlign: 'center', padding: '50px' }}>
    <p>Loading...</p>
  </div>
);

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
        <Suspense fallback={<RouteLoader />}>
          <Routes>
            {/* Main pages */}
            <Route path="/" element={<Home />} />
            <Route path="/payment" element={<SuperPayment />} />
            <Route path="/shop" element={<ProductServices />} />
            <Route path="/travel" element={<SuperTravel />} />
            <Route path="/food" element={<SuperFood />} />
            <Route path="/services" element={<SuperServices customerId="demo-customer" />} />
            <Route path="/movies" element={<MovieBooking />} />
            <Route path="/product-services" element={<ProductServices />} />
            {/* The Profile route now receives the function to update login state */}
            <Route
              path="/profile"
              element={<Profile isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
            />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;
