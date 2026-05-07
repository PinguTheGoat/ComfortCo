# ComfortCo - Premium Comfort Wear & Lifestyle

A modern e-commerce platform for premium comfort wear and lifestyle products, built with TanStack Router, React Query, and Tailwind CSS.

## 🚀 Features

- **Product Catalog** - Browse and search premium comfort wear products
- **Shopping Cart** - Add/remove items with real-time updates
- **Product Details** - Detailed product information with multiple images
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Type-Safe** - Full TypeScript support with strict type checking
- **Modern Architecture** - Organized folder structure with clear separation of concerns
- **Error Handling** - Error boundaries and centralized error management
- **SEO Optimized** - Meta tags and proper head management

## 📁 Project Structure

```
src/
├── api/                 # API service layer
│   ├── products.ts      # Product API calls
│   ├── orders.ts        # Order API calls
│   └── index.ts
├── components/
│   ├── features/        # Feature-specific components
│   ├── layout/          # Layout components
│   └── ui/              # Reusable UI components (from shadcn)
├── constants/           # Application constants
├── contexts/            # React contexts
├── data/                # Static data
├── hooks/               # Custom React hooks
├── lib/                 # Library utilities
├── routes/              # TanStack Router routes
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
│   ├── formatting.ts    # Format utilities
│   ├── validation.ts    # Validation utilities
│   └── index.ts
├── styles/              # Global styles
├── assets/              # Static assets (images, icons)
└── router.tsx           # Router configuration
```

## 🛠️ Installation

```bash
# Install dependencies
bun install

# Create local environment file
cp .env.example .env.local
```

## 📝 Environment Variables

Create a `.env.local` file in the root directory:

```bash
VITE_APP_NAME=ComfortCo
VITE_APP_VERSION=1.0.0
VITE_ENV=development
```

See `.env.example` for all available variables.

## 🏃 Running the Project

```bash
# Development server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview

# Run linter
bun run lint

# Format code
bun run format
```

## 📦 Core Dependencies

- **@tanstack/react-router** - Modern routing solution
- **@tanstack/react-query** - Server state management
- **react-hook-form** - Efficient form management
- **zod** - TypeScript-first schema validation
- **tailwindcss** - Utility-first CSS framework
- **shadcn/ui** - High-quality component library
- **sonner** - Toast notifications

## 🎨 UI Components

All UI components are from [shadcn/ui](https://ui.shadcn.com/), built on Radix UI. Located in `src/components/ui/`.

## 🔒 Type Safety

The project uses strict TypeScript configuration. All shared types are defined in `src/types/index.ts`:

- `Product` - Product information
- `CartItem` - Shopping cart item
- `Order` - Order details
- `User` - User information
- `ApiResponse` - Standard API response format

## 📚 Utilities

### Formatting (`src/utils/formatting.ts`)

- `formatPrice()` - Format price with currency
- `formatDate()` - Format date to readable string
- `capitalize()` - Capitalize first letter
- `slugify()` - Convert to URL-safe string
- `truncate()` - Truncate string with ellipsis

### Validation (`src/utils/validation.ts`)

- `isValidEmail()` - Email validation
- `isValidPhone()` - Phone number validation
- `isValidPrice()` - Price validation
- `isValidQuantity()` - Quantity validation

## 🔧 API Services

API services are organized by feature in `src/api/`:

### Products (`src/api/products.ts`)

- `getProducts()` - Fetch all products
- `getProductBySlug()` - Fetch single product
- `searchProducts()` - Search products

### Orders (`src/api/orders.ts`)

- `createOrder()` - Create new order
- `getUserOrders()` - Fetch user orders
- `getOrder()` - Fetch single order

**Note:** API endpoints are placeholders. Replace with actual backend URLs in `.env.local`.

## 🎯 Constants

All application constants are defined in `src/constants/index.ts`:

- App info (name, version, description)
- Routes
- Pricing (currency, tax rate, shipping)
- Product sizes and categories
- Messages and notifications
- API endpoints
- Local storage keys
- Cache durations

## 🚨 Error Handling

The `ErrorBoundary` component catches React errors and prevents full app crashes:

```tsx
import { ErrorBoundary } from "@/components/ErrorBoundary";

<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>;
```

## 🧪 Testing

Testing setup is ready with:

- Vitest (unit/integration tests)
- React Testing Library

To add tests, create files alongside components:

```
src/components/ProductCard.tsx
src/components/ProductCard.test.tsx
```

## 📱 Responsive Design

The project is mobile-first using Tailwind CSS. Test across devices:

- Mobile: 375px - 600px
- Tablet: 600px - 1024px
- Desktop: 1024px+

## 🤝 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for development guidelines.

## 📄 License

This project is private and proprietary to ComfortCo.

## 🚀 Deployment

The project uses Cloudflare integration (`@cloudflare/vite-plugin`). Deploy with:

```bash
bun run build
# Deploy to Cloudflare Pages or Workers
```

## 📞 Support

For issues or questions, contact the development team.
