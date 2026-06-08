import { useNavigate } from 'react-router-dom';
import { useOrder } from '../context/OrderContext';

const OrderSummaryPage = () => {
  const navigate = useNavigate();
  const { session, orderItems, updateItemQuantity, removeItem, createOrder } = useOrder();

  if (!session || orderItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add items from the menu to get started</p>
          <button onClick={() => navigate('/menu')} className="btn-primary">
            Browse Menu
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

  const calculateItemTotal = (item: typeof orderItems[0]) => {
    const basePrice = item.product.price;
    const addOnsPrice = item.addOns.reduce((sum, addOn) => sum + addOn.price, 0);
    return (basePrice + addOnsPrice) * item.quantity;
  };

  const subtotal = orderItems.reduce((sum, item) => sum + calculateItemTotal(item), 0);
  const total = subtotal;

  const handleContinueToPayment = () => {
    createOrder();
    navigate('/payment');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center">
          <button
            onClick={() => navigate('/menu')}
            className="mr-4 text-2xl hover:bg-gray-100 p-2 rounded-full transition-colors"
          >
            ←
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Order Summary</h1>
            <p className="text-sm text-gray-600">Order #{session.queueNumber}</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Order Items */}
        <div className="space-y-4 mb-6">
          {orderItems.map((item, index) => (
            <div key={index} className="card p-4">
              <div className="flex gap-4">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {item.product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {formatPrice(item.product.price)}
                  </p>
                  {item.addOns.length > 0 && (
                    <div className="text-xs text-gray-500 mb-2">
                      Add-ons: {item.addOns.map(a => a.name).join(', ')}
                    </div>
                  )}
                  
                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateItemQuantity(item.product.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-lg font-bold transition-colors"
                    >
                      -
                    </button>
                    <span className="text-lg font-semibold text-gray-900 min-w-[2rem] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateItemQuantity(item.product.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full bg-primary-600 hover:bg-primary-700 text-white text-lg font-bold transition-colors"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="ml-auto text-red-500 hover:text-red-700 font-medium text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">
                    {formatPrice(calculateItemTotal(item))}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Price Summary */}
        <div className="card p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Price Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="border-t border-gray-200 pt-3 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-primary-600">{formatPrice(total)}</span>
            </div>
          </div>
        </div>

        {/* Add More Items Button */}
        <button
          onClick={() => navigate('/menu')}
          className="w-full mt-4 btn-secondary"
        >
          + Add More Items
        </button>
      </div>

      {/* Continue to Payment Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={handleContinueToPayment}
            className="btn-primary w-full flex items-center justify-between text-lg"
          >
            <span>Continue to Payment</span>
            <span>{formatPrice(total)}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryPage;
