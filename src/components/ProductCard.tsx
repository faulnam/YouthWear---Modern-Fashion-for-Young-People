import React, { useState } from 'react';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';
import { Product } from '../data/products';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import ProductModal from './ProductModal';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) return;
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category
      });
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) return;
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: product.sizes[0],
      color: product.colors[0]
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <>
      <div className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1">
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center space-x-2"
            >
              <Eye className="h-4 w-4" />
              <span>Quick View</span>
            </button>
          </div>

          {/* Sale Badge */}
          {product.isOnSale && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-medium">
              SALE
            </div>
          )}

          {/* Wishlist Button */}
          {isAuthenticated && (
            <button
              onClick={handleWishlistToggle}
              className="absolute top-3 right-3 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:scale-110 transition-transform duration-200"
            >
              <Heart
                className={`h-4 w-4 ${
                  isInWishlist(product.id)
                    ? 'text-red-500 fill-current'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              />
            </button>
          )}
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900 px-2 py-1 rounded">
              {product.category}
            </span>
            <div className="flex items-center space-x-1">
              <Star className="h-3 w-3 text-yellow-400 fill-current" />
              <span className="text-xs text-gray-600 dark:text-gray-400">
                {product.rating} ({product.reviews})
              </span>
            </div>
          </div>

          <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
            {product.name}
          </h3>

          <div className="flex items-center space-x-2 mb-3">
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex space-x-1">
              {product.colors.slice(0, 4).map((color, index) => (
                <div
                  key={index}
                  className="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-600"
                  style={{
                    backgroundColor: color.toLowerCase() === 'white' ? '#ffffff' : 
                                   color.toLowerCase() === 'black' ? '#000000' :
                                   color.toLowerCase() === 'grey' ? '#6b7280' :
                                   color.toLowerCase() === 'navy' ? '#1e3a8a' :
                                   color.toLowerCase() === 'red' ? '#ef4444' :
                                   color.toLowerCase() === 'blue' ? '#3b82f6' :
                                   color.toLowerCase() === 'pink' ? '#ec4899' :
                                   color.toLowerCase() === 'green' ? '#10b981' :
                                   color.toLowerCase() === 'brown' ? '#a3755a' :
                                   color.toLowerCase() === 'khaki' ? '#d2b48c' :
                                   '#6b7280'
                  }}
                  title={color}
                />
              ))}
              {product.colors.length > 4 && (
                <span className="text-xs text-gray-500 ml-1">+{product.colors.length - 4}</span>
              )}
            </div>

            {isAuthenticated && (
              <button
                onClick={handleAddToCart}
                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors duration-200"
              >
                <ShoppingCart className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      <ProductModal
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default ProductCard;