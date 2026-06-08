import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useOrder } from '../context/OrderContext';
import type { Product } from '../types';

type CategoryFilter = 'all' | 'coffee' | 'non-coffee' | 'food';

const MenuPage = () => {
  const navigate = useNavigate();
  const { orderItems } = useOrder();
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState<CategoryFilter>('all');

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = category === 'all' || product.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, category]);

  const cartItemsCount = orderItems.reduce((sum, item) => sum + item.quantity, 0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Menu</h1>
              <p className="text-sm text-gray-600">Kalijaga Coffee & Bar</p>
            </div>
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">☕</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pr-10 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <span className="absolute right-3 top-3 text-xl">🔍</span>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white border-b border-gray-100 sticky top-[140px] z-10">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {[
              { value: 'all', label: 'All' },
              { value: 'coffee', label: 'Coffee' },
              { value: 'non-coffee', label: 'Non-Coffee' },
              { value: 'food', label: 'Food' },
            ].map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value as CategoryFilter)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  category === cat.value
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-600">Try adjusting your search or filter</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={() => navigate(`/product/${product.id}`)}
                formatPrice={formatPrice}
              />
            ))}
          </div>
        )}
      </div>

      {/* Cart Button */}
      {cartItemsCount > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
          <div className="max-w-2xl mx-auto">
            <button
              onClick={() => navigate('/order-summary')}
              className="btn-primary w-full flex items-center justify-between"
            >
              <span className="flex items-center">
                🛒 <span className="ml-2">View Order</span>
              </span>
              <span className="bg-white text-primary-600 px-3 py-1 rounded-lg font-bold">
                {cartItemsCount}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

interface ProductCardProps {
  product: Product;
  onSelect: () => void;
  formatPrice: (price: number) => string;
}

const ProductCard = ({ product, onSelect, formatPrice }: ProductCardProps) => {
  return (
    <button
      onClick={onSelect}
      disabled={!product.available}
      className={`card overflow-hidden text-left transition-transform hover:scale-105 ${
        !product.available ? 'opacity-60' : ''
      }`}
    >
      <div className="relative pb-[75%]">
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {!product.available && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Sold Out
            </span>
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{product.name}</h3>
        <p className="text-primary-600 font-bold">{formatPrice(product.price)}</p>
      </div>
    </button>
  );
};

export default MenuPage;
