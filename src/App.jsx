import React, { useState } from 'react';
import Navbar from './components/Navbar';
import LoginModal from './components/LoginModal';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import VendorDashboard from './pages/VendorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import OrdersPage from './pages/OrdersPage';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';

const AppContent = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isAuthenticated, userRole } = useAuth();

  const handlePageChange = (page) => {
    // Check if user needs to be authenticated for certain pages
    const protectedPages = ['cart', 'orders', 'vendor', 'admin'];
    
    if (protectedPages.includes(page) && !isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    
    // Check role-specific access
    if (page === 'vendor' && userRole !== 'vendor') {
      alert('Access denied. Vendor account required.');
      return;
    }
    
    if (page === 'admin' && userRole !== 'admin') {
      alert('Access denied. Admin account required.');
      return;
    }
    
    setCurrentPage(page);
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setCurrentPage('product');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onProductSelect={handleProductSelect} />;
      case 'product':
        return <ProductPage product={selectedProduct} onBack={() => setCurrentPage('home')} />;
      case 'cart':
        if (!isAuthenticated) {
          setShowLoginModal(true);
          setCurrentPage('home');
          return <HomePage onProductSelect={handleProductSelect} />;
        }
        return <CartPage />;
      case 'vendor':
        if (!isAuthenticated || userRole !== 'vendor') {
          setCurrentPage('home');
          return <HomePage onProductSelect={handleProductSelect} />;
        }
        return <VendorDashboard />;
      case 'admin':
        if (!isAuthenticated || userRole !== 'admin') {
          setCurrentPage('home');
          return <HomePage onProductSelect={handleProductSelect} />;
        }
        return <AdminDashboard />;
      case 'orders':
        if (!isAuthenticated) {
          setShowLoginModal(true);
          setCurrentPage('home');
          return <HomePage onProductSelect={handleProductSelect} />;
        }
        return <OrdersPage />;
      default:
        return <HomePage onProductSelect={handleProductSelect} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        currentPage={currentPage} 
        onPageChange={handlePageChange}
        onLoginClick={() => setShowLoginModal(true)}
      />
      <main>
        {renderPage()}
      </main>
      
      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;