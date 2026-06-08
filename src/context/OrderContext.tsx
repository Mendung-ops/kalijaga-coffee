import React, { createContext, useContext, useState } from 'react';
import type { OrderItem, Order, OrderStatus, QRSession } from '../types';

interface OrderContextType {
  session: QRSession | null;
  orderItems: OrderItem[];
  order: Order | null;
  addItem: (item: OrderItem) => void;
  removeItem: (productId: string) => void;
  updateItemQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  createOrder: () => void;
  updateOrderStatus: (status: OrderStatus) => void;
  initSession: (qrId?: string) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<QRSession | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [order, setOrder] = useState<Order | null>(null);

  const initSession = (qrId?: string) => {
    // Simulate QR code validation and session creation
    const queueNumber = Math.floor(Math.random() * 20) + 1;
    const now = new Date();
    const expiry = new Date(now.getTime() + 60 * 60 * 1000); // 1 hour expiry
    
    const newSession: QRSession = {
      id: qrId || `qr-${Date.now()}`,
      queueNumber,
      createdAt: now,
      expiresAt: expiry,
      isValid: true,
    };
    
    setSession(newSession);
  };

  const addItem = (newItem: OrderItem) => {
    setOrderItems(prev => {
      const existingIndex = prev.findIndex(
        item => item.product.id === newItem.product.id &&
        JSON.stringify(item.addOns) === JSON.stringify(newItem.addOns)
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += newItem.quantity;
        return updated;
      }
      
      return [...prev, newItem];
    });
  };

  const removeItem = (productId: string) => {
    setOrderItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateItemQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    
    setOrderItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setOrderItems([]);
  };

  const createOrder = () => {
    if (!session || orderItems.length === 0) return;

    const subtotal = orderItems.reduce((sum, item) => {
      const itemPrice = item.product.price;
      const addOnsPrice = item.addOns.reduce((addOnSum, addOn) => addOnSum + addOn.price, 0);
      return sum + (itemPrice + addOnsPrice) * item.quantity;
    }, 0);

    const newOrder: Order = {
      orderNumber: session.queueNumber,
      items: orderItems,
      subtotal,
      total: subtotal,
      status: 'waiting-payment',
      qrCode: `QRIS-${Date.now()}`,
      qrCodeExpiry: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
      paymentMethod: 'qris',
    };

    setOrder(newOrder);
  };

  const updateOrderStatus = (status: OrderStatus) => {
    if (order) {
      setOrder({ ...order, status });
    }
  };

  return (
    <OrderContext.Provider
      value={{
        session,
        orderItems,
        order,
        addItem,
        removeItem,
        updateItemQuantity,
        clearCart,
        createOrder,
        updateOrderStatus,
        initSession,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within OrderProvider');
  }
  return context;
};
