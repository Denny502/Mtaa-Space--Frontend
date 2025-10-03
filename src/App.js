import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import SignupPopup from './components/Auth/SignupPopup';
import Home from './pages/Home/Home';
import RentalListings from './pages/RentalListings/RentalListings';
import PropertyDetail from './pages/PropertyDetail/PropertyDetail';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Support from './pages/Support/Support';
import Location from './pages/Location/Location';
import AgentDashboard from './pages/AgentDashboard/AgentDashboard';
import Favorites from './pages/Favorites/Favorites';
import Dashboard from './pages/Dashboard/Dashboard'; // This will work now

function App() {
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  return (
    <div className="App">
      <Header onSignupClick={() => setIsSignupOpen(true)} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rentals" element={<RentalListings />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/support" element={<Support />} />
          <Route path="/location" element={<Location />} />
          <Route path="/agent/dashboard" element={<AgentDashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/agent" element={<AgentDashboard />} />
        </Routes>
      </main>
      <Footer />
      <SignupPopup 
        isOpen={isSignupOpen} 
        onClose={() => setIsSignupOpen(false)} 
      />
    </div>
  );
}

export default App;