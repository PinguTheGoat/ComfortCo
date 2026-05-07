/\*\*

- PROJECT STRUCTURE REFERENCE
- ComfortCo - Premium Comfort Wear & Lifestyle
-
- Visual reference for the complete project structure
  \*/

```
comfortco-minimal/
│
├── .github/
│   └── workflows/
│       └── ci.yml                    # GitHub Actions CI/CD pipeline
│
├── src/
│   ├── api/                          # API Service Layer
│   │   ├── products.ts               # Product API services
│   │   ├── orders.ts                 # Order API services
│   │   └── index.ts                  # Barrel export
│   │
│   ├── components/
│   │   ├── features/                 # Feature-specific components
│   │   │   └── README.md (future)
│   │   ├── layout/                   # Layout components
│   │   │   └── README.md (future)
│   │   ├── ui/                       # Reusable UI components (shadcn)
│   │   │   ├── accordion.tsx
│   │   │   ├── alert.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── carousel.tsx
│   │   │   ├── checkbox.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── form.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── popover.tsx
│   │   │   ├── select.tsx
│   │   │   ├── sheet.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── sonner.tsx
│   │   │   ├── table.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── toggle.tsx
│   │   │   └── tooltip.tsx
│   │   ├── CartDrawer.tsx             # Cart drawer component
│   │   ├── EditorialSection.tsx       # Editorial section
│   │   ├── ErrorBoundary.tsx          # Error boundary (NEW)
│   │   ├── FooterSection.tsx          # Footer section
│   │   ├── HeroSection.tsx            # Hero section
│   │   ├── Navbar.tsx                 # Navigation bar
│   │   ├── ProductCard.tsx            # Product card
│   │   ├── ProductDetailPage.tsx      # Product detail
│   │   ├── ProductGrid.tsx            # Product grid
│   │   └── Skeletons.tsx              # Loading skeletons (NEW)
│   │
│   ├── constants/                    # Application Constants (NEW)
│   │   └── index.ts                  # All app constants
│   │
│   ├── contexts/                     # React Contexts
│   │   └── CartContext.tsx           # Shopping cart context
│   │
│   ├── data/
│   │   └── products.ts               # Static product data
│   │
│   ├── hooks/                        # Custom React Hooks (NEW)
│   │   ├── useCart.ts                # Cart context hook
│   │   ├── useLocalStorage.ts        # localStorage hook
│   │   ├── use-mobile.tsx            # Mobile detection hook
│   │   └── index.ts                  # Barrel export
│   │
│   ├── lib/
│   │   └── utils.ts                  # Library utilities (cn function)
│   │
│   ├── routes/                       # TanStack Router Routes
│   │   ├── __root.tsx                # Root layout (UPDATED)
│   │   ├── index.tsx                 # Home page
│   │   ├── checkout.tsx              # Checkout page
│   │   └── product.$slug.tsx         # Product detail page
│   │
│   ├── types/                        # TypeScript Definitions (NEW)
│   │   └── index.ts                  # All shared types
│   │
│   ├── utils/                        # Utility Functions (NEW)
│   │   ├── formatting.ts             # Format utilities
│   │   ├── validation.ts             # Validation utilities
│   │   ├── cn.ts                     # Class name utility
│   │   └── index.ts                  # Barrel export
│   │
│   ├── assets/                       # Static Assets
│   │   ├── CC._favicon.png           # Favicon
│   │   ├── ComfortCo._landing.png    # Logo
│   │   ├── hero-texture.jpg          # Hero texture
│   │   ├── product-*.jpg             # Product images (8 files)
│   │   └── product-*-detail.jpg      # Product detail images
│   │
│   ├── styles/
│   │   └── styles.css                # Global styles
│   │
│   ├── router.tsx                    # Router config
│   └── routeTree.gen.ts              # Auto-generated route tree
│
├── Root Configuration Files
│   ├── .env.example                  # Environment variables template (NEW)
│   ├── .env.local                    # Local environment config (NEW)
│   ├── .eslintrc.js                  # ESLint configuration
│   ├── .gitignore                    # Git ignore (UPDATED)
│   ├── .prettierrc.cjs               # Prettier config (NEW)
│   ├── .prettierignore               # Prettier ignore (NEW)
│   ├── bunfig.toml                   # Bun configuration
│   ├── components.json               # shadcn config
│   ├── eslint.config.js              # ESLint rules
│   ├── package.json                  # Project dependencies
│   ├── tsconfig.json                 # TypeScript config
│   ├── vite.config.ts                # Vite config
│   └── wrangler.jsonc                # Cloudflare config
│
├── Documentation Files (NEW)
│   ├── README.md                     # Main documentation
│   ├── QUICKSTART.md                 # 5-minute setup guide
│   ├── CONTRIBUTING.md               # Development guidelines
│   ├── ARCHITECTURE.md               # System architecture
│   ├── DEPLOYMENT.md                 # Deployment guide
│   ├── TESTING.md                    # Testing guide
│   ├── API_INTEGRATION.md            # API integration guide
│   ├── IMPLEMENTATION_SUMMARY.md     # This implementation summary
│   └── PROJECT_STRUCTURE.md          # This file
│
├── bun.lockb                         # Bun lockfile
└── vite.env.d.ts                     # Vite type definitions
```

