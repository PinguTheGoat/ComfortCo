# Quick Start Guide - ComfortCo

Get up and running with ComfortCo in 5 minutes.

## Prerequisites

- Node.js 18+ or Bun 1.0+
- Git
- Terminal/Command prompt

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/comfortco.git
cd comfortco
```

### 2. Install Dependencies

```bash
bun install
```

### 3. Setup Environment

```bash
cp .env.example .env.local
```

### 4. Start Development Server

```bash
bun run dev
```

Visit [http://localhost:5173](http://localhost:5173) 🎉

## What You Get

### 📂 Folder Structure

- **`src/components/`** - React components (UI, features, layouts)
- **`src/routes/`** - Page components and routes
- **`src/api/`** - API service functions
- **`src/hooks/`** - Custom React hooks
- **`src/constants/`** - App-wide constants
- **`src/types/`** - TypeScript type definitions
- **`src/utils/`** - Utility functions

### 🛠️ Available Commands

```bash
# Development
bun run dev          # Start dev server

# Production
bun run build        # Build for production
bun run preview      # Preview production build

# Code Quality
bun run lint         # Check for linting errors
bun run format       # Format code with Prettier

# Testing
bun run test         # Run tests (when configured)
```

## Common Tasks

### Adding a New Product Feature

1. **Create API service** (`src/api/products.ts`):

```typescript
export async function getProducts() {
  // Fetch products
}
```

2. **Create component** (`src/components/features/ProductList.tsx`):

```tsx
import { getProducts } from "@/api/products";

export function ProductList() {
  // Component code
}
```

3. **Add route** (`src/routes/products.tsx`):

```tsx
import { createFileRoute } from "@tanstack/react-router";
import { ProductList } from "@/components/features/ProductList";

export const Route = createFileRoute("/products")({
  component: ProductList,
});
```

### Using the Cart

```tsx
import { useCart } from "@/hooks/useCart";

export function AddToCartButton({ product }) {
  const { addItem } = useCart();

  return <button onClick={() => addItem(product)}>Add to Cart</button>;
}
```

### Adding Custom Utilities

1. Create file in `src/utils/` (e.g., `src/utils/math.ts`)
2. Export from `src/utils/index.ts`
3. Import in components:

```typescript
import { myFunction } from "@/utils";
```

### Using Type Definitions

```tsx
import type { Product, CartItem } from "@/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  // Component
}
```

## Useful Resources

- 📖 [README.md](./README.md) - Full project documentation
- 🤝 [CONTRIBUTING.md](./CONTRIBUTING.md) - Development guidelines
- 🚀 [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment guide
- 🧪 [TESTING.md](./TESTING.md) - Testing guide

### Framework Documentation

- [TanStack Router](https://tanstack.com/router)
- [React Query](https://tanstack.com/query)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com/)

## Project Features

✅ **Modern Stack**

- React 18+
- TypeScript strict mode
- Vite for fast builds

✅ **Professional Setup**

- ESLint for code quality
- Prettier for formatting
- Error boundaries
- Type-safe API layer

✅ **Developer Experience**

- Path aliases (`@/` shortcuts)
- Hot module replacement
- Clear folder organization
- Comprehensive documentation

✅ **Production Ready**

- Cloudflare integration
- SEO meta tags
- Error handling
- Environment configuration

## Next Steps

1. **Explore Components**: Check `src/components/` for existing UI
2. **Review Examples**: Look at `src/routes/` for page patterns
3. **Customize Branding**: Update constants in `src/constants/index.ts`
4. **Setup API**: Configure backend URLs in `.env.local`
5. **Add Features**: Follow patterns in `CONTRIBUTING.md`

## Troubleshooting

### Port Already in Use

```bash
# Run on different port
bun run dev -- --port 3000
```

### Module Not Found

- Check import path (should use `@/` alias)
- Run `bun install` to ensure dependencies are installed
- Check TypeScript errors with `bunx tsc --noEmit`

### Styling Issues

- Make sure Tailwind classes are in template files
- Run `bun run format` to format code
- Check `src/styles.css` for global styles

### Git Issues

- Create `.gitignore` (already provided)
- Add environment files: `.env.local`, `.env.*.local`

## Getting Help

- Check documentation files (README, CONTRIBUTING)
- Search GitHub issues
- Review component examples
- Check ESLint errors for code issues

---

**Happy coding! 🚀**

For detailed documentation, see [README.md](./README.md)
