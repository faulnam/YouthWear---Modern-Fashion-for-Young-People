import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2, ArrowLeft } from 'lucide-react';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { products } from '../data/products';

const WishlistPage: React.FC = () => {
  const { items, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            Please Login
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You need to be logged in to view your wishlist
          </p>
          <Link
            to="/login"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Login Now
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleAddToCart = (item: any) => {
    const product = products.find(p => p.id === item.id);
    if (product) {
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        size: product.sizes[0],
        color: product.colors[0]
      });
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <Heart className="h-24 w-24 text-gray-400 mx-auto mb-6" />
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
              Your wishlist is empty
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Save items you love to your wishlist and shop them later
            </p>
            <Link
              to="/products"
              className="inline-flex items-center space-x-2 bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Start Shopping</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              My Wishlist ❤️
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {items.length} item{items.length > 1 ? 's' : ''} saved for later
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/products"
              className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Continue Shopping</span>
            </Link>
            {items.length > 0 && (
              <button
                onClick={clearWishlist}
                className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
                <span>Clear All</span>
              </button>
            )}
          </div>
        </div>

        {/* Wishlist Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <div key={item.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-3 right-3 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:scale-110 transition-transform duration-200"
                >
                  <Heart className="h-4 w-4 text-red-500 fill-current" />
                </button>
              </div>

              <div className="p-4">
                <div className="mb-2">
                  <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900 px-2 py-1 rounded">
                    {item.category}
                  </span>
                </div>

                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                  {item.name}
                </h3>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    {formatPrice(item.price)}
                  </span>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span>Add to Cart</span>
                  </button>
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="bg-gray-200 dark:bg-gray-700 hover:bg-red-100 dark:hover:bg-red-900 text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 p-2 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                Ready to shop?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Add all your wishlist items to cart with one click
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  items.forEach(item => handleAddToCart(item));
                }}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Add All to Cart
              </button>
              <Link
                to="/products"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Discover More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;