## File Categories

### 📂 Core Application

- `src/routes/` - Page components
- `src/components/` - React components
- `src/contexts/` - React context providers

### 🔌 API & Services

- `src/api/` - API service functions
- `src/hooks/` - Custom React hooks
- `src/utils/` - Utility functions

### ⚙️ Configuration

- `src/types/` - Type definitions
- `src/constants/` - App constants
- `src/styles/` - Global styles
- `src/assets/` - Images & static files

### 🚀 Deployment & CI/CD

- `.github/workflows/` - GitHub Actions
- `wrangler.jsonc` - Cloudflare config
- `.env.example` - Environment template

### 📖 Documentation

- `README.md` - Full project docs
- `QUICKSTART.md` - Getting started
- `CONTRIBUTING.md` - Development guide
- `ARCHITECTURE.md` - System design
- `DEPLOYMENT.md` - Deployment guide
- `TESTING.md` - Testing guide
- `API_INTEGRATION.md` - API setup guide

## Key Files to Know

### First Time Setup

1. Start: `QUICKSTART.md`
2. Then: `README.md`
3. Before coding: `CONTRIBUTING.md`

### Development

- Constants: `src/constants/index.ts`
- Types: `src/types/index.ts`
- Utils: `src/utils/index.ts`
- Hooks: `src/hooks/index.ts`

### Adding Features

- Follow: `CONTRIBUTING.md`
- Reference: `ARCHITECTURE.md`
- Examples in: `src/components/features/`

### Deployment

- Setup: `DEPLOYMENT.md`
- CI/CD: `.github/workflows/ci.yml`
- Config: `wrangler.jsonc`

### API Integration

- Guide: `API_INTEGRATION.md`
- Services: `src/api/`
- Types: `src/types/index.ts`

## Development Workflow

```
1. Clone repository
   ↓
2. Read QUICKSTART.md
   ↓
3. Run: bun install && bun run dev
   ↓
4. Read CONTRIBUTING.md for guidelines
   ↓
5. Create feature branch
   ↓
6. Follow architecture patterns (ARCHITECTURE.md)
   ↓
7. Add tests (TESTING.md)
   ↓
8. Run linter & format: bun run lint && bun run format
   ↓
9. Push & open PR
   ↓
10. GitHub Actions runs CI/CD
   ↓
11. Deploy (DEPLOYMENT.md)
```

## Finding Things

**Looking for...?**

- API services → `src/api/`
- UI components → `src/components/ui/`
- Custom hooks → `src/hooks/`
- Utilities → `src/utils/`
- Type definitions → `src/types/`
- Constants → `src/constants/`
- Product data → `src/data/`
- Routes → `src/routes/`
- Setup instructions → `QUICKSTART.md`
- Architecture decisions → `ARCHITECTURE.md`
- Deployment steps → `DEPLOYMENT.md`
- Testing examples → `TESTING.md`
- API integration → `API_INTEGRATION.md`
- Development guidelines → `CONTRIBUTING.md`

## Statistics

- **Documentation Files**: 8
- **API Service Files**: 2
- **Type Definition Files**: 1
- **Utility Function Files**: 2
- **Custom Hook Files**: 3
- **Configuration Files**: 5
- **UI Component Files**: 20+
- **Feature Component Files**: 7
- **Total New Files**: 32+

---

For detailed information on each section, see the corresponding documentation file.
