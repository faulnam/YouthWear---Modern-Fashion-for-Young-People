import React, { useState, useMemo } from 'react';
import { Filter, Grid, List, SlidersHorizontal } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import { products } from '../data/products';

interface FilterState {
  category: string;
  size: string;
  color: string;
  material: string;
  brand: string;
  gender: string;
  priceRange: [number, number];
  onSale: boolean;
}

const ProductsPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [filters, setFilters] = useState<FilterState>({
    category: 'All',
    size: '',
    color: '',
    material: '',
    brand: '',
    gender: '',
    priceRange: [0, 2000000],
    onSale: false
  });

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // Category filter
      if (filters.category !== 'All' && product.category !== filters.category) {
        return false;
      }

      // Size filter
      if (filters.size && !product.sizes.includes(filters.size)) {
        return false;
      }

      // Color filter
      if (filters.color && !product.colors.includes(filters.color)) {
        return false;
      }

      // Material filter
      if (filters.material && product.material !== filters.material) {
        return false;
      }

      // Brand filter
      if (filters.brand && product.brand !== filters.brand) {
        return false;
      }

      // Gender filter
      if (filters.gender && product.gender !== filters.gender) {
        return false;
      }

      // Price range filter
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false;
      }

      // Sale filter
      if (filters.onSale && !product.isOnSale) {
        return false;
      }

      return true;
    });

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
      case 'newest':
      default:
        // Keep original order for newest
        break;
    }

    return filtered;
  }, [filters, sortBy]);

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      category: 'All',
      size: '',
      color: '',
      material: '',
      brand: '',
      gender: '',
      priceRange: [0, 2000000],
      onSale: false
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Products
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Showing {filteredProducts.length} of {products.length} products
            </p>
          </div>

          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span>Filters</span>
            </button>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            >
              <option value="newest">Newest</option>
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar */}
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={resetFilters}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🤷‍♀️</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Try adjusting your filters or search criteria
                </p>
                <button
                  onClick={resetFilters}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;