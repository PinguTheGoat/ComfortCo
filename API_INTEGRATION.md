# API Integration Guide - ComfortCo

This guide explains how to connect ComfortCo to your backend API.

## Current State

ComfortCo currently uses **local product data** from `src/data/products.ts`.

The API services are stubbed with TODO comments ready for integration:

- `src/api/products.ts` - Product endpoints
- `src/api/orders.ts` - Order endpoints

## Step 1: Configure API Endpoints

### Update Environment Variables

Edit `.env.local`:

```bash
VITE_API_BASE_URL=https://api.yourdomain.com
VITE_API_TIMEOUT=10000
```

### Create API Client Utility

Create `src/api/client.ts`:

```typescript
/**
 * API client with base configuration
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
const API_TIMEOUT = import.meta.env.VITE_API_TIMEOUT || 10000;

interface RequestConfig extends RequestInit {
  timeout?: number;
}

async function apiCall<T>(endpoint: string, config: RequestConfig = {}): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), config.timeout || API_TIMEOUT);

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...config,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...config.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  } finally {
    clearTimeout(timeoutId);
  }
}

export default apiCall;
```

## Step 2: Implement Product API

Update `src/api/products.ts`:

```typescript
import apiCall from "./client";
import type { Product, ApiResponse } from "@/types";

/**
 * Fetch all products
 */
export async function getProducts(): Promise<ApiResponse<Product[]>> {
  try {
    const data = await apiCall<Product[]>("/products");
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: {
        code: "PRODUCTS_FETCH_ERROR",
        message: error instanceof Error ? error.message : "Failed to fetch products",
      },
    };
  }
}

/**
 * Fetch single product by slug
 */
export async function getProductBySlug(slug: string): Promise<ApiResponse<Product>> {
  try {
    const data = await apiCall<Product>(`/products/${slug}`);
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: {
        code: "PRODUCT_NOT_FOUND",
        message: error instanceof Error ? error.message : "Product not found",
      },
    };
  }
}

/**
 * Search products
 */
export async function searchProducts(query: string): Promise<ApiResponse<Product[]>> {
  try {
    const params = new URLSearchParams({ q: query });
    const data = await apiCall<Product[]>(`/products/search?${params}`);
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: {
        code: "SEARCH_ERROR",
        message: error instanceof Error ? error.message : "Search failed",
      },
    };
  }
}
```

## Step 3: Implement Order API

Update `src/api/orders.ts`:

```typescript
import apiCall from "./client";
import type { Order, ApiResponse } from "@/types";

/**
 * Create order
 */
export async function createOrder(
  orderData: Omit<Order, "id" | "createdAt" | "updatedAt">,
): Promise<ApiResponse<Order>> {
  try {
    const data = await apiCall<Order>("/orders", {
      method: "POST",
      body: JSON.stringify(orderData),
    });
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: {
        code: "ORDER_CREATION_ERROR",
        message: error instanceof Error ? error.message : "Failed to create order",
      },
    };
  }
}

/**
 * Fetch user orders
 */
export async function getUserOrders(userId: string): Promise<ApiResponse<Order[]>> {
  try {
    const data = await apiCall<Order[]>(`/orders?userId=${userId}`);
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: {
        code: "ORDERS_FETCH_ERROR",
        message: error instanceof Error ? error.message : "Failed to fetch orders",
      },
    };
  }
}
```

## Step 4: Use API in Components

### Simple Query

```tsx
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/api/products";

function ProductList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.data?.map((product) => (
        <div key={product.slug}>{product.name}</div>
      ))}
    </div>
  );
}
```

### Query with Parameters

```tsx
function ProductSearch({ query }: { query: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ["products", "search", query],
    queryFn: () => searchProducts(query),
    enabled: query.length > 0,
  });

  return <div>{/* render results */}</div>;
}
```

### Mutation (POST/PUT/DELETE)

```tsx
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrder } from "@/api/orders";

function Checkout() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      // Clear cart and refetch orders
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  const handleCheckout = (orderData) => {
    mutate(orderData);
  };

  return <button onClick={handleCheckout}>{isPending ? "Processing..." : "Checkout"}</button>;
}
```

