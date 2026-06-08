import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrder } from '../context/OrderContext';

const SplashScreen = () => {
  const navigate = useNavigate();
  const { initSession } = useOrder();

  useEffect(() => {
    // Initialize session on splash screen
    const urlParams = new URLSearchParams(window.location.search);
    const qrId = urlParams.get('qr') || undefined;
    
    initSession(qrId);

    const timer = setTimeout(() => {
      navigate('/start');
    }, 2500);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center">
      <div className="text-center animate-pulse">
        <div className="w-32 h-32 mx-auto mb-6 bg-white rounded-full flex items-center justify-center shadow-2xl">
          <span className="text-5xl">☕</span>
        </div>
        <h1 className="text-4xl font-bold text-white mb-2">Kalijaga</h1>
        <p className="text-xl text-green-100">Coffee & Bar</p>
      </div>
    </div>
  );
};

export default SplashScreen;
