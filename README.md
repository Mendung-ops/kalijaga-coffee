# Kalijaga Coffee & Bar - Mobile Ordering System

A mobile-responsive web application for Kalijaga Coffee & Bar's digital ordering system.

## Features

- 📱 Mobile-first responsive design
- ☕ Coffee shop aesthetic with earthy green and white colors
- 🔍 Product search and category filtering
- 🛒 Shopping cart with quantity management
- 💳 QRIS payment integration (demo)
- �� Real-time order status tracking
- ⏰ QR code expiration with countdown timer
- 🎨 Clean and intuitive user interface

## User Flow

1. **Splash Screen** - Welcome screen with Kalijaga branding
2. **Order Start Screen** - Display queue number and welcome message
3. **Menu Page** - Browse products with search and category filters
4. **Product Detail Page** - View product details, select quantity, and add-ons
5. **Order Summary Page** - Review order and adjust quantities
6. **Payment Page** - QRIS payment with countdown timer
7. **Order Status Page** - Real-time order progress tracking

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite 8
- **Styling**: Tailwind CSS 4
- **Routing**: React Router DOM 7
- **QR Code**: qrcode.react
- **State Management**: React Context API

## Getting Started

### Installation

\`\`\`bash
npm install
\`\`\`

### Development

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

\`\`\`bash
npm run build
\`\`\`

### Preview Production Build

\`\`\`bash
npm run preview
\`\`\`

## Project Structure

\`\`\`
src/
├── components/        # Reusable UI components (if needed)
├── context/          # React Context for state management
│   └── OrderContext.tsx
├── data/             # Mock data
│   └── products.ts
├── pages/            # Application pages
│   ├── SplashScreen.tsx
│   ├── OrderStartScreen.tsx
│   ├── MenuPage.tsx
│   ├── ProductDetailPage.tsx
│   ├── OrderSummaryPage.tsx
│   ├── PaymentPage.tsx
│   └── OrderStatusPage.tsx
├── types/            # TypeScript type definitions
│   └── index.ts
├── App.tsx           # Main app component with routing
├── main.tsx          # Application entry point
└── index.css         # Global styles with Tailwind
\`\`\`

## Features Implementation

### Dynamic QR Code
- Each session generates a unique QR code
- QR codes expire after 15 minutes
- Countdown timer displays remaining time
- Expired QR codes show error message

### Order Management
- Add products to cart with customizable quantities
- Optional add-ons for drinks (Extra Shot, Oat Milk, etc.)
- Update quantities or remove items from cart
- Real-time price calculations

### Order Status Tracking
- **Waiting for Payment** - Payment pending
- **In Progress** - Order being prepared
- **Ready** - Order ready for pickup
- **Completed** - Order delivered

### Demo Features
- Simulated payment success button
- Auto-progress through order statuses
- Manual status control buttons (for demo purposes)

## Design

- **Color Palette**:
  - Primary Green: `#22c55e` (Tailwind green-500/600)
  - Coffee Brown: `#8b5e35`
  - White backgrounds with subtle shadows
  - Earthy accents

- **Typography**: System fonts optimized for readability
- **Layout**: Maximum width of 768px for optimal mobile viewing
- **Components**: Rounded corners (xl), modern card designs

## Testing the App

1. Start at the splash screen (root `/`)
2. View your queue number on the start screen
3. Browse the menu and search for items
4. Click on a product to see details
5. Add items to cart with optional add-ons
6. Review your order in the summary page
7. Proceed to payment and use the demo button
8. Track your order status in real-time

## Notes

- This is a demo/prototype application
- QR code validation is simulated
- Payment processing is simulated (demo mode)
- Order status auto-progression is for demo purposes
- In production, integrate with real backend APIs

## Future Enhancements

- Real backend API integration
- Actual QRIS payment gateway
- User authentication
- Order history
- Push notifications for order updates
- Admin dashboard for order management
- Analytics and reporting

## License

MIT License - Feel free to use this for your projects!
