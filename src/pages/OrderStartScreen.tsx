import { useNavigate } from 'react-router-dom';
import { useOrder } from '../context/OrderContext';

const OrderStartScreen = () => {
  const navigate = useNavigate();
  const { session } = useOrder();

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="card p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-4">Invalid QR Code</h2>
          <p className="text-gray-600 mb-6">
            This QR Code is no longer valid. Please ask the cashier to generate a new QR Code.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto mb-4 bg-primary-600 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-5xl">☕</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to Kalijaga
          </h1>
          <p className="text-gray-600">Coffee & Bar</p>
        </div>

        <div className="card p-8 mb-6">
          <div className="mb-6">
            <div className="inline-block bg-primary-100 rounded-full px-6 py-3">
              <p className="text-sm text-primary-600 font-semibold">You're in queue</p>
              <p className="text-4xl font-bold text-primary-700">#{session.queueNumber}</p>
            </div>
          </div>
          
          <p className="text-gray-700 text-lg mb-8">
            Ready to order? Let's get started!
          </p>

          <button
            onClick={() => navigate('/menu')}
            className="btn-primary w-full text-lg"
          >
            Order Now
          </button>
        </div>

        <p className="text-sm text-gray-500">
          Scan the QR code at your table to begin
        </p>
      </div>
    </div>
  );
};

export default OrderStartScreen;
