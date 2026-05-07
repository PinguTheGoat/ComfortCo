# Testing Guide - ComfortCo

This guide covers testing strategy and setup for ComfortCo.

## Testing Stack

- **Test Runner**: Vitest
- **Component Testing**: React Testing Library
- **E2E Testing**: Playwright (optional, for future setup)

## Setup

### Install Testing Dependencies

```bash
bun add -d vitest @vitest/ui @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

### Update Vite Config

Add to `vite.config.ts`:

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
  },
});
```

### Create Test Setup File

Create `src/test/setup.ts`:

```typescript
import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";

afterEach(() => {
  cleanup();
});
```

## Writing Tests

### Unit Tests

Test utility functions:

```typescript
// src/utils/formatting.test.ts
import { describe, it, expect } from "vitest";
import { formatPrice, capitalize } from "@/utils/formatting";

describe("formatting utilities", () => {
  describe("formatPrice", () => {
    it("should format price with currency", () => {
      expect(formatPrice(99.99)).toBe("€99.99");
    });

    it("should handle zero", () => {
      expect(formatPrice(0)).toBe("€0.00");
    });

    it("should handle custom currency", () => {
      expect(formatPrice(50, "$")).toBe("$50.00");
    });
  });

  describe("capitalize", () => {
    it("should capitalize first letter", () => {
      expect(capitalize("hello")).toBe("Hello");
    });

    it("should handle single letter", () => {
      expect(capitalize("a")).toBe("A");
    });
  });
});
```

### Component Tests

Test React components:

```typescript
// src/components/ProductCard.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProductCard } from "@/components/ProductCard";

const mockProduct = {
  slug: "test-product",
  name: "Test Product",
  price: "€99.99",
  image: "/test.jpg",
};

describe("ProductCard", () => {
  it("should render product name", () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText("Test Product")).toBeInTheDocument();
  });

  it("should render product price", () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText("€99.99")).toBeInTheDocument();
  });

  it("should have clickable link", () => {
    render(<ProductCard product={mockProduct} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/product/test-product");
  });
});
```

### Hook Tests

Test custom hooks:

```typescript
// src/hooks/useCart.test.ts
import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { CartProvider } from "@/contexts/CartContext";
import { useCart } from "@/hooks/useCart";

describe("useCart", () => {
  it("should add item to cart", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CartProvider>{children}</CartProvider>
    );

    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem({
        slug: "test",
        name: "Test",
        price: 99.99,
        size: "M",
        image: "/test.jpg",
      });
    });

    expect(result.current.totalItems).toBe(1);
  });
});
```

## Running Tests

```bash
# Run all tests
bun run test

# Watch mode
bun run test:watch

# UI mode
bun run test:ui

# Coverage
bun run test:coverage
```

## Test Coverage

Aim for:

- **Statements**: > 80%
- **Branches**: > 75%
- **Functions**: > 80%
- **Lines**: > 80%

### Generate Coverage Report

```bash
bun run test:coverage
```

Reports will be in `coverage/` directory.

## Best Practices

1. **Isolation**: Tests should be independent and not affect each other
2. **Clarity**: Use descriptive test names
3. **Arrange-Act-Assert**: Organize tests in AAA pattern
4. **Mock Sparingly**: Only mock external dependencies
5. **Realistic Data**: Use realistic test data
6. **Focus on User Behavior**: Test what users see/do, not implementation details

### Example: Good Test Structure

```typescript
describe("ProductCard", () => {
  // Arrange
  const mockProduct = { /* ... */ };

  it("should open product detail on click", () => {
    // Act
    render(<ProductCard product={mockProduct} />);
    const card = screen.getByRole("link");

    // Assert
    expect(card).toHaveAttribute("href", "/product/test-product");
  });
});
```

## Common Pitfalls

❌ **DON'T**: Test implementation details

```typescript
// Bad
expect(component.state.isLoaded).toBe(true);
```

✅ **DO**: Test user behavior

```typescript
// Good
expect(screen.getByText("Product loaded")).toBeInTheDocument();
```

❌ **DON'T**: Use sleep/wait unnecessarily

```typescript
// Bad
await new Promise((resolve) => setTimeout(resolve, 1000));
```

✅ **DO**: Use proper async utilities

```typescript
// Good
await waitFor(() => expect(screen.getByText("Loaded")).toBeInTheDocument());
```

## Mocking

### Mock API Calls

```typescript
import { vi } from "vitest";
import * as api from "@/api/products";

vi.mock("@/api/products", () => ({
  getProducts: vi.fn(() =>
    Promise.resolve({
      success: true,
      data: [{ slug: "test", name: "Test Product" }],
    }),
  ),
}));
```

### Mock Router

```typescript
import { useLocation } from "@tanstack/react-router";

vi.mock("@tanstack/react-router", () => ({
  useLocation: vi.fn(() => ({
    pathname: "/",
  })),
}));
```

## Integration Testing

Test multiple components together:

```typescript
describe("Checkout Flow", () => {
  it("should complete checkout", async () => {
    const user = userEvent.setup();

    render(
      <CartProvider>
        <Checkout />
      </CartProvider>
    );

    // Add item to cart
    await user.click(screen.getByText("Add to Cart"));

    // Go to checkout
    await user.click(screen.getByText("Checkout"));

    // Fill form and submit
    await user.type(screen.getByLabelText("Email"), "test@example.com");
    await user.click(screen.getByText("Complete Purchase"));

    // Assert success
    expect(screen.getByText("Order confirmed")).toBeInTheDocument();
  });
});
```

## Continuous Integration

Set up testing in CI/CD pipeline:

```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: oven-sh/setup-bun@v1
      - run: bun install
      - run: bun run lint
      - run: bun run test
      - run: bun run test:coverage
```

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
