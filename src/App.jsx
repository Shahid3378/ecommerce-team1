// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Product from './pages/product.jsx'; // Product page
import ProductDetail from './pages/productDetail.jsx'; // Product detail page

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Route to show ProductsPage */}
        <Route path="/" element={<Product />} />

        {/* Route to show Product Details when a product is clicked */}
        <Route path="/product-detail/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
