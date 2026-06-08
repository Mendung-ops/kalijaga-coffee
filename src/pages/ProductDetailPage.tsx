import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { products, addOns } from '../data/products';
import { useOrder } from '../context/OrderContext';
import type { AddOn } from '../types';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useOrder();
  
  const product = products.find(p => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <button onClick={() => navigate('/menu')} className="btn-primary">
            Back to Menu
          </button>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const toggleAddOn = (addOn: AddOn) => {
    setSelectedAddOns(prev => {
      const exists = prev.find(a => a.id === addOn.id);
      if (exists) {
        return prev.filter(a => a.id !== addOn.id);
      }
      return [...prev, addOn];
    });
  };

  const totalPrice = () => {
    const basePrice = product.price;
    const addOnsPrice = selectedAddOns.reduce((sum, addOn) => sum + addOn.price, 0);
    return (basePrice + addOnsPrice) * quantity;
  };

  const handleAddToOrder = () => {
    addItem({
      product,
      quantity,
      addOns: selectedAddOns,
    });
    navigate('/menu');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      {/* Header with Back Button */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center">
          <button
            onClick={() => navigate('/menu')}
            className="mr-4 text-2xl hover:bg-gray-100 p-2 rounded-full transition-colors"
          >
            ←
          </button>
          <h1 className="text-xl font-bold text-gray-900">Product Detail</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Product Image */}
        <div className="relative h-80 bg-gray-200">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="bg-white px-6 py-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h2>
          <p className="text-2xl font-bold text-primary-600 mb-4">
            {formatPrice(product.price)}
          </p>
          <p className="text-gray-600 leading-relaxed">{product.description}</p>
        </div>

        {/* Quantity Selector */}
        <div className="bg-white px-6 py-6 mt-2">
          <h3 className="font-semibold text-gray-900 mb-4">Quantity</h3>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 text-xl font-bold transition-colors"
            >
              -
            </button>
            <span className="text-2xl font-bold text-gray-900 min-w-[3rem] text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-12 h-12 rounded-full bg-primary-600 hover:bg-primary-700 text-white text-xl font-bold transition-colors"
            >
              +
            </button>
          </div>
        </div>

        {/* Add-ons */}
        {product.category !== 'food' && (
          <div className="bg-white px-6 py-6 mt-2">
            <h3 className="font-semibold text-gray-900 mb-4">Add-ons (Optional)</h3>
            <div className="space-y-3">
              {addOns.map((addOn) => (
                <button
                  key={addOn.id}
                  onClick={() => toggleAddOn(addOn)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                    selectedAddOns.find(a => a.id === addOn.id)
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedAddOns.find(a => a.id === addOn.id)
                        ? 'border-primary-600 bg-primary-600'
                        : 'border-gray-300'
                    }`}>
                      {selectedAddOns.find(a => a.id === addOn.id) && (
                        <span className="text-white text-sm">✓</span>
                      )}
                    </div>
                    <span className="font-medium text-gray-900">{addOn.name}</span>
                  </div>
                  <span className="text-gray-600 font-medium">
                    {addOn.price === 0 ? 'Free' : formatPrice(addOn.price)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Add to Order Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={handleAddToOrder}
            className="btn-primary w-full flex items-center justify-between text-lg"
          >
            <span>Add to Order</span>
            <span>{formatPrice(totalPrice())}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
