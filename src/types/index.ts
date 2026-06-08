export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'coffee' | 'non-coffee' | 'food';
  available: boolean;
}

export interface AddOn {
  id: string;
  name: string;
  price: number;
}

export interface OrderItem {
  product: Product;
  quantity: number;
  addOns: AddOn[];
}

export interface Order {
  orderNumber: number;
  items: OrderItem[];
  subtotal: number;
  total: number;
  status: OrderStatus;
  qrCode: string;
  qrCodeExpiry: Date;
  paymentMethod: 'qris';
}

export type OrderStatus = 'waiting-payment' | 'in-progress' | 'ready' | 'completed';

export interface QRSession {
  id: string;
  queueNumber: number;
  createdAt: Date;
  expiresAt: Date;
  isValid: boolean;
}
