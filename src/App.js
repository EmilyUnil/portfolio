import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Portfolio from './pages/Portfolio/Portfolio';
import FlowerShop from './pages/FlowerShop/FlowerShop';
import TourismAgency from './pages/TourismAgency/TourismAgency';
import SweetGifts from './pages/SweetGifts/SweetGifts';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/flower-shop" element={<FlowerShop />} />
        <Route path="/tourism-agency" element={<TourismAgency />} />
        <Route path="/sweet-gifts" element={<SweetGifts />} />
      </Routes>
    </Router>
  );
}

export default App;