/\*\*

- Architecture Documentation - ComfortCo
-
- This file documents the overall architecture and design decisions
  \*/

## Architecture Overview

ComfortCo uses a modern, component-driven architecture with clear separation of concerns.

### Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Routing**: TanStack Router (v1)
- **State Management**: React Context + TanStack Query
- **Styling**: Tailwind CSS + shadcn/ui
- **Form Management**: React Hook Form + Zod
- **Build Tool**: Vite
- **Package Manager**: Bun
- **Deployment**: Cloudflare Pages / Workers

### Layered Architecture

```
┌─────────────────────────────────────────────┐
│           Routes (Page Level)               │ ← Routing with TanStack Router
├─────────────────────────────────────────────┤
│       Components (Features & UI)            │ ← React Components
├─────────────────────────────────────────────┤
│    Hooks & Context (State Management)       │ ← Custom Hooks, Context API, React Query
├─────────────────────────────────────────────┤
│    Services (API & Business Logic)          │ ← API clients, utilities, helpers
├─────────────────────────────────────────────┤
│    Types, Constants & Utils                 │ ← TypeScript types, app constants
└─────────────────────────────────────────────┘
```

### Data Flow

```
User Interaction
    ↓
Component (useCart, useQuery hooks)
    ↓
Custom Hook / React Query
    ↓
API Service (src/api/)
    ↓
Backend / Local Storage
    ↓
Response processed
    ↓
Component Re-renders
```

### Folder Structure Explained

```
src/
├── api/                    # API service layer
│   ├── products.ts         # Product endpoints
│   ├── orders.ts          # Order endpoints
│   └── index.ts           # Barrel export
│
├── components/             # React components
│   ├── features/          # Feature-specific components
│   │   └── ProductList.tsx
│   ├── layout/            # Layout components
│   │   └── Header.tsx
│   ├── ui/                # Reusable UI from shadcn
│   ├── ErrorBoundary.tsx  # Error handling
│   └── Skeletons.tsx      # Loading states
│
├── constants/              # Application constants
│   └── index.ts           # App config, routes, messages
│
├── contexts/               # React Context
│   └── CartContext.tsx    # Shopping cart state
│
├── data/                   # Static data
│   └── products.ts        # Product database
│
├── hooks/                  # Custom React hooks
│   ├── useCart.ts         # Cart context wrapper
│   ├── useLocalStorage.ts # localStorage hook
│   └── index.ts           # Barrel export
│
├── lib/                    # Library utilities
│   └── utils.ts          # Class name utility (cn)
│
├── routes/                 # TanStack Router routes
│   ├── __root.tsx        # Root layout
│   ├── index.tsx         # Home page
│   └── product.$slug.tsx # Dynamic product page
│
├── types/                  # TypeScript definitions
│   └── index.ts          # All shared types
│
├── utils/                  # Utility functions
│   ├── formatting.ts      # Price, date formatting
│   ├── validation.ts      # Form validation
│   └── index.ts           # Barrel export
│
├── styles/                 # Global styles
│   └── styles.css        # Tailwind + globals
│
└── assets/                 # Images & static files
    ├── ComfortCo._landing.png
    ├── CC._favicon.png
    └── product-*.jpg
```

### Key Design Patterns

#### 1. Component Architecture

**Presentational Components** (src/components/ui/)

- Reusable, dumb components
- From shadcn/ui
- No business logic
- Accept props for behavior

**Feature Components** (src/components/features/)

- Domain-specific components
- May contain business logic
- Fetch and manage data
- Composed from presentational components

**Layout Components** (src/components/layout/)

- Page structure components
- Header, Footer, Sidebar
- Contain navigation

#### 2. State Management Strategy

**Local State**

- Component-level with useState
- For UI-only state (expanded/collapsed)

**Context API** (src/contexts/)

- Cart state (CartContext)
- User session state (future)
- Theme/preferences (future)

**Server State** (TanStack Query)

