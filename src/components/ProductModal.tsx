import React, { useState } from 'react';
import { X, Heart, ShoppingCart, Star, Minus, Plus } from 'lucide-react';
import { Product } from '../data/products';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  if (!isOpen) return null;

  const handleWishlistToggle = () => {
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

  const handleAddToCart = () => {
    if (!isAuthenticated) return;
    
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        size: selectedSize,
        color: selectedColor
      });
    }
    onClose();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const getColorStyle = (color: string) => ({
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
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-600">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Product Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 p-6">
          {/* Product Image */}
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg"
            />
            {product.isOnSale && (
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-md text-sm font-medium">
                SALE
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900 px-3 py-1 rounded">
                  {product.category}
                </span>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {product.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {product.description}
              </p>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-3">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-gray-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Product Details */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600 dark:text-gray-400">Brand:</span>
                <span className="ml-2 font-medium text-gray-900 dark:text-white">{product.brand}</span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Material:</span>
                <span className="ml-2 font-medium text-gray-900 dark:text-white">{product.material}</span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Gender:</span>
                <span className="ml-2 font-medium text-gray-900 dark:text-white capitalize">{product.gender}</span>
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                      selectedSize === size
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                        : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Color</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      selectedColor === color
                        ? 'border-blue-500 scale-110'
                        : 'border-gray-300 dark:border-gray-600 hover:scale-105'
                    }`}
                    style={getColorStyle(color)}
                    title={color}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400 mt-1 block">
                Selected: {selectedColor}
              </span>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Quantity</h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="text-lg font-medium text-gray-900 dark:text-white w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            {isAuthenticated ? (
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Add to Cart</span>
                </button>
                <button
                  onClick={handleWishlistToggle}
                  className={`px-6 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors ${
                    isInWishlist(product.id)
                      ? 'bg-red-50 dark:bg-red-900 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800'
                      : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                  <span>{isInWishlist(product.id) ? 'In Wishlist' : 'Add to Wishlist'}</span>
                </button>
              </div>
            ) : (
              <div className="pt-4">
                <p className="text-center text-gray-600 dark:text-gray-400 mb-4">
                  Please login to add items to cart or wishlist
                </p>
                <button
                  onClick={onClose}
                  className="w-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg font-medium"
                >
                  Login Required
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;