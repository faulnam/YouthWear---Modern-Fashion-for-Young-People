export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  subcategory: string;
  sizes: string[];
  colors: string[];
  gender: 'male' | 'female' | 'unisex';
  material: string;
  brand: string;
  isOnSale: boolean;
  rating: number;
  reviews: number;
  description: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Oversized Streetwear T-Shirt',
    price: 299000,
    originalPrice: 399000,
    image: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'T-Shirt',
    subcategory: 'Oversized',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'White', 'Navy', 'Grey'],
    gender: 'unisex',
    material: 'Cotton',
    brand: 'UrbanStyle',
    isOnSale: true,
    rating: 4.8,
    reviews: 124,
    description: 'Premium oversized t-shirt perfect for streetwear style'
  },
  {
    id: '2',
    name: 'Premium Hoodie Essential',
    price: 549000,
    image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Hoodie',
    subcategory: 'Essential',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Grey', 'Maroon', 'Navy'],
    gender: 'unisex',
    material: 'Fleece',
    brand: 'ComfortZone',
    isOnSale: false,
    rating: 4.9,
    reviews: 89,
    description: 'Warm and comfortable hoodie for daily wear'
  },
  {
    id: '3',
    name: 'Denim Bomber Jacket',
    price: 799000,
    originalPrice: 999000,
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Jacket',
    subcategory: 'Bomber',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Blue', 'Black', 'White'],
    gender: 'unisex',
    material: 'Denim',
    brand: 'RebelWear',
    isOnSale: true,
    rating: 4.7,
    reviews: 56,
    description: 'Stylish denim bomber jacket with modern fit'
  },
  {
    id: '4',
    name: 'Cropped Tank Top',
    price: 199000,
    image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Crop Top',
    subcategory: 'Tank',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['White', 'Black', 'Pink', 'Beige'],
    gender: 'female',
    material: 'Cotton',
    brand: 'FemStyle',
    isOnSale: false,
    rating: 4.6,
    reviews: 78,
    description: 'Trendy cropped tank top for summer vibes'
  },
  {
    id: '5',
    name: 'Cargo Jogger Pants',
    price: 449000,
    image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Celana',
    subcategory: 'Jogger',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Khaki', 'Black', 'Olive', 'Brown'],
    gender: 'unisex',
    material: 'Cotton Blend',
    brand: 'UtilityWear',
    isOnSale: false,
    rating: 4.5,
    reviews: 92,
    description: 'Comfortable cargo joggers with multiple pockets'
  },
  {
    id: '6',
    name: 'Flannel Shirt Classic',
    price: 359000,
    originalPrice: 449000,
    image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Kemeja',
    subcategory: 'Flannel',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Red', 'Blue', 'Green', 'Black'],
    gender: 'unisex',
    material: 'Cotton Flannel',
    brand: 'ClassicWear',
    isOnSale: true,
    rating: 4.4,
    reviews: 67,
    description: 'Classic flannel shirt for casual and semi-formal occasions'
  },
  {
    id: '7',
    name: 'Mini Dress Casual',
    price: 429000,
    image: 'https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Dress',
    subcategory: 'Mini',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Black', 'White', 'Navy', 'Burgundy'],
    gender: 'female',
    material: 'Polyester',
    brand: 'ChicStyle',
    isOnSale: false,
    rating: 4.7,
    reviews: 45,
    description: 'Elegant mini dress perfect for casual outings'
  },
  {
    id: '8',
    name: 'Baseball Cap Urban',
    price: 159000,
    image: 'https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Accessories',
    subcategory: 'Hat',
    sizes: ['One Size'],
    colors: ['Black', 'White', 'Navy', 'Red'],
    gender: 'unisex',
    material: 'Cotton',
    brand: 'CapCo',
    isOnSale: false,
    rating: 4.3,
    reviews: 113,
    description: 'Classic baseball cap with adjustable strap'
  },
  {
    id: '9',
    name: 'High-Top Sneakers',
    price: 899000,
    originalPrice: 1099000,
    image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Footwear',
    subcategory: 'Sneakers',
    sizes: ['36', '37', '38', '39', '40', '41', '42', '43', '44'],
    colors: ['White', 'Black', 'Red', 'Blue'],
    gender: 'unisex',
    material: 'Canvas',
    brand: 'SneakZone',
    isOnSale: true,
    rating: 4.8,
    reviews: 156,
    description: 'Trendy high-top sneakers for everyday wear'
  },
  {
    id: '10',
    name: 'Windbreaker Jacket',
    price: 689000,
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Jacket',
    subcategory: 'Windbreaker',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Neon Yellow', 'Black', 'White', 'Orange'],
    gender: 'unisex',
    material: 'Nylon',
    brand: 'OutdoorPro',
    isOnSale: false,
    rating: 4.6,
    reviews: 74,
    description: 'Lightweight windbreaker perfect for outdoor activities'
  },
  {
    id: '11',
    name: 'Ripped Skinny Jeans',
    price: 529000,
    image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Celana',
    subcategory: 'Jeans',
    sizes: ['26', '27', '28', '29', '30', '31', '32', '33', '34'],
    colors: ['Blue', 'Black', 'Grey'],
    gender: 'unisex',
    material: 'Denim',
    brand: 'DenimCo',
    isOnSale: false,
    rating: 4.5,
    reviews: 98,
    description: 'Trendy ripped skinny jeans with perfect fit'
  },
  {
    id: '12',
    name: 'Crossbody Bag',
    price: 329000,
    originalPrice: 429000,
    image: 'https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Accessories',
    subcategory: 'Bag',
    sizes: ['One Size'],
    colors: ['Black', 'Brown', 'White', 'Pink'],
    gender: 'unisex',
    material: 'Synthetic Leather',
    brand: 'BagStyle',
    isOnSale: true,
    rating: 4.4,
    reviews: 82,
    description: 'Stylish crossbody bag for daily essentials'
  }
];

export const categories = [
  'All',
  'T-Shirt',
  'Hoodie',
  'Jacket',
  'Kemeja',
  'Crop Top',
  'Dress',
  'Celana',
  'Accessories',
  'Footwear'
];

export const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
export const colors = ['Black', 'White', 'Grey', 'Navy', 'Red', 'Blue', 'Pink', 'Green', 'Brown', 'Khaki'];
export const materials = ['Cotton', 'Fleece', 'Denim', 'Polyester', 'Canvas', 'Nylon'];
export const brands = ['UrbanStyle', 'ComfortZone', 'RebelWear', 'FemStyle', 'UtilityWear', 'ClassicWear'];