- Products, orders
- Automatic caching & refetching
- Handles loading/error states

**Persistent State** (localStorage)

- Cart items
- User preferences
- Accessed via useLocalStorage hook

#### 3. Data Fetching Pattern

```typescript
// In component
const { data, isLoading, error } = useQuery({
  queryKey: ["products"],
  queryFn: getProducts, // API service function
});

// API Service (src/api/products.ts)
export async function getProducts(): Promise<ApiResponse<Product[]>> {
  // Fetch and return data with error handling
}
```

#### 4. Form Handling

```typescript
// React Hook Form + Zod
const schema = z.object({
  /* schema */
});
const { register, handleSubmit, errors } = useForm({
  resolver: zodResolver(schema),
});
```

### Type Safety

All types are centralized in `src/types/index.ts`:

- `Product` - Product information
- `CartItem` - Cart item with quantity
- `Order` - Order details
- `User` - User account info
- `ApiResponse<T>` - Standard API response

This ensures:

- Consistency across the app
- Easy refactoring
- Single source of truth

### Error Handling

**Component Errors** → ErrorBoundary

```tsx
<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>
```

**API Errors** → ApiResponse

```typescript
return {
  success: false,
  error: { code: "ERROR_CODE", message: "..." },
};
```

**Form Errors** → React Hook Form

```tsx
{
  errors.email && <span>{errors.email.message}</span>;
}
```

### Routing Structure

TanStack Router file-based routing:

```
routes/
├── __root.tsx          → /
├── index.tsx           → /
├── checkout.tsx        → /checkout
└── product.$slug.tsx   → /product/:slug
```

### Performance Considerations

1. **Code Splitting**
   - Routes split automatically with TanStack Router
   - Components lazy-loaded as needed

2. **Caching**
   - TanStack Query caches API responses
   - LocalStorage for persistent data

3. **Rendering**
   - React.memo for expensive components
   - useCallback for stable references

4. **Bundle Size**
   - Tree-shaking with ES modules
   - Vite optimization
   - Tailwind CSS purging

### Deployment Architecture

```
Source Code (GitHub)
    ↓
GitHub Actions (CI/CD)
    ↓
Lint & Type Check
    ↓
Build (bun run build)
    ↓
Cloudflare Pages Deploy
    ↓
https://comfortco.pages.dev
```

### API Integration Points

Currently using local data (`src/data/products.ts`).

To connect real backend:

1. Update `.env.local` with API endpoint
2. Modify API services in `src/api/`
3. Update error handling as needed
4. Add authentication/tokens if required

### Future Scalability

The architecture supports:

- **Authentication** - Add AuthContext & protected routes
- **Advanced State** - Switch to Zustand if needed
- **Real-time** - Add WebSocket support
- **Offline** - Service Workers + IndexedDB
- **Internationalization** - i18n library
- **Testing** - Vitest + React Testing Library
- **Analytics** - Integration ready

### Coding Standards

- **TypeScript**: Strict mode enabled
- **Components**: Functional only
- **Styles**: Tailwind CSS classes
- **Imports**: Path aliases (@/) preferred
- **Naming**: PascalCase components, camelCase functions
- **Comments**: JSDoc for public APIs

### Key Decision Rationales

1. **TanStack Router over Next.js**
   - More control over routing
   - Supports Cloudflare deployment
   - Better for SPA architecture

2. **React Query over Redux**
   - Simpler for server state
   - Automatic caching
   - Less boilerplate

3. **Tailwind over CSS Modules**
   - Rapid development
   - Consistent design system
   - Small output with PurgeCSS

4. **shadcn/ui over Material-UI**
   - Copy-paste components (no dependencies)
   - Customizable with Tailwind
   - Lightweight

---

For implementation details, see:

- [README.md](../README.md) - Feature overview
- [CONTRIBUTING.md](../CONTRIBUTING.md) - Development guide
- [QUICKSTART.md](../QUICKSTART.md) - Getting started