## Step 5: Add Authentication (Optional)

### Create Auth API

`src/api/auth.ts`:

```typescript
export async function login(email: string, password: string) {
  const response = await apiCall("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  return response;
}

export async function logout() {
  return apiCall("/auth/logout", { method: "POST" });
}
```

### Create Auth Context

`src/contexts/AuthContext.tsx`:

```tsx
import { createContext, useState, ReactNode } from "react";
import { login } from "@/api/auth";
import type { User } from "@/types";

export const AuthContext = createContext<{
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = async (email: string, password: string) => {
    const response = await login(email, password);
    if (response.success) {
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login: handleLogin, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
```

## Step 6: Handle Errors Globally

Create `src/utils/errorHandler.ts`:

```typescript
import { useCallback } from "react";
import { toast } from "sonner";

export function useErrorHandler() {
  return useCallback((error: unknown) => {
    if (error instanceof Error) {
      toast.error(error.message);
      console.error(error);
    } else {
      toast.error("An unexpected error occurred");
    }
  }, []);
}
```

## Step 7: Add Loading & Error States

### Loading State

```tsx
import { ProductGridSkeleton } from "@/components/Skeletons";

function ProductList() {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if (isLoading) return <ProductGridSkeleton />;

  return <div>{/* render products */}</div>;
}
```

### Error State

```tsx
import { Alert, AlertDescription } from "@/components/ui/alert";

function ProductList() {
  const { data, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>Failed to load products. Please try again later.</AlertDescription>
      </Alert>
    );
  }

  return <div>{/* render products */}</div>;
}
```

## Step 8: Configure Query Options

Create `src/api/queryConfig.ts`:

```typescript
import { DefaultOptions } from "@tanstack/react-query";

export const defaultQueryOptions: DefaultOptions = {
  queries: {
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    retry: 1,
    refetchOnWindowFocus: false,
  },
  mutations: {
    retry: 1,
  },
};
```

## Backend Expected Format

### GET /products

```json
[
  {
    "slug": "essential-tee",
    "name": "The Essential Tee",
    "price": "€68",
    "image": "url",
    "images": ["url"],
    "sku": "CC-01",
    "material": "100% Organic Cotton",
    "description": "Product description",
    "details": ["Detail 1", "Detail 2"],
    "sizes": ["XS", "S", "M", "L", "XL"],
    "category": "Tops"
  }
]
```

### POST /orders

**Request:**

```json
{
  "userId": "user-id",
  "items": [
    {
      "slug": "essential-tee",
      "name": "The Essential Tee",
      "price": 68,
      "size": "M",
      "image": "url",
      "quantity": 1
    }
  ],
  "total": 68,
  "status": "pending"
}
```

**Response:**

```json
{
  "id": "order-123",
  "userId": "user-id",
  "items": [...],
  "total": 68,
  "status": "confirmed",
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

## Testing API Integration

### Using Mock Server (MSW)

```bash
bun add -D msw @testing-library/server
```

Create `src/test/mocks/handlers.ts`:

```typescript
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/products", () => {
    return HttpResponse.json([{ slug: "test-product", name: "Test" }]);
  }),
];
```

### Using Local JSON Server

```bash
bun add -D json-server
```

Create `db.json` with mock data, run:

```bash
json-server db.json
```

## Environment Variables

Create `.env.example`:

```bash
VITE_API_BASE_URL=http://localhost:3000
VITE_API_TIMEOUT=10000
VITE_ENV=development
```

## Common Issues

### CORS Errors

- Configure backend to allow frontend origin
- Or use proxy in development (Vite can proxy)

### Authentication Token Storage

- Store JWT in localStorage or httpOnly cookie
- Add Authorization header in apiCall function

### Request Cancellation

- Use AbortController (already in client.ts)
- Cancel requests when component unmounts

---

For complete documentation, see [README.md](./README.md) and [ARCHITECTURE.md](./ARCHITECTURE.md).
