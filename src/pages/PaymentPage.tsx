import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { useOrder } from '../context/OrderContext';

const PaymentPage = () => {
  const navigate = useNavigate();
  const { order, updateOrderStatus } = useOrder();
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (!order) {
      navigate('/menu');
      return;
    }

    // Calculate initial time remaining
    const updateTimer = () => {
      const now = new Date().getTime();
      const expiry = new Date(order.qrCodeExpiry).getTime();
      const remaining = Math.max(0, Math.floor((expiry - now) / 1000));
      
      setTimeRemaining(remaining);
      
      if (remaining === 0) {
        setIsExpired(true);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [order, navigate]);

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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleDownloadQR = () => {
    const canvas = document.getElementById('payment-qr-code') as HTMLCanvasElement;
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `qris-order-${order.orderNumber}.png`;
      link.href = url;
      link.click();
    }
  };

  const simulatePayment = () => {
    // Simulate successful payment after 2 seconds
    setTimeout(() => {
      updateOrderStatus('in-progress');
      navigate('/order-status');
    }, 2000);
  };

  if (isExpired) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="card p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">⏰</div>
          <h2 className="text-2xl font-bold mb-4 text-red-600">QR Code Expired</h2>
          <p className="text-gray-600 mb-6">
            This QR Code has expired. Please ask the cashier for a new QR Code.
          </p>
          <button
            onClick={() => navigate('/menu')}
            className="btn-primary w-full"
          >
            Back to Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-gray-900">Payment</h1>
          <p className="text-sm text-gray-600">Order #{order.orderNumber}</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Payment Status */}
        <div className="card p-6 text-center mb-6">
          <div className="inline-block bg-yellow-100 rounded-full p-4 mb-4">
            <span className="text-4xl">⏳</span>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Waiting for Payment
          </h2>
          <p className="text-gray-600">
            Scan the QR code below to complete your payment
          </p>
        </div>

        {/* Timer */}
        {timeRemaining !== null && (
          <div className="card p-4 mb-6 text-center">
            <p className="text-sm text-gray-600 mb-1">Time Remaining</p>
            <p className={`text-3xl font-bold ${
              timeRemaining < 300 ? 'text-red-600' : 'text-primary-600'
            }`}>
              {formatTime(timeRemaining)}
            </p>
          </div>
        )}

        {/* QR Code */}
        <div className="card p-8 mb-6">
          <div className="text-center mb-4">
            <h3 className="font-semibold text-gray-900 mb-2">QRIS Payment</h3>
            <p className="text-2xl font-bold text-primary-600 mb-4">
              {formatPrice(order.total)}
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl border-4 border-primary-600 inline-block mx-auto">
            <QRCodeSVG
              id="payment-qr-code"
              value={order.qrCode}
              size={240}
              level="H"
              includeMargin={true}
            />
          </div>

          <button
            onClick={handleDownloadQR}
            className="btn-secondary w-full mt-6"
          >
            📥 Download QR Code
          </button>
        </div>

        {/* Payment Instructions */}
        <div className="card p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">How to Pay</h3>
          <ol className="space-y-2 text-sm text-gray-600">
            <li className="flex gap-3">
              <span className="font-bold text-primary-600">1.</span>
              <span>Open your mobile banking or e-wallet app</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-primary-600">2.</span>
              <span>Select QRIS payment option</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-primary-600">3.</span>
              <span>Scan the QR code above</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-primary-600">4.</span>
              <span>Confirm the payment amount</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-primary-600">5.</span>
              <span>Complete the transaction</span>
            </li>
          </ol>
        </div>

        {/* Demo Button - Remove in production */}
        <div className="card p-4 bg-blue-50 border-blue-200">
          <p className="text-xs text-blue-600 mb-2 text-center">Demo Mode</p>
          <button
            onClick={simulatePayment}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Simulate Payment Success
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
