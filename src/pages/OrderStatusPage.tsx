import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrder } from '../context/OrderContext';
import type { OrderStatus } from '../types';

const OrderStatusPage = () => {
  const navigate = useNavigate();
  const { order, updateOrderStatus } = useOrder();
  const [autoProgress, setAutoProgress] = useState(true);

  useEffect(() => {
    if (!order) {
      navigate('/menu');
      return;
    }

    // Auto-progress through statuses (demo)
    if (!autoProgress) return;

    const progressOrder = () => {
      if (order.status === 'waiting-payment') {
        setTimeout(() => updateOrderStatus('in-progress'), 3000);
      } else if (order.status === 'in-progress') {
        setTimeout(() => updateOrderStatus('ready'), 8000);
      } else if (order.status === 'ready') {
        setTimeout(() => updateOrderStatus('completed'), 5000);
      }
    };

    progressOrder();
  }, [order, updateOrderStatus, navigate, autoProgress]);

  if (!order) {
    return null;
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getStatusInfo = (status: OrderStatus) => {
    switch (status) {
      case 'waiting-payment':
        return {
          icon: '⏳',
          title: 'Waiting for Payment',
          description: 'Please complete your payment to start preparing your order',
          color: 'yellow',
        };
      case 'in-progress':
        return {
          icon: '👨‍��',
          title: 'Order In Progress',
          description: 'Your order is being prepared by our baristas',
          color: 'blue',
        };
      case 'ready':
        return {
          icon: '✅',
          title: 'Order Ready',
          description: 'Your order is ready! Please pick it up at the counter',
          color: 'green',
        };
      case 'completed':
        return {
          icon: '🎉',
          title: 'Order Completed',
          description: 'Thank you for your order! Enjoy your meal',
          color: 'primary',
        };
    }
  };

  const statusInfo = getStatusInfo(order.status);

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-gray-900">Order Status</h1>
          <p className="text-sm text-gray-600">Track your order progress</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Current Status */}
        <div className={`card p-8 text-center mb-6 border-2 border-${statusInfo.color}-200`}>
          <div className={`inline-block bg-${statusInfo.color}-100 rounded-full p-6 mb-4`}>
            <span className="text-6xl">{statusInfo.icon}</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {statusInfo.title}
          </h2>
          <p className="text-gray-600">
            {statusInfo.description}
          </p>
        </div>

        {/* Order Progress */}
        <div className="card p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">Order Progress</h3>
          <div className="space-y-4">
            {[
              { status: 'waiting-payment', label: 'Payment Pending' },
              { status: 'in-progress', label: 'Preparing Order' },
              { status: 'ready', label: 'Ready for Pickup' },
              { status: 'completed', label: 'Completed' },
            ].map((step, index) => {
              const isActive = order.status === step.status;
              const statusOrder = ['waiting-payment', 'in-progress', 'ready', 'completed'];
              const currentIndex = statusOrder.indexOf(order.status);
              const stepIndex = statusOrder.indexOf(step.status);
              const isCompleted = stepIndex < currentIndex;

              return (
                <div key={step.status} className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    isCompleted
                      ? 'bg-primary-600 text-white'
                      : isActive
                      ? 'bg-primary-600 text-white animate-pulse'
                      : 'bg-gray-200 text-gray-400'
                  }`}>
                    {isCompleted ? '✓' : index + 1}
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium ${
                      isActive || isCompleted ? 'text-gray-900' : 'text-gray-400'
                    }`}>
                      {step.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Details */}
        <div className="card p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">Order Details</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Order Number</span>
              <span className="font-semibold text-gray-900">#{order.orderNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Payment</span>
              <span className="font-semibold text-gray-900">{formatPrice(order.total)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment Method</span>
              <span className="font-semibold text-gray-900">QRIS</span>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="card p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Items</h3>
          <div className="space-y-3">
            {order.items.map((item, index) => (
              <div key={index} className="flex justify-between">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    {item.quantity}x {item.product.name}
                  </p>
                  {item.addOns.length > 0 && (
                    <p className="text-xs text-gray-500">
                      + {item.addOns.map(a => a.name).join(', ')}
                    </p>
                  )}
                </div>
                <p className="text-gray-600">
                  {formatPrice(
                    (item.product.price + item.addOns.reduce((sum, a) => sum + a.price, 0)) * item.quantity
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        {order.status === 'completed' && (
          <div className="mt-6 space-y-3">
            <button
              onClick={() => {
                // Reset and go back to start
                navigate('/');
              }}
              className="btn-primary w-full"
            >
              Place New Order
            </button>
          </div>
        )}

        {/* Demo Controls */}
        <div className="mt-6 card p-4 bg-blue-50 border-blue-200">
          <p className="text-xs text-blue-600 mb-3 text-center">Demo Controls</p>
          <div className="flex gap-2">
            <button
              onClick={() => updateOrderStatus('waiting-payment')}
              className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white text-xs py-2 rounded"
            >
              Payment
            </button>
            <button
              onClick={() => updateOrderStatus('in-progress')}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-xs py-2 rounded"
            >
              Progress
            </button>
            <button
              onClick={() => updateOrderStatus('ready')}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white text-xs py-2 rounded"
            >
              Ready
            </button>
            <button
              onClick={() => updateOrderStatus('completed')}
              className="flex-1 bg-primary-600 hover:bg-primary-700 text-white text-xs py-2 rounded"
            >
              Done
            </button>
          </div>
          <button
            onClick={() => setAutoProgress(!autoProgress)}
            className="w-full mt-2 bg-gray-600 hover:bg-gray-700 text-white text-xs py-2 rounded"
          >
            {autoProgress ? 'Disable' : 'Enable'} Auto Progress
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderStatusPage;
