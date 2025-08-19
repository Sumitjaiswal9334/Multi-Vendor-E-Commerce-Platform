import React, { useState } from 'react';
import { Package, Truck, CheckCircle, Clock, MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const OrdersPage = () => {
  const { isAuthenticated } = useAuth();
  const [activeFilter, setActiveFilter] = useState('all');

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please log in to view your orders</h2>
          <p className="text-gray-600">You need to be logged in to access your order history.</p>
        </div>
      </div>
    );
  }

  // Mock orders data
  const orders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'delivered',
      total: 89.99,
      items: [
        { name: 'Wireless Headphones', price: 89.99, quantity: 1, image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg' }
      ],
      tracking: 'TRK123456789',
      estimatedDelivery: '2024-01-20'
    },
    {
      id: 'ORD-002',
      date: '2024-01-12',
      status: 'shipped',
      total: 299.98,
      items: [
        { name: 'Smart Watch', price: 199.99, quantity: 1, image: 'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg' },
        { name: 'Charging Cable', price: 19.99, quantity: 5, image: 'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg' }
      ],
      tracking: 'TRK987654321',
      estimatedDelivery: '2024-01-18'
    },
    {
      id: 'ORD-003',
      date: '2024-01-10',
      status: 'processing',
      total: 49.99,
      items: [
        { name: 'Bluetooth Speaker', price: 49.99, quantity: 1, image: 'https://images.pexels.com/photos/3394664/pexels-photo-3394664.jpeg' }
      ],
      tracking: null,
      estimatedDelivery: '2024-01-17'
    }
  ];

  const statusConfig = {
    processing: { label: 'Processing', icon: Clock, color: 'yellow' },
    shipped: { label: 'Shipped', icon: Truck, color: 'blue' },
    delivered: { label: 'Delivered', icon: CheckCircle, color: 'green' }
  };

  const filters = ['all', 'processing', 'shipped', 'delivered'];

  const filteredOrders = orders.filter(order => 
    activeFilter === 'all' || order.status === activeFilter
  );

  const getStatusIcon = (status) => {
    const config = statusConfig[status];
    const Icon = config.icon;
    return <Icon className={`h-5 w-5 text-${config.color}-600`} />;
  };

  const getStatusColor = (status) => {
    const config = statusConfig[status];
    return `bg-${config.color}-100 text-${config.color}-800`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>

      {/* Filter Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                activeFilter === filter
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {filter} ({filter === 'all' ? orders.length : orders.filter(o => o.status === filter).length})
            </button>
          ))}
        </nav>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {filteredOrders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Order Header */}
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Order {order.id}</h3>
                    <p className="text-sm text-gray-600">Placed on {new Date(order.date).toLocaleDateString()}</p>
                  </div>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    <span className="ml-2">{statusConfig[order.status].label}</span>
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">${order.total}</p>
                  {order.tracking && (
                    <p className="text-sm text-gray-600">Tracking: {order.tracking}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="px-6 py-4">
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                    <p className="font-medium text-gray-900">${item.price}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Actions */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>Estimated delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}</span>
                </div>
                <div className="flex space-x-3">
                  {order.tracking && (
                    <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-200 flex items-center">
                      <Package className="h-4 w-4 mr-2" />
                      Track Package
                    </button>
                  )}
                  <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200">
                    View Details
                  </button>
                  {order.status === 'delivered' && (
                    <button className="bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-200">
                      Leave Review
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No orders found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {activeFilter === 'all' ? "You haven't placed any orders yet." : `No ${activeFilter} orders found.`}
          </p>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;