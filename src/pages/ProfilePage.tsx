import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Calendar, Users, Edit2, Save, X, Package, Heart, ShoppingCart } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const { items: cartItems, totalAmount } = useCart();
  const { items: wishlistItems } = useWishlist();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user || { id: '', name: '', email: '', gender: '', age: 0 });
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleSave = () => {
    // In a real app, you would update the user data via API
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const mockOrders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'Delivered',
      total: 599000,
      items: 2
    },
    {
      id: 'ORD-002',
      date: '2024-01-20',
      status: 'Processing',
      total: 299000,
      items: 1
    },
    {
      id: 'ORD-003',
      date: '2024-01-25',
      status: 'Shipped',
      total: 899000,
      items: 3
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-2xl">{user.name.charAt(0).toUpperCase()}</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Welcome back, {user.name}! 👋
                </h1>
                <p className="text-gray-600 dark:text-gray-400">Manage your profile and orders</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Profile Information</h2>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                  >
                    <Edit2 className="h-4 w-4" />
                    <span>Edit</span>
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSave}
                      className="flex items-center space-x-2 bg-green-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-700 transition-colors"
                    >
                      <Save className="h-4 w-4" />
                      <span>Save</span>
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="flex items-center space-x-2 bg-gray-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-gray-700 transition-colors"
                    >
                      <X className="h-4 w-4" />
                      <span>Cancel</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <User className="inline h-4 w-4 mr-2" />
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedUser.name}
                      onChange={(e) => setEditedUser(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />
                  ) : (
                    <p className="text-gray-900 dark:text-white font-medium">{user.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Mail className="inline h-4 w-4 mr-2" />
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editedUser.email}
                      onChange={(e) => setEditedUser(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />
                  ) : (
                    <p className="text-gray-900 dark:text-white font-medium">{user.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Users className="inline h-4 w-4 mr-2" />
                    Gender
                  </label>
                  {isEditing ? (
                    <select
                      value={editedUser.gender}
                      onChange={(e) => setEditedUser(prev => ({ ...prev, gender: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  ) : (
                    <p className="text-gray-900 dark:text-white font-medium capitalize">{user.gender}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Calendar className="inline h-4 w-4 mr-2" />
                    Age
                  </label>
                  {isEditing ? (
                    <input
                      type="number"
                      value={editedUser.age}
                      onChange={(e) => setEditedUser(prev => ({ ...prev, age: parseInt(e.target.value) }))}
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      min="13"
                      max="100"
                    />
                  ) : (
                    <p className="text-gray-900 dark:text-white font-medium">{user.age} years old</p>
                  )}
                </div>
              </div>
            </div>

            {/* Order History */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <Package className="h-5 w-5 mr-2" />
                Order History
              </h2>
              <div className="space-y-4">
                {mockOrders.map((order) => (
                  <div key={order.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-4">
                        <h3 className="font-semibold text-gray-900 dark:text-white">{order.id}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{order.date}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {order.items} item{order.items > 1 ? 's' : ''}
                      </span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {formatPrice(order.total)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Stats</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
                      <ShoppingCart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Cart Items</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{cartItems.length}</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {formatPrice(totalAmount)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-red-100 dark:bg-red-900 p-2 rounded-lg">
                      <Heart className="h-5 w-5 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Wishlist</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{wishlistItems.length} items</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-100 dark:bg-green-900 p-2 rounded-lg">
                      <Package className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total Orders</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{mockOrders.length}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">🎉 Member Benefits</h3>
              <ul className="text-sm space-y-2 opacity-90">
                <li>• Free shipping on orders over Rp 500,000</li>
                <li>• Early access to sales</li>
                <li>• Exclusive member discounts</li>
                <li>• Birthday special offers</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;