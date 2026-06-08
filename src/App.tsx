import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { OrderProvider } from './context/OrderContext';
import SplashScreen from './pages/SplashScreen';
import OrderStartScreen from './pages/OrderStartScreen';
import MenuPage from './pages/MenuPage';
import ProductDetailPage from './pages/ProductDetailPage';
import OrderSummaryPage from './pages/OrderSummaryPage';
import PaymentPage from './pages/PaymentPage';
import OrderStatusPage from './pages/OrderStatusPage';

function App() {
  return (
    <Router>
      <OrderProvider>
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/start" element={<OrderStartScreen />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/order-summary" element={<OrderSummaryPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/order-status" element={<OrderStatusPage />} />
        </Routes>
      </OrderProvider>
    </Router>
  );
}

export default App;
