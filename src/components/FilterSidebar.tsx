import React from 'react';
import { X, RotateCcw } from 'lucide-react';
import { categories, sizes, colors, materials, brands } from '../data/products';

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

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: any) => void;
  onResetFilters: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  isOpen,
  onClose
}) => {
  const sidebarClasses = `
    fixed inset-y-0 left-0 z-50 w-80 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 overflow-y-auto
    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    lg:relative lg:translate-x-0 lg:block lg:w-64
  `;

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
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <div className={sidebarClasses}>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Filters</h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={onResetFilters}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                title="Reset Filters"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
              <button
                onClick={onClose}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors lg:hidden"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Category</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <label key={category} className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    value={category}
                    checked={filters.category === category}
                    onChange={(e) => onFilterChange('category', e.target.value)}
                    className="mr-3 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Size Filter */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Size</h3>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => onFilterChange('size', '')}
                className={`px-3 py-2 text-xs font-medium rounded-lg border transition-colors ${
                  filters.size === ''
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                    : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-400'
                }`}
              >
                All
              </button>
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => onFilterChange('size', size)}
                  className={`px-3 py-2 text-xs font-medium rounded-lg border transition-colors ${
                    filters.size === size
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                      : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Filter */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Color</h3>
            <div className="grid grid-cols-5 gap-2">
              <button
                onClick={() => onFilterChange('color', '')}
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs font-medium transition-all bg-gray-100 dark:bg-gray-700 ${
                  filters.color === ''
                    ? 'border-blue-500 scale-110'
                    : 'border-gray-300 dark:border-gray-600'
                }`}
              >
                All
              </button>
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => onFilterChange('color', color)}
                  className={`w-10 h-10 rounded-full border-2 transition-all ${
                    filters.color === color
                      ? 'border-blue-500 scale-110'
                      : 'border-gray-300 dark:border-gray-600 hover:scale-105'
                  }`}
                  style={getColorStyle(color)}
                  title={color}
                />
              ))}
            </div>
          </div>

          {/* Gender Filter */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Gender</h3>
            <div className="space-y-2">
              {['All', 'male', 'female', 'unisex'].map((gender) => (
                <label key={gender} className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value={gender === 'All' ? '' : gender}
                    checked={filters.gender === (gender === 'All' ? '' : gender)}
                    onChange={(e) => onFilterChange('gender', e.target.value)}
                    className="mr-3 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                    {gender === 'All' ? 'All' : gender}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Material Filter */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Material</h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="material"
                  value=""
                  checked={filters.material === ''}
                  onChange={(e) => onFilterChange('material', e.target.value)}
                  className="mr-3 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">All Materials</span>
              </label>
              {materials.map((material) => (
                <label key={material} className="flex items-center">
                  <input
                    type="radio"
                    name="material"
                    value={material}
                    checked={filters.material === material}
                    onChange={(e) => onFilterChange('material', e.target.value)}
                    className="mr-3 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{material}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Brand Filter */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Brand</h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="brand"
                  value=""
                  checked={filters.brand === ''}
                  onChange={(e) => onFilterChange('brand', e.target.value)}
                  className="mr-3 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">All Brands</span>
              </label>
              {brands.map((brand) => (
                <label key={brand} className="flex items-center">
                  <input
                    type="radio"
                    name="brand"
                    value={brand}
                    checked={filters.brand === brand}
                    onChange={(e) => onFilterChange('brand', e.target.value)}
                    className="mr-3 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{brand}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Price Range</h3>
            <div className="space-y-3">
              <input
                type="range"
                min="0"
                max="2000000"
                step="50000"
                value={filters.priceRange[1]}
                onChange={(e) => onFilterChange('priceRange', [0, parseInt(e.target.value)])}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                <span>Rp 0</span>
                <span>Rp {filters.priceRange[1].toLocaleString('id-ID')}</span>
              </div>
            </div>
          </div>

          {/* Sale Filter */}
          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.onSale}
                onChange={(e) => onFilterChange('onSale', e.target.checked)}
                className="mr-3 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">On Sale Only</span>
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;