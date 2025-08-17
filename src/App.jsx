import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import VendorDashboard from './pages/VendorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import OrdersPage from './pages/OrdersPage';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onProductSelect={(product) => {
          setSelectedProduct(product);
          setCurrentPage('product');
        }} />;
      case 'product':
        return <ProductPage product={selectedProduct} onBack={() => setCurrentPage('home')} />;
      case 'cart':
        return <CartPage />;
      case 'vendor':
        return <VendorDashboard />;
      case 'admin':
        return <AdminDashboard />;
      case 'orders':
        return <OrdersPage />;
      default:
        return <HomePage onProductSelect={() => {}} />;
    }
  };

  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar currentPage={currentPage} onPageChange={setCurrentPage} />
          <main>
            {renderPage()}
          </main>
